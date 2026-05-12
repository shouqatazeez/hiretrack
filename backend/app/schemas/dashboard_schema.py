from pydantic import BaseModel, Field


class DashboardStatsResponse(BaseModel):
	total_applications: int = Field(..., ge=0, description="Total job applications for the current user")
	applications_last_7_days: int = Field(..., ge=0, description="Applications created in the last 7 days")
	status_breakdown: dict[str, int] = Field(
		default_factory=dict,
		description="Count of applications grouped by status",
	)

	class Config:
		from_attributes = True