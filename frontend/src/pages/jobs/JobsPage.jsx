import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CirclePlus } from 'lucide-react'
import { fetchJobs } from '../../services/jobService'

const STATUS_CONFIG = {
	applied:      { label: 'Applied',      class: 'bg-blue-50 text-blue-600 ring-blue-100' },
	interviewing: { label: 'Interviewing', class: 'bg-amber-50 text-amber-600 ring-amber-100' },
	offered:      { label: 'Offered',      class: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
	rejected:     { label: 'Rejected',     class: 'bg-red-50 text-red-500 ring-red-100' },
	withdrawn:    { label: 'Withdrawn',    class: 'bg-slate-100 text-slate-500 ring-slate-200' },
}

function StatusBadge({ status }) {
	const config = STATUS_CONFIG[status] ?? { label: status, class: 'bg-slate-100 text-slate-500 ring-slate-200' }
	return (
		<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${config.class}`}>
			{config.label}
		</span>
	)
}

function CompanyAvatar({ name }) {
	const letter = name?.[0]?.toUpperCase() ?? '?'
	return (
		<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-700">
			{letter}
		</div>
	)
}

function SkeletonCard() {
	return (
		<div className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
			<div className="flex items-start gap-4">
				<div className="h-10 w-10 rounded-lg bg-slate-200" />
				<div className="flex-1 space-y-2">
					<div className="h-3 w-1/3 rounded bg-slate-200" />
					<div className="h-4 w-1/2 rounded bg-slate-200" />
				</div>
				<div className="h-5 w-20 rounded-full bg-slate-200" />
			</div>
		</div>
	)
}

export default function JobsPage() {
	const [jobs, setJobs]       = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError]     = useState(null)

	useEffect(() => {
		async function loadJobs() {
			try {
				const data = await fetchJobs()
				setJobs(data)
			} catch (err) {
				setError(err.response?.data?.detail ?? 'Failed to load jobs. Please try again.')
			} finally {
				setLoading(false)
			}
		}
		loadJobs()
	}, [])

	return (
		<div className="space-y-6">
			{/* Page header */}
			<div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Applications</p>
					<h2 className="mt-1 text-2xl font-semibold text-slate-900">Your Job Tracker</h2>
					<p className="mt-0.5 text-sm text-slate-500">
						{loading ? 'Loading...' : `${jobs.length} ${jobs.length === 1 ? 'application' : 'applications'} tracked`}
					</p>
				</div>
				<Link
					to="/dashboard/jobs/new"
					className="inline-flex items-center gap-2 self-start rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 sm:self-auto"
				>
					<CirclePlus className="h-4 w-4" />
					Add Job
				</Link>
			</div>

			{/* Loading skeletons */}
			{loading && (
				<div className="space-y-3">
					{[1, 2, 3].map((n) => <SkeletonCard key={n} />)}
				</div>
			)}

			{/* Error state */}
			{error && (
				<div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
					{error}
				</div>
			)}

			{/* Empty state */}
			{!loading && !error && jobs.length === 0 && (
				<div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
					<div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
						<CirclePlus className="h-5 w-5 text-slate-400" />
					</div>
					<p className="text-sm font-semibold text-slate-700">No applications yet</p>
					<p className="mt-1 text-sm text-slate-400">
						Start by tracking your first job application.
					</p>
					<Link
						to="/dashboard/jobs/new"
						className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
					>
						<CirclePlus className="h-4 w-4" />
						Add your first job
					</Link>
				</div>
			)}

			{/* Job list */}
			{!loading && !error && jobs.length > 0 && (
				<div className="space-y-3">
					{jobs.map((job) => (
						<Link
							key={job.id}
							to={`/dashboard/jobs/${job.id}`}
							className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
						>
							<CompanyAvatar name={job.company_name} />

							<div className="min-w-0 flex-1">
								<p className="text-xs font-medium text-slate-400">{job.company_name}</p>
								<h3 className="mt-0.5 text-base font-semibold text-slate-900">{job.job_title}</h3>
								{job.job_url && (
									<a
										href={job.job_url}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(e) => e.stopPropagation()}
										className="mt-0.5 inline-block text-xs text-slate-400 underline underline-offset-4 transition hover:text-slate-600"
									>
										View posting ↗
									</a>
								)}
								<p className="mt-2 text-xs text-slate-400">
									Applied {new Date(job.applied_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
								</p>
							</div>

							<StatusBadge status={job.status} />
						</Link>
					))}
				</div>
			)}
		</div>
	)
}