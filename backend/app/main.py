from fastapi import FastAPI
from app.core.database import Base, engine
from app.models.job import JobApplication 
from app.models.user import User  
from app.routes.auth import router as auth_router
from app.routes.job import router as job_router
from app.routes.login import router as login_router


app = FastAPI()


@app.on_event("startup")
def create_tables() -> None:
    Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "HireTrack backend running"}


app.include_router(auth_router)
app.include_router(job_router)
app.include_router(login_router)