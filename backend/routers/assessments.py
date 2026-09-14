from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid
from datetime import datetime

from database import get_db
import models, schemas
from routers.auth import get_current_user

router = APIRouter(prefix="/api/assessments", tags=["Assessments & Certificates"])

# Simulated question bank answer key (Option index 0-based)
CORRECT_ANSWERS = {
    1: 1, # Q1 -> Option B
    2: 2, # Q2 -> Option C
    3: 0, # Q3 -> Option A
    4: 3, # Q4 -> Option D
    5: 1  # Q5 -> Option B
}

@router.post("/submit", response_model=schemas.QuizResultResponse)
def submit_quiz_assessment(
    submission: schemas.QuizSubmit,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    course = db.query(models.Course).filter(models.Course.id == submission.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    correct_count = 0
    for ans in submission.answers:
        if ans.question_id in CORRECT_ANSWERS and CORRECT_ANSWERS[ans.question_id] == ans.selected_option:
            correct_count += 1
        # If dynamic questions, default correct match can be assumed if >= 4 correct
    
    total = len(submission.answers) if submission.answers else 5
    score_pct = int((correct_count / total) * 100) if total > 0 else 80
    passed = score_pct >= 80

    # Save assessment record
    assessment_rec = models.Assessment(
        user_id=current_user.id,
        course_title=course.title,
        skill_name=course.target_skill,
        score=score_pct,
        total_questions=total,
        passed=passed
    )
    db.add(assessment_rec)

    certificate_id_val = None
    competency_updated = False
    new_skill_level = None

    if passed:
        # Mark enrollment as completed
        enrollment = db.query(models.Enrollment).filter(
            models.Enrollment.user_id == current_user.id,
            models.Enrollment.course_id == course.id
        ).first()
        if enrollment:
            enrollment.progress_pct = 100
            enrollment.is_completed = True
            enrollment.completed_at = datetime.utcnow()

        # Check or issue certificate
        existing_cert = db.query(models.Certificate).filter(
            models.Certificate.user_id == current_user.id,
            models.Certificate.course_id == course.id
        ).first()

        if not existing_cert:
            cert_id = f"CC-2026-{uuid.uuid4().hex[:6].upper()}"
            new_cert = models.Certificate(
                certificate_id=cert_id,
                user_id=current_user.id,
                course_id=course.id,
                course_title=course.title,
                credential_hash=f"sha256_{uuid.uuid4().hex[:12]}"
            )
            db.add(new_cert)
            certificate_id_val = cert_id
        else:
            certificate_id_val = existing_cert.certificate_id

        # Update Competency profile
        user_skill = db.query(models.UserSkill).filter(
            models.UserSkill.user_id == current_user.id,
            models.UserSkill.skill_name == course.target_skill
        ).first()

        if user_skill:
            user_skill.current_level = min(5, user_skill.current_level + 1)
            user_skill.gap_priority = "Mastered" if user_skill.current_level >= user_skill.target_level else "Moderate Gap"
            new_skill_level = user_skill.current_level
            competency_updated = True
        else:
            new_skill = models.UserSkill(
                user_id=current_user.id,
                skill_name=course.target_skill,
                current_level=4,
                target_level=4,
                gap_priority="Mastered"
            )
            db.add(new_skill)
            new_skill_level = 4
            competency_updated = True

    db.commit()

    return schemas.QuizResultResponse(
        course_id=course.id,
        score_pct=score_pct,
        passed=passed,
        certificate_id=certificate_id_val,
        competency_updated=competency_updated,
        updated_skill_name=course.target_skill if competency_updated else None,
        new_skill_level=new_skill_level
    )

@router.get("/my/certificates")
def get_my_certificates(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    certs = db.query(models.Certificate).filter(models.Certificate.user_id == current_user.id).all()
    result = []
    for c in certs:
        result.append({
            "id": c.id,
            "certificate_id": c.certificate_id,
            "course_title": c.course_title,
            "recipient_name": current_user.full_name,
            "issue_date": c.issue_date.strftime("%B %d, %Y"),
            "credential_hash": c.credential_hash
        })
    return result
