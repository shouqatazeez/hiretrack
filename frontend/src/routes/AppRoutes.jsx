import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage.jsx'
import RegisterPage from '../pages/auth/RegisterPage.jsx'
import DashboardPage from '../pages/dashboard/DashboardPage.jsx'
import JobsPage from '../pages/jobs/JobsPage.jsx'
import AddJobPage from '../pages/jobs/AddJobPage.jsx'
import JobDetailsPage from '../pages/jobs/JobDetailsPage.jsx'

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" replace />} />

			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/dashboard" element={<DashboardPage />} />
			<Route path="/jobs" element={<JobsPage />} />
			<Route path="/jobs/new" element={<AddJobPage />} />
			<Route path="/jobs/:jobId" element={<JobDetailsPage />} />

			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	)
}
