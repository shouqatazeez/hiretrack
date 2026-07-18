import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute.jsx'

const LandingPage = lazy(() => import('../pages/landing/LandingPage.jsx'))
const LoginPage = lazy(() => import('../pages/auth/LoginPage.jsx'))
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage.jsx'))
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage.jsx'))
const JobsPage = lazy(() => import('../pages/jobs/JobsPage.jsx'))
const AddJobPage = lazy(() => import('../pages/jobs/AddJobPage.jsx'))
const JobDetailsPage = lazy(() => import('../pages/jobs/JobDetailsPage.jsx'))
const EditJobPage = lazy(() => import('../pages/jobs/EditJobPage.jsx'))
const ResumePage = lazy(() => import('../pages/dashboard/ResumePage.jsx'))
const MainLayout = lazy(() => import('../layouts/dashboard/MainLayout.jsx'))

function PageLoader() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
		</div>
	)
}

function LegacyJobDetailsRedirect() {
	const { jobId } = useParams()

	return <Navigate to={`/dashboard/jobs/${jobId}`} replace />
}

export default function AppRoutes() {
	return (
		<Suspense fallback={<PageLoader />}>
			<Routes>
				<Route path="/" element={<LandingPage />} />

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
					<Route path="jobs/:jobId/edit" element={<EditJobPage />} />
					<Route path="resume" element={<ResumePage />} />
				</Route>

				<Route path="/jobs" element={<Navigate to="/dashboard/jobs" replace />} />
				<Route path="/jobs/new" element={<Navigate to="/dashboard/jobs/new" replace />} />
				<Route path="/jobs/:jobId" element={<LegacyJobDetailsRedirect />} />

				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</Suspense>
	)
}
