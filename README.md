# Capacity Connect — Digital Capacity Building & LMS Portal

**Smart India Hackathon 2026**  
- **Problem Statement ID**: SIH26075  
- **Problem Statement Title**: CAPACITY CONNECT  
- **Theme**: SMART EDUCATION  
- **Category**: Software  
- **Team Name**: Hexa Brigades  

---

## 🎯 What is Capacity Connect?

Capacity Connect is a digital capacity building and competency management platform created for **Smart India Hackathon 2026**. It solves the problem of organizational skill stagnation by continuously diagnosing skill gaps, recommending targeted courses, administering practical assessments, and issuing verifiable credentials.

### 🔄 The Capacity Connect Loop (6-Stage Continuous Learning Cycle)

```
[1. Employee Profile]
       ↓
[2. Skill Diagnostic Assessment]
       ↓
[3. Skill Gap Analysis (Target vs Current)]
       ↓
[4. AI Course Recommendation]
       ↓
[5. Learning & Practical Assessment (Quiz)]
       ↓
[6. Digital Certificate & Competency Updated]
```

---

## 🚀 How to Run the Prototype (Instant 1-Click Launch)

This prototype has been designed to be **100% beginner-friendly and self-contained**. No `npm`, `node`, or external database server setup is required to run and test the complete working model!

### Option 1: Direct Browser Launch (Simplest!)
Simply double-click `index.html` in file explorer or open it in **Google Chrome** or **Microsoft Edge**.

### Option 2: Local Server Launch
Double-click `start.bat` or run in PowerShell:
```powershell
.\launch.ps1
```
This opens the app at `http://localhost:5173/`.

---

## 💡 How to Demo to SIH Judges (2-Minute Walkthrough)

When presenting to evaluators, click the **"▶ Quick Demo"** button on the top-right header, or follow this simple narrative:

1. **Step 1: The Learner Profile (Dashboard)**
   - Show learner **Rahul Sharma (Junior Software Engineer)** aiming for **Full Stack Engineer**.
   - Point out the **Overall Competency Score** (58%) and the **Skill Gap Alert**.

2. **Step 2: Skill Diagnostic Assessment (Tab 2)**
   - Show the interactive skill proficiency sliders.
   - Explain how learners or mentors can assess current skill levels against industry benchmarks.

3. **Step 3: Skill Gap Analysis (Tab 3)**
   - Show the visual comparison bars (Current proficiency vs Target benchmark).
   - Point out the acute **35% High-Priority Deficit in Python Programming**.

4. **Step 4: AI Course Recommendations (Tab 4)**
   - Point out how the recommendation engine detected the 35% gap and automatically recommended **Python Programming & Scripting Essentials**.

5. **Step 5: Interactive Learning & Quiz (Tab 5)**
   - Open the course, show the concise curriculum notes and runnable code examples.
   - Click **"Take 5-Question Assessment Quiz"** and answer the multiple-choice questions.

6. **Step 6: Verified Certificate & Competency Update (Tab 6)**
   - Score >= 70% to trigger the **Digital Certificate of Competency** (with SIH2026 verification seal, student name, and unique ID).
   - Click **Print / Save PDF** to show the professional certificate layout.
   - Show the **Competency Shift**: Rahul's Python score jumped from **45% to 75%**, closing the gap and raising his overall readiness score!

7. **Bonus: Manager Dashboard & Knowledge Hub**
   - Switch active view to **Vikram Malhotra (Engineering Manager)** to show the department-level **Team Competency Matrix**.
   - Check the **Knowledge Hub** where team members share tips and upvote peer resources.

---

## 📁 Clean Code Structure

```
capacity-connect/
├── index.html          # Clean, semantic single-page entry point
├── css/
│   └── style.css       # Clean styling, responsive layout & printable certificate
├── js/
│   └── app.js          # Human-readable state, gap engine, quiz & certificate logic
├── backend/
│   └── app.py          # Companion FastAPI backend + SQLite DB matching Slide 3
├── start.bat           # One-click Windows runner
├── launch.ps1          # PowerShell HTTP server
└── README.md           # Project documentation and judging guide
```

---

## 🛠️ Technology Stack (Matching Slide 3)

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | Clean, responsive, zero-dependency client UI |
| **Backend** | Python + FastAPI | Clean REST API with endpoints for profiles, gaps & certs |
| **Database** | SQLite / PostgreSQL compatible | Lightweight relational database with seeded records |
| **AI / Logic** | Gap-Weighted Recommendation Engine | Automatically sequences courses by deficit severity |
| **Authentication** | Role-based (Learner & Manager Switcher) | Instant role switching for demonstration |

---

## 👥 Team Details

- **Hackathon**: Smart India Hackathon 2026 (SIH 2026)
- **Problem Statement ID**: SIH26075
- **Problem Statement**: CAPACITY CONNECT
- **Theme**: SMART EDUCATION
- **Team Name**: Hexa Brigades
