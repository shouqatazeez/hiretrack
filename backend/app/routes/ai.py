from datetime import datetime, timezone

from fastapi import APIRouter, Body, Depends, HTTPException, Request, status
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy.orm import Session

from app.core.config import GEMINI_API_KEY
from app.core.database import get_db
from app.models.job import JobApplication
from app.models.resume import Resume
from app.models.user import User
from app.services.ai_service import evaluate_answer, generate_cover_letter, generate_interview_questions, generate_referral_message, get_match_score
from app.utils.dependencies import get_current_user


router = APIRouter(prefix="/jobs/applications", tags=["ai"])
limiter = Limiter(key_func=get_remote_address)


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
@limiter.limit("5/minute")
async def match_score(
    request: Request,
    job_id: int,
    regenerate: bool = False,
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

    if job.ai_match_score and not regenerate:
        return job.ai_match_score

    resume = _get_resume_or_400(current_user.id, db)

    result = await get_match_score(
        resume_text=resume.extracted_text,
        job_title=job.job_title,
        company_name=job.company_name,
        job_description=job.job_description,
    )

    from datetime import datetime
    job.ai_match_score = result
    job.ai_match_score_updated_at = datetime.now(timezone.utc)
    db.commit()

    return result


@router.post("/{job_id}/interview-questions")
@limiter.limit("5/minute")
async def interview_questions(
    request: Request,
    job_id: int,
    regenerate: bool = False,
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

    if job.ai_interview_questions and not regenerate:
        return job.ai_interview_questions

    resume = db.query(Resume).filter(Resume.user_id == current_user.id).first()
    resume_text = resume.extracted_text if resume else ""

    result = await generate_interview_questions(
        job_title=job.job_title,
        company_name=job.company_name,
        job_description=job.job_description,
        resume_text=resume_text,
    )

    from datetime import datetime
    job.ai_interview_questions = result
    job.ai_interview_questions_updated_at = datetime.now(timezone.utc)
    db.commit()

    return result


@router.post("/{job_id}/cover-letter")
@limiter.limit("5/minute")
async def cover_letter(
    request: Request,
    job_id: int,
    regenerate: bool = False,
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

    if job.ai_cover_letter and not regenerate:
        return {"cover_letter": job.ai_cover_letter}

    resume = _get_resume_or_400(current_user.id, db)

    result = await generate_cover_letter(
        resume_text=resume.extracted_text,
        job_title=job.job_title,
        company_name=job.company_name,
        job_description=job.job_description,
        user_name=current_user.full_name,
    )

    from datetime import datetime
    job.ai_cover_letter = result.get("cover_letter")
    job.ai_cover_letter_updated_at = datetime.now(timezone.utc)
    db.commit()

    return result


@router.post("/{job_id}/answer-feedback")
@limiter.limit("5/minute")
async def answer_feedback(
    request: Request,
    job_id: int,
    question: str = Body(..., max_length=1000),
    answer: str = Body(..., max_length=5000),
    category: str = Body("", max_length=100),
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

    result = await evaluate_answer(
        question=question,
        answer=answer,
        job_title=job.job_title,
        category=category,
    )
    return result


@router.post("/{job_id}/referral-message")
@limiter.limit("5/minute")
async def referral_message(
    request: Request,
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

    result = await generate_referral_message(
        resume_text=resume.extracted_text,
        job_title=job.job_title,
        company_name=job.company_name,
        job_description=job.job_description,
        user_name=current_user.full_name,
    )
    return result
