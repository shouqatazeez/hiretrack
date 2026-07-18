from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.core.database import Base, engine
from app.models.job import JobApplication

from app.models.user import User
from app.models.resume import Resume
from app.routes.auth import router as auth_router
from app.routes.dashboard import router as dashboard_router
from app.routes.job import router as job_router
from app.routes.login import router as login_router
from app.routes.resume import router as resume_router
from app.routes.ai import router as ai_router


limiter = Limiter(key_func=get_remote_address)

app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://myhiretrack.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def create_tables() -> None:
    Base.metadata.create_all(bind=engine)

    # Dynamic migration for AI Workspace columns
    from sqlalchemy import inspect, text
    inspector = inspect(engine)
    if inspector.has_table("job_applications"):
        columns = [col['name'] for col in inspector.get_columns("job_applications")]
        with engine.begin() as conn:
            if "ai_match_score" not in columns:
                conn.execute(text("ALTER TABLE job_applications ADD COLUMN ai_match_score JSON NULL"))
            if "ai_match_score_updated_at" not in columns:
                conn.execute(text("ALTER TABLE job_applications ADD COLUMN ai_match_score_updated_at TIMESTAMP NULL"))
            if "ai_interview_questions" not in columns:
                conn.execute(text("ALTER TABLE job_applications ADD COLUMN ai_interview_questions JSON NULL"))
            if "ai_interview_questions_updated_at" not in columns:
                conn.execute(text("ALTER TABLE job_applications ADD COLUMN ai_interview_questions_updated_at TIMESTAMP NULL"))
            if "ai_cover_letter" not in columns:
                conn.execute(text("ALTER TABLE job_applications ADD COLUMN ai_cover_letter TEXT NULL"))
            if "ai_cover_letter_updated_at" not in columns:
                conn.execute(text("ALTER TABLE job_applications ADD COLUMN ai_cover_letter_updated_at TIMESTAMP NULL"))


@app.get("/")
def home():
    return {"message": "HireTrack backend running"}


app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(job_router)
app.include_router(login_router)
app.include_router(resume_router)
app.include_router(ai_router)
