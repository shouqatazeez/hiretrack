import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, CirclePlus, TrendingUp } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { fetchJobs } from '../../services/jobService'

function StatCard({ label, value, icon: Icon, loading }) {
	return (
		<div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium text-slate-500">{label}</p>
				<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
					<Icon className="h-4 w-4 text-slate-600" />
				</div>
			</div>
			<p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
				{loading ? (
					<span className="inline-block h-8 w-10 animate-pulse rounded-md bg-slate-200" />
				) : (
					value
				)}
			</p>
		</div>
	)
}

function QuickActionCard({ label, description, to, icon: Icon }) {
	return (
		<Link
			to={to}
			className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
		>
			<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary transition group-hover:bg-primary/90">
				<Icon className="h-5 w-5 text-primary-foreground" />
			</div>
			<div>
				<p className="text-sm font-semibold text-slate-900">{label}</p>
				<p className="text-xs text-slate-500">{description}</p>
			</div>
		</Link>
	)
}

export default function DashboardPage() {
	const { user } = useAuth()
	const [jobs, setJobs]       = useState([])
	const [loading, setLoading] = useState(true)

	const firstName = user?.full_name?.split(' ')[0] ?? 'there'

	useEffect(() => {
		fetchJobs()
			.then(setJobs)
			.catch(() => {})
			.finally(() => setLoading(false))
	}, [])

	const total      = jobs.length
	const interviews = jobs.filter((j) => j.status === 'interviewing').length
	const offers     = jobs.filter((j) => j.status === 'offered').length

	return (
		<div className="space-y-6">
			<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
				<h2 className="text-2xl font-semibold text-slate-900">
					Welcome back, {firstName} 👋
				</h2>
				<p className="mt-1 text-sm text-slate-500">
					Here's a snapshot of your job search. Keep going — great opportunities are ahead.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<StatCard label="Total Applications" value={total}      icon={Briefcase}  loading={loading} />
				<StatCard label="Interviews"         value={interviews} icon={TrendingUp} loading={loading} />
				<StatCard label="Offers"             value={offers}     icon={CirclePlus} loading={loading} />
			</div>

			<div className="pt-1">
				<p className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">
					Quick Actions
				</p>
				<div className=" mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
					<QuickActionCard
						to="/dashboard/jobs/new"
						label="Add a New Job"
						description="Track a new application you've submitted"
						icon={CirclePlus}
					/>
					<QuickActionCard
						to="/dashboard/jobs"
						label="View All Jobs"
						description="Browse and manage your tracked applications"
						icon={Briefcase}
					/>
				</div>
			</div>
		</div>
	)
}