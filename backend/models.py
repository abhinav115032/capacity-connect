from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="Senior Product Specialist")
    department = Column(String, default="Product & Operations")
    organization = Column(String, default="Nexus Enterprise Solutions")
    experience_level = Column(String, default="Mid-Senior (4.5 Years)")
    overall_competency = Column(Float, default=72.0)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Skill(Base):
    __tablename__ = "skills"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    required_level = Column(Integer, default=80)
    description = Column(Text)

class UserSkillAssessment(Base):
    __tablename__ = "user_skill_assessments"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"))
    skill_id = Column(String, ForeignKey("skills.id"))
    current_level = Column(Integer, default=50)
    gap = Column(Integer, default=30)
    priority = Column(String, default="Medium")
    assessed_at = Column(DateTime, default=datetime.datetime.utcnow)

class Course(Base):
    __tablename__ = "courses"
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    instructor = Column(String, nullable=False)
    duration = Column(String, nullable=False)
    difficulty = Column(String, default="Beginner")
    rating = Column(Float, default=4.9)
    gap_targeted = Column(String)
    description = Column(Text)
    modules_count = Column(Integer, default=5)

class CourseEnrollment(Base):
    __tablename__ = "course_enrollments"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.id"))
    course_id = Column(String, ForeignKey("courses.id"))
    progress = Column(Integer, default=0)
    status = Column(String, default="enrolled")
    enrolled_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

class Certificate(Base):
    __tablename__ = "certificates"
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    course_id = Column(String, ForeignKey("courses.id"))
    recipient_name = Column(String, nullable=False)
    course_title = Column(String, nullable=False)
    score = Column(Integer, default=90)
    issue_date = Column(DateTime, default=datetime.datetime.utcnow)
    authorized_by = Column(String, default="Dr. Elena Rostova")
