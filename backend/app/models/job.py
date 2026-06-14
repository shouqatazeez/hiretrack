from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text, JSON
from sqlalchemy.orm import relationship

from app.core.database import Base


class JobApplication(Base):
	__tablename__ = "job_applications"

	id = Column(Integer, primary_key=True, index=True)
	user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
	company_name = Column(String, nullable=False)
	job_title = Column(String, nullable=False)
	job_url = Column(String, nullable=True)
	job_description = Column(Text, nullable=True)
	status = Column(String, default="applied", nullable=False)
	interview_date = Column(DateTime, nullable=True)
	applied_at = Column(DateTime, default=datetime.utcnow, nullable=False)
	created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
	updated_at = Column(
		DateTime,
		default=datetime.utcnow,
		onupdate=datetime.utcnow,
		nullable=False,
	)

	# AI Workspace fields
	ai_match_score = Column(JSON, nullable=True)
	ai_match_score_updated_at = Column(DateTime, nullable=True)
	ai_interview_questions = Column(JSON, nullable=True)
	ai_interview_questions_updated_at = Column(DateTime, nullable=True)
	ai_cover_letter = Column(Text, nullable=True)
	ai_cover_letter_updated_at = Column(DateTime, nullable=True)

	user = relationship("User", back_populates="job_applications")

