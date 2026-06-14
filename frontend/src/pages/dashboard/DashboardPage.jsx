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
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'
import { Progress } from '../../components/ui/progress'
import { Badge } from '../../components/ui/badge'
import { Skeleton } from '../../components/ui/skeleton'
import { Avatar, AvatarFallback } from '../../components/ui/avatar'
import ActivityChart from '../../components/dashboard/ActivityChart'

const STATUS_CONFIG = {
	applied:      { label: 'Applied',      badge: 'bg-blue-500/10 text-blue-400', dot: 'bg-blue-500', bar: 'bg-blue-500', indicator: '[&_[data-slot=progress-indicator]]:!bg-blue-500' },
	interviewing: { label: 'Interviewing', badge: 'bg-amber-500/10 text-amber-400', dot: 'bg-amber-500', bar: 'bg-amber-400', indicator: '[&_[data-slot=progress-indicator]]:!bg-amber-500' },
	offered:      { label: 'Offered',      badge: 'bg-emerald-500/10 text-emerald-400', dot: 'bg-emerald-500', bar: 'bg-emerald-500', indicator: '[&_[data-slot=progress-indicator]]:!bg-emerald-500' },
	rejected:     { label: 'Rejected',     badge: 'bg-rose-500/10 text-rose-400', dot: 'bg-rose-500', bar: 'bg-rose-500', indicator: '[&_[data-slot=progress-indicator]]:!bg-rose-500' },
	withdrawn:    { label: 'Withdrawn',    badge: 'bg-zinc-800/50 text-zinc-400', dot: 'bg-zinc-500', bar: 'bg-zinc-500', indicator: '[&_[data-slot=progress-indicator]]:!bg-zinc-500' },
}

const PIPELINE_ORDER = ['applied', 'interviewing', 'offered', 'rejected', 'withdrawn']

function StatCard({ label, value, icon: Icon, loading, highlight }) {
	return (
		<Card
			className={cn(
				"transition hover:shadow-lg p-4 border border-zinc-800/80 bg-zinc-900/75 text-zinc-100",
				highlight && "border-primary/30 bg-linear-to-br from-primary to-emerald-700 shadow-md shadow-primary/10 text-primary-foreground"
			)}
		>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
				<p className={cn("text-xs font-medium text-zinc-400", highlight && "text-primary-foreground/80")}>
					{label}
				</p>
				<div
					className={cn(
						"flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800",
						highlight && "bg-white/15"
					)}
				>
					<Icon className={cn("h-3.5 w-3.5 text-zinc-300", highlight && "text-primary-foreground")} />
				</div>
			</CardHeader>
			<CardContent className="p-0 mt-2">
				<div className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
					{loading ? (
						<Skeleton className={cn("h-7 w-9 bg-zinc-700", highlight && "bg-white/25")} />
					) : (
						value
					)}
				</div>
			</CardContent>
		</Card>
	)
}

function StatusBadge({ status }) {
	const config = STATUS_CONFIG[status] ?? {
		label: status,
		badge: 'bg-zinc-800/50 text-zinc-400',
		dot: 'bg-zinc-500',
	}
	return (
		<Badge
			variant="outline"
			className={cn("inline-flex items-center gap-x-1.5 h-auto px-2.5 py-1 text-xs font-semibold leading-5 border-none", config.badge)}
		>
			<span className={cn("inline-block h-1.5 w-1.5 rounded-full", config.dot)} />
			{config.label}
		</Badge>
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

	// Filter upcoming interviews from loaded jobs
	const upcomingInterviews = jobs
		.filter((j) => j.interview_date && new Date(j.interview_date) >= new Date())
		.sort((a, b) => new Date(a.interview_date) - new Date(b.interview_date))
		.slice(0, 5)

	const total = jobs.length
	const interviews = jobs.filter((j) => j.status === 'interviewing').length
	const offers = jobs.filter((j) => j.status === 'offered').length
	const rejected = jobs.filter((j) => j.status === 'rejected').length

	const counts = PIPELINE_ORDER.map((status) => ({
		status,
		label: STATUS_CONFIG[status].label,
		bar: STATUS_CONFIG[status].bar,
		indicator: STATUS_CONFIG[status].indicator,
		count: jobs.filter((j) => j.status === status).length,
	})).filter((entry) => entry.count > 0)

	const recentJobs = [...jobs]
		.sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at))
		.slice(0, 5)

	const chartData = (() => {
		const data = []
		for (let i = 6; i >= 0; i--) {
			const d = new Date()
			d.setDate(d.getDate() - i)
			const dateStr = d.toISOString().split('T')[0]
			const label = d.toLocaleDateString('en-US', { weekday: 'short' })
			const count = jobs.filter((j) => j.applied_at && j.applied_at.startsWith(dateStr)).length
			data.push({ label, count, dateStr })
		}
		return data
	})()

	return (
		<div className="space-y-5 text-zinc-100 sm:space-y-6">
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

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				<StatCard label="Total Applications" value={total} icon={Briefcase} loading={loading} highlight />
				<StatCard label="Interviewing" value={interviews} icon={CalendarClock} loading={loading} />
				<StatCard label="Offers" value={offers} icon={Trophy} loading={loading} />
				<StatCard label="Rejected" value={rejected} icon={XCircle} loading={loading} />
			</div>

			{/* Upcoming Interviews */}
			{!loading && upcomingInterviews.length > 0 && (
				<Card className="border border-zinc-800/80 bg-zinc-900/75 px-5 py-3 shadow-lg">
					<div className="flex items-center justify-between pb-1.5">
						<h3 className="text-sm font-semibold text-zinc-50 flex items-center gap-2">
							<CalendarClock className="h-3.5 w-3.5 text-primary" />
							Upcoming Interviews
						</h3>
						<span className="text-[11px] text-zinc-500">{upcomingInterviews.length} scheduled</span>
					</div>
					<p className="text-[11px] text-zinc-500 pb-2">Add to Google Calendar for automatic reminders.</p>
					<ul className="divide-y divide-zinc-800/60">
						{upcomingInterviews.map((job) => {
							const interviewDate = new Date(job.interview_date)
							const now = new Date()
							const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
							const interviewDay = new Date(interviewDate.getFullYear(), interviewDate.getMonth(), interviewDate.getDate())
							const diffDays = Math.round((interviewDay - todayStart) / (1000 * 60 * 60 * 24))
							const countdown = diffDays === 0 ? 'Today' : diffDays === 1 ? 'Tomorrow' : `in ${diffDays} days`
							const urgency = diffDays <= 1 ? 'text-rose-400' : diffDays <= 3 ? 'text-amber-400' : 'text-zinc-400'

							const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Interview: ${job.job_title} at ${job.company_name}`)}&dates=${interviewDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${new Date(interviewDate.getTime() + 3600000).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(`Job application tracked in HireTrack`)}`

							return (
								<li key={job.id} className="flex items-center justify-between py-2 gap-3">
									<Link to={`/dashboard/jobs/${job.id}`} className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-80 transition">
										<Avatar className="h-7 w-7 rounded-md shrink-0">
											<AvatarFallback className="rounded-md bg-zinc-800 text-[11px] font-semibold text-zinc-200">
												{job.company_name?.[0]?.toUpperCase() ?? '?'}
											</AvatarFallback>
										</Avatar>
										<div className="min-w-0">
											<p className="truncate text-xs font-semibold text-zinc-100">{job.job_title}</p>
											<p className="text-[11px] text-zinc-500">{job.company_name} • <span className={urgency}>{countdown}</span></p>
										</div>
									</Link>
									<div className="flex items-center gap-2 shrink-0">
										<span className="text-[11px] text-zinc-400 hidden sm:inline">
											{interviewDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {interviewDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
										</span>
										<a
											href={calendarUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 px-2 py-1 text-[10px] font-medium text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 transition"
											title="Add to Google Calendar"
										>
											<img src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_48dp.png" alt="Google Calendar" className="h-3 w-3" />
											Add
										</a>
									</div>
								</li>
							)
						})}
					</ul>
				</Card>
			)}

			<div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
				<div className="xl:col-span-3">
					{loading ? (
						<Card className="border border-zinc-800/80 bg-zinc-900/75 p-5 shadow-lg h-[290px] flex flex-col justify-between">
							<div className="space-y-2">
								<Skeleton className="h-4 w-36 bg-zinc-700" />
								<Skeleton className="h-3 w-48 bg-zinc-850" />
							</div>
							<Skeleton className="h-[180px] w-full bg-zinc-800" />
						</Card>
					) : (
						<ActivityChart data={chartData} />
					)}
				</div>

				<Card className="border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg shadow-black/10 xl:col-span-2">
					<div className="flex items-center justify-between pb-6">
						<h3 className="text-base font-semibold text-zinc-50">Application Status</h3>
						<span className="text-xs font-medium text-zinc-500">{total} total</span>
					</div>

					{loading ? (
						<div className="space-y-4">
							{[1, 2, 3].map((n) => (
								<div key={n} className="space-y-2">
									<Skeleton className="h-3 w-24 bg-zinc-700" />
									<Skeleton className="h-2 w-full bg-zinc-800" />
								</div>
							))}
						</div>
					) : total === 0 ? (
						<p className="text-sm text-zinc-400">
							No applications yet. Add your first job to see your pipeline.
						</p>
					) : (
						<div className="space-y-4">
							{counts.map((entry) => {
								const pct = Math.round((entry.count / total) * 100)
								return (
									<div key={entry.status} className="space-y-1.5">
										<div className="flex items-center justify-between text-sm">
											<span className="font-medium text-zinc-300">{entry.label}</span>
											<span className="text-zinc-500">
												{entry.count} · {pct}%
											</span>
										</div>
										<Progress
											value={pct}
											className={cn("h-2 bg-zinc-800", entry.indicator)}
										/>
									</div>
								)
							})}
						</div>
					)}
				</Card>
			</div>

			<div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
				<Card className="border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg shadow-black/10 xl:col-span-3">
					<div className="flex items-center justify-between pb-4">
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
						<div className="space-y-3">
							{[1, 2, 3].map((n) => (
								<div key={n} className="flex items-center gap-3">
									<Skeleton className="h-9 w-9 rounded-lg bg-zinc-800" />
									<div className="flex-1 space-y-2">
										<Skeleton className="h-3 w-1/3 bg-zinc-700" />
										<Skeleton className="h-3 w-1/2 bg-zinc-800" />
									</div>
								</div>
							))}
						</div>
					) : recentJobs.length === 0 ? (
						<div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700 py-8 text-center bg-zinc-900/20">
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
						<ul className="divide-y divide-zinc-800/80">
							{recentJobs.map((job) => (
								<li key={job.id}>
									<Link
										to={`/dashboard/jobs/${job.id}`}
										className="flex items-center gap-3 rounded-lg px-3 py-2.5 -mx-3 transition hover:bg-zinc-800/50"
									>
										<Avatar className="h-9 w-9 rounded-lg">
											<AvatarFallback className="rounded-lg bg-zinc-800 text-sm font-semibold text-zinc-200">
												{job.company_name?.[0]?.toUpperCase() ?? '?'}
											</AvatarFallback>
										</Avatar>
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
				</Card>

				<div className="xl:col-span-2 flex flex-col gap-4 justify-between">
					<Link
						to="/dashboard/jobs/new"
						className="group flex-1"
					>
						<Card className="h-full flex items-center gap-4 border border-zinc-800/80 bg-zinc-900/75 p-5 shadow-lg shadow-black/10 transition hover:border-zinc-700 hover:shadow-xl text-zinc-100">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary transition group-hover:bg-primary/90">
								<CirclePlus className="h-5 w-5 text-primary-foreground" />
							</div>
							<div>
								<p className="text-sm font-semibold text-zinc-50">Add a New Job</p>
								<p className="text-xs text-zinc-500">Track a new application you've submitted</p>
							</div>
						</Card>
					</Link>
					<Link
						to="/dashboard/jobs"
						className="group flex-1"
					>
						<Card className="h-full flex items-center gap-4 border border-zinc-800/80 bg-zinc-900/75 p-5 shadow-lg shadow-black/10 transition hover:border-zinc-700 hover:shadow-xl text-zinc-100">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary transition group-hover:bg-primary/90">
								<Briefcase className="h-5 w-5 text-primary-foreground" />
							</div>
							<div>
								<p className="text-sm font-semibold text-zinc-50">View All Jobs</p>
								<p className="text-xs text-zinc-500">Browse and manage your tracked applications</p>
							</div>
						</Card>
					</Link>
				</div>
			</div>
		</div>
	)
}
