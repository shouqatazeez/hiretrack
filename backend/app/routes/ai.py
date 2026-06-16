from fastapi import APIRouter, Body, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import GEMINI_API_KEY
from app.core.database import get_db
from app.models.job import JobApplication
from app.models.resume import Resume
from app.models.user import User
from app.services.ai_service import evaluate_answer, generate_cover_letter, generate_interview_questions, generate_referral_message, get_match_score
from app.utils.dependencies import get_current_user


router = APIRouter(prefix="/jobs/applications", tags=["ai"])


def _get_job_or_404(job_id: int, user_id: int, db: Session) -> JobApplication:
    job = (
        db.query(JobApplication)
        .filter(JobApplication.id == job_id, JobApplication.user_id == user_id)
        .first()
    )
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job application not found")
    return job


def _get_resume_or_400(user_id: int, db: Session) -> Resume:
    resume = db.query(Resume).filter(Resume.user_id == user_id).first()
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Upload your resume first to use AI features.",
        )
    return resume


def _check_ai_configured():
    if not GEMINI_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI service is not configured.",
        )


@router.post("/{job_id}/match-score")
def match_score(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    _check_ai_configured()
    job = _get_job_or_404(job_id, current_user.id, db)

    if not job.job_description:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Add a job description first to get a match score.",
        )

    resume = _get_resume_or_400(current_user.id, db)

    result = get_match_score(
        resume_text=resume.extracted_text,
        job_title=job.job_title,
        company_name=job.company_name,
        job_description=job.job_description,
    )

    from datetime import datetime
    job.ai_match_score = result
    job.ai_match_score_updated_at = datetime.utcnow()
    db.commit()

    return result


@router.post("/{job_id}/interview-questions")
def interview_questions(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    _check_ai_configured()
    job = _get_job_or_404(job_id, current_user.id, db)

    if not job.job_description:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Add a job description first to generate interview questions.",
        )

    resume = db.query(Resume).filter(Resume.user_id == current_user.id).first()
    resume_text = resume.extracted_text if resume else ""

    result = generate_interview_questions(
        job_title=job.job_title,
        company_name=job.company_name,
        job_description=job.job_description,
        resume_text=resume_text,
    )

    from datetime import datetime
    job.ai_interview_questions = result
    job.ai_interview_questions_updated_at = datetime.utcnow()
    db.commit()

    return result


@router.post("/{job_id}/cover-letter")
def cover_letter(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    _check_ai_configured()
    job = _get_job_or_404(job_id, current_user.id, db)

    if not job.job_description:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Add a job description first to generate a cover letter.",
        )

    resume = _get_resume_or_400(current_user.id, db)

    result = generate_cover_letter(
        resume_text=resume.extracted_text,
        job_title=job.job_title,
        company_name=job.company_name,
        job_description=job.job_description,
        user_name=current_user.full_name,
    )

    from datetime import datetime
    job.ai_cover_letter = result.get("cover_letter")
    job.ai_cover_letter_updated_at = datetime.utcnow()
    db.commit()

    return result


@router.post("/{job_id}/answer-feedback")
def answer_feedback(
    job_id: int,
    question: str = Body(...),
    answer: str = Body(...),
    category: str = Body(""),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    _check_ai_configured()
    job = _get_job_or_404(job_id, current_user.id, db)

    if not answer.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Write an answer first before requesting feedback.",
        )

    result = evaluate_answer(
        question=question,
        answer=answer,
        job_title=job.job_title,
        category=category,
    )
    return result


@router.post("/{job_id}/referral-message")
def referral_message(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    _check_ai_configured()
    job = _get_job_or_404(job_id, current_user.id, db)

    if not job.job_description:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Add a job description first to generate a referral message.",
        )

    resume = _get_resume_or_400(current_user.id, db)

    result = generate_referral_message(
        resume_text=resume.extracted_text,
        job_title=job.job_title,
        company_name=job.company_name,
        job_description=job.job_description,
        user_name=current_user.full_name,
    )
    return result
