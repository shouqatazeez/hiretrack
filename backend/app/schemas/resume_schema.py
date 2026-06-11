from datetime import datetime

from pydantic import BaseModel


class ResumeResponse(BaseModel):
	id: int
	user_id: int
	filename: str
	extracted_text: str
	uploaded_at: datetime

	class Config:
		from_attributes = True
