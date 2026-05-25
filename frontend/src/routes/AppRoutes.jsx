import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage.jsx'
import RegisterPage from '../pages/auth/RegisterPage.jsx'
import DashboardPage from '../pages/dashboard/DashboardPage.jsx'
import JobsPage from '../pages/jobs/JobsPage.jsx'
import AddJobPage from '../pages/jobs/AddJobPage.jsx'
import JobDetailsPage from '../pages/jobs/JobDetailsPage.jsx'
import MainLayout from '../layouts/dashboard/MainLayout.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

function LegacyJobDetailsRedirect() {
	const { jobId } = useParams()

	return <Navigate to={`/dashboard/jobs/${jobId}`} replace />
}

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/dashboard" replace />} />

			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<MainLayout />
					</ProtectedRoute>
				}
			>
				<Route index element={<DashboardPage />} />
				<Route path="jobs" element={<JobsPage />} />
				<Route path="jobs/new" element={<AddJobPage />} />
				<Route path="jobs/:jobId" element={<JobDetailsPage />} />
			</Route>

			<Route path="/jobs" element={<Navigate to="/dashboard/jobs" replace />} />
			<Route path="/jobs/new" element={<Navigate to="/dashboard/jobs/new" replace />} />
			<Route path="/jobs/:jobId" element={<LegacyJobDetailsRedirect />} />

			<Route path="*" element={<Navigate to="/dashboard" replace />} />
		</Routes>
	)
}
