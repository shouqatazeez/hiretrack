from fastapi import FastAPI
from app.routes.auth import router as auth_router


app = FastAPI()


@app.get("/")
def home():
    return {"message": "HireTrack backend running"}


app.include_router(auth_router)