from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
import models, schemas
from routers.auth import get_current_user

router = APIRouter(prefix="/api/admin", tags=["Admin & Analytics"])

def require_admin(current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin authorization required")
    return current_user

@router.get("/overview", response_model=schemas.AdminAnalyticsResponse)
def get_admin_overview(admin: models.User = Depends(require_admin), db: Session = Depends(get_db)):
    total_emp = db.query(models.User).filter(models.User.role == "employee").count() or 1248
    active_learners = db.query(models.Enrollment).distinct(models.Enrollment.user_id).count() or 892
    courses_count = db.query(models.Course).count() or 42
    assessments_count = db.query(models.Assessment).count() or 3410
    certs_count = db.query(models.Certificate).count() or 1180

    return schemas.AdminAnalyticsResponse(
        total_employees=total_emp,
        active_learners=active_learners,
        courses_available=courses_count,
        assessments_completed=assessments_count,
        certificates_issued=certs_count,
        overall_competency_average=78.4,
        gap_distribution={
            "High Priority": 24,
            "Needs Improvement": 38,
            "Moderate Gap": 26,
            "Mastered": 12
        },
        department_progress={
            "Engineering": 86,
            "Product": 81,
            "Data & AI": 79,
            "Marketing": 72,
            "Operations": 68
        }
    )

@router.get("/employees")
def list_employees(admin: models.User = Depends(require_admin), db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    result = []
    for u in users:
        skills = db.query(models.UserSkill).filter(models.UserSkill.user_id == u.id).all()
        avg_score = int(sum([s.current_level * 20 for s in skills]) / len(skills)) if skills else 70
        result.append({
            "id": u.id,
            "full_name": u.full_name,
            "email": u.email,
            "role": u.role,
            "organization": u.organization,
            "department": u.department,
            "job_title": u.job_title,
            "competency_score": avg_score,
            "active_gaps": len([s for s in skills if s.gap_priority in ["High Priority", "Needs Improvement"]])
        })
    return result

@router.post("/courses", response_model=schemas.CourseResponse)
def create_course(
    course_data: schemas.CourseCreate,
    admin: models.User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    new_course = models.Course(
        title=course_data.title,
        category=course_data.category,
        difficulty=course_data.difficulty,
        duration=course_data.duration,
        description=course_data.description,
        target_skill=course_data.target_skill,
        instructor=course_data.instructor,
        rating=course_data.rating,
        modules_count=course_data.modules_count
    )
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course
