# HireTrack

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge&logo=vercel)](https://myhiretrack.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql)](https://neon.tech/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Powered-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

**AI-powered job application tracker that does more than track — it prepares you.**

I built HireTrack because I was tired of managing job applications in a spreadsheet. Every job seeker knows the chaos: 20 tabs open, no idea which companies you already applied to, forgetting interview dates, and writing the same cover letter from scratch every time.

HireTrack fixes this. Add a job, paste the description, upload your resume once — and the AI handles the rest. It tells you how well you match, generates a tailored cover letter, coaches you through interview questions with real-time feedback, and even writes your referral request messages. All from one clean dashboard.

<p align="center">
  <img src="screenshots/dashboard.png" alt="HireTrack Dashboard" width="100%" />
</p>

---

## Live Demo & API

* **App:** [https://myhiretrack.vercel.app](https://myhiretrack.vercel.app/)
* **API Docs (Swagger):** [https://hiretrack-api.vercel.app/docs](https://hiretrack-api.vercel.app/docs)
* **API Docs (ReDoc):** [https://hiretrack-api.vercel.app/redoc](https://hiretrack-api.vercel.app/redoc)

---

## The Problem

Every job seeker I know — including myself — goes through the same cycle:

- Apply to 30 companies, forget which ones by week two
- Miss interview dates because they're buried in email threads
- Spend 45 minutes writing each cover letter from scratch
- Walk into interviews with zero preparation specific to that role
- Want referrals but don't know how to write a professional ask

Spreadsheets don't solve this. They track rows of data, but they don't help you *prepare*. HireTrack does both.

---

## How It Works

### 1. Upload Your Resume

Open the Resume page, drop your PDF. HireTrack extracts all the text using pypdf and stores it. This text powers every AI feature — you upload once, and it's used everywhere.

### 2. Add Jobs With Descriptions

When you add a job application, paste the full job description (required field). This is the context the AI needs to give you useful, specific output — not generic advice.

### 3. AI Does The Heavy Lifting

Click into any job and you get four AI tools:

- **Match Score** — "How well do I fit this role?" with a 0-100 score, sub-scores for skills/experience/projects/keywords, and specific recommendations
- **Interview Coach** — 10 tailored questions, a practice sandbox where you type answers, and AI feedback with a score + suggested improvements
- **Cover Letter** — A professional, ready-to-send cover letter that references your actual projects and matches the JD requirements
- **Referral Message** — A LinkedIn connection note + email version, personalized to the role, ready to copy and send

### 4. Stay Organized

Set interview dates. See upcoming interviews on your dashboard with countdowns. Add them to Google Calendar with one click. Export everything to CSV when you need a spreadsheet.

---

## Use Cases

**A fresh graduate applying to 50+ companies**

She uploads her resume, adds each job with its description, and immediately knows her match score. For roles where she scores 80+, she generates a cover letter and applies with confidence. For lower scores, she reads the "gaps" section and knows exactly what skills to highlight differently.

**A working professional preparing for interviews**

He has 3 interviews this week at different companies. For each one, he opens HireTrack, generates 10 role-specific questions, practices his answers in the sandbox, and gets AI feedback on clarity, depth, and structure. He walks in prepared with company-specific talking points.

**Someone who needs referrals but doesn't know what to say**

She finds employees at her target company on LinkedIn but freezes when writing the connection message. She opens the Referral tab, clicks generate, and gets a professional 280-character LinkedIn note that mentions her relevant skills and the specific role — ready to paste.

**A busy person who forgets interview dates**

He sets the interview date when he gets the email confirmation. The dashboard shows "Tomorrow" in red. He clicks "Google Calendar" and gets a phone notification 30 minutes before. No more missed interviews.

---

## Features

### AI Resume Match Score

Upload your resume. Click "Match Score" on any job. Get back:
- Overall score (0-100)
- Sub-scores: Skills, Experience, Projects, Keywords
- Top matching strengths (what makes you a good fit)
- Gap skills (what's missing from your profile)
- Actionable recommendations (what to do about it)

The AI compares semantic meaning, not just keywords. "Built REST APIs with Express" matches "backend API development experience" because the AI understands context.

### AI Interview Coach

Click "Generate Questions" and get 10 tailored questions — mix of behavioral, technical, and situational — specific to the job title, company, and description.

Each question has:
- Category badge (Technical / Behavioral / Situational)
- AI Coach Tip (how to approach the answer)
- Practice Sandbox (type your answer, auto-saves to localStorage)
- "Get AI Feedback" button — returns a score (1-10), strengths, improvements, and a suggested better answer
- "Mark Complete" — tracks your progress with a visual progress bar

### AI Cover Letter Generator

Generates a professional cover letter following industry format:
- Header with your info + date + company
- Introduction stating the role and your background
- Skills paragraph referencing specific projects from your resume
- Company alignment paragraph (why this company specifically)
- Professional closing

Rules baked into the prompt: never invent information, reference actual projects, 300-450 words, no generic buzzwords. Copy or download as TXT.

### AI Referral Message Generator

Generates two versions:
- **Email/DM version** (150-250 words) — professional, mentions 2-3 relevant skills, clear referral ask
- **LinkedIn connection note** (under 300 characters) — short version for connection requests

Both are personalized to the specific job and your resume. Not a template — it references your actual experience.

### Interview Scheduling + Google Calendar

Set an interview date on any job. The dashboard shows upcoming interviews with:
- Countdown (Today, Tomorrow, in X days)
- Color-coded urgency (red = tomorrow, yellow = this week)
- One-click Google Calendar button — opens pre-filled event with title, date, time

No OAuth, no API key. Just a URL that Google Calendar accepts. Simple and reliable.

### Smart Dashboard

At a glance:
- Total applications, interviewing count, offers, rejections
- 7-day application activity chart
- Status breakdown with progress bars
- Upcoming interviews section
- Recent applications quick-view

### CSV Export

Click "Export CSV" on the Jobs page. Downloads all your applications as a spreadsheet with: Company, Job Title, Status, Applied Date, Interview Date, Job URL, Created At.

---

## Application Flow

```
User uploads PDF resume
    │
    ▼
pypdf extracts text → saved to `resumes` table
    │
    ▼
User adds job with description (required)
    │
    ▼
User clicks AI feature on Job Details page
    │
    ├── Match Score ──→ resume_text + job_description → Gemini → score + sub_scores + strengths + gaps + recommendations
    │
    ├── Interview Questions ──→ job_title + description + resume → Gemini → 10 questions with tips
    │   └── User types answer → clicks "Get Feedback" → answer + question → Gemini → score + improvements
    │
    ├── Cover Letter ──→ resume + job + user_name → Gemini → structured professional letter
    │
    └── Referral Message ──→ resume + job → Gemini → email version + linkedin short version
```

**Key insight:** Internet is needed for AI generation only. Once generated, results are cached in the database (match score, questions, cover letter) or localStorage (referral, practice answers). The dashboard, job list, search, and filtering all work instantly from cached data.

---

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Frontend (Vercel)                       │
│                                                           │
│  React 19 + Vite 8 + Tailwind CSS v4 + Shadcn/UI        │
│                                                           │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐   │
│  │  Dashboard  │  │  Job Details  │  │  Resume Page  │   │
│  │  (stats +   │  │  (AI tabs +  │  │  (upload +    │   │
│  │  interviews)│  │  workspace)  │  │  extract)     │   │
│  └──────┬──────┘  └──────┬───────┘  └──────┬────────┘   │
│         │                │                  │            │
│         └────────────────┼──────────────────┘            │
│                          │                               │
│                   Axios + JWT Token                       │
└──────────────────────────┼───────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│               Backend (Vercel Serverless)                  │
│                                                           │
│  FastAPI + SQLAlchemy + Pydantic                         │
│                                                           │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────┐   │
│  │ Auth Routes│  │ Job Routes │  │   AI Routes      │   │
│  │ (register, │  │ (CRUD +   │  │ (match, coach,   │   │
│  │  login,me) │  │  export)  │  │  cover, referral)│   │
│  └────────────┘  └────────────┘  └────────┬─────────┘   │
│                                           │              │
│                                    ai_service.py         │
│                                           │              │
│                                           ▼              │
│                                  Google Gemini API        │
│                                  (3.1 Flash Lite)        │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │              PostgreSQL (Neon)                      │   │
│  │  users │ job_applications │ resumes                │   │
│  └───────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## AI Integration

All AI features use a single integration point: Google Gemini 3.1 Flash Lite via REST API.

| Feature | What Gets Sent | What Comes Back |
|---------|---------------|-----------------|
| Match Score | resume_text + job_description | score, sub_scores, strengths, gaps, recommendations |
| Interview Questions | job_title + description + resume | 10 questions with category + tip |
| Answer Feedback | question + user_answer + job_title | score (1-10), strengths, improvements, suggested_answer |
| Cover Letter | resume + job + user_name | formatted professional letter |
| Referral Message | resume + job + user_name | email version + linkedin short version |

**Design decisions:**
- One API call per feature — no chaining, no multiple requests
- `responseMimeType: "application/json"` — Gemini returns clean JSON, no markdown parsing needed
- Fallback handling — if JSON parsing fails, returns a clear error to the user
- Results cached in DB columns — subsequent page loads don't re-call the API
- 500 free requests/day on Gemini — more than enough for personal use

---

## Database Schema

```sql
-- Users (JWT auth)
users: id, email, full_name, hashed_password, is_active, created_at, updated_at

-- Job Applications (core tracking + AI cache)
job_applications: id, user_id, company_name, job_title, job_url, job_description,
                  status, interview_date, applied_at, created_at, updated_at,
                  ai_match_score (JSON), ai_interview_questions (JSON),
                  ai_cover_letter (TEXT), ai_match_score_updated_at,
                  ai_interview_questions_updated_at, ai_cover_letter_updated_at

-- Resumes (one per user, extracted text)
resumes: id, user_id (unique), filename, extracted_text, uploaded_at
```

**Why cache AI results in the DB?** Because calling Gemini costs a request from your daily quota. Once you generate a match score, it's saved. Refreshing the page loads it from the database — no new API call. Users only spend a request when they explicitly click "Refresh Analysis" or "Regenerate."

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React 19 + Vite 8 | Fast builds, modern React features |
| Styling | Tailwind CSS v4 + Shadcn/UI | Utility-first, consistent dark theme |
| State | React Context + localStorage | Auth state global, practice answers persist |
| HTTP | Axios with interceptors | Auto-attaches JWT, handles 401 redirects |
| Backend | FastAPI (Python) | Auto-validation, auto-docs, type-safe |
| ORM | SQLAlchemy | Proven, flexible, works with Neon |
| Auth | JWT + bcrypt | Stateless tokens, secure password hashing |
| AI | Google Gemini 3.1 Flash Lite | Free tier, fast, good at structured JSON |
| PDF | pypdf | Lightweight PDF text extraction |
| Database | PostgreSQL (Neon) | Cloud-native, serverless-compatible, IPv4 pooler |
| Deployment | Vercel | Both frontend and backend as serverless |

---

## Project Structure

```
hiretrack/
├── backend/
│   ├── app/
│   │   ├── core/              # Config + database connection
│   │   ├── models/            # SQLAlchemy models (user, job, resume)
│   │   ├── routes/            # API endpoints (auth, job, dashboard, resume, ai)
│   │   ├── schemas/           # Pydantic request/response models
│   │   ├── services/          # AI service (Gemini integration)
│   │   ├── utils/             # Security helpers + dependency injection
│   │   └── main.py            # FastAPI app entry point
│   └── pyproject.toml         # Dependencies + Vercel entrypoint config
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/            # Shadcn/UI base components
│   │   │   └── jobs/          # AI feature components (MatchScoreCircle, AnswerSandbox, etc.)
│   │   ├── context/           # AuthContext (JWT state management)
│   │   ├── layouts/           # Dashboard layout + sidebar + navbar
│   │   ├── pages/             # Route pages (dashboard, jobs, resume, landing, auth)
│   │   ├── services/          # API call functions (auth, job, resume, ai)
│   │   └── routes/            # React Router configuration
│   └── package.json
│
└── README.md
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create account |
| POST | `/auth/login` | Get JWT token |
| GET | `/auth/me` | Current user profile |

### Job Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/jobs/applications` | Create application |
| GET | `/jobs/applications` | List all |
| GET | `/jobs/applications/export` | Download CSV |
| GET | `/jobs/applications/{id}` | Get one |
| PUT | `/jobs/applications/{id}` | Update |
| DELETE | `/jobs/applications/{id}` | Delete |

### AI Features
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/jobs/applications/{id}/match-score` | Resume-job compatibility analysis |
| POST | `/jobs/applications/{id}/interview-questions` | Generate 10 tailored questions |
| POST | `/jobs/applications/{id}/answer-feedback` | AI feedback on practice answer |
| POST | `/jobs/applications/{id}/cover-letter` | Generate professional cover letter |
| POST | `/jobs/applications/{id}/referral-message` | Generate referral request messages |

### Resume
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/resume/upload` | Upload PDF resume |
| GET | `/resume` | Get resume data |
| DELETE | `/resume` | Delete resume |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/stats` | Summary metrics |
| GET | `/dashboard/recent-applications` | Latest 5 |
| GET | `/dashboard/upcoming-interviews` | Future interviews |

---

## Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL (or use Neon free tier)
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com/apikey))

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
pip install pypdf httpx
```

Create `backend/.env`:
```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
GEMINI_API_KEY=your_gemini_key
SECRET_KEY=your_jwt_secret
```

```bash
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

```bash
npm run dev
```

---

## Deployment

Both frontend and backend deploy on Vercel:

- **Frontend:** Standard Vite build, auto-detected
- **Backend:** FastAPI as serverless function via `pyproject.toml` → `[tool.vercel] entrypoint = "app.main:app"`
- **Database:** Neon PostgreSQL with IPv4 transaction pooler (required for Vercel's serverless runtime)
- **AI:** `GEMINI_API_KEY` set in Vercel Environment Variables

Push to main → Vercel builds and deploys automatically if Git integration is connected.

---

## What This Is Not

HireTrack is not a job board. It doesn't scrape listings or auto-apply. It's not a CRM for recruiters.

It's a personal workspace for job seekers who want to be organized AND prepared. Track what you've applied to, then use AI to actually prepare — match your fit, practice interviews, write cover letters, and request referrals. All in one place.

---

## Where This Can Go

This is a working, deployed product — but there's room to grow:

- **Email interview reminders** — Vercel Cron + Resend for 24-hour-before notifications
- **PDF cover letter download** — jsPDF for properly formatted PDF output
- **Resume file storage** — Supabase Storage for original PDF viewing/download
- **AI answer memory** — save all practice answers to DB, track improvement over time
- **Multi-resume support** — different resumes for different types of roles
- **Application analytics** — response rate by company size, industry, resume version
- **Browser extension** — auto-capture job details from LinkedIn/Indeed job pages

The foundation is solid. The AI integration pattern is proven. Every new feature follows the same flow: user data + job data → Gemini → structured result → display.

---

## Screenshots

<details>
<summary>Click to view app screenshots</summary>

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Job Details + AI Workspace
![Job Details](screenshots/job_details.png)

### AI Match Score
![Match Score](screenshots/match_score.png)

### AI Interview Coach
![Interview Coach](screenshots/interview_coach.png)

### AI Cover Letter
![Cover Letter](screenshots/cover_letter.png)

### Resume Upload
![Resume](screenshots/resume.png)

### Landing Page
![Landing](screenshots/landing.png)

</details>

---

## Contact

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mdshouqatazeez@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shouqat-azeez-mohammad/)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=react&logoColor=61DAFB)](https://mohammadshouqatazeez.vercel.app/)

---

## License

MIT License — see [LICENSE](LICENSE) for details.
