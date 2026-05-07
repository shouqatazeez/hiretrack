from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
	email: EmailStr = Field(..., description="User email address")
	full_name: str = Field(..., min_length=1, max_length=255, description="User full name")
	password: str = Field(
		...,
		min_length=8,
		description="User password (minimum 8 characters)",
	)


class UserResponse(BaseModel):
	id: int
	email: str
	full_name: str
	is_active: bool
	created_at: datetime
	updated_at: datetime

	class Config:
		from_attributes = True


class UserUpdate(BaseModel):
	full_name: Optional[str] = Field(
		None,
		min_length=1,
		max_length=255,
		description="User full name",
	)
	email: Optional[EmailStr] = Field(None, description="User email address")

	class Config:
		from_attributes = True


class UserLogin(BaseModel):
	email: EmailStr = Field(..., description="User email address")
	password: str = Field(..., description="User password")
