from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.login import router as login_router


app = FastAPI()


@app.get("/")
def home():
    return {"message": "HireTrack backend running"}


app.include_router(auth_router)
app.include_router(login_router)