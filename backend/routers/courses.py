from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from database import get_db
import models, schemas
from routers.auth import get_current_user

router = APIRouter(prefix="/api/courses", tags=["Courses"])

@router.get("/", response_model=List[schemas.CourseResponse])
def get_courses(
    category: Optional[str] = None,
    difficulty: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Course)
    if category and category != "All":
        query = query.filter(models.Course.category == category)
    if difficulty and difficulty != "All":
        query = query.filter(models.Course.difficulty == difficulty)
    if search:
        query = query.filter(models.Course.title.ilike(f"%{search}%") | models.Course.description.ilike(f"%{search}%"))
    return query.all()

@router.get("/{course_id}", response_model=schemas.CourseResponse)
def get_course_detail(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.post("/{course_id}/enroll")
def enroll_course(
    course_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    existing = db.query(models.Enrollment).filter(
        models.Enrollment.user_id == current_user.id,
        models.Enrollment.course_id == course_id
    ).first()

    if existing:
        return {"message": "Already enrolled", "enrollment_id": existing.id, "progress_pct": existing.progress_pct}

    enrollment = models.Enrollment(
        user_id=current_user.id,
        course_id=course_id,
        progress_pct=15
    )
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    return {"message": "Successfully enrolled", "enrollment_id": enrollment.id, "progress_pct": 15}

@router.get("/my/enrollments")
def get_my_enrollments(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    enrollments = db.query(models.Enrollment).filter(models.Enrollment.user_id == current_user.id).all()
    result = []
    for enr in enrollments:
        course = db.query(models.Course).filter(models.Course.id == enr.course_id).first()
        if course:
            result.append({
                "enrollment_id": enr.id,
                "course_id": course.id,
                "title": course.title,
                "category": course.category,
                "difficulty": course.difficulty,
                "duration": course.duration,
                "progress_pct": enr.progress_pct,
                "is_completed": enr.is_completed,
                "target_skill": course.target_skill
            })
    return result
