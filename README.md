# HireTrack

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge&logo=vercel)](https://myhiretrack.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple?style=flat-square&logo=vite)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-black?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)

HireTrack is a modern full-stack job application tracking platform designed to help job seekers manage and monitor their entire job search process from one centralized dashboard. It enables users to log applications, track statuses, filter by progress, and view real-time analytics—replacing messy spreadsheets with a clean, purpose-built tool.
<p align="center">
  <img src="screenshots/dashboard.png" alt="HireTrack Dashboard" width="100%" />
</p>

---

## Live Demo & API Documentation

* **Live Demo:** [https://myhiretrack.vercel.app/](https://myhiretrack.vercel.app/)
* **Swagger UI (Interactive API Docs):** [https://hiretrack-api.vercel.app/docs](https://hiretrack-api.vercel.app/docs)
* **ReDoc (Alternative API Docs):** [https://hiretrack-api.vercel.app/redoc](https://hiretrack-api.vercel.app/redoc)

---

## Screenshots

<details>
<summary>📸 Click to view app walkthrough screenshots</summary>

### Landing Page
![Landing Page](screenshots/landing.png)

### Authentication (Login)
![Login Page](screenshots/login.png)

### Jobs Dashboard (Applications List)
![Jobs Page](screenshots/jobs.png)

### Add New Job
![Add Job Page](screenshots/add_job.png)

### Job Details & Management
![Job Details Page](screenshots/job_details.png)

</details>

---

## Features

### User Authentication
- Secure registration and login using **JWT tokens**.
- Automatic login after successful registration.
- Password hashing with **bcrypt** for security.
- Protected routes ensuring only authenticated users can access the platform.

### Dashboard Analytics
- Real-time statistics showing **total applications** submitted.
- Applications submitted in the **last 7 days**.
- Color-coded **status breakdown** (Applied, Interviewing, Offered, Rejected, Withdrawn).
- Quick view of the **5 most recent applications**.

### Job Application Management
- Full **CRUD operations** (Create, Read, Update, Delete) for job applications.
- Track **company name**, **job title**, **application URL**, **status**, and **dates**.
- Dedicated **job details page** for each application.
- Quick status updates directly from the applications list.

### Search & Filtering
- **Real-time search** across all job applications.
- **Filter by status** (All, Applied, Interviewing, Offered, Rejected, Withdrawn).
- Instant results with client-side filtering.

### Modern UI/UX
- Clean, responsive design built with **Tailwind CSS v4**.
- Works seamlessly on mobile, tablet, and desktop.
- Beautiful dark theme with smooth animations.
- Intuitive navigation and user-friendly interface.

### API Documentation
- Auto-generated **Swagger UI** available at `/docs`.
- Interactive **ReDoc** documentation at `/redoc`.
- Fully documented endpoints for easy API exploration.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19, Vite |
| **Styling** | Tailwind CSS 4, Radix UI |
| **Forms & Validation** | React Hook Form, Zod |
| **HTTP Client** | Axios |
| **Routing** | React Router DOM 7 |
| **Icons** | Lucide React |
| **Backend** | FastAPI (Python) |
| **ORM** | SQLAlchemy |
| **Authentication** | JWT (PyJWT + Passlib) |
| **Database** | PostgreSQL (Production), SQLite (Development) |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites
- Python 3.10 or higher
- Node.js (v18 or higher)
- npm
- PostgreSQL account (optional — SQLite works for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shouqatazeez/hiretrack.git
   cd hiretrack
   ```

2. **Backend setup**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate              # Windows
   # source venv/bin/activate         # macOS / Linux
   pip install -r requirements.txt
   ```

3. **Configure backend environment variables**

   Create a `.env` file in the `backend/` directory:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/hiretrack_db
   SECRET_KEY=your_secret_key_here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

4. **Start the backend server**
   ```bash
   uvicorn app.main:app --reload
   ```
   Navigate to `http://127.0.0.1:8000/docs` to see the API documentation.

5. **Frontend setup**
   ```bash
   cd frontend
   npm install
   ```

6. **Configure frontend environment variables**

   Create a `.env.local` file in the `frontend/` directory:
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```

7. **Start the frontend development server**
   ```bash
   npm run dev
   ```

8. **Open in browser**

   Navigate to `http://localhost:5173`

---

## Project Structure

```
hiretrack/
├── backend/                        # FastAPI Backend
│   ├── app/
│   │   ├── core/                   # Config & database connection
│   │   │   ├── config.py           # Environment variables
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
│   │   ├── utils/                  # Security & auth dependencies
│   │   └── main.py                 # App entrypoint & CORS config
│   ├── requirements.txt
│   └── .env
│
├── frontend/                       # React Frontend
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── context/                # Auth context provider
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── layouts/                # Page layout wrappers
│   │   ├── pages/                  # Page components
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── RegisterPage.jsx
│   │   │   ├── dashboard/
│   │   │   │   └── DashboardPage.jsx
│   │   │   ├── jobs/
│   │   │   │   ├── AddJobPage.jsx
│   │   │   │   ├── EditJobPage.jsx
│   │   │   │   ├── JobDetailsPage.jsx
│   │   │   │   └── JobsPage.jsx
│   │   │   └── landing/
│   │   │       └── LandingPage.jsx
│   │   ├── routes/                 # Route definitions
│   │   ├── services/               # Axios API layer
│   │   │   ├── api.js              # Axios instance & interceptors
│   │   │   ├── authService.js      # Auth API calls
│   │   │   └── jobService.js       # Job CRUD API calls
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json                 # Vercel deployment config
│
└── README.md
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | No | Create a new user account |
| `POST` | `/auth/login` | No | Authenticate and receive JWT |
| `POST` | `/auth/token` | No | OAuth2-compatible token endpoint |
| `GET` | `/auth/me` | Yes | Get current user profile |

### Job Applications

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/jobs/applications` | Yes | Create a new job application |
| `GET` | `/jobs/applications` | Yes | List all user applications |
| `GET` | `/jobs/applications/{id}` | Yes | Get application details |
| `PUT` | `/jobs/applications/{id}` | Yes | Update an application |
| `DELETE` | `/jobs/applications/{id}` | Yes | Delete an application |

### Dashboard

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/dashboard/stats` | Yes | Aggregated application metrics |
| `GET` | `/dashboard/recent-applications` | Yes | Last 5 applications added |

---

## Roadmap

- [ ] Kanban board view with drag-and-drop status management
- [ ] Resume/CV file upload per application
- [ ] Email notifications for interview reminders
- [ ] Google Calendar integration for scheduling
- [ ] Export applications to CSV / Excel
- [ ] Dark/Light theme toggle
- [ ] Application notes and activity timeline

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

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

**Shouqat Azeez**
- GitHub: [@shouqatazeez](https://github.com/shouqatazeez)

---

## Acknowledgments

- [React](https://react.dev/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [FastAPI](https://fastapi.tiangolo.com/) - Backend Framework
- [SQLAlchemy](https://www.sqlalchemy.org/) - ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI Primitives
- [Lucide Icons](https://lucide.dev/) - Icon Library
- [Vercel](https://vercel.com/) - Deployment Platform