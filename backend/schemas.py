from pydantic import BaseModel, EmailStr
from typing import List, Optional
import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str
    department: str
    organization: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    overall_competency: float
    is_admin: bool
    class Config:
        orm_mode = True

class SkillAssessmentUpdate(BaseModel):
    ratings: dict  # {"sk-prog": 55, "sk-comm": 70}

class CourseResponse(BaseModel):
    id: str
    title: str
    category: str
    instructor: str
    duration: str
    difficulty: str
    rating: float
    gap_targeted: Optional[str]
    description: str
    class Config:
        orm_mode = True

class QuizSubmission(BaseModel):
    course_id: str
    score: int
    answers: dict

class CertificateResponse(BaseModel):
    id: str
    course_title: str
    recipient_name: str
    score: int
    issue_date: datetime.date
    authorized_by: str
    class Config:
        orm_mode = True
