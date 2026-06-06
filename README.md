# HireTrack

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge&logo=vercel)](https://myhiretrack.vercel.app/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple?style=flat-square&logo=vite)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-black?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

**HireTrack** is a modern, full-stack job application tracking platform designed to help job seekers manage and monitor their entire job search process from one centralized dashboard. It enables users to log applications, track interview schedules, filter statuses, and view real-time analytics—replacing messy spreadsheets with a clean, purpose-built digital dashboard.

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
<summary>Click to view app walkthrough screenshots</summary>

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

### User Authentication & Security
- Secure registration and login using **JWT (JSON Web Tokens)**.
- Password hashing with **bcrypt** via passlib for industry-standard security.
- Automatic sign-in transition upon successful user registration.
- Protected client-side and server-side routes ensuring user-specific data isolation.

### Dashboard Analytics
- Real-time KPI statistics showing **total job applications** submitted.
- Submissions metrics filtered for the **last 7 days**.
- Color-coded **status breakdown chart** (Applied, Interviewing, Offered, Rejected, Withdrawn).
- Quick access preview pane showing the **5 most recent applications**.

### Job Application Management (CRUD)
- Full CRUD operations (Create, Read, Update, Delete) for job entries.
- Tracking details including **company name**, **job title**, **application URL**, **current status**, and **milestone dates**.
- Dedicated details inspector page for granular notes and updates on each application.
- Quick status updates directly from the main applications dashboard.

### Real-Time Search & Filtering
- Dynamic, real-time client-side text search across all applications.
- Multi-status tabs filtering (All, Applied, Interviewing, Offered, Rejected, Withdrawn).
- High performance rendering with immediate UI feedback.

### Modern UI/UX
- Responsive grid and card systems built using **Tailwind CSS v4** and **Radix UI**.
- Fully optimized layouts across desktop, tablet, and mobile displays.
- Premium dark mode interface featuring smooth CSS micro-interactions and transitions.

### Interactive API Documentation
- Auto-generated **Swagger UI** wrapper on `/docs` for endpoint testing.
- Clean **ReDoc** alternative documentation interface on `/redoc`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite |
| **Styling & Components** | Tailwind CSS v4, Radix UI, Shadcn/UI |
| **Forms & Validation** | React Hook Form, Zod |
| **HTTP Client** | Axios (with Interceptors) |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **Backend** | FastAPI (Python) |
| **ORM** | SQLAlchemy |
| **Database Migrations** | Alembic |
| **Authentication** | JWT (python-jose + passlib + bcrypt) |
| **Database** | PostgreSQL (Production), SQLite (Local Dev) |
| **Deployment** | Vercel |

---

## Database Schema

HireTrack uses a relational database schema. The application tables represent the following structure:

### 1. `users` Table
Stores basic account credentials and security flags.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `Integer` | Primary Key, Autoincrement | Unique identification token |
| `email` | `String` | Unique, Index, Nullable=False | User's sign-in email address |
| `full_name` | `String` | Nullable=False | Full name of the user |
| `hashed_password` | `String` | Nullable=False | Password stored securely via bcrypt |
| `is_active` | `Boolean` | Default=True, Nullable=False | Accounts active status flag |
| `created_at` | `DateTime` | Default=utcnow, Nullable=False | User registration timestamp |
| `updated_at` | `DateTime` | Default=utcnow, Nullable=False | Account update timestamp |

### 2. `job_applications` Table
Tracks job application stages, dates, and metadata linked to a specific user.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `Integer` | Primary Key, Autoincrement | Unique identification token |
| `user_id` | `Integer` | FK (`users.id`), Nullable=False, Index | Owner identification code |
| `company_name` | `String` | Nullable=False | Company name of the job listing |
| `job_title` | `String` | Nullable=False | Specific job title / role |
| `job_url` | `String` | Nullable=True | Link to the original job posting |
| `status` | `String` | Default="applied", Nullable=False | Current status state (e.g. applied, interviewing) |
| `applied_at` | `DateTime` | Default=utcnow, Nullable=False | Date the application was submitted |
| `created_at` | `DateTime` | Default=utcnow, Nullable=False | Application creation timestamp |
| `updated_at` | `DateTime` | Default=utcnow, Nullable=False | Entry modification timestamp |

---

## Project Structure

```
hiretrack/
├── backend/                        # FastAPI Backend Service
│   ├── app/
│   │   ├── core/                   # Config & database connection settings
│   │   │   ├── config.py           # Environment variables handler
│   │   │   └── database.py         # SQLAlchemy engine & session maker
│   │   ├── models/                 # Database Models (SQLAlchemy ORM)
│   │   │   ├── user.py             # User accounts entity
│   │   │   └── job.py              # JobApplication tracking entity
│   │   ├── routes/                 # API Endpoint Handlers
│   │   │   ├── auth.py             # Registration & user profiles
│   │   │   ├── login.py            # Login & authentication tokens
│   │   │   ├── job.py              # Job application CRUD operations
│   │   │   └── dashboard.py        # Analytics stats & dashboard updates
│   │   ├── schemas/                # Pydantic schemas (Request/Response validation)
│   │   ├── services/               # Core business logic service layers
│   │   ├── utils/                  # Cryptography & dependency helpers
│   │   └── main.py                 # FastAPI application entry & CORS policy
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/                       # React Frontend Application
│   ├── src/
│   │   ├── components/             # Shareable UI components
│   │   ├── context/                # Context API state (e.g., AuthContext)
│   │   ├── hooks/                  # Custom React Hooks
│   │   ├── layouts/                # Main dashboard page layout wrapper
│   │   ├── pages/                  # Page route bundles
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
│   │   ├── routes/                 # React Router paths
│   │   ├── services/               # Axios services for API integration
│   │   │   ├── api.js              # Instance configuration
│   │   │   ├── authService.js      # Auth API endpoints
│   │   │   └── jobService.js       # Jobs API endpoints
│   │   ├── App.jsx                 # Routing configuration
│   │   └── main.jsx                # Application root mount file
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json                 # Hosting deployment profile
│
└── README.md
```

---

## API Endpoints

### Authentication Group
| Method | Endpoint | Authorization | Description |
|---|---|---|---|
| `POST` | `/auth/register` | No | Creates a new user record |
| `POST` | `/auth/login` | No | Returns a bearer JWT access token |
| `POST` | `/auth/token` | No | Standard OAuth2-compatible token endpoint |
| `GET` | `/auth/me` | Yes | Retrieves current user identity profile |

### Job Application Group
| Method | Endpoint | Authorization | Description |
|---|---|---|---|
| `POST` | `/jobs/applications` | Yes | Adds a new job tracking application |
| `GET` | `/jobs/applications` | Yes | Lists all job applications for user |
| `GET` | `/jobs/applications/{id}` | Yes | Retrieves specific application details |
| `PUT` | `/jobs/applications/{id}` | Yes | Modifies a specific application record |
| `DELETE`| `/jobs/applications/{id}` | Yes | Deletes a job application record |

### Analytics Dashboard Group
| Method | Endpoint | Authorization | Description |
|---|---|---|---|
| `GET` | `/dashboard/stats` | Yes | Fetches key summary metrics and counts |
| `GET` | `/dashboard/recent-applications`| Yes | Lists 5 latest job applications |

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/shouqatazeez/hiretrack.git
cd hiretrack
```

### 2. Backend Setup
Create a Python virtual environment and install the required dependencies:
```bash
cd backend
python -m venv venv
venv\Scripts\activate              # Windows
# source venv/bin/activate         # macOS / Linux
pip install -r requirements.txt
```

### 3. Backend Environment Variables
Create a `.env` file in the `backend/` directory:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/hiretrack_db
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```
*(For local development without PostgreSQL, you can use SQLite by leaving the DATABASE_URL empty or setting it to `sqlite:///./sql_app.db`)*

### 4. Run the Backend Server
```bash
uvicorn app.main:app --reload
```
View the interactive swagger docs at `http://127.0.0.1:8000/docs`.

### 5. Frontend Setup
Open a new terminal session, navigate to the `frontend/` directory, and install node packages:
```bash
cd frontend
npm install
```

### 6. Frontend Environment Variables
Create a `.env.local` file in the `frontend/` directory:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 7. Launch Frontend App
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Roadmap

- [ ] **Interview date reminder:** Auto-schedule and set notifications for upcoming interviews.
- [ ] **Resume upload:** Upload and link CV/Resume PDF files directly to job applications.
- [ ] **CSV export:** Export application history data to structured CSV / Excel files.
- [ ] **AI cover letter generator:** Generate personalized cover letters tailored to job descriptions.
- [ ] **AI interview question generator:** Generate tailored practice questions for the specific role.
- [ ] **AI resume-to-job match score:** Measure match score percentages between your resume and a job listing.

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