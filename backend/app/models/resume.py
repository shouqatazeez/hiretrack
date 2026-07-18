from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.core.database import Base


def _utc_now():
	return datetime.now(timezone.utc)


class Resume(Base):
	__tablename__ = "resumes"

	id = Column(Integer, primary_key=True, index=True)
	user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True, index=True)
	filename = Column(String, nullable=False)
	extracted_text = Column(Text, nullable=False)
	uploaded_at = Column(DateTime, default=_utc_now, nullable=False)

	user = relationship("User", back_populates="resume")
