import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CirclePlus } from 'lucide-react'
import { fetchJobs } from '../../services/jobService'

const STATUS_CONFIG = {
	applied:      { label: 'Applied',      class: 'bg-sky-500/10 text-sky-300 ring-sky-500/20' },
	interviewing: { label: 'Interviewing', class: 'bg-amber-500/10 text-amber-300 ring-amber-500/20' },
	offered:      { label: 'Offered',      class: 'bg-primary/10 text-primary ring-primary/20' },
	rejected:     { label: 'Rejected',     class: 'bg-rose-500/10 text-rose-300 ring-rose-500/20' },
	withdrawn:    { label: 'Withdrawn',    class: 'bg-zinc-800 text-zinc-400 ring-zinc-700' },
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
		<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-sm font-semibold text-zinc-200">
			{letter}
		</div>
	)
}

function SkeletonCard() {
	return (
		<div className="animate-pulse rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-5 shadow-lg">
			<div className="flex items-start gap-4">
				<div className="h-10 w-10 rounded-lg bg-zinc-800" />
				<div className="flex-1 space-y-2">
					<div className="h-3 w-1/3 rounded bg-zinc-700" />
					<div className="h-4 w-1/2 rounded bg-zinc-700" />
				</div>
				<div className="h-5 w-20 rounded-full bg-zinc-800" />
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
		<div className="space-y-6 text-zinc-100">
			<div className="flex flex-col gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Applications</p>
					<h2 className="mt-1 text-2xl font-semibold text-zinc-50">Your Job Tracker</h2>
					<p className="mt-0.5 text-sm text-zinc-400">
						{loading ? 'Loading...' : `${jobs.length} ${jobs.length === 1 ? 'application' : 'applications'} tracked`}
					</p>
				</div>
				<Link
					to="/dashboard/jobs/new"
					className="inline-flex items-center gap-2 self-start rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 sm:self-auto"
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
				<div className="rounded-xl border border-rose-700/40 bg-rose-900/40 p-5 text-sm text-rose-300">
					{error}
				</div>
			)}

			{/* Empty state */}
			{(!loading && !error && jobs.length === 0) && (
				<div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/75 p-8 text-center shadow-lg">
					<div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800">
						<CirclePlus className="h-5 w-5 text-zinc-400" />
					</div>
					<p className="text-sm font-semibold text-zinc-300">No applications yet</p>
					<p className="mt-1 text-sm text-zinc-400">
						Start by tracking your first job application.
					</p>
					<Link
						to="/dashboard/jobs/new"
						className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
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
								className="flex items-start gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-5 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-xl"
							>
								<CompanyAvatar name={job.company_name} />

								<div className="min-w-0 flex-1">
									<p className="text-xs font-medium text-zinc-500">{job.company_name}</p>
									<h3 className="mt-0.5 text-base font-semibold text-zinc-50">{job.job_title}</h3>
									{job.job_url && (
										<a
											href={job.job_url}
											target="_blank"
											rel="noopener noreferrer"
											onClick={(e) => e.stopPropagation()}
											className="mt-0.5 inline-block text-xs text-zinc-500 underline underline-offset-4 transition hover:text-zinc-300"
										>
											View posting ↗
										</a>
									)}
									<p className="mt-2 text-xs text-zinc-500">
										Applied {new Date(job.applied_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
									</p>
								</div>

								<div className="shrink-0">
									<StatusBadge status={job.status} />
								</div>
							</Link>
						))}
				</div>
			)}
		</div>
	)
}