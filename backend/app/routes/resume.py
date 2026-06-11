from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.resume import Resume
from app.models.user import User
from app.schemas.resume_schema import ResumeResponse
from app.utils.dependencies import get_current_user

try:
	from pypdf import PdfReader
except ImportError:
	PdfReader = None

router = APIRouter(prefix="/resume", tags=["resume"])

MAX_FILE_SIZE = 5 * 1024 * 1024


def extract_text_from_pdf(file_bytes: bytes) -> str:
	"""Extract text content from PDF bytes."""
	if PdfReader is None:
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail="PDF parsing library not available.",
		)

	import io

	reader = PdfReader(io.BytesIO(file_bytes))
	text_parts = []
	for page in reader.pages:
		page_text = page.extract_text()
		if page_text:
			text_parts.append(page_text)

	full_text = "\n".join(text_parts).strip()
	if not full_text:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Could not extract any text from the PDF. Make sure it's not a scanned image.",
		)

	return full_text


@router.post("/upload", response_model=ResumeResponse, status_code=status.HTTP_201_CREATED)
async def upload_resume(
	file: UploadFile = File(...),
	db: Session = Depends(get_db),
	current_user: User = Depends(get_current_user),
):
	if file.content_type != "application/pdf":
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="Only PDF files are accepted.",
		)

	file_bytes = await file.read()
	if len(file_bytes) > MAX_FILE_SIZE:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail="File size exceeds 5 MB limit.",
		)

	extracted_text = extract_text_from_pdf(file_bytes)

	existing = db.query(Resume).filter(Resume.user_id == current_user.id).first()
	if existing:
		db.delete(existing)
		db.flush()

	resume = Resume(
		user_id=current_user.id,
		filename=file.filename or "resume.pdf",
		extracted_text=extracted_text,
	)
	db.add(resume)
	db.commit()
	db.refresh(resume)

	return resume


@router.get("", response_model=ResumeResponse)
def get_resume(
	db: Session = Depends(get_db),
	current_user: User = Depends(get_current_user),
):
	resume = db.query(Resume).filter(Resume.user_id == current_user.id).first()
	if not resume:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="No resume uploaded yet.",
		)
	return resume


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
def delete_resume(
	db: Session = Depends(get_db),
	current_user: User = Depends(get_current_user),
):
	resume = db.query(Resume).filter(Resume.user_id == current_user.id).first()
	if not resume:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail="No resume to delete.",
		)
	db.delete(resume)
	db.commit()
