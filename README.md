# HireTrack

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F26?style=for-the-badge&logo=python&logoColor=white)](https://www.sqlalchemy.org/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

HireTrack is a production-ready, full-stack job application tracking platform engineered to streamline the job search workflow. It enables applicants to organize, monitor, and analyze their job search lifecycle from a single, centralized workspace. Built with a modern, decoupled architecture, the platform features a responsive React SPA frontend powered by Vite and a robust, high-performance FastAPI backend.

---

## 🔗 Live Demo & Preview

* **Live Platform:** [https://myhiretrack.vercel.app](https://myhiretrack.vercel.app) *(Placeholder for deployment)*
* **API Documentation:** [https://api.myhiretrack.vercel.app/docs](https://api.myhiretrack.vercel.app/docs) *(Placeholder for interactive Swagger docs)*

---

## ✨ Key Features

* **Secure Authentication:** JWT-based user login and registration with automatic authentication state persistence.
* **Seamless Onboarding:** Automatic redirection and instant login immediately after user registration.
* **Interactive Dashboard:** Real-time metrics highlighting total applications, recent activity, and a color-coded status breakdown.
* **Comprehensive Job Management:** Full CRUD (Create, Read, Update, Delete) capabilities for job applications with tracking for company names, job titles, application links, custom statuses, and dates.
* **Dynamic Search & Filtering:** Dynamic, client-side search engine and status-based filtering to instantly narrow down applications.
* **Responsive Fluid Design:** A fully optimized workspace interface that flows seamlessly across mobile, tablet, and ultra-wide monitor screens.
* **Automatic Interactive API Docs:** Dynamic Swagger UI and ReDoc generated automatically by the backend.

---

## 📸 Screenshots

| Dashboard Analytics | Applications Board |
|:---:|:---:|
| ![Dashboard Analytics Placeholder](https://raw.githubusercontent.com/username/project/main/screenshots/dashboard.png) | ![Applications Board Placeholder](https://raw.githubusercontent.com/username/project/main/screenshots/board.png) |

| Add/Edit Job Modal | Interactive API Docs |
|:---:|:---:|
| ![Modal Dialog Placeholder](https://raw.githubusercontent.com/username/project/main/screenshots/modal.png) | ![Swagger Docs Placeholder](https://raw.githubusercontent.com/username/project/main/screenshots/swagger.png) |

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React 19, JavaScript (ES6+)
* **Build Tool:** Vite
* **Routing:** React Router v7
* **State & Forms:** React Hook Form, Custom Context API
* **Validation:** Zod (Schema-based validation)
* **Styling:** Tailwind CSS v4, Radix UI (Headless primitives)
* **HTTP Client:** Axios (Interceptors for global JWT attachment)

### Backend
* **Framework:** FastAPI (Python 3.10+)
* **ORM:** SQLAlchemy
* **Database Driver:** Psycopg2 (PostgreSQL integration)
* **Authentication:** Passlib (bcrypt hashing), PyJWT (token generation and parsing)
* **Environment Configuration:** Python-dotenv

### Database & Deployment
* **Local Database:** SQLite
* **Production Database:** PostgreSQL
* **Hosting Platform:** Vercel

---

## 📐 Project Architecture

```mermaid
graph TD
    User([User / Browser]) <--> |HTTPS| Frontend[React Client - SPA]
    
    subgraph Frontend Client
        Router[React Router]
        AuthContext[Auth Context]
        AxiosClient[Axios Instance / Interceptors]
    end
    
    Frontend <--> |JSON API / Bearer Token| Backend[FastAPI Application]
    
    subgraph FastAPI Service
        AuthRouter[Auth / Login Routes]
        JobRouter[Job Management Routes]
        DashRouter[Dashboard Routes]
        SQLA[SQLAlchemy ORM]
    end
    
    Backend <--> |SQL Queries| Database[(PostgreSQL / SQLite)]
```

---

## 📂 Codebase Folder Structure

```text
hiretrack/
├── backend/                  # Python FastAPI Backend
│   ├── app/
│   │   ├── core/             # Database connection and config management
│   │   ├── models/           # SQLAlchemy Database Models (User, JobApplication)
│   │   ├── routes/           # FastAPI API Endpoints (Auth, Dashboard, Job)
│   │   ├── schemas/          # Pydantic Schemas for validation and serialization
│   │   ├── services/         # Business logic layer
│   │   ├── utils/            # JWT Token management and auth dependencies
│   │   └── main.py           # Application entrypoint and middleware config
│   ├── requirements.txt      # Backend Python dependencies
│   └── hiretrack.db          # Local SQLite development database
│
├── frontend/                 # React Frontend Client
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable layout and UI components
│   │   ├── context/          # React Context providers (AuthContext)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── layouts/          # Page layouts
│   │   ├── pages/            # Core views (Dashboard, Jobs, Login, Register)
│   │   ├── routes/           # Client routing tables
│   │   ├── services/         # API abstraction layer (Axios endpoints)
│   │   ├── App.jsx           # App entrypoint & routing setup
│   │   └── main.jsx          # React DOM mounting point
│   ├── package.json          # Frontend JavaScript dependencies
│   └── vite.config.js        # Vite bundler configuration
```

---

## ⚙️ Environment Variables

### Backend Configuration (`backend/.env`)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/hiretrack_db
SECRET_KEY=your_super_secret_jwt_sign_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend Configuration (`frontend/.env.local`)

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

---

## 🚀 Installation & Local Setup

### Prerequisites
* Python 3.10 or higher
* Node.js 18 or higher
* PostgreSQL (Optional, defaults to SQLite if configuration is adjusted)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/hiretrack.git
cd hiretrack
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/Scripts/activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the `backend/` directory using the reference above.
5. Launch the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
   *The backend api server will start running on `http://127.0.0.1:8000`*

### 3. Frontend Setup
1. Open a new terminal session and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `frontend/` directory using the reference above.
4. Launch the Vite development server:
   ```bash
   npm run dev
   ```
   *The React application will launch at `http://localhost:5173`*

---

## 📡 API Reference

Interactive API docs can be accessed at `http://127.0.0.1:8000/docs` once the backend server is running.

### Authentication Endpoints

| Endpoint | Method | Auth Required | Description |
|:---|:---:|:---:|:---|
| `/auth/register` | `POST` | No | Register a new user account |
| `/auth/login` | `POST` | No | Login credentials exchange for JWT |
| `/auth/token` | `POST` | No | OAuth2 password request form for token |
| `/auth/me` | `GET` | Yes (Bearer) | Retrieve authenticated user profile |

### Job Application Endpoints

| Endpoint | Method | Auth Required | Description |
|:---|:---:|:---:|:---|
| `/jobs/applications` | `GET` | Yes (Bearer) | List all job applications for the user |
| `/jobs/applications` | `POST` | Yes (Bearer) | Create a new job application |
| `/jobs/applications/{id}` | `GET` | Yes (Bearer) | Fetch details of a specific application |
| `/jobs/applications/{id}` | `PUT` | Yes (Bearer) | Update details of a specific application |
| `/jobs/applications/{id}` | `DELETE` | Yes (Bearer) | Remove a job application |

### Dashboard Endpoints

| Endpoint | Method | Auth Required | Description |
|:---|:---:|:---:|:---|
| `/dashboard/stats` | `GET` | Yes (Bearer) | Retrieve aggregated job application metrics |
| `/dashboard/recent-applications` | `GET` | Yes (Bearer) | Fetch the 5 most recently created applications |

---

## 🔮 Future Enhancements

* **Kanban Board View:** Drag-and-drop workspace layout to move applications visually between pipeline columns.
* **Resume Parsing:** Automatic parsing of PDFs to autofill company, job title, and application details.
* **Calendar Integration:** Interactive calendar syncing interview dates with Google Calendar and Outlook.
* **Daily Digest Email Alerts:** Auto-reminders for scheduled interviews or pending application follow-ups.
* **Export Data:** Download all job applications in CSV/Excel formats for custom offline tracking.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.