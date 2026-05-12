from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


class JobApplication(Base):
	__tablename__ = "job_applications"

	id = Column(Integer, primary_key=True, index=True)
	user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
	company_name = Column(String, nullable=False)
	job_title = Column(String, nullable=False)
	job_url = Column(String, nullable=True)
	status = Column(String, default="applied", nullable=False)
	applied_at = Column(DateTime, default=datetime.utcnow, nullable=False)
	created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
	updated_at = Column(
		DateTime,
		default=datetime.utcnow,
		onupdate=datetime.utcnow,
		nullable=False,
	)

	user = relationship("User", back_populates="job_applications")
