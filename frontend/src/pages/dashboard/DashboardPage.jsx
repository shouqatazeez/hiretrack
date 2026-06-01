import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Briefcase,
	CirclePlus,
	CalendarClock,
	Trophy,
	XCircle,
	ArrowRight,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { fetchJobs } from '../../services/jobService'

const STATUS_CONFIG = {
	applied: { label: 'Applied', badge: 'bg-sky-500/10 text-sky-300 ring-sky-500/20', bar: 'bg-sky-400' },
	interviewing: { label: 'Interviewing', badge: 'bg-amber-500/10 text-amber-300 ring-amber-500/20', bar: 'bg-amber-400' },
	offered: { label: 'Offered', badge: 'bg-primary/10 text-primary ring-primary/20', bar: 'bg-primary' },
	rejected: { label: 'Rejected', badge: 'bg-rose-500/10 text-rose-300 ring-rose-500/20', bar: 'bg-rose-400' },
	withdrawn: { label: 'Withdrawn', badge: 'bg-zinc-800 text-zinc-400 ring-zinc-700', bar: 'bg-zinc-500' },
}

const PIPELINE_ORDER = ['applied', 'interviewing', 'offered', 'rejected', 'withdrawn']

function StatCard({ label, value, icon: Icon, loading, highlight }) {
	return (
		<div
			className={
				highlight
					? 'rounded-2xl border border-primary/30 bg-linear-to-br from-primary to-emerald-700 p-4 shadow-md shadow-primary/10 transition hover:shadow-lg'
					: 'rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-4 shadow-md shadow-black/10 transition hover:border-zinc-700 hover:shadow-lg'
			}
		>
			<div className="flex items-center justify-between">
				<p className={highlight ? 'text-xs font-medium text-primary-foreground/80' : 'text-xs font-medium text-zinc-400'}>
					{label}
				</p>
				<div
					className={
						highlight
							? 'flex h-7 w-7 items-center justify-center rounded-md bg-white/15'
							: 'flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800'
					}
				>
					<Icon className={highlight ? 'h-3.5 w-3.5 text-primary-foreground' : 'h-3.5 w-3.5 text-zinc-300'} />
				</div>
			</div>
			<p
				className={
					highlight
						? 'mt-2 text-2xl font-semibold tracking-tight text-primary-foreground sm:text-[1.75rem]'
						: 'mt-2 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-[1.75rem]'
				}
			>
				{loading ? (
					<span
						className={
							highlight
								? 'inline-block h-7 w-9 animate-pulse rounded bg-white/25'
								: 'inline-block h-7 w-9 animate-pulse rounded bg-zinc-700'
						}
					/>
				) : (
					value
				)}
			</p>
		</div>
	)
}

function StatusBadge({ status }) {
	const config = STATUS_CONFIG[status] ?? { label: status, badge: 'bg-slate-100 text-slate-500 ring-slate-200' }
	return (
		<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${config.badge}`}>
			{config.label}
		</span>
	)
}

function formatDate(value) {
	if (!value) return '—'
	return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function DashboardPage() {
	const { user } = useAuth()
	const [jobs, setJobs] = useState([])
	const [loading, setLoading] = useState(true)

	const firstName = user?.full_name?.split(' ')[0] ?? 'there'

	useEffect(() => {
		fetchJobs()
			.then(setJobs)
			.catch(() => {})
			.finally(() => setLoading(false))
	}, [])

	const total = jobs.length
	const interviews = jobs.filter((j) => j.status === 'interviewing').length
	const offers = jobs.filter((j) => j.status === 'offered').length
	const rejected = jobs.filter((j) => j.status === 'rejected').length

	const counts = PIPELINE_ORDER.map((status) => ({
		status,
		label: STATUS_CONFIG[status].label,
		bar: STATUS_CONFIG[status].bar,
		count: jobs.filter((j) => j.status === status).length,
	})).filter((entry) => entry.count > 0)

	const recentJobs = [...jobs]
		.sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at))
		.slice(0, 5)

	return (
		<div className="space-y-5 text-zinc-100 sm:space-y-6">
			<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div className="space-y-2">
					<p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
						Dashboard overview
					</p>
					<div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 px-5 py-5 shadow-lg shadow-black/10 sm:px-6">
						<h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-[2rem]">
							Welcome back, {firstName} 👋
						</h2>
						<p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-[0.95rem]">
							Here’s your current job-search snapshot. Keep the momentum going and focus on the next move.
						</p>
					</div>
				</div>
				<div className="flex items-center gap-2 self-start rounded-full border border-zinc-800/80 bg-zinc-900/75 px-3 py-1.5 text-xs font-medium text-zinc-400 shadow-lg shadow-black/10">
					<span className="h-2 w-2 rounded-full bg-primary" />
					Live summary
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<StatCard label="Total Applications" value={total} icon={Briefcase} loading={loading} highlight />
				<StatCard label="Interviewing" value={interviews} icon={CalendarClock} loading={loading} />
				<StatCard label="Offers" value={offers} icon={Trophy} loading={loading} />
				<StatCard label="Rejected" value={rejected} icon={XCircle} loading={loading} />
			</div>

			<div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
				<div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg shadow-black/10 xl:col-span-2">
					<div className="flex items-center justify-between">
						<h3 className="text-base font-semibold text-zinc-50">Application Status</h3>
						<span className="text-xs font-medium text-zinc-500">{total} total</span>
					</div>

					{loading ? (
						<div className="mt-6 space-y-4">
							{[1, 2, 3].map((n) => (
								<div key={n} className="space-y-2">
									<div className="h-3 w-24 animate-pulse rounded bg-zinc-700" />
									<div className="h-2 w-full animate-pulse rounded-full bg-zinc-800" />
								</div>
							))}
						</div>
					) : total === 0 ? (
						<p className="mt-6 text-sm text-zinc-400">
							No applications yet. Add your first job to see your pipeline.
						</p>
					) : (
						<div className="mt-6 space-y-4">
							{counts.map((entry) => {
								const pct = Math.round((entry.count / total) * 100)
								return (
									<div key={entry.status}>
										<div className="flex items-center justify-between text-sm">
											<span className="font-medium text-zinc-300">{entry.label}</span>
											<span className="text-zinc-500">
												{entry.count} · {pct}%
											</span>
										</div>
										<div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
											<div className={`h-full rounded-full ${entry.bar}`} style={{ width: `${pct}%` }} />
										</div>
									</div>
								)
							})}
						</div>
					)}
				</div>

				<div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg shadow-black/10 xl:col-span-3">
					<div className="flex items-center justify-between">
						<h3 className="text-base font-semibold text-zinc-50">Recent Applications</h3>
						<Link
							to="/dashboard/jobs"
							className="inline-flex items-center gap-1 text-xs font-medium text-primary transition hover:text-primary/80"
						>
							View all
							<ArrowRight className="h-3.5 w-3.5" />
						</Link>
					</div>

					{loading ? (
						<div className="mt-4 space-y-3">
							{[1, 2, 3].map((n) => (
								<div key={n} className="flex items-center gap-3">
									<div className="h-9 w-9 animate-pulse rounded-lg bg-zinc-800" />
									<div className="flex-1 space-y-2">
										<div className="h-3 w-1/3 animate-pulse rounded bg-zinc-700" />
										<div className="h-3 w-1/2 animate-pulse rounded bg-zinc-800" />
									</div>
								</div>
							))}
						</div>
					) : recentJobs.length === 0 ? (
						<div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700 py-8 text-center">
							<p className="text-sm font-medium text-zinc-300">No applications yet</p>
							<Link
								to="/dashboard/jobs/new"
								className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
							>
								<CirclePlus className="h-4 w-4" />
								Add your first job
							</Link>
						</div>
					) : (
						<ul className="mt-4 divide-y divide-zinc-800/80">
							{recentJobs.map((job) => (
								<li key={job.id}>
									<Link
										to={`/dashboard/jobs/${job.id}`}
										className="flex items-center gap-3 rounded-lg py-3 transition hover:bg-zinc-800/50"
									>
										<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-sm font-semibold text-zinc-200">
											{job.company_name?.[0]?.toUpperCase() ?? '?'}
										</div>
										<div className="min-w-0 flex-1">
											<p className="truncate text-sm font-semibold text-zinc-50">{job.job_title}</p>
											<p className="truncate text-xs text-zinc-500">
												{job.company_name} · {formatDate(job.applied_at)}
											</p>
										</div>
										<StatusBadge status={job.status} />
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
				<Link
					to="/dashboard/jobs/new"
					className="group flex items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-4 shadow-lg shadow-black/10 transition hover:border-zinc-700 hover:shadow-xl"
				>
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary transition group-hover:bg-primary/90">
						<CirclePlus className="h-5 w-5 text-primary-foreground" />
					</div>
					<div>
						<p className="text-sm font-semibold text-zinc-50">Add a New Job</p>
						<p className="text-xs text-zinc-500">Track a new application you've submitted</p>
					</div>
				</Link>
				<Link
					to="/dashboard/jobs"
					className="group flex items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-4 shadow-lg shadow-black/10 transition hover:border-zinc-700 hover:shadow-xl"
				>
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary transition group-hover:bg-primary/90">
						<Briefcase className="h-5 w-5 text-primary-foreground" />
					</div>
					<div>
						<p className="text-sm font-semibold text-zinc-50">View All Jobs</p>
						<p className="text-xs text-zinc-500">Browse and manage your tracked applications</p>
					</div>
				</Link>
			</div>
		</div>
	)
}
