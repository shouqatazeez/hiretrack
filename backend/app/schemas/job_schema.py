from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class JobApplicationBase(BaseModel):
	company_name: str = Field(..., min_length=1, max_length=255, description="Company name")
	job_title: str = Field(..., min_length=1, max_length=255, description="Job title")
	job_url: Optional[str] = Field(None, description="Job posting URL")
	job_description: Optional[str] = Field(None, max_length=5000, description="Job description text")
	status: str = Field("applied", min_length=1, max_length=50, description="Application status")


class JobApplicationCreate(JobApplicationBase):
	user_id: Optional[int] = Field(None, description="User ID owning the application")
	applied_at: Optional[datetime] = Field(None, description="When the application was submitted")


class JobApplicationUpdate(BaseModel):
	company_name: Optional[str] = Field(None, min_length=1, max_length=255, description="Company name")
	job_title: Optional[str] = Field(None, min_length=1, max_length=255, description="Job title")
	job_url: Optional[str] = Field(None, description="Job posting URL")
	job_description: Optional[str] = Field(None, max_length=5000, description="Job description text")
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

	# AI results fields
	ai_match_score: Optional[dict] = None
	ai_match_score_updated_at: Optional[datetime] = None
	ai_interview_questions: Optional[dict] = None
	ai_interview_questions_updated_at: Optional[datetime] = None
	ai_cover_letter: Optional[str] = None
	ai_cover_letter_updated_at: Optional[datetime] = None

	class Config:
		from_attributes = True

