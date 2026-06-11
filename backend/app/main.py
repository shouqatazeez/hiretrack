from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine
from app.models.job import JobApplication
from app.models.user import User
from app.models.resume import Resume
from app.routes.auth import router as auth_router
from app.routes.dashboard import router as dashboard_router
from app.routes.job import router as job_router
from app.routes.login import router as login_router
from app.routes.resume import router as resume_router


app = FastAPI()

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


@app.get("/")
def home():
    return {"message": "HireTrack backend running"}


app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(job_router)
app.include_router(login_router)
app.include_router(resume_router)
