from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class JobApplicationBase(BaseModel):
	company_name: str = Field(..., min_length=1, max_length=255, description="Company name")
	job_title: str = Field(..., min_length=1, max_length=255, description="Job title")
	job_url: Optional[str] = Field(None, description="Job posting URL")
	status: str = Field("applied", min_length=1, max_length=50, description="Application status")


class JobApplicationCreate(JobApplicationBase):
	user_id: int = Field(..., description="User ID owning the application")
	applied_at: Optional[datetime] = Field(None, description="When the application was submitted")


class JobApplicationUpdate(BaseModel):
	company_name: Optional[str] = Field(None, min_length=1, max_length=255, description="Company name")
	job_title: Optional[str] = Field(None, min_length=1, max_length=255, description="Job title")
	job_url: Optional[str] = Field(None, description="Job posting URL")
	status: Optional[str] = Field(None, min_length=1, max_length=50, description="Application status")
	applied_at: Optional[datetime] = Field(None, description="When the application was submitted")

	class Config:
		from_attributes = True


class JobApplicationResponse(JobApplicationBase):
	id: int
	user_id: int
	applied_at: datetime
	created_at: datetime
	updated_at: datetime

	class Config:
		from_attributes = True
