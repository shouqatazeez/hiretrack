from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

import csv
import io

from app.core.database import get_db
from app.models.job import JobApplication as JobApplicationModel
from app.models.user import User as UserModel
from app.schemas.job_schema import JobApplicationCreate, JobApplicationResponse, JobApplicationUpdate
from app.utils.dependencies import get_current_user


router = APIRouter(prefix="/jobs", tags=["job-applications"])


@router.get("/applications/export")
def export_applications_csv(
	db: Session = Depends(get_db),
	current_user: UserModel = Depends(get_current_user),
):
	"""Export all job applications as a CSV file."""
	jobs = (
		db.query(JobApplicationModel)
		.filter(JobApplicationModel.user_id == current_user.id)
		.order_by(JobApplicationModel.created_at.desc())
		.all()
	)

	output = io.StringIO()
	writer = csv.writer(output)
	writer.writerow(["Company", "Job Title", "Status", "Applied Date", "Interview Date", "Job URL", "Created At"])

	for job in jobs:
		writer.writerow([
			job.company_name,
			job.job_title,
			job.status,
			job.applied_at.strftime("%Y-%m-%d") if job.applied_at else "",
			job.interview_date.strftime("%Y-%m-%d %H:%M") if job.interview_date else "",
			job.job_url or "",
			job.created_at.strftime("%Y-%m-%d") if job.created_at else "",
		])

	output.seek(0)
	return StreamingResponse(
		iter([output.getvalue()]),
		media_type="text/csv",
		headers={"Content-Disposition": "attachment; filename=hiretrack_applications.csv"},
	)


@router.post("/applications", response_model=JobApplicationResponse, status_code=status.HTTP_201_CREATED)
def create_job_application(
	application: JobApplicationCreate,
	db: Session = Depends(get_db),
	current_user: UserModel = Depends(get_current_user),
):
	payload = application.model_dump(exclude_unset=True)
	payload.pop("user_id", None)
	payload["user_id"] = current_user.id

	db_application = JobApplicationModel(**payload)
	db.add(db_application)
	db.commit()
	db.refresh(db_application)

	return db_application


@router.get("/applications", response_model=list[JobApplicationResponse])
def list_job_applications(
	db: Session = Depends(get_db),
	current_user: UserModel = Depends(get_current_user),
):
	return (
		db.query(JobApplicationModel)
		.filter(JobApplicationModel.user_id == current_user.id)
		.order_by(JobApplicationModel.created_at.desc())
		.all()
	)


@router.get("/applications/{application_id}", response_model=JobApplicationResponse)
def read_job_application(
	application_id: int,
	db: Session = Depends(get_db),
	current_user: UserModel = Depends(get_current_user),
):
	application = (
		db.query(JobApplicationModel)
		.filter(
			JobApplicationModel.id == application_id,
			JobApplicationModel.user_id == current_user.id,
		)
		.first()
	)
	if application is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job application not found")

	return application


@router.put("/applications/{application_id}", response_model=JobApplicationResponse)
def update_job_application(
	application_id: int,
	application_in: JobApplicationUpdate,
	db: Session = Depends(get_db),
	current_user: UserModel = Depends(get_current_user),
):
	application = (
		db.query(JobApplicationModel)
		.filter(
			JobApplicationModel.id == application_id,
			JobApplicationModel.user_id == current_user.id,
		)
		.first()
	)
	if application is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job application not found")

	update_data = application_in.model_dump(exclude_unset=True)
	for field, value in update_data.items():
		setattr(application, field, value)

	db.commit()
	db.refresh(application)

	return application


@router.delete("/applications/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job_application(
	application_id: int,
	db: Session = Depends(get_db),
	current_user: UserModel = Depends(get_current_user),
):
	application = (
		db.query(JobApplicationModel)
		.filter(
			JobApplicationModel.id == application_id,
			JobApplicationModel.user_id == current_user.id,
		)
		.first()
	)
	if application is None:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job application not found")

	db.delete(application)
	db.commit()
