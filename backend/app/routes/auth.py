from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import bcrypt

from app.core.database import get_db
from app.models.user import User as UserModel
from app.schemas.user_schema import UserRegister, UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserRegister, db: Session = Depends(get_db)):
	
	existing = db.query(UserModel).filter(UserModel.email == user.email).first()
	if existing:
		raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

	
	hashed = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

	# Create and persist the user
	db_user = UserModel(email=user.email, full_name=user.full_name, hashed_password=hashed)
	db.add(db_user)
	db.commit()
	db.refresh(db_user)

	return db_user
