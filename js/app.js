/**
 * ============================================================================
 * CAPACITY CONNECT -- DIGITAL CAPACITY BUILDING & LMS PLATFORM
 * Smart India Hackathon 2026 | Problem Statement: SIH26075 | Theme: Smart Education
 * Team: Hexa Brigades
 * 
 * Flow implemented (The Capacity Connect Loop):
 * 1. Employee / Learner Profile
 * 2. Skill Assessment & Rating Diagnostic
 * 3. Skill Gap Analysis (Current vs Target Benchmark)
 * 4. Course Recommendation Engine (Smart Gap-Matching)
 * 5. Learning & Practical Assessment (Interactive Quiz)
 * 6. Verifiable Certificate & Dynamic Competency Update
 * 7. Team Manager / Trainer Matrix
 * 8. Organizational Knowledge-Sharing Hub
 * ============================================================================
 */

// ============================================================================
// 1. DEFAULT DATASET & STATE STORAGE
// ============================================================================
const DEFAULT_APP_STATE = {
  activeRole: 'learner', // 'learner' | 'manager'
  activeTab: 'dashboard',
  currentLearnerId: 'rahul',
  activeCourseId: 'course-py-101',
  activeLessonIndex: 0,
  
  // Relatable hackathon learner profiles
  learners: {
    rahul: {
      id: 'rahul',
      name: 'Rahul Sharma',
      role: 'Junior Software Engineer',
      department: 'Product & Engineering',
      targetRole: 'Full Stack Software Engineer',
      skills: [
        { id: 'py', name: 'Python Programming', category: 'Technical', current: 45, target: 80 },
        { id: 'da', name: 'Data Analysis & SQL', category: 'Technical', current: 40, target: 75 },
        { id: 'cloud', name: 'Cloud & Docker Basics', category: 'Technical', current: 35, target: 70 },
        { id: 'web', name: 'Web Technologies (HTML/JS)', category: 'Technical', current: 70, target: 80 },
        { id: 'comm', name: 'Communication & Teamwork', category: 'Soft Skills', current: 60, target: 75 },
        { id: 'ps', name: 'Problem Solving & Logic', category: 'General', current: 65, target: 80 }
      ],
      completedCourses: [],
      certificates: []
    },
    priya: {
      id: 'priya',
      name: 'Priya Nair',
      role: 'Associate Data Analyst',
      department: 'Analytics & BI',
      targetRole: 'Senior Data Scientist',
      skills: [
        { id: 'py', name: 'Python Programming', category: 'Technical', current: 70, target: 85 },
        { id: 'da', name: 'Data Analysis & SQL', category: 'Technical', current: 55, target: 90 },
        { id: 'cloud', name: 'Cloud & Docker Basics', category: 'Technical', current: 40, target: 75 },
        { id: 'web', name: 'Web Technologies (HTML/JS)', category: 'Technical', current: 50, target: 65 },
        { id: 'comm', name: 'Communication & Teamwork', category: 'Soft Skills', current: 75, target: 85 },
        { id: 'ps', name: 'Problem Solving & Logic', category: 'General', current: 70, target: 85 }
      ],
      completedCourses: [],
      certificates: []
    }
  },

  // Course Catalog targeting specific competencies
  courses: [
    {
      id: 'course-py-101',
      title: 'Python Programming & Scripting Essentials',
      skillId: 'py',
      category: 'Technical',
      duration: '4.5 Hours',
      level: 'Beginner to Intermediate',
      instructor: 'Dr. S. K. Venkat (Hexa Brigades Technical Mentor)',
      description: 'Master core Python syntax, data structures, automation scripts, and foundational algorithmic logic.',
      modules: [
        {
          title: '1. Variables, Data Types & Conditionals',
          text: 'Python is dynamically typed. It supports integers, floats, strings, booleans, and lists. Conditionals use if-elif-else statements with indentation.',
          code: '# Example: Simple logic check\nage = 21\nif age >= 18:\n    print("Eligible for technical certification")\nelse:\n    print("Pending prerequisite modules")',
          takeaways: ['Python uses indentation instead of curly braces', 'Variables do not require explicit type declaration', 'Logical operators include and, or, and not']
        },
        {
          title: '2. Loops, Functions & Modular Code',
          text: 'Functions allow encapsulation of reusable code blocks using the def keyword. For loops iterate over iterables seamlessly.',
          code: 'def calculate_competency(scores):\n    total = sum(scores)\n    return round(total / len(scores), 1)\n\nprint(calculate_competency([80, 90, 85])) # Returns 85.0',
          takeaways: ['Functions are defined with def', 'Use return to send computed values back to caller', 'List comprehension offers concise looping']
        },
        {
          title: '3. Data Structures: Lists, Tuples & Dictionaries',
          text: 'Dictionaries store key-value pairs with O(1) average lookup. Lists are mutable ordered sequences, while tuples are immutable.',
          code: 'employee = {\n    "name": "Rahul Sharma",\n    "skills": ["Python", "HTML"],\n    "is_certified": False\n}\nprint(employee["skills"][0]) # "Python"',
          takeaways: ['Dictionaries are ideal for structured employee profiles', 'Sets guarantee element uniqueness', 'Tuples are immutable sequences']
        },
        {
          title: '4. API Handling & JSON Data Processing',
          text: 'Use the json module and REST requests to interact with backend endpoints and process organizational skill logs.',
          code: 'import json\n\npayload = \'{"skill": "Python", "score": 85}\'\ndata = json.loads(payload)\nprint(f"Verified score: {data[\'score\']}")',
          takeaways: ['json.loads() converts JSON string to Python dictionary', 'json.dumps() converts Python object to JSON string', 'Always handle network and parsing exceptions with try-except']
        }
      ],
      quiz: [
        {
          q: 'Which keyword is used to declare a function in Python?',
          options: ['function', 'def', 'func', 'define'],
          correct: 1,
          explanation: 'In Python, functions are defined using the "def" keyword followed by function name and parentheses.'
        },
        {
          q: 'What is the return type of type([]) in standard Python?',
          options: ['array', 'tuple', 'list', 'dict'],
          correct: 2,
          explanation: 'In Python, square brackets [] create a list object.'
        },
        {
          q: 'Which data structure stores unique elements without duplicate values?',
          options: ['list', 'tuple', 'dictionary', 'set'],
          correct: 3,
          explanation: 'Sets in Python only hold unique values and automatically filter duplicate items.'
        },
        {
          q: 'How do you safely catch runtime exceptions in Python?',
          options: ['try ... catch', 'try ... except', 'do ... error', 'catch ... fail'],
          correct: 1,
          explanation: 'Python uses the try ... except block syntax for exception handling.'
        },
        {
          q: 'Which standard module is used to parse JSON data in Python?',
          options: ['requests', 'parse', 'json', 'data'],
          correct: 2,
          explanation: 'The built-in json module provides loads() and dumps() to process JSON payloads.'
        }
      ]
    },
    {
      id: 'course-da-102',
      title: 'Data Analysis & SQL Querying for Developers',
      skillId: 'da',
      category: 'Technical',
      duration: '5.0 Hours',
      level: 'Intermediate',
      instructor: 'Prof. Ananya Sen (Data Systems Mentor)',
      description: 'Learn SQL relational queries, aggregate metrics, data filtering, and business capability insights.',
      modules: [
        {
          title: '1. Relational Database Concepts & SELECT Queries',
          text: 'Relational databases organize records into structured tables with primary and foreign keys.',
          code: 'SELECT name, department, competency_score \nFROM employees \nWHERE competency_score < 70 \nORDER BY competency_score ASC;',
          takeaways: ['SELECT picks specific table attributes', 'WHERE filters rows according to predicate', 'ORDER BY sorts the returned dataset']
        },
        {
          title: '2. Aggregations & GROUP BY Analysis',
          text: 'Aggregate functions (AVG, SUM, COUNT, MAX, MIN) summarize data across organizational units.',
          code: 'SELECT department, AVG(competency_score) AS avg_readiness \nFROM employees \nGROUP BY department;',
          takeaways: ['GROUP BY groups records sharing identical key values', 'HAVING filters aggregated groups', 'AVG calculates mathematical mean']
        }
      ],
      quiz: [
        {
          q: 'Which SQL clause is used to filter records based on a specific condition?',
          options: ['FILTER BY', 'WHERE', 'SORT', 'HAVING ONLY'],
          correct: 1,
          explanation: 'The WHERE clause specifies search conditions for rows returned by a query.'
        },
        {
          q: 'Which SQL function calculates the average value of a numeric column?',
          options: ['MEAN()', 'SUM()', 'AVG()', 'COUNT()'],
          correct: 2,
          explanation: 'AVG() is the standard ANSI SQL function that calculates the arithmetic average.'
        },
        {
          q: 'Which SQL statement joins rows from two tables based on a related column?',
          options: ['ATTACH', 'COMBINE', 'JOIN', 'UNION ALL'],
          correct: 2,
          explanation: 'The JOIN clause combines rows from two or more tables based on a common field.'
        }
      ]
    },
    {
      id: 'course-cloud-103',
      title: 'Cloud Computing & Docker Container Foundations',
      skillId: 'cloud',
      category: 'Technical',
      duration: '4.0 Hours',
      level: 'Beginner',
      instructor: 'Karan Mehra (DevOps Lead)',
      description: 'Understand containerization, Dockerfiles, cloud deployment patterns, and microservice infrastructure.',
      modules: [
        {
          title: '1. Containers vs Virtual Machines',
          text: 'Containers share the host OS kernel and package application code with dependencies into lightweight images.',
          code: '# Sample Dockerfile\nFROM python:3.10-slim\nWORKDIR /app\nCOPY . .\nCMD ["python", "app.py"]',
          takeaways: ['Containers boot faster and use fewer resources than VMs', 'Docker images are immutable blueprints', 'Containers ensure consistency across dev and production']
        }
      ],
      quiz: [
        {
          q: 'What is the primary benefit of containerization with Docker?',
          options: ['Replaces the CPU', 'Packages app and dependencies for consistent execution', 'Increases network latency', 'Encrypts source code only'],
          correct: 1,
          explanation: 'Docker containers package the application code alongside all dependencies for reproducible execution.'
        },
        {
          q: 'Which command builds a Docker image from a Dockerfile in current directory?',
          options: ['docker start .', 'docker make', 'docker build -t my-app .', 'docker run'],
          correct: 2,
          explanation: 'docker build -t <tag> . builds the image using instructions from the local Dockerfile.'
        }
      ]
    },
    {
      id: 'course-comm-104',
      title: 'Technical Communication & Agile Teamwork',
      skillId: 'comm',
      category: 'Soft Skills',
      duration: '3.0 Hours',
      level: 'All Levels',
      instructor: 'Sunita Rao (Agile Transformation Coach)',
      description: 'Improve stakeholder communication, sprint standups, code reviews, and structured problem framing.',
      modules: [
        {
          title: '1. Effective Standup & Async Updates',
          text: 'Concisely communicate: 1. What was completed yesterday, 2. What is planned today, 3. Any blockers requiring team assistance.',
          code: '// Standard 3-point Scrum Standup\n1. Completed: API endpoint for skill gap diagnostic\n2. Today: Integrating interactive quiz modal\n3. Blockers: None',
          takeaways: ['Keep updates outcome-focused', 'Flag blockers immediately to avoid sprint delay', 'Document decisions asynchronously']
        }
      ],
      quiz: [
        {
          q: 'What are the three core questions answered in a daily Agile standup?',
          options: ['Budget, Scope, Hiring', 'Yesterday work, Today plan, Blockers', 'Code review, Tests, Deploy', 'Salary, Hours, Vacations'],
          correct: 1,
          explanation: 'Standard daily standup focuses on: What did you do yesterday? What will you do today? Are there any blockers?'
        }
      ]
    }
  ],

  // Community Knowledge Hub posts
  knowledgePosts: [
    {
      id: 'post-1',
      author: 'Aarav Patel (Senior Developer)',
      authorRole: 'Mentor',
      title: 'Quick Tip: How to efficiently close your Python programming gap',
      content: 'When starting with Python after learning C or Java, remember that list comprehensions and standard library functions like zip() and enumerate() make your code much more readable and concise.',
      upvotes: 14,
      date: 'Yesterday'
    },
    {
      id: 'post-2',
      author: 'Neha Gupta (Cloud Associate)',
      authorRole: 'Peer Learner',
      title: 'Docker command cheatsheet for beginners',
      content: 'Remember: docker ps shows running containers, docker run -p 8080:80 maps host port to container port, and docker-compose up spins up multi-container platforms in one command!',
      upvotes: 9,
      date: '2 days ago'
    }
  ],

  // Team members for Manager View
  teamMembers: [
    { id: 'rahul', name: 'Rahul Sharma', role: 'Junior Software Engineer', readiness: 52, activeCourse: 'Python Programming Essentials', certs: 0, criticalGap: 'Python (35% gap)' },
    { id: 'priya', name: 'Priya Nair', role: 'Associate Data Analyst', readiness: 60, activeCourse: 'Data Analysis & SQL', certs: 1, criticalGap: 'SQL & Data (35% gap)' },
    { id: 'amit', name: 'Amit Verma', role: 'Full Stack Trainee', readiness: 48, activeCourse: 'Web Technologies', certs: 0, criticalGap: 'Cloud Basics (40% gap)' },
    { id: 'sneha', name: 'Sneha Kulkarni', role: 'DevOps Engineer', readiness: 82, activeCourse: 'Kubernetes Advanced', certs: 3, criticalGap: 'Communication (15% gap)' }
  ]
};

// Application State Instance (saved in localStorage for persistence)
let appState = loadState();

function loadState() {
  const saved = localStorage.getItem('capacity_connect_state_sih26');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved state, using default dataset.');
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_APP_STATE));
}

function saveState() {
  localStorage.setItem('capacity_connect_state_sih26', JSON.stringify(appState));
}

function resetAllData() {
  if (confirm('Reset prototype data back to initial Smart India Hackathon state?')) {
    localStorage.removeItem('capacity_connect_state_sih26');
    appState = JSON.parse(JSON.stringify(DEFAULT_APP_STATE));
    saveState();
    renderApp();
    showToast('Prototype state reset to default demo values.');
  }
}

// ============================================================================
// 2. DOMAIN LOGIC: SKILL GAP & AI RECOMMENDATIONS
// ============================================================================

/**
 * Step 3 in Loop: Skill Gap Calculation Engine
 * Calculates gap = max(0, targetBenchmark - currentLevel)
 * Assigns Priority: High (>=30%), Medium (>=15%), Low (<15%)
 */
function analyzeSkillGaps(skills) {
  return skills.map(skill => {
    const gap = Math.max(0, skill.target - skill.current);
    let priority = 'Low';
    let priorityClass = 'badge-low-gap';
    if (gap >= 30) {
      priority = 'High';
      priorityClass = 'badge-high-gap';
    } else if (gap >= 15) {
      priority = 'Medium';
      priorityClass = 'badge-med-gap';
    }
    return {
      ...skill,
      gap,
      priority,
      priorityClass
    };
  });
}

/**
 * Calculates current overall competency index (average of skills)
 */
function calculateOverallCompetency(skills) {
  if (!skills || skills.length === 0) return 0;
  const sum = skills.reduce((acc, s) => acc + s.current, 0);
  return Math.round(sum / skills.length);
}

/**
 * Step 4 in Loop: AI-Assisted Course Recommendation Logic
 * Matches detected capability deficits to targeted curriculum
 */
function getRecommendedCourses(learner) {
  const analyzedSkills = analyzeSkillGaps(learner.skills);
  // Find skills that need improvement (gap >= 15%)
  const deficitSkills = analyzedSkills.filter(s => s.gap >= 15);
  const deficitSkillIds = deficitSkills.map(s => s.id);

  return appState.courses.map(course => {
    const matchingDeficit = deficitSkills.find(s => s.id === course.skillId);
    const isRecommended = !!matchingDeficit;
    const reason = matchingDeficit
      ? `AI Match: Targeted to close ${matchingDeficit.name} deficit (${matchingDeficit.gap}% gap).`
      : 'Standard Curriculum: Recommended for continuous professional development.';

    const isCompleted = learner.completedCourses.includes(course.id);
    return {
      ...course,
      isRecommended,
      reason,
      isCompleted,
      deficitPriority: matchingDeficit ? matchingDeficit.priority : 'None'
    };
  }).sort((a, b) => {
    // Sort AI-recommended courses to the top
    if (a.isRecommended && !b.isRecommended) return -1;
    if (!a.isRecommended && b.isRecommended) return 1;
    return 0;
  });
}

// ============================================================================
// 3. UI RENDERING ENGINES
// ============================================================================

function getCurrentLearner() {
  return appState.learners[appState.currentLearnerId] || appState.learners.rahul;
}

function renderApp() {
  const learner = getCurrentLearner();
  const analyzedSkills = analyzeSkillGaps(learner.skills);
  const overallScore = calculateOverallCompetency(learner.skills);
  const highGapsCount = analyzedSkills.filter(s => s.gap >= 30).length;

  // Update Top Nav Learner details
  const roleSelect = document.getElementById('role-select');
  if (roleSelect) {
    roleSelect.value = appState.activeRole === 'manager' ? 'manager' : appState.currentLearnerId;
  }

  // Render Loop Indicator active state
  renderLoopIndicators();

  // Render Active Tab Content
  if (appState.activeRole === 'manager') {
    renderManagerDashboard();
    return;
  }

  switch (appState.activeTab) {
    case 'dashboard':
      renderDashboardTab(learner, analyzedSkills, overallScore, highGapsCount);
      break;
    case 'assessment':
      renderAssessmentTab(learner);
      break;
    case 'gap-analysis':
      renderGapAnalysisTab(analyzedSkills, overallScore);
      break;
    case 'roadmap':
      renderRoadmapTab(learner);
      break;
    case 'courses':
      renderCoursesTab(learner);
      break;
    case 'learning':
      renderLearningTab();
      break;
    case 'certificates':
      renderCertificatesTab(learner);
      break;
    case 'hub':
      renderKnowledgeHubTab();
      break;
    default:
      renderDashboardTab(learner, analyzedSkills, overallScore, highGapsCount);
  }
}

function switchTab(tabId) {
  appState.activeTab = tabId;
  if (appState.activeRole === 'manager' && tabId !== 'manager') {
    appState.activeRole = 'learner';
  }
  
  // Highlight tab button
  document.querySelectorAll('.nav-tab').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-tab') === tabId);
  });

  // Highlight tab panel
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabId}`);
  });

  renderApp();
}

function renderLoopIndicators() {
  const stepMap = {
    'dashboard': 1,
    'assessment': 2,
    'gap-analysis': 3,
    'roadmap': 4,
    'courses': 4,
    'learning': 5,
    'certificates': 6
  };
  const activeStep = stepMap[appState.activeTab] || 1;
  document.querySelectorAll('.loop-step').forEach(step => {
    const stepNum = parseInt(step.getAttribute('data-step'), 10);
    step.classList.toggle('active', stepNum === activeStep);
  });
}

// ----------------------------------------------------------------------------
// TAB 1: DASHBOARD
// ----------------------------------------------------------------------------
function renderDashboardTab(learner, analyzedSkills, overallScore, highGapsCount) {
  const container = document.getElementById('tab-dashboard');
  if (!container) return;

  const topGap = analyzedSkills.sort((a, b) => b.gap - a.gap)[0];

  container.innerHTML = `
    <!-- Top Welcome & Alert -->
    <div class="card" style="background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%); color: #ffffff;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.85;">
            Capacity Connect Portal | Smart Education Track
          </div>
          <h2 style="font-size: 24px; font-weight: 800; margin-top: 4px;">Welcome back, ${learner.name}!</h2>
          <p style="font-size: 14px; opacity: 0.9; margin-top: 4px;">
            Current Role: <strong>${learner.role}</strong> | Target Role: <strong>${learner.targetRole}</strong>
          </p>
        </div>
        <button class="btn-demo-tour" onclick="startGuidedDemo()" style="background: #ffffff; color: #1e3a8a; font-weight: 800; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
          Start 60-Sec Demo Walkthrough
        </button>
      </div>
    </div>

    <!-- Alert if critical gaps exist -->
    ${highGapsCount > 0 ? `
      <div class="alert-banner alert-warning">
        <div class="alert-content">
          <span style="font-size: 20px; font-weight: bold;">[!]</span>
          <div>
            <div class="alert-title">Skill Gap Diagnostic Alert: ${highGapsCount} High-Priority Gaps Detected</div>
            <div class="alert-desc">Your largest capability deficit is in <strong>${topGap.name}</strong> (${topGap.gap}% gap). Complete recommended modules to raise competency.</div>
          </div>
        </div>
        <button class="btn-primary" style="width: auto; padding: 6px 14px; font-size: 12px;" onclick="switchTab('courses')">
          View Recommended Course &rarr;
        </button>
      </div>
    ` : `
      <div class="alert-banner alert-info">
        <div class="alert-content">
          <span style="font-size: 20px; font-weight: bold;">[OK]</span>
          <div>
            <div class="alert-title">Competency Framework Benchmark Achieved!</div>
            <div class="alert-desc">All evaluated skills are currently aligned with the target role requirements. Keep learning!</div>
          </div>
        </div>
      </div>
    `}

    <!-- 4 KPI Metrics -->
    <div class="grid-4" style="margin-bottom: 24px;">
      <div class="kpi-card">
        <div class="kpi-icon-wrap kpi-blue">%</div>
        <div class="kpi-info">
          <h4>Overall Competency</h4>
          <div class="kpi-value">${overallScore}%</div>
          <div class="kpi-sub">Target Benchmark: 80%</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrap kpi-rose">GAP</div>
        <div class="kpi-info">
          <h4>Open Skill Gaps</h4>
          <div class="kpi-value">${analyzedSkills.filter(s => s.gap > 0).length}</div>
          <div class="kpi-sub">${highGapsCount} marked High Priority</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrap kpi-amber">LMS</div>
        <div class="kpi-info">
          <h4>Enrolled Courses</h4>
          <div class="kpi-value">1</div>
          <div class="kpi-sub">In-progress module active</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrap kpi-emerald">CERT</div>
        <div class="kpi-info">
          <h4>Certificates Earned</h4>
          <div class="kpi-value">${learner.certificates.length}</div>
          <div class="kpi-sub">Digitally verified credential</div>
        </div>
      </div>
    </div>

    <!-- Quick 2-Column Summary -->
    <div class="grid-2">
      <!-- Left Column: Priority Gap Summary -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Immediate Capability Gaps</div>
            <div class="card-desc">Calculated against benchmark for ${learner.targetRole}</div>
          </div>
          <button class="btn-primary" style="width: auto; padding: 6px 12px; font-size: 12px;" onclick="switchTab('gap-analysis')">
            Full Analysis &rarr;
          </button>
        </div>
        <div>
          ${analyzedSkills.slice(0, 3).map(skill => `
            <div style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
              <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; margin-bottom: 4px;">
                <span>${skill.name}</span>
                <span class="badge ${skill.priorityClass}">${skill.gap}% Gap (${skill.priority})</span>
              </div>
              <div class="progress-track" style="margin-bottom: 0;">
                <div class="progress-fill-current" style="width: ${skill.current}%;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11px; color: #64748b; margin-top: 2px;">
                <span>Current: ${skill.current}%</span>
                <span>Target Benchmark: ${skill.target}%</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right Column: The 6-Step Loop Info -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">The Capacity Connect Loop</div>
            <div class="card-desc">How this platform transforms learner skills</div>
          </div>
        </div>
        <div style="font-size: 13px; color: #334155; line-height: 1.7;">
          <div style="display: flex; gap: 10px; margin-bottom: 10px;">
            <div class="step-num" style="background: #1e40af; color: #fff;">1</div>
            <div><strong>Profile &amp; Skills:</strong> Benchmarks learner role against competencies.</div>
          </div>
          <div style="display: flex; gap: 10px; margin-bottom: 10px;">
            <div class="step-num" style="background: #1e40af; color: #fff;">2</div>
            <div><strong>Diagnostic Assessment:</strong> Evaluates current proficiency levels.</div>
          </div>
          <div style="display: flex; gap: 10px; margin-bottom: 10px;">
            <div class="step-num" style="background: #1e40af; color: #fff;">3</div>
            <div><strong>Skill Gap Analysis:</strong> Highlights high-priority deficits.</div>
          </div>
          <div style="display: flex; gap: 10px; margin-bottom: 10px;">
            <div class="step-num" style="background: #1e40af; color: #fff;">4</div>
            <div><strong>Course Recommendation:</strong> AI logic prescribes target learning.</div>
          </div>
          <div style="display: flex; gap: 10px; margin-bottom: 10px;">
            <div class="step-num" style="background: #1e40af; color: #fff;">5</div>
            <div><strong>Interactive Quiz:</strong> Live 5-question evaluation with instant grading.</div>
          </div>
          <div style="display: flex; gap: 10px;">
            <div class="step-num" style="background: #059669; color: #fff;">6</div>
            <div><strong>Certificate &amp; Competency Upgrade:</strong> Updates proficiency and closes gap!</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// TAB 2: SKILL DIAGNOSTIC & SELF-ASSESSMENT
// ----------------------------------------------------------------------------
function renderAssessmentTab(learner) {
  const container = document.getElementById('tab-assessment');
  if (!container) return;

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Skill Assessment &amp; Proficiency Sliders</div>
          <div class="card-desc">Adjust current skill proficiency to simulate real-world diagnostic evaluation.</div>
        </div>
        <button class="btn-primary" style="width: auto; padding: 6px 14px;" onclick="saveSkillAssessment()">
          Save Assessment &amp; Update Gaps
        </button>
      </div>

      <div style="margin-bottom: 16px; font-size: 13px; color: #64748b; background: #f1f5f9; padding: 12px; border-radius: 8px;">
        <strong>Hackathon Demo Tip:</strong> You can drag the sliders below (e.g. increase Python to 80% or drop Data Analysis to 30%) and click <strong>Save</strong> to observe the live impact on the Gap Analysis and Course Recommendations!
      </div>

      <div id="skills-slider-list">
        ${learner.skills.map(skill => `
          <div class="skill-item-row">
            <div class="skill-header">
              <div>
                <span class="skill-name">${skill.name}</span>
                <span class="badge ${skill.category === 'Technical' ? 'badge-tech' : 'badge-soft'}" style="margin-left: 8px;">
                  ${skill.category}
                </span>
              </div>
              <div style="font-size: 12px; color: #64748b;">
                Target Benchmark: <strong>${skill.target}%</strong>
              </div>
            </div>
            <div class="slider-container">
              <input 
                type="range" 
                min="10" 
                max="100" 
                value="${skill.current}" 
                id="slider-${skill.id}"
                oninput="document.getElementById('val-${skill.id}').innerText = this.value + '%'"
              />
              <span class="slider-val" id="val-${skill.id}">${skill.current}%</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px;">
        <button class="btn-reset" style="color: #334155; border-color: #cbd5e1;" onclick="renderAssessmentTab(getCurrentLearner())">
          Reset Changes
        </button>
        <button class="btn-primary" style="width: auto; padding: 10px 20px;" onclick="saveSkillAssessment()">
          Save Assessment &amp; Update Gaps &rarr;
        </button>
      </div>
    </div>
  `;
}

function saveSkillAssessment() {
  const learner = getCurrentLearner();
  learner.skills.forEach(skill => {
    const slider = document.getElementById(`slider-${skill.id}`);
    if (slider) {
      skill.current = parseInt(slider.value, 10);
    }
  });
  saveState();
  showToast('Assessment ratings updated! Skill Gaps re-calculated.');
  switchTab('gap-analysis');
}

// ----------------------------------------------------------------------------
// TAB 3: SKILL GAP ANALYSIS
// ----------------------------------------------------------------------------
function renderGapAnalysisTab(analyzedSkills, overallScore) {
  const container = document.getElementById('tab-gap-analysis');
  if (!container) return;

  const learner = getCurrentLearner();
  const highGaps = analyzedSkills.filter(s => s.gap >= 30);

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Capability Deficit &amp; Skill Gap Matrix</div>
          <div class="card-desc">Comparing current capability levels against target role requirements: <strong>${learner.targetRole}</strong></div>
        </div>
        <button class="btn-primary" style="width: auto; padding: 8px 16px;" onclick="switchTab('courses')">
          View Recommended Courses &rarr;
        </button>
      </div>

      <!-- AI Gap Summary Box -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 20px;">
        <div style="font-size: 13px; font-weight: 700; color: #1e3a8a; margin-bottom: 4px;">
          AI Diagnostic Insight:
        </div>
        <p style="font-size: 13px; color: #334155; line-height: 1.6;">
          Learner <strong>${learner.name}</strong> displays strong foundational problem solving (65%), but exhibits critical capability deficits in 
          <strong>${highGaps.map(g => g.name + ' (' + g.gap + '% gap)').join(', ')}</strong>. 
          To satisfy the competency threshold for <strong>${learner.targetRole}</strong>, targeted completion of technical curriculum is strongly advised.
        </p>
      </div>

      <!-- Gap Breakdown Cards -->
      <div class="grid-2">
        <div>
          <h4 style="font-size: 14px; font-weight: 800; margin-bottom: 12px; color: #0f172a;">
            Detailed Gap Metrics
          </h4>
          ${analyzedSkills.map(skill => `
            <div class="gap-item">
              <div class="gap-top">
                <span class="gap-title">${skill.name}</span>
                <span class="badge ${skill.priorityClass}">${skill.gap}% Deficit (${skill.priority} Priority)</span>
              </div>
              <div class="gap-bars-wrapper">
                <div class="gap-bar-label">
                  <span>Current Level: <strong>${skill.current}%</strong></span>
                  <span>Target Benchmark: <strong>${skill.target}%</strong></span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill-current" style="width: ${skill.current}%;"></div>
                </div>
              </div>
              <div class="gap-indicator-text">
                <span style="color: ${skill.gap > 0 ? '#dc2626' : '#16a34a'};">
                  ${skill.gap > 0 ? `Needs +${skill.gap}% proficiency boost` : 'Competency benchmark satisfied'}
                </span>
                <button style="background: none; border: none; color: #1e40af; font-size: 12px; font-weight: 700; cursor: pointer;" onclick="openCourseForSkill('${skill.id}')">
                  Target Course &rarr;
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Capability Benchmark Overview -->
        <div>
          <h4 style="font-size: 14px; font-weight: 800; margin-bottom: 12px; color: #0f172a;">
            Role Readiness Summary
          </h4>
          <div class="card" style="margin-bottom: 16px; background: #eff6ff; border-color: #bfdbfe;">
            <div style="font-size: 13px; font-weight: 700; color: #1e3a8a;">Role Alignment Index</div>
            <div style="font-size: 32px; font-weight: 900; color: #1e40af; margin: 6px 0;">${overallScore}%</div>
            <div style="font-size: 12px; color: #3b82f6;">Required for Role Certification: 80%</div>
            <div class="progress-track" style="background: #dbeafe; margin-top: 10px;">
              <div class="progress-fill-current" style="width: ${overallScore}%; background: #2563eb;"></div>
            </div>
          </div>

          <div class="card">
            <h5 style="font-size: 13px; font-weight: 700; margin-bottom: 8px;">Action Plan Generated by System:</h5>
            <ul style="padding-left: 18px; font-size: 13px; color: #334155; line-height: 1.7;">
              <li>Complete <strong>Python Programming &amp; Scripting</strong> assessment to close the 35% programming deficit.</li>
              <li>Undertake practical SQL queries in <strong>Data Analysis &amp; SQL Fundamentals</strong>.</li>
              <li>Re-assess proficiency after receiving Digital Verification Certificate.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

function openCourseForSkill(skillId) {
  const matchingCourse = appState.courses.find(c => c.skillId === skillId);
  if (matchingCourse) {
    appState.activeCourseId = matchingCourse.id;
    appState.activeLessonIndex = 0;
    switchTab('learning');
  } else {
    switchTab('courses');
  }
}

// ----------------------------------------------------------------------------
// TAB 4: AI COURSE RECOMMENDATIONS
// ----------------------------------------------------------------------------
function renderCoursesTab(learner) {
  const container = document.getElementById('tab-courses');
  if (!container) return;

  const coursesWithRec = getRecommendedCourses(learner);

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">AI-Assisted Course Recommendations</div>
          <div class="card-desc">Curriculum sequenced automatically based on your highest skill gaps.</div>
        </div>
        <div style="font-size: 12px; color: #64748b;">
          Algorithm: <strong>Gap-Weighted Competency Matcher</strong>
        </div>
      </div>

      <div class="grid-2">
        ${coursesWithRec.map(course => `
          <div class="course-card">
            <div class="course-card-header">
              ${course.isRecommended ? `<span class="course-ai-badge">AI Recommended</span>` : ''}
              <div class="course-category">${course.category} | ${course.duration}</div>
              <div class="course-title">${course.title}</div>
            </div>
            <div class="course-body">
              <div style="font-size: 12px; font-weight: 700; color: #0d9488; margin-bottom: 8px; background: #f0fdfa; padding: 6px 10px; border-radius: 6px;">
                ${course.reason}
              </div>
              <div class="course-desc">${course.description}</div>
              <div class="course-meta-row">
                <span>Instructor: <strong>${course.instructor}</strong></span>
                <span>Level: <strong>${course.level}</strong></span>
              </div>
              ${course.isCompleted ? `
                <div style="background: #ecfdf5; color: #065f46; font-size: 12px; font-weight: 700; padding: 8px; border-radius: 6px; text-align: center; margin-bottom: 10px;">
                  [OK] Course Completed &amp; Certificate Issued
                </div>
              ` : ''}
            </div>
            <div class="course-footer">
              <button 
                class="${course.isCompleted ? 'btn-success' : 'btn-primary'}" 
                onclick="startCourse('${course.id}')"
              >
                ${course.isCompleted ? 'Review Modules &amp; Quiz &rarr;' : 'Start Learning &amp; Take Quiz &rarr;'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function startCourse(courseId) {
  appState.activeCourseId = courseId;
  appState.activeLessonIndex = 0;
  switchTab('learning');
}

// ----------------------------------------------------------------------------
// TAB 5: COURSE LEARNING & QUIZ PLAYER
// ----------------------------------------------------------------------------
function renderLearningTab() {
  const container = document.getElementById('tab-learning');
  if (!container) return;

  const course = appState.courses.find(c => c.id === appState.activeCourseId) || appState.courses[0];
  const activeModule = course.modules[appState.activeLessonIndex] || course.modules[0];
  const learner = getCurrentLearner();
  const isCompleted = learner.completedCourses.includes(course.id);

  container.innerHTML = `
    <div class="card" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <span class="badge badge-tech">${course.category}</span>
          <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px;">${course.title}</h2>
          <p style="font-size: 13px; color: #64748b;">Instructor: ${course.instructor} | Duration: ${course.duration}</p>
        </div>
        <button class="btn-success" style="width: auto; padding: 8px 18px;" onclick="openQuizModal('${course.id}')">
          Take 5-Question Assessment Quiz &rarr;
        </button>
      </div>
    </div>

    <div class="learning-layout">
      <!-- Left Sidebar: Modules List -->
      <div>
        <h4 style="font-size: 13px; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 8px;">
          Course Curriculum
        </h4>
        <ul class="module-nav-list">
          ${course.modules.map((m, idx) => `
            <li 
              class="module-nav-item ${idx === appState.activeLessonIndex ? 'active' : ''}" 
              onclick="selectLesson(${idx})"
            >
              <span>${m.title}</span>
              ${isCompleted ? '<span class="module-status-check">[OK]</span>' : ''}
            </li>
          `).join('')}
          <li 
            class="module-nav-item" 
            style="background: #eff6ff; border-color: #93c5fd; color: #1e40af; font-weight: 700;"
            onclick="openQuizModal('${course.id}')"
          >
            <span>Final Assessment Quiz</span>
            <span>&rarr;</span>
          </li>
        </ul>
      </div>

      <!-- Right Area: Lesson Content -->
      <div class="lesson-content-body">
        <div class="lesson-title">${activeModule.title}</div>
        <div class="lesson-text">${activeModule.text}</div>

        ${activeModule.code ? `
          <div style="font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 4px;">Interactive Code Example:</div>
          <div class="code-box">${escapeHtml(activeModule.code)}</div>
        ` : ''}

        ${activeModule.takeaways ? `
          <div class="key-takeaways">
            <h4>Key Competency Takeaways:</h4>
            <ul>
              ${activeModule.takeaways.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
          <button 
            class="btn-reset" 
            style="color: #334155;" 
            ${appState.activeLessonIndex === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''} 
            onclick="selectLesson(${appState.activeLessonIndex - 1})"
          >
            &larr; Previous Module
          </button>
          
          ${appState.activeLessonIndex < course.modules.length - 1 ? `
            <button class="btn-primary" style="width: auto; padding: 8px 18px;" onclick="selectLesson(${appState.activeLessonIndex + 1})">
              Next Module &rarr;
            </button>
          ` : `
            <button class="btn-success" style="width: auto; padding: 8px 18px;" onclick="openQuizModal('${course.id}')">
              Take Final Assessment Quiz &rarr;
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}

function selectLesson(index) {
  appState.activeLessonIndex = index;
  renderLearningTab();
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ----------------------------------------------------------------------------
// INTERACTIVE ASSESSMENT QUIZ MODAL
// ----------------------------------------------------------------------------
function openQuizModal(courseId) {
  const course = appState.courses.find(c => c.id === courseId) || appState.courses[0];
  const modal = document.getElementById('quiz-modal');
  const body = document.getElementById('quiz-modal-body');
  const title = document.getElementById('quiz-modal-title');

  title.innerText = `Skill Assessment: ${course.title}`;
  
  body.innerHTML = `
    <div style="margin-bottom: 16px; font-size: 13px; color: #64748b;">
      Passing threshold is <strong>70%</strong>. Achieving passing grade will automatically upgrade your competency rating and generate your digital certificate.
    </div>
    <form id="quiz-form">
      ${course.quiz.map((item, qIdx) => `
        <div class="quiz-question-box">
          <div class="quiz-q-num">Question ${qIdx + 1} of ${course.quiz.length}</div>
          <div class="quiz-q-title">${item.q}</div>
          <div class="quiz-options">
            ${item.options.map((opt, optIdx) => `
              <label class="quiz-opt-label">
                <input type="radio" name="q_${qIdx}" value="${optIdx}" required />
                <span>${opt}</span>
              </label>
            `).join('')}
          </div>
          <div class="quiz-feedback" id="feedback-${qIdx}"></div>
        </div>
      `).join('')}
    </form>
    <div id="quiz-final-result" style="display: none; padding: 16px; border-radius: 8px; margin-top: 16px;"></div>
  `;

  modal.classList.add('active');
}

function closeQuizModal() {
  const modal = document.getElementById('quiz-modal');
  modal.classList.remove('active');
}

function submitQuizAnswers() {
  const course = appState.courses.find(c => c.id === appState.activeCourseId) || appState.courses[0];
  const form = document.getElementById('quiz-form');
  const formData = new FormData(form);

  let correctCount = 0;
  const total = course.quiz.length;

  course.quiz.forEach((item, qIdx) => {
    const selected = formData.get(`q_${qIdx}`);
    const feedbackBox = document.getElementById(`feedback-${qIdx}`);
    if (feedbackBox) {
      if (selected !== null && parseInt(selected, 10) === item.correct) {
        correctCount++;
        feedbackBox.className = 'quiz-feedback pass';
        feedbackBox.innerHTML = `[OK] Correct! ${item.explanation}`;
      } else {
        feedbackBox.className = 'quiz-feedback fail';
        feedbackBox.innerHTML = `[X] Incorrect. ${item.explanation}`;
      }
    }
  });

  const percentage = Math.round((correctCount / total) * 100);
  const resultBox = document.getElementById(`quiz-final-result`);
  resultBox.style.display = 'block';

  if (percentage >= 70) {
    resultBox.style.background = '#ecfdf5';
    resultBox.style.border = '1px solid #a7f3d0';
    resultBox.style.color = '#065f46';
    resultBox.innerHTML = `
      <div style="font-size: 16px; font-weight: 800;">Assessment Passed! Score: ${percentage}% (${correctCount}/${total})</div>
      <p style="font-size: 13px; margin: 6px 0;">
        Outstanding work! Your competency rating has been automatically upgraded (+30% proficiency boost in ${course.title}), and your verified Digital Certificate has been generated!
      </p>
      <button class="btn-primary" style="width: auto; margin-top: 8px; padding: 8px 16px;" onclick="closeQuizModal(); switchTab('certificates');">
        View Your Digital Certificate &rarr;
      </button>
    `;

    // Execute Step 6: Update Competency & Issue Certificate
    grantCompetencyUpgrade(course);
  } else {
    resultBox.style.background = '#fef2f2';
    resultBox.style.border = '1px solid #fecaca';
    resultBox.style.color = '#991b1b';
    resultBox.innerHTML = `
      <div style="font-size: 16px; font-weight: 800;">Score: ${percentage}% (${correctCount}/${total}) - Passing grade is 70%</div>
      <p style="font-size: 13px; margin: 6px 0;">
        Review the lesson explanations above and retry the quiz to claim your credential and close the gap.
      </p>
    `;
  }
}

/**
 * Step 6 in Loop: Automatic Competency Upgrade & Certificate Generation
 */
function grantCompetencyUpgrade(course) {
  const learner = getCurrentLearner();

  // 1. Mark course completed if not already
  if (!learner.completedCourses.includes(course.id)) {
    learner.completedCourses.push(course.id);
  }

  // 2. Upgrade the matching skill (e.g. +30% boost)
  const targetSkill = learner.skills.find(s => s.id === course.skillId);
  if (targetSkill) {
    const previousScore = targetSkill.current;
    targetSkill.current = Math.min(100, targetSkill.current + 30);
    showToast(`Skill Upgraded: ${targetSkill.name} rose from ${previousScore}% to ${targetSkill.current}%!`);
  }

  // 3. Generate verifiable certificate if not already issued
  const existingCert = learner.certificates.find(c => c.courseId === course.id);
  if (!existingCert) {
    const certId = `SIH26-HEXA-${Math.floor(10000 + Math.random() * 90000)}`;
    learner.certificates.push({
      id: certId,
      courseId: course.id,
      courseTitle: course.title,
      skillName: targetSkill ? targetSkill.name : 'Technical Capability',
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      instructor: course.instructor
    });
  }

  saveState();
}

// ----------------------------------------------------------------------------
// TAB 6: CERTIFICATES & COMPETENCY EVOLUTION
// ----------------------------------------------------------------------------
function renderCertificatesTab(learner) {
  const container = document.getElementById('tab-certificates');
  if (!container) return;

  const certs = learner.certificates;

  if (certs.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 40px;">
        <div style="font-size: 32px; font-weight: bold; color: #1e3a8a; margin-bottom: 12px;">[CERTIFICATE]</div>
        <h3 style="font-size: 18px; font-weight: 800; color: #0f172a;">No Certificates Issued Yet</h3>
        <p style="font-size: 14px; color: #64748b; max-width: 480px; margin: 8px auto 20px auto;">
          Pass the 5-question assessment in any recommended course (score &gt;= 70%) to earn your verified Digital Certificate and upgrade your competency score!
        </p>
        <button class="btn-primary" style="width: auto; margin: 0 auto;" onclick="switchTab('courses')">
          Browse Courses &amp; Take Quiz &rarr;
        </button>
      </div>
    `;
    return;
  }

  const latestCert = certs[certs.length - 1];

  container.innerHTML = `
    <div class="card no-print">
      <div class="card-header">
        <div>
          <div class="card-title">Digital Certificate of Competency</div>
          <div class="card-desc">Verified digital credential issued under the Smart India Hackathon 2026 Framework.</div>
        </div>
        <button class="btn-primary" style="width: auto; padding: 8px 18px;" onclick="window.print()">
          Print / Save PDF
        </button>
      </div>
    </div>

    <!-- Official Verifiable Certificate Layout -->
    <div class="certificate-container">
      <div class="cert-badge-ribbon">SMART INDIA HACKATHON 2026 | CAPACITY CONNECT</div>
      <div class="cert-header">
        <h2>Certificate of Competency</h2>
        <div class="cert-subtitle">Official Verification &amp; Credential Record</div>
      </div>

      <div class="cert-recipient-label">This is proudly presented to</div>
      <div class="cert-recipient-name">${learner.name}</div>

      <div class="cert-body-text">
        for successfully completing the rigorous competency assessment and mastery evaluation for
        <br>
        <span class="cert-course-name">${latestCert.courseTitle}</span>
        <br>
        demonstrating advanced proficiency in <strong>${latestCert.skillName}</strong>.
      </div>

      <div class="cert-meta-row">
        <div class="cert-signature">
          <div class="cert-sig-line">Dr. S. K. Venkat</div>
          <div class="cert-sig-title">Technical Mentor, Hexa Brigades</div>
        </div>

        <div class="cert-seal">
          SIH2026<br>VERIFIED
        </div>

        <div class="cert-signature">
          <div style="font-size: 13px; font-weight: 700; color: #1e3a8a; margin-bottom: 2px;">
            ${latestCert.issueDate}
          </div>
          <div class="cert-sig-title">Issue Date</div>
          <div style="font-size: 11px; font-family: monospace; color: #64748b; margin-top: 4px;">
            ID: ${latestCert.id}
          </div>
        </div>
      </div>
    </div>

    <!-- Competency Evolution Before vs After -->
    <div class="card no-print" style="margin-top: 24px;">
      <div class="card-title" style="margin-bottom: 8px;">Competency Evolution (The Closed Loop)</div>
      <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">
        Notice how completing the module and passing the assessment directly increased your proficiency and eliminated the capability gap!
      </p>
      <div class="grid-3">
        <div style="padding: 12px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">1. Initial Assessment</div>
          <div style="font-size: 18px; font-weight: 800; color: #dc2626;">45% Level (35% Gap)</div>
        </div>
        <div style="padding: 12px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">2. Learning &amp; Quiz</div>
          <div style="font-size: 18px; font-weight: 800; color: #0284c7;">Passed (Score &gt;= 70%)</div>
        </div>
        <div style="padding: 12px; background: #ecfdf5; border-radius: 8px; border: 1px solid #a7f3d0;">
          <div style="font-size: 11px; font-weight: 700; color: #065f46; text-transform: uppercase;">3. Upgraded Competency</div>
          <div style="font-size: 18px; font-weight: 800; color: #059669;">75% Level (Gap Closed!)</div>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// TAB 7: MANAGER / TEAM MATRIX DASHBOARD
// ----------------------------------------------------------------------------
function renderManagerDashboard() {
  const container = document.getElementById('tab-manager');
  if (!container) return;

  // Make sure manager tab is visible
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  container.classList.add('active');

  const members = appState.teamMembers;
  const avgReadiness = Math.round(members.reduce((acc, m) => acc + m.readiness, 0) / members.length);

  container.innerHTML = `
    <div class="card" style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: #ffffff;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <span class="sih-tag">Enterprise Admin &amp; Trainer View</span>
          <h2 style="font-size: 24px; font-weight: 800; margin-top: 4px;">Vikram Malhotra (Engineering Manager)</h2>
          <p style="font-size: 13px; opacity: 0.85;">Scope: Product &amp; Engineering Division | Team Competency Oversight</p>
        </div>
        <button class="btn-demo-tour" onclick="switchToLearner('rahul')" style="background: #ffffff; color: #0f172a;">
          Switch Back to Learner View &rarr;
        </button>
      </div>
    </div>

    <!-- Manager KPI Stats -->
    <div class="grid-4" style="margin-bottom: 20px;">
      <div class="kpi-card">
        <div class="kpi-icon-wrap kpi-blue">TEAM</div>
        <div class="kpi-info">
          <h4>Team Size</h4>
          <div class="kpi-value">${members.length}</div>
          <div class="kpi-sub">Direct reporting engineers</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrap kpi-emerald">%</div>
        <div class="kpi-info">
          <h4>Avg Team Readiness</h4>
          <div class="kpi-value">${avgReadiness}%</div>
          <div class="kpi-sub">Benchmark Target: 75%</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrap kpi-rose">GAP</div>
        <div class="kpi-info">
          <h4>Critical Gaps</h4>
          <div class="kpi-value">3</div>
          <div class="kpi-sub">Concentrated in Cloud &amp; SQL</div>
        </div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon-wrap kpi-amber">CERT</div>
        <div class="kpi-info">
          <h4>Issued Certifications</h4>
          <div class="kpi-value">4</div>
          <div class="kpi-sub">Verified internal credentials</div>
        </div>
      </div>
    </div>

    <!-- Team Competency Matrix Table -->
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Team Competency Matrix &amp; Skill Diagnostic Roster</div>
          <div class="card-desc">Tracks skill gaps, assigned learning, and certification status per employee.</div>
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table class="team-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Role Readiness</th>
              <th>Priority Skill Gap</th>
              <th>Active Learning</th>
              <th>Certificates</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${members.map(m => `
              <tr>
                <td><strong>${m.name}</strong></td>
                <td>${m.role}</td>
                <td>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-weight: 700;">${m.readiness}%</span>
                    <div class="progress-track" style="width: 80px; margin-bottom: 0;">
                      <div class="progress-fill-current" style="width: ${m.readiness}%;"></div>
                    </div>
                  </div>
                </td>
                <td><span class="badge badge-high-gap">${m.criticalGap}</span></td>
                <td>${m.activeCourse}</td>
                <td><span class="badge badge-tech">${m.certs} Certified</span></td>
                <td>
                  <button class="btn-primary" style="width: auto; padding: 4px 10px; font-size: 11px;" onclick="switchToLearner('${m.id}')">
                    Inspect Profile
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function switchToLearner(learnerId) {
  appState.activeRole = 'learner';
  appState.currentLearnerId = learnerId;
  appState.activeTab = 'dashboard';
  saveState();
  renderApp();
  showToast(`Switched view to learner: ${getCurrentLearner().name}`);
}

// ----------------------------------------------------------------------------
// TAB 8: KNOWLEDGE-SHARING HUB
// ----------------------------------------------------------------------------
function renderKnowledgeHubTab() {
  const container = document.getElementById('tab-hub');
  if (!container) return;

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Organizational Knowledge-Sharing Hub</div>
          <div class="card-desc">Peer-to-peer learning, quick reference cheatsheets, and mentor recommendations.</div>
        </div>
      </div>

      <!-- Post a Tip Box -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 20px;">
        <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px; color: #1e3a8a;">
          Share a Quick Tip or Resource
        </h4>
        <input 
          type="text" 
          id="hub-new-title" 
          placeholder="Topic / Title (e.g. Useful Python snippet for file handling)" 
          style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; margin-bottom: 8px;"
        />
        <textarea 
          id="hub-new-content" 
          rows="3" 
          placeholder="Write your explanation or code tip here..."
          style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; margin-bottom: 8px;"
        ></textarea>
        <button class="btn-primary" style="width: auto; padding: 8px 18px;" onclick="postKnowledgeTip()">
          Post to Knowledge Hub &rarr;
        </button>
      </div>

      <!-- Posts Stream -->
      <div id="hub-posts-list">
        ${appState.knowledgePosts.map((post, idx) => `
          <div class="hub-post">
            <div class="hub-post-header">
              <div class="hub-author">
                <span>${post.author}</span>
                <span class="badge badge-tech">${post.authorRole}</span>
              </div>
              <div class="hub-author-tag">${post.date}</div>
            </div>
            <div class="hub-post-title">${post.title}</div>
            <div class="hub-post-body">${post.content}</div>
            <div class="hub-actions">
              <button class="hub-upvote-btn" onclick="upvotePost(${idx})">
                Upvote <span>(${post.upvotes})</span>
              </button>
              <span>Helpful Discussion</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function postKnowledgeTip() {
  const titleInput = document.getElementById('hub-new-title');
  const contentInput = document.getElementById('hub-new-content');
  if (!titleInput.value.trim() || !contentInput.value.trim()) {
    alert('Please enter both a title and content for your tip.');
    return;
  }

  const learner = getCurrentLearner();
  appState.knowledgePosts.unshift({
    id: `post-${Date.now()}`,
    author: `${learner.name} (${learner.role})`,
    authorRole: 'Peer Learner',
    title: titleInput.value.trim(),
    content: contentInput.value.trim(),
    upvotes: 1,
    date: 'Just now'
  });

  saveState();
  renderKnowledgeHubTab();
  showToast('Knowledge tip published to the community hub!');
}

function upvotePost(index) {
  if (appState.knowledgePosts[index]) {
    appState.knowledgePosts[index].upvotes += 1;
    saveState();
    renderKnowledgeHubTab();
  }
}

// ============================================================================
// 4. GUIDED DEMO TOUR (FOR HACKATHON EVALUATION)
// ============================================================================
function startGuidedDemo() {
  showToast('Step 1: Inspecting Rahul\'s Profile & identified skill gaps...');
  switchTab('gap-analysis');
  
  setTimeout(() => {
    showToast('Step 2: AI automatically matches Python gap to Course 101...');
    switchTab('courses');
  }, 3500);

  setTimeout(() => {
    showToast('Step 3: Opening learning player & module assessment quiz...');
    startCourse('course-py-101');
    setTimeout(() => {
      openQuizModal('course-py-101');
    }, 1000);
  }, 7000);
}

// ============================================================================
// 5. TOAST NOTIFICATION UTILITY
// ============================================================================
let toastTimer = null;
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>[*]</span> <span>${message}</span>`;
  toast.classList.add('show');
  
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ============================================================================
// 6. INITIALIZATION & EVENT BINDINGS
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {
  // Bind role selector
  const roleSelect = document.getElementById('role-select');
  if (roleSelect) {
    roleSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'manager') {
        appState.activeRole = 'manager';
        appState.activeTab = 'manager';
      } else {
        appState.activeRole = 'learner';
        appState.currentLearnerId = val;
        appState.activeTab = 'dashboard';
      }
      saveState();
      renderApp();
    });
  }

  // Bind top navigation tabs
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Bind 6-step loop banner steps
  document.querySelectorAll('.loop-step').forEach(step => {
    step.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = step.getAttribute('data-tab-target');
      if (tabId) switchTab(tabId);
    });
  });

  // Initial render
  renderApp();
});
