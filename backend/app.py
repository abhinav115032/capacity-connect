"""
==============================================================================
CAPACITY CONNECT — BACKEND API (FASTAPI + SQLITE)
Smart India Hackathon 2026 | Problem Statement: SIH26075 | Theme: Smart Education
Team: Hexa Brigades

Technology Stack:
- Python 3
- FastAPI (High performance async REST API)
- SQLite (Self-contained, lightweight relational database)
- Pydantic (Data validation and schemas)
==============================================================================
"""

import sqlite3
from typing import List, Dict, Any, Optional
from datetime import datetime

try:
    from fastapi import FastAPI, HTTPException
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    FASTAPI_AVAILABLE = True
except ImportError:
    FASTAPI_AVAILABLE = False
    print("[NOTE] FastAPI or Pydantic not installed yet in this environment.")
    print("Run: pip install fastapi uvicorn pydantic")

# Initialize Database
DB_FILE = "capacity_connect.db"

def init_db():
    """Initializes the SQLite database tables matching presentation slide 3."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # 1. Learners Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS learners (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        department TEXT NOT NULL,
        target_role TEXT NOT NULL
    )
    """)

    # 2. Skills Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS skills (
        id TEXT PRIMARY KEY,
        learner_id TEXT NOT NULL,
        skill_name TEXT NOT NULL,
        category TEXT NOT NULL,
        current_score INTEGER NOT NULL,
        target_score INTEGER NOT NULL,
        FOREIGN KEY(learner_id) REFERENCES learners(id)
    )
    """)

    # 3. Certificates Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS certificates (
        id TEXT PRIMARY KEY,
        learner_id TEXT NOT NULL,
        course_title TEXT NOT NULL,
        skill_upgraded TEXT NOT NULL,
        issue_date TEXT NOT NULL,
        FOREIGN KEY(learner_id) REFERENCES learners(id)
    )
    """)

    # Seed initial hackathon demo data if empty
    cursor.execute("SELECT COUNT(*) FROM learners")
    if cursor.fetchone()[0] == 0:
        cursor.execute("""
        INSERT INTO learners (id, name, role, department, target_role)
        VALUES ('rahul', 'Rahul Sharma', 'Junior Software Engineer', 'Product Engineering', 'Full Stack Engineer')
        """)

        skills_seed = [
            ('py_1', 'rahul', 'Python Programming', 'Technical', 45, 80),
            ('da_1', 'rahul', 'Data Analysis & SQL', 'Technical', 40, 75),
            ('cloud_1', 'rahul', 'Cloud & Docker Basics', 'Technical', 35, 70),
            ('web_1', 'rahul', 'Web Technologies', 'Technical', 70, 80),
            ('comm_1', 'rahul', 'Communication & Teamwork', 'Soft Skills', 60, 75)
        ]
        cursor.executemany("""
        INSERT INTO skills (id, learner_id, skill_name, category, current_score, target_score)
        VALUES (?, ?, ?, ?, ?, ?)
        """, skills_seed)

    conn.commit()
    conn.close()

init_db()

# Create FastAPI app if installed
if FASTAPI_AVAILABLE:
    app = FastAPI(
        title="Capacity Connect API — SIH 2026",
        description="Backend API for Digital Capacity Building & Competency Management (Team Hexa Brigades)",
        version="1.0.0"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    class SkillAssessmentUpdate(BaseModel):
        learner_id: str
        skill_scores: Dict[str, int]

    class QuizSubmission(BaseModel):
        learner_id: str
        course_id: str
        course_title: str
        skill_name: str
        score_percent: int

    @app.get("/")
    def read_root():
        return {
            "project": "Capacity Connect — Digital Capacity Building Portal",
            "hackathon": "Smart India Hackathon 2026",
            "problem_statement_id": "SIH26075",
            "team_name": "Hexa Brigades",
            "status": "API Server Active"
        }

    @app.get("/api/profile/{learner_id}")
    def get_learner_profile(learner_id: str):
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, role, department, target_role FROM learners WHERE id = ?", (learner_id,))
        row = cursor.fetchone()
        if not row:
            conn.close()
            raise HTTPException(status_code=404, detail="Learner profile not found")

        cursor.execute("SELECT skill_name, category, current_score, target_score FROM skills WHERE learner_id = ?", (learner_id,))
        skills = [
            {"name": r[0], "category": r[1], "current": r[2], "target": r[3]}
            for r in cursor.fetchall()
        ]
        conn.close()

        return {
            "learner_id": row[0],
            "name": row[1],
            "role": row[2],
            "department": row[3],
            "target_role": row[4],
            "skills": skills
        }

    @app.get("/api/gap-analysis/{learner_id}")
    def get_skill_gap_analysis(learner_id: str):
        """
        Step 3 in Loop: Calculates gap between target role benchmark and current score.
        """
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT skill_name, current_score, target_score FROM skills WHERE learner_id = ?", (learner_id,))
        rows = cursor.fetchall()
        conn.close()

        gap_results = []
        for name, current, target in rows:
            gap = max(0, target - current)
            priority = "High" if gap >= 30 else ("Medium" if gap >= 15 else "Low")
            gap_results.append({
                "skill": name,
                "current": current,
                "target": target,
                "gap": gap,
                "priority": priority
            })

        return {
            "learner_id": learner_id,
            "overall_gap_count": len([g for g in gap_results if g["gap"] > 0]),
            "gaps": gap_results
        }

    @app.get("/api/recommendations/{learner_id}")
    def get_course_recommendations(learner_id: str):
        """
        Step 4 in Loop: AI-Assisted course recommendation matching high-priority deficits.
        """
        analysis = get_skill_gap_analysis(learner_id)
        critical_gaps = [g for g in analysis["gaps"] if g["priority"] in ["High", "Medium"]]

        recommendations = []
        for g in critical_gaps:
            recommendations.append({
                "recommended_course": f"{g['skill']} Mastery & Applied Practice",
                "targeted_deficit": g["skill"],
                "gap_percentage": g["gap"],
                "rationale": f"System identified a {g['gap']}% capability deficit against the target benchmark."
            })

        return {
            "learner_id": learner_id,
            "total_recommendations": len(recommendations),
            "recommendations": recommendations
        }

    @app.post("/api/quiz-submit")
    def submit_quiz_result(payload: QuizSubmission):
        """
        Step 6 in Loop: Evaluates assessment, auto-upgrades skill score, and creates digital certificate.
        """
        if payload.score_percent < 70:
            return {
                "passed": False,
                "message": f"Score {payload.score_percent}% is below the 70% passing threshold. Please review modules and retry."
            }

        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()

        # 1. Upgrade skill score in database
        cursor.execute("""
        UPDATE skills 
        SET current_score = MIN(100, current_score + 30) 
        WHERE learner_id = ? AND skill_name = ?
        """, (payload.learner_id, payload.skill_name))

        # 2. Issue verifiable certificate
        cert_id = f"SIH26-HEXA-{int(datetime.utcnow().timestamp()) % 100000:05d}"
        issue_date = datetime.utcnow().strftime("%B %d, %Y")

        cursor.execute("""
        INSERT INTO certificates (id, learner_id, course_title, skill_upgraded, issue_date)
        VALUES (?, ?, ?, ?, ?)
        """, (cert_id, payload.learner_id, payload.course_title, payload.skill_name, issue_date))

        conn.commit()
        conn.close()

        return {
            "passed": True,
            "certificate_id": cert_id,
            "issue_date": issue_date,
            "competency_boost": "+30%",
            "message": "Assessment passed! Competency score updated and Digital Certificate issued."
        }

if __name__ == "__main__":
    if FASTAPI_AVAILABLE:
        import uvicorn
        print("Starting Capacity Connect FastAPI backend on http://127.0.0.1:8000 ...")
        uvicorn.run(app, host="127.0.0.1", port=8000)
    else:
        print("Database initialized successfully.")
        print("To run the API server, install FastAPI: pip install fastapi uvicorn pydantic")
