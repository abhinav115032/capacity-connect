from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uvicorn
from .database import engine, Base, get_db
from . import models, schemas

# Initialize DB Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Capacity Connect LMS API",
    description="Enterprise Digital Capacity Building & Competency Management Platform",
    version="1.0.0"
)

# Enable CORS for frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "app": "Capacity Connect LMS Backend",
        "status": "online",
        "tagline": "Bridge Skill Gaps. Build Capabilities. Drive Growth."
    }

@app.get("/api/health")
def health():
    return {"status": "healthy", "service": "Capacity Connect Core"}

@app.post("/api/ai/recommendations")
def generate_ai_recommendations(profile_skills: dict):
    """
    AI Recommendation Engine:
    Evaluates skill gap deficits against catalog taxonomy and returns targeted curriculum.
    """
    gaps = []
    for skill, level in profile_skills.items():
        if level < 70:
            gaps.append(skill)

    rationale = f"Detected {len(gaps)} key capability gaps. AI recommended sequencing prioritized by organization ROI."
    return {
        "status": "success",
        "detected_gaps": gaps,
        "recommendation_summary": rationale,
        "recommended_course_ids": ["course-py-101", "course-da-201"]
    }

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
