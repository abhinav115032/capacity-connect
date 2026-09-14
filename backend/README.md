# Capacity Connect - Backend API

Robust FastAPI & PostgreSQL backend for the **Capacity Connect** Digital Capacity Building & LMS portal.

## Features
- **JWT Authentication & RBAC**: Roles for `employee` and `admin` with secure bcrypt hashing.
- **Skill Gap Engine**: Dynamically calculates skill differentials against organizational benchmarks and flags priorities.
- **Course & Module Engine**: Course catalog, enrollment state machine, and progress tracking.
- **Assessment & Certification**: Automatic quiz grading, pass/fail evaluation (>= 80%), and tamper-resistant digital certificate generation.
- **Admin Analytics**: Organizational KPIs, skill gap distribution, and department progress metrics.

## Running Locally

### 1. Create Virtual Environment
```bash
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Development Server
```bash
# By default runs with SQLite for zero-config testing:
uvicorn main:app --reload --port 8000

# To use PostgreSQL, set the DATABASE_URL environment variable:
# set DATABASE_URL=postgresql://user:password@localhost:5432/capacity_connect
```

### 4. Interactive API Documentation
- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Pre-seeded Demo Accounts
- **Employee**: `alex.chen@capacity.io` / `Employee123!`
- **Admin**: `sarah.admin@capacity.io` / `Admin123!`
