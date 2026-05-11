from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User as UserModel
from app.schemas.user_schema import UserRegister, UserResponse
from app.utils.dependencies import get_current_user
from app.utils.security import hash_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserRegister, db: Session = Depends(get_db)):
	existing = db.query(UserModel).filter(UserModel.email == user.email).first()
	if existing:
		raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

	hashed = hash_password(user.password)

	# Create and persist the user
	db_user = UserModel(email=user.email, full_name=user.full_name, hashed_password=hashed)
	db.add(db_user)
	db.commit()
	db.refresh(db_user)

	return db_user


@router.get("/me", response_model=UserResponse)
def read_current_user(current_user: UserModel = Depends(get_current_user)):
	return current_user
