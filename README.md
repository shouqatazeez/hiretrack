<div align="center">

# 🚀 HireTrack

### Your Job Search Command Center

[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JWT](https://img.shields.io/badge/JWT_Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

<br/>

A **full-stack job application tracking platform** that helps you organize, monitor, and analyze your entire job search from one place. Stop losing track of applications in spreadsheets — HireTrack gives you a real-time dashboard, powerful filtering, and complete CRUD management for every application you submit.

<br/>

[**🌐 Live Demo**](https://myhiretrack.vercel.app) · [**📖 API Docs**](https://myhiretrack.vercel.app/api/docs) · [**🐛 Report Bug**](https://github.com/yourusername/hiretrack/issues) · [**💡 Request Feature**](https://github.com/yourusername/hiretrack/issues)

</div>

<br/>

---

<br/>

## 📸 Screenshots

> **Add your screenshots here** — Replace the placeholder paths below with actual screenshots of your deployed app.

<div align="center">

| Dashboard | Job Applications |
|:-:|:-:|
| *Dashboard with real-time analytics* | *Applications list with search & filters* |

| Job Details | Swagger API Docs |
|:-:|:-:|
| *Individual application detail view* | *Auto-generated interactive API documentation* |

</div>

<br/>

---

<br/>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication & Security
- JWT-based login & registration
- Automatic login after sign-up
- Protected routes with token verification
- Secure password hashing with bcrypt

</td>
<td width="50%">

### 📊 Dashboard & Analytics
- Real-time application statistics
- Status breakdown (Applied, Interviewing, Offered, Rejected)
- Applications submitted in the last 7 days
- Recent applications quick view

</td>
</tr>
<tr>
<td width="50%">

### 📝 Job Management
- Full CRUD operations for applications
- Track company, role, URL, status & dates
- Detailed individual job view
- Quick status updates

</td>
<td width="50%">

### 🔍 Search & Filter
- Real-time search across all applications
- Filter by application status
- Responsive design for all screen sizes
- Clean, modern UI with Tailwind CSS

</td>
</tr>
</table>

<br/>

---

<br/>

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="25%"><strong>Frontend</strong></td>
<td align="center" width="25%"><strong>Backend</strong></td>
<td align="center" width="25%"><strong>Database</strong></td>
<td align="center" width="25%"><strong>DevOps</strong></td>
</tr>
<tr>
<td valign="top">

- React 19
- Vite
- Tailwind CSS v4
- React Router v7
- React Hook Form
- Zod Validation
- Axios
- Radix UI
- Lucide Icons

</td>
<td valign="top">

- FastAPI
- SQLAlchemy ORM
- Pydantic Schemas
- Python-dotenv
- Passlib (bcrypt)
- PyJWT
- Uvicorn

</td>
<td valign="top">

- PostgreSQL (Production)
- SQLite (Development)

</td>
<td valign="top">

- Vercel (Hosting)
- Git & GitHub

</td>
</tr>
</table>

<br/>

---

<br/>

## 📐 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
└──────────────────────────────┬──────────────────────────────────┘
                               │  HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     React SPA (Vite + Tailwind)                 │
│  ┌────────────┐  ┌────────────────┐  ┌───────────────────────┐  │
│  │ React Router│  │  Auth Context  │  │ Axios + Interceptors  │  │
│  └────────────┘  └────────────────┘  └───────────────────────┘  │
└──────────────────────────────┬──────────────────────────────────┘
                               │  REST API + Bearer Token
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FastAPI Backend (Python)                     │
│  ┌──────────┐  ┌──────────────┐  ┌────────────┐  ┌──────────┐  │
│  │Auth Routes│  │  Job Routes  │  │ Dashboard  │  │ Schemas  │  │
│  └──────────┘  └──────────────┘  └────────────┘  └──────────┘  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   SQLAlchemy ORM Layer                    │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────────┘
                               │  SQL Queries
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              PostgreSQL (Prod) / SQLite (Dev)                   │
│         ┌──────────────┐    ┌─────────────────────┐             │
│         │  users table  │    │ job_applications     │             │
│         └──────────────┘    └─────────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

<br/>

---

<br/>

## 📂 Project Structure

```
hiretrack/
│
├── backend/                        # FastAPI Backend Service
│   ├── app/
│   │   ├── core/                   # Config & database connection
│   │   │   ├── config.py           # Environment variable loader
│   │   │   └── database.py         # SQLAlchemy engine & session
│   │   ├── models/                 # Database models
│   │   │   ├── user.py             # User model
│   │   │   └── job.py              # JobApplication model
│   │   ├── routes/                 # API route handlers
│   │   │   ├── auth.py             # Registration & profile
│   │   │   ├── login.py            # Login & token generation
│   │   │   ├── job.py              # CRUD for job applications
│   │   │   └── dashboard.py        # Analytics & recent apps
│   │   ├── schemas/                # Pydantic request/response schemas
│   │   ├── services/               # Business logic layer
│   │   ├── utils/                  # Security helpers & dependencies
│   │   └── main.py                 # App entrypoint & CORS config
│   ├── requirements.txt
│   └── .env
│
├── frontend/                       # React Frontend Client
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── context/                # Auth context provider
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── layouts/                # Page layout wrappers
│   │   ├── pages/                  # Route-level page components
│   │   ├── routes/                 # Route definitions
│   │   ├── services/               # Axios API layer
│   │   │   ├── api.js              # Axios instance & interceptors
│   │   │   ├── authService.js      # Auth API calls
│   │   │   └── jobService.js       # Job CRUD API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

<br/>

---

<br/>

## ⚡ Getting Started

### Prerequisites

| Requirement | Version |
|:---|:---|
| Python | 3.10+ |
| Node.js | 18+ |
| PostgreSQL | 14+ *(optional — SQLite works for dev)* |

### 1 · Clone

```bash
git clone https://github.com/yourusername/hiretrack.git
cd hiretrack
```

### 2 · Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate              # Windows
# source venv/bin/activate         # macOS / Linux
pip install -r requirements.txt
```

Create `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/hiretrack_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Start the server:

```bash
uvicorn app.main:app --reload
```

> Backend runs at **http://127.0.0.1:8000** — Swagger docs at **http://127.0.0.1:8000/docs**

### 3 · Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the dev server:

```bash
npm run dev
```

> Frontend runs at **http://localhost:5173**

<br/>

---

<br/>

## 📡 API Reference

> Full interactive docs available at `/docs` (Swagger UI) and `/redoc` (ReDoc) when the backend is running.

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|:---:|:---|:---:|:---|
| `POST` | `/auth/register` | ❌ | Create a new user account |
| `POST` | `/auth/login` | ❌ | Authenticate and receive JWT |
| `POST` | `/auth/token` | ❌ | OAuth2-compatible token endpoint |
| `GET` | `/auth/me` | ✅ | Get current user profile |

### Job Application Endpoints

| Method | Endpoint | Auth | Description |
|:---:|:---|:---:|:---|
| `POST` | `/jobs/applications` | ✅ | Create a new job application |
| `GET` | `/jobs/applications` | ✅ | List all user applications |
| `GET` | `/jobs/applications/{id}` | ✅ | Get application details |
| `PUT` | `/jobs/applications/{id}` | ✅ | Update an application |
| `DELETE` | `/jobs/applications/{id}` | ✅ | Delete an application |

### Dashboard Endpoints

| Method | Endpoint | Auth | Description |
|:---:|:---|:---:|:---|
| `GET` | `/dashboard/stats` | ✅ | Aggregated application metrics |
| `GET` | `/dashboard/recent-applications` | ✅ | Last 5 applications added |

<br/>

---

<br/>

## 🗺️ Roadmap

- [ ] Kanban board view with drag-and-drop status management
- [ ] Resume/CV file upload and attachment per application
- [ ] Email notifications for interview reminders
- [ ] Google Calendar integration for interview scheduling
- [ ] Export applications to CSV / Excel
- [ ] Dark/Light theme toggle
- [ ] Application notes and activity timeline
- [ ] Multi-user team workspaces

<br/>

---

<br/>

## 🤝 Contributing

Contributions are welcome! If you'd like to improve HireTrack:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<br/>

---

<br/>

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<br/>

<div align="center">

**Built with ❤️ by [Shouqat](https://github.com/yourusername)**

[⬆ Back to Top](#-hiretrack)

</div>