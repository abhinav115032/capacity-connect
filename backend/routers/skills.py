from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
import models, schemas
from routers.auth import get_current_user

router = APIRouter(prefix="/api/skills", tags=["Skills & Gap Analysis"])

ROLE_BENCHMARKS = {
    "Communication": {"target": 5, "course": "Effective Communication & Executive Storytelling"},
    "Leadership": {"target": 4, "course": "Leadership Essentials & Adaptive Management"},
    "Programming": {"target": 5, "course": "Python Programming for Scalable Systems"},
    "Data Analysis": {"target": 4, "course": "Data Analytics Fundamentals & Visual Insights"},
    "Project Management": {"target": 4, "course": "Agile & Hybrid Project Management"},
    "Teamwork": {"target": 5, "course": "Cross-Functional Team Collaboration"}
}

def determine_gap_priority(current_pct: int, target_pct: int):
    diff = target_pct - current_pct
    if diff >= 40:
        return "High Priority"
    elif diff >= 20:
        return "Needs Improvement"
    elif diff > 0:
        return "Moderate Gap"
    return "Mastered"

@router.get("/my-skills", response_model=List[schemas.UserSkillSchema])
def get_user_skills(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    skills = db.query(models.UserSkill).filter(models.UserSkill.user_id == current_user.id).all()
    return skills

@router.post("/assessment", response_model=schemas.SkillGapResponse)
def submit_skill_assessment(
    submission: schemas.AssessmentSubmission,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    total_current = 0
    total_target = 0
    gap_items = []
    gaps_count = 0

    for item in submission.assessments:
        benchmark = ROLE_BENCHMARKS.get(item.skill_name, {"target": 4, "course": "General Capability Booster"})
        target_val = benchmark["target"]
        
        # 1 to 5 scale converted to percentage
        current_pct = int((item.rating / 5) * 100)
        target_pct = int((target_val / 5) * 100)
        gap_pct = max(0, target_pct - current_pct)
        priority = determine_gap_priority(current_pct, target_pct)

        if gap_pct > 0:
            gaps_count += 1

        total_current += current_pct
        total_target += target_pct

        # Update or create user skill in DB
        user_skill = db.query(models.UserSkill).filter(
            models.UserSkill.user_id == current_user.id,
            models.UserSkill.skill_name == item.skill_name
        ).first()

        if user_skill:
            user_skill.current_level = item.rating
            user_skill.target_level = target_val
            user_skill.gap_priority = priority
        else:
            new_skill = models.UserSkill(
                user_id=current_user.id,
                skill_name=item.skill_name,
                current_level=item.rating,
                target_level=target_val,
                gap_priority=priority
            )
            db.add(new_skill)

        gap_items.append(schemas.SkillGapItem(
            skill_name=item.skill_name,
            current_score_pct=current_pct,
            target_score_pct=target_pct,
            gap_pct=gap_pct,
            priority=priority,
            recommended_course=benchmark["course"] if gap_pct > 0 else None
        ))

    db.commit()

    overall_pct = int(total_current / len(submission.assessments)) if submission.assessments else 0

    return schemas.SkillGapResponse(
        user_id=current_user.id,
        overall_competency_pct=overall_pct,
        total_gaps_identified=gaps_count,
        gaps=gap_items
    )

@router.get("/gap-analysis", response_model=schemas.SkillGapResponse)
def get_gap_analysis(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    skills = db.query(models.UserSkill).filter(models.UserSkill.user_id == current_user.id).all()
    if not skills:
        return schemas.SkillGapResponse(
            user_id=current_user.id,
            overall_competency_pct=0,
            total_gaps_identified=0,
            gaps=[]
        )

    gap_items = []
    total_pct = 0
    gaps_count = 0

    for s in skills:
        benchmark = ROLE_BENCHMARKS.get(s.skill_name, {"target": 4, "course": "General Capability Booster"})
        current_pct = int((s.current_level / 5) * 100)
        target_pct = int((s.target_level / 5) * 100)
        gap_pct = max(0, target_pct - current_pct)
        if gap_pct > 0:
            gaps_count += 1
        total_pct += current_pct

        gap_items.append(schemas.SkillGapItem(
            skill_name=s.skill_name,
            current_score_pct=current_pct,
            target_score_pct=target_pct,
            gap_pct=gap_pct,
            priority=s.gap_priority,
            recommended_course=benchmark["course"] if gap_pct > 0 else None
        ))

    return schemas.SkillGapResponse(
        user_id=current_user.id,
        overall_competency_pct=int(total_pct / len(skills)),
        total_gaps_identified=gaps_count,
        gaps=gap_items
    )
