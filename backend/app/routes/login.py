from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES
from app.core.database import get_db
from app.models.user import User as UserModel
from app.schemas.token_schema import Token
from app.schemas.user_schema import UserLogin
from app.utils.security import create_access_token, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
	user_in_db = db.query(UserModel).filter(UserModel.email == user.email).first()
	if not user_in_db:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Invalid email or password",
		)

	if not verify_password(user.password, user_in_db.hashed_password):
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Invalid email or password",
		)

	access_token = create_access_token(
		data={"sub": str(user_in_db.id), "email": user_in_db.email},
		expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
	)

	return {"access_token": access_token, "token_type": "bearer"}