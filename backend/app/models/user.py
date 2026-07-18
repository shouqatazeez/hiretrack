from datetime import datetime, timezone

from sqlalchemy import Boolean, Column, DateTime, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


def _utc_now():
	return datetime.now(timezone.utc)


class User(Base):
	__tablename__ = "users"

	id = Column(Integer, primary_key=True, index=True)
	email = Column(String, unique=True, index=True, nullable=False)
	full_name = Column(String, nullable=False)
	hashed_password = Column(String, nullable=False)
	is_active = Column(Boolean, default=True, nullable=False)
	created_at = Column(DateTime, default=_utc_now, nullable=False)
	updated_at = Column(
		DateTime,
		default=_utc_now,
		onupdate=_utc_now,
		nullable=False,
	)
	job_applications = relationship("JobApplication", back_populates="user", cascade="all, delete-orphan")
	resume = relationship("Resume", back_populates="user", uselist=False, cascade="all, delete-orphan")
