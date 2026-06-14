from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.job import JobApplication as JobApplicationModel
from app.models.user import User as UserModel
from app.schemas.dashboard_schema import DashboardStatsResponse
from app.schemas.job_schema import JobApplicationResponse
from app.utils.dependencies import get_current_user


router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/stats", response_model=DashboardStatsResponse)
def get_dashboard_stats(
	db: Session = Depends(get_db),
	current_user: UserModel = Depends(get_current_user),
):
	seven_days_ago = datetime.utcnow() - timedelta(days=7)

	total_applications = (
		db.query(func.count(JobApplicationModel.id))
		.filter(JobApplicationModel.user_id == current_user.id)
		.scalar()
	)

	applications_last_7_days = (
		db.query(func.count(JobApplicationModel.id))
		.filter(
			JobApplicationModel.user_id == current_user.id,
			JobApplicationModel.created_at >= seven_days_ago,
		)
		.scalar()
	)

	status_rows = (
		db.query(JobApplicationModel.status, func.count(JobApplicationModel.id))
		.filter(JobApplicationModel.user_id == current_user.id)
		.group_by(JobApplicationModel.status)
		.all()
	)
	status_breakdown = {status: count for status, count in status_rows}

	return DashboardStatsResponse(
		total_applications=total_applications or 0,
		applications_last_7_days=applications_last_7_days or 0,
		status_breakdown=status_breakdown,
	)


@router.get("/recent-applications", response_model=list[JobApplicationResponse])
def get_recent_applications(
	limit: int = Query(5, ge=1, le=20, description="Number of recent applications to return"),
	db: Session = Depends(get_db),
	current_user: UserModel = Depends(get_current_user),
):
	return (
		db.query(JobApplicationModel)
		.filter(JobApplicationModel.user_id == current_user.id)
		.order_by(JobApplicationModel.created_at.desc())
		.limit(limit)
		.all()
	)


@router.get("/upcoming-interviews", response_model=list[JobApplicationResponse])
def get_upcoming_interviews(
	db: Session = Depends(get_db),
	current_user: UserModel = Depends(get_current_user),
):
	"""Get jobs with future interview dates, sorted by nearest first."""
	now = datetime.utcnow()
	return (
		db.query(JobApplicationModel)
		.filter(
			JobApplicationModel.user_id == current_user.id,
			JobApplicationModel.interview_date != None,
			JobApplicationModel.interview_date >= now,
		)
		.order_by(JobApplicationModel.interview_date.asc())
		.limit(10)
		.all()
	)
