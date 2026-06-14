# HireTrack

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge&logo=vercel)](https://myhiretrack.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple?style=flat-square&logo=vite)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql)](https://neon.tech/)
[![JWT](https://img.shields.io/badge/JWT-Auth-black?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Powered-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)

**HireTrack** is an AI-powered, full-stack job application tracking platform that helps job seekers manage their entire job search from one centralized dashboard. Beyond simple tracking, it uses Google Gemini AI to analyze resume-job compatibility, generate personalized cover letters, and provide AI-powered interview coaching with answer feedback — replacing messy spreadsheets with an intelligent career management tool.

<p align="center">
  <img src="screenshots/dashboard.png" alt="HireTrack Dashboard" width="100%" />
</p>

---

## Live Demo & API Documentation

* **Live Demo:** [https://myhiretrack.vercel.app/](https://myhiretrack.vercel.app/)
* **Backend API:** [https://hiretrack-api.vercel.app/](https://hiretrack-api.vercel.app/)
* **Swagger UI (Interactive API Docs):** [https://hiretrack-api.vercel.app/docs](https://hiretrack-api.vercel.app/docs)
* **ReDoc (Alternative API Docs):** [https://hiretrack-api.vercel.app/redoc](https://hiretrack-api.vercel.app/redoc)

---

## Screenshots

<details>
<summary>Click to view app walkthrough screenshots</summary>

### Landing Page
![Landing Page](screenshots/landing.png)

### Authentication (Login)
![Login Page](screenshots/login.png)

### Jobs Dashboard (Applications List)
![Jobs Page](screenshots/jobs.png)

### Add New Job
![Add Job Page](screenshots/add_job.png)

### Job Details & AI Features
![Job Details Page](screenshots/job_details.png)

### AI Resume Match Score
![Match Score](screenshots/match_score.png)

### AI Interview Coach
![Interview Coach](screenshots/interview_coach.png)

### AI Cover Letter Generator
![Cover Letter](screenshots/cover_letter.png)

### Resume Upload
![Resume Page](screenshots/resume.png)

</details>

---

## Features

### AI-Powered Career Tools

- **Resume Match Scoring** — Upload your resume and get an AI compatibility score (0-100) with sub-category breakdowns (Skills, Experience, Projects, Keywords), strengths, gaps, and actionable recommendations.
- **AI Interview Coach** — Generate 10 tailored interview questions (behavioral, technical, situational) with practice sandbox, AI answer feedback scoring, and progress tracking.
- **Cover Letter Generator** — Generate professional, company-specific cover letters following industry-standard format with copy/download functionality.
- **Resume Upload & Parsing** — Upload PDF resumes with automatic text extraction (pypdf) for use across all AI features.

### Job Application Management

- Full CRUD operations for job entries with company, title, description, URL, and status tracking.
- Application statuses: Applied, Interviewing, Offered, Rejected, Withdrawn.
- Job description field (5,000 chars) for AI analysis context.
- CSV export of all applications for backup/spreadsheet use.

### Interview Scheduling

- Set interview dates and times on any job application.
- Dashboard shows upcoming interviews with countdown (Today, Tomorrow, in X days).
- One-click **Google Calendar integration** — adds interview events with pre-filled details.

### Dashboard Analytics

- Real-time KPI cards: Total Applications, Interviewing, Offers, Rejected.
- 7-day application activity chart.
- Color-coded status breakdown with progress bars.
- Recent applications preview with quick navigation.

### Authentication & Security

- JWT-based authentication with bcrypt password hashing.
- User-scoped data isolation — each user only sees their own data.
- Protected routes on both frontend and backend.

### Search & Filtering

- Real-time client-side search across company names and job titles.
- Multi-status dropdown filter for instant pipeline views.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8 |
| **Styling & Components** | Tailwind CSS v4, Shadcn/UI, Radix UI |
| **Forms & Validation** | React Hook Form, Zod |
| **HTTP Client** | Axios (with auth interceptors) |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **Backend** | FastAPI (Python) |
| **ORM** | SQLAlchemy |
| **Authentication** | JWT (python-jose + passlib + bcrypt) |
| **AI** | Google Gemini 3.1 Flash Lite (via REST API) |
| **PDF Parsing** | pypdf |
| **Database** | PostgreSQL (Neon - cloud) |
| **Deployment** | Vercel (Frontend + Backend as Serverless Functions) |

---

## Database Schema

### `users` Table

| Column | Type | Description |
|---|---|---|
| `id` | Integer | Primary key |
| `email` | String | Unique login email |
| `full_name` | String | Display name |
| `hashed_password` | String | bcrypt hash |
| `is_active` | Boolean | Account status |
| `created_at` | DateTime | Registration date |
| `updated_at` | DateTime | Last update |

### `job_applications` Table

| Column | Type | Description |
|---|---|---|
| `id` | Integer | Primary key |
| `user_id` | Integer | FK to users |
| `company_name` | String | Company |
| `job_title` | String | Role |
| `job_url` | String | Posting link |
| `job_description` | Text | Full JD (max 5000 chars) |
| `status` | String | applied/interviewing/offered/rejected/withdrawn |
| `interview_date` | DateTime | Scheduled interview |
| `applied_at` | DateTime | Application date |
| `ai_match_score` | JSON | Cached AI match result |
| `ai_interview_questions` | JSON | Cached AI questions |
| `ai_cover_letter` | Text | Cached cover letter |
| `created_at` | DateTime | Entry creation |
| `updated_at` | DateTime | Last modification |

### `resumes` Table

| Column | Type | Description |
|---|---|---|
| `id` | Integer | Primary key |
| `user_id` | Integer | FK to users (unique) |
| `filename` | String | Original PDF filename |
| `extracted_text` | Text | Parsed resume content |
| `uploaded_at` | DateTime | Upload timestamp |

---

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Create account |
| POST | `/auth/login` | No | Get JWT token |
| POST | `/auth/token` | No | OAuth2 token endpoint |
| GET | `/auth/me` | Yes | Current user profile |

### Job Applications

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/jobs/applications` | Yes | Create application |
| GET | `/jobs/applications` | Yes | List all applications |
| GET | `/jobs/applications/export` | Yes | Download CSV |
| GET | `/jobs/applications/{id}` | Yes | Get application |
| PUT | `/jobs/applications/{id}` | Yes | Update application |
| DELETE | `/jobs/applications/{id}` | Yes | Delete application |

### AI Features

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/jobs/applications/{id}/match-score` | Yes | AI resume match analysis |
| POST | `/jobs/applications/{id}/interview-questions` | Yes | Generate interview questions |
| POST | `/jobs/applications/{id}/cover-letter` | Yes | Generate cover letter |
| POST | `/jobs/applications/{id}/answer-feedback` | Yes | AI feedback on practice answer |

### Resume

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/resume/upload` | Yes | Upload PDF resume |
| GET | `/resume` | Yes | Get resume data |
| DELETE | `/resume` | Yes | Delete resume |

### Dashboard

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/dashboard/stats` | Yes | Summary metrics |
| GET | `/dashboard/recent-applications` | Yes | Latest 5 applications |
| GET | `/dashboard/upcoming-interviews` | Yes | Future interviews |

---

## Project Structure

```
hiretrack/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py              # Environment variables
│   │   │   └── database.py            # SQLAlchemy engine & session
│   │   ├── models/
│   │   │   ├── user.py                # User model
│   │   │   ├── job.py                 # JobApplication model
│   │   │   └── resume.py             # Resume model
│   │   ├── routes/
│   │   │   ├── auth.py                # Registration & profile
│   │   │   ├── login.py              # Login & tokens
│   │   │   ├── job.py                # CRUD + CSV export
│   │   │   ├── dashboard.py          # Analytics + upcoming interviews
│   │   │   ├── resume.py             # Resume upload/delete
│   │   │   └── ai.py                 # AI features (match, questions, cover letter, feedback)
│   │   ├── schemas/                   # Pydantic request/response models
│   │   ├── services/
│   │   │   └── ai_service.py         # Gemini AI integration
│   │   ├── utils/                     # Security & dependencies
│   │   └── main.py                    # FastAPI app entry point
│   ├── pyproject.toml                 # Dependencies + Vercel config
│   └── .vercelignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                    # Shadcn/UI components
│   │   │   └── jobs/                  # AI feature components
│   │   │       ├── MatchScoreCircle.jsx
│   │   │       ├── QuestionAccordionItem.jsx
│   │   │       ├── AnswerSandbox.jsx
│   │   │       └── CoverLetterDocument.jsx
│   │   ├── context/                   # AuthContext
│   │   ├── layouts/                   # Dashboard layout + sidebar
│   │   ├── pages/
│   │   │   ├── auth/                  # Login, Register
│   │   │   ├── dashboard/            # Dashboard, Resume
│   │   │   ├── jobs/                  # Jobs, Add, Edit, Details
│   │   │   └── landing/              # Landing page
│   │   ├── services/
│   │   │   ├── api.js                 # Axios instance
│   │   │   ├── authService.js         # Auth API calls
│   │   │   ├── jobService.js          # Job API calls
│   │   │   ├── resumeService.js       # Resume API calls
│   │   │   └── aiService.js           # AI feature API calls
│   │   └── routes/                    # React Router config
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shouqatazeez/hiretrack.git
cd hiretrack
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate              # Windows
# source venv/bin/activate         # macOS / Linux
pip install -r requirements.txt
pip install pypdf httpx
```

### 3. Backend Environment Variables

Create a `.env` file in `backend/`:

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Backend

```bash
uvicorn app.main:app --reload
```

API docs at `http://127.0.0.1:8000/docs`

### 5. Frontend Setup

```bash
cd frontend
npm install
```

### 6. Frontend Environment Variables

Create `.env.local` in `frontend/`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 7. Run Frontend

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Deployment

Both frontend and backend are deployed on **Vercel**:

- **Frontend:** Standard Vite deployment
- **Backend:** FastAPI as Vercel Serverless Function via `pyproject.toml` with `[tool.vercel] entrypoint = "app.main:app"`
- **Database:** Neon PostgreSQL (cloud, IPv4 pooler connection)
- **AI:** Google Gemini API key set in Vercel Environment Variables

---

## Roadmap

- [x] ~~Interview date reminder~~ ✅
- [x] ~~Resume upload~~ ✅
- [x] ~~CSV export~~ ✅
- [x] ~~AI cover letter generator~~ ✅
- [x] ~~AI interview question generator~~ ✅
- [x] ~~AI resume-to-job match score~~ ✅
- [x] ~~AI answer feedback coaching~~ ✅
- [x] ~~Google Calendar integration~~ ✅
- [ ] Email interview reminders (Vercel Cron + Resend)
- [ ] PDF resume storage (Supabase Storage)
- [ ] PDF cover letter download (jsPDF)

---

## Contributing

Contributions are welcome! Please feel free to open a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mdshouqatazeez@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shouqat-azeez-mohammad/)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=react&logoColor=61DAFB)](https://mohammadshouqatazeez.vercel.app/)
