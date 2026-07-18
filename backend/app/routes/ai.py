from datetime import datetime, timezone
from dataclasses import dataclass
from typing import Optional

from fastapi import APIRouter, Body, Depends, HTTPException, Path, Request, status
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy.orm import Session

from app.core.config import GEMINI_API_KEY
from app.core.database import get_db
from app.models.job import JobApplication
from app.models.resume import Resume
from app.models.user import User
from app.services.ai_service import (
    evaluate_answer,
    generate_cover_letter,
    generate_interview_questions,
    generate_referral_message,
    get_match_score,
)
from app.utils.dependencies import get_current_user


router = APIRouter(prefix="/jobs/applications", tags=["ai"])
limiter = Limiter(key_func=get_remote_address)


@dataclass
class AIContext:
    """Validated context shared by all AI endpoints."""
    job: JobApplication
    resume: Optional[Resume]
    user: User
    db: Session


def get_ai_context(
    job_id: int = Path(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> AIContext:
    """
    Central dependency for AI routes. Validates:
    1. AI service is configured
    2. Job exists and belongs to the current user
    3. Loads the user's resume (if any)
    """
    if not GEMINI_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI service is not configured.",
        )

    job = (
        db.query(JobApplication)
        .filter(JobApplication.id == job_id, JobApplication.user_id == current_user.id)
        .first()
    )
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job application not found",
        )

    resume = db.query(Resume).filter(Resume.user_id == current_user.id).first()

    return AIContext(job=job, resume=resume, user=current_user, db=db)


def _require_description(job: JobApplication, action: str):
    """Raise 400 if job has no description."""
    if not job.job_description:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Add a job description first to {action}.",
        )


def _require_resume(ctx: AIContext) -> Resume:
    """Raise 400 if no resume is uploaded."""
    if not ctx.resume:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Upload your resume first to use AI features.",
        )
    return ctx.resume


@router.post("/{job_id}/match-score")
@limiter.limit("5/minute")
async def match_score(
    request: Request,
    regenerate: bool = False,
    ctx: AIContext = Depends(get_ai_context),
):
    _require_description(ctx.job, "get a match score")

    if ctx.job.ai_match_score and not regenerate:
        return ctx.job.ai_match_score

    resume = _require_resume(ctx)

    result = await get_match_score(
        resume_text=resume.extracted_text,
        job_title=ctx.job.job_title,
        company_name=ctx.job.company_name,
        job_description=ctx.job.job_description,
    )

    ctx.job.ai_match_score = result
    ctx.job.ai_match_score_updated_at = datetime.now(timezone.utc)
    ctx.db.commit()

    return result


@router.post("/{job_id}/interview-questions")
@limiter.limit("5/minute")
async def interview_questions(
    request: Request,
    regenerate: bool = False,
    ctx: AIContext = Depends(get_ai_context),
):
    _require_description(ctx.job, "generate interview questions")

    if ctx.job.ai_interview_questions and not regenerate:
        return ctx.job.ai_interview_questions

    resume_text = ctx.resume.extracted_text if ctx.resume else ""

    result = await generate_interview_questions(
        job_title=ctx.job.job_title,
        company_name=ctx.job.company_name,
        job_description=ctx.job.job_description,
        resume_text=resume_text,
    )

    ctx.job.ai_interview_questions = result
    ctx.job.ai_interview_questions_updated_at = datetime.now(timezone.utc)
    ctx.db.commit()

    return result


@router.post("/{job_id}/cover-letter")
@limiter.limit("5/minute")
async def cover_letter(
    request: Request,
    regenerate: bool = False,
    ctx: AIContext = Depends(get_ai_context),
):
    _require_description(ctx.job, "generate a cover letter")

    if ctx.job.ai_cover_letter and not regenerate:
        return {"cover_letter": ctx.job.ai_cover_letter}

    resume = _require_resume(ctx)

    result = await generate_cover_letter(
        resume_text=resume.extracted_text,
        job_title=ctx.job.job_title,
        company_name=ctx.job.company_name,
        job_description=ctx.job.job_description,
        user_name=ctx.user.full_name,
    )

    ctx.job.ai_cover_letter = result.get("cover_letter")
    ctx.job.ai_cover_letter_updated_at = datetime.now(timezone.utc)
    ctx.db.commit()

    return result


@router.post("/{job_id}/answer-feedback")
@limiter.limit("5/minute")
async def answer_feedback(
    request: Request,
    question: str = Body(..., max_length=1000),
    answer: str = Body(..., max_length=5000),
    category: str = Body("", max_length=100),
    ctx: AIContext = Depends(get_ai_context),
):
    if not answer.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Write an answer first before requesting feedback.",
        )

    result = await evaluate_answer(
        question=question,
        answer=answer,
        job_title=ctx.job.job_title,
        category=category,
    )
    return result


@router.post("/{job_id}/referral-message")
@limiter.limit("5/minute")
async def referral_message(
    request: Request,
    ctx: AIContext = Depends(get_ai_context),
):
    _require_description(ctx.job, "generate a referral message")
    resume = _require_resume(ctx)

    result = await generate_referral_message(
        resume_text=resume.extracted_text,
        job_title=ctx.job.job_title,
        company_name=ctx.job.company_name,
        job_description=ctx.job.job_description,
        user_name=ctx.user.full_name,
    )
    return result
