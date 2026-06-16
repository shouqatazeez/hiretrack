import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CirclePlus, Search, MoreVertical, Pencil, Trash2, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import { fetchJobs, deleteJob } from '../../services/jobService'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../components/ui/select'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '../../components/ui/alert-dialog'

const STATUS_CONFIG = {
	applied:      { label: 'Applied',      bg: 'bg-blue-500/10 text-blue-400', dot: 'bg-blue-500' },
	interviewing: { label: 'Interviewing', bg: 'bg-amber-500/10 text-amber-400', dot: 'bg-amber-500' },
	offered:      { label: 'Offered',      bg: 'bg-emerald-500/10 text-emerald-400', dot: 'bg-emerald-500' },
	rejected:     { label: 'Rejected',     bg: 'bg-rose-500/10 text-rose-400', dot: 'bg-rose-500' },
	withdrawn:    { label: 'Withdrawn',    bg: 'bg-zinc-800/50 text-zinc-400', dot: 'bg-zinc-500' },
}

const FILTER_OPTIONS = [
	{ value: 'all', label: 'All' },
	{ value: 'applied', label: 'Applied' },
	{ value: 'interviewing', label: 'Interviewing' },
	{ value: 'offered', label: 'Offer' },
	{ value: 'rejected', label: 'Rejected' },
	{ value: 'withdrawn', label: 'Withdrawn' },
]

function StatusBadge({ status }) {
	const config = STATUS_CONFIG[status] ?? {
		label: status,
		bg: 'bg-zinc-800/50 text-zinc-400',
		dot: 'bg-zinc-500',
	}
	return (
		<span className={`inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-5 ${config.bg}`}>
			<span className={`inline-block h-1.5 w-1.5 rounded-full ${config.dot}`} />
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
		<div className="animate-pulse rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-4 shadow-lg">
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

function SkeletonTopCard() {
	return (
		<div className="flex flex-col gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between animate-pulse">
			<div className="space-y-2">
				<div className="h-3 w-16 rounded bg-zinc-800" />
				<div className="h-5 w-36 rounded bg-zinc-700" />
				<div className="h-4 w-28 rounded bg-zinc-800" />
			</div>
			<div className="h-8 w-24 rounded-lg bg-zinc-800 self-start sm:self-auto" />
		</div>
	)
}

function JobCardMenu({ jobId, onDelete }) {
	const navigate = useNavigate()
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)

	const handleEditJob = () => {
		navigate(`/dashboard/jobs/${jobId}/edit`)
	}

	const handleDeleteJob = async () => {
		try {
			await deleteJob(jobId)
			onDelete(jobId)
			toast.success('Job deleted successfully')
		} catch (err) {
			toast.error('Failed to delete job. Please try again.')
		} finally {
			setShowDeleteDialog(false)
		}
	}

	return (
		<div
			onClick={(e) => {
				e.stopPropagation()
				e.preventDefault()
			}}
			onKeyDown={(e) => {
				e.stopPropagation()
			}}
			onPointerDown={(e) => {
				e.stopPropagation()
			}}
		>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						id={`job-menu-trigger-${jobId}`}
						className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 outline-none transition-colors hover:bg-zinc-800 hover:text-zinc-200 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-900"
						aria-label="Job actions"
					>
						<MoreVertical className="h-4 w-4" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="bottom" align="end" sideOffset={2} className="w-32 border border-zinc-800 bg-zinc-900 text-zinc-50 shadow-lg">
					<DropdownMenuItem
						id={`job-view-${jobId}`}
						onSelect={() => navigate(`/dashboard/jobs/${jobId}`)}
						className="gap-2 cursor-pointer focus:bg-zinc-800 focus:text-zinc-50"
					>
						<Eye className="h-4 w-4" />
						View Details
					</DropdownMenuItem>
					<DropdownMenuItem
						id={`job-edit-${jobId}`}
						onSelect={handleEditJob}
						className="gap-2 cursor-pointer focus:bg-zinc-800 focus:text-zinc-50"
					>
						<Pencil className="h-4 w-4" />
						Edit Job
					</DropdownMenuItem>
					<DropdownMenuItem
						id={`job-delete-${jobId}`}
						variant="destructive"
						onSelect={(e) => {
							e.preventDefault()
							setShowDeleteDialog(true)
						}}
						className="gap-2 cursor-pointer text-rose-400 focus:bg-rose-950/30 focus:text-rose-300"
					>
						<Trash2 className="h-4 w-4" />
						Delete Job
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure you want to delete this job?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the job application and all associated data.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleDeleteJob}>Delete</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

export default function JobsPage() {
	const [jobs, setJobs]       = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError]     = useState(null)
	const [searchQuery, setSearchQuery] = useState('')
	const [statusFilter, setStatusFilter] = useState('all')
	const navigate = useNavigate()

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

	const handleDeleteJob = (deletedId) => {
		setJobs((prev) => prev.filter((job) => job.id !== deletedId))
	}

	const handleExportCSV = async () => {
		try {
			const token = localStorage.getItem('hiretrack_token')
			const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
			const res = await fetch(`${baseUrl}/jobs/applications/export`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			const blob = await res.blob()
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = 'hiretrack_applications.csv'
			document.body.appendChild(a)
			a.click()
			document.body.removeChild(a)
			URL.revokeObjectURL(url)
		} catch {
			toast.error('Failed to export CSV')
		}
	}

	const filteredJobs = jobs.filter((job) => {
		const query = searchQuery.toLowerCase()
		const statusLabel = STATUS_CONFIG[job.status]?.label?.toLowerCase() ?? job.status?.toLowerCase() ?? ''
		const matchesSearch =
			job.company_name?.toLowerCase().includes(query) ||
			job.job_title?.toLowerCase().includes(query) ||
			statusLabel.includes(query)

		const matchesFilter = statusFilter === 'all' || job.status === statusFilter

		return matchesSearch && matchesFilter
	})

	return (
		<div className="space-y-6 text-zinc-100">
			{loading ? (
				<SkeletonTopCard />
			) : (
				<div className="flex flex-col gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Applications</p>
						<h2 className="mt-1 text-2xl font-semibold text-zinc-50">Your Job Tracker</h2>
						<p className="mt-0.5 text-sm text-zinc-400">
							{`${jobs.length} ${jobs.length === 1 ? 'application' : 'applications'} tracked`}
						</p>
					</div>
					<div className="flex items-center gap-2 self-start sm:self-auto">
						<button
							type="button"
							onClick={handleExportCSV}
							className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-50"
						>
							Export CSV
						</button>
						<Link
							to="/dashboard/jobs/new"
							className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
						>
							<CirclePlus className="h-4 w-4" />
							Add Job
						</Link>
					</div>
				</div>
			)}

			{!loading && !error && jobs.length > 0 && (
				<div className="flex flex-col gap-3 sm:flex-row">
					<div className="relative flex-1">
						<Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500" />
						<input
							type="text"
							placeholder="Search applications by company or job title..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="h-8 w-full rounded-lg border border-zinc-800/80 bg-zinc-900/75 pl-10 pr-4 text-sm text-zinc-50 placeholder:text-zinc-500 outline-none transition-colors hover:border-zinc-700 hover:bg-zinc-800/40 focus:border-primary dark:focus:border-emerald-400 focus:ring-2 focus:ring-primary/20 dark:focus:ring-emerald-400/20"
						/>
					</div>
					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className="h-8 min-w-[160px] rounded-lg border border-zinc-800/80 bg-zinc-900/75 px-4 text-sm text-zinc-50 transition-colors hover:border-zinc-700 hover:bg-zinc-800/40 data-[state=open]:border-primary dark:data-[state=open]:border-emerald-400 data-[state=open]:ring-2 data-[state=open]:ring-primary/20 dark:data-[state=open]:ring-emerald-400/20 focus-visible:border-primary dark:focus-visible:border-emerald-400 focus-visible:ring-primary/20 dark:focus-visible:ring-emerald-400/20">
							<SelectValue placeholder="Filter by status" />
						</SelectTrigger>
						<SelectContent className="rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-50 shadow-xl shadow-black/30">
							{FILTER_OPTIONS.map((opt) => (
								<SelectItem key={opt.value} value={opt.value} className="text-zinc-300 focus:bg-primary/15 focus:text-zinc-50 data-[state=checked]:text-primary dark:data-[state=checked]:text-emerald-400 data-[state=checked]:font-semibold">
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			)}

			{loading && (
				<div className="space-y-3">
					{[1, 2, 3].map((n) => <SkeletonCard key={n} />)}
				</div>
			)}

			{error && (
				<div className="rounded-xl border border-rose-700/40 bg-rose-900/40 p-5 text-sm text-rose-300">
					{error}
				</div>
			)}
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

			{(!loading && !error && jobs.length > 0 && filteredJobs.length === 0) && (
				<div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/75 p-8 text-center shadow-lg animate-in fade-in duration-200">
					<div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800">
						<Search className="h-5 w-5 text-zinc-400" />
					</div>
					<p className="text-sm font-semibold text-zinc-300">No matching applications</p>
					<p className="mt-1 text-sm text-zinc-400">
						Try adjusting your search query, changing the status filter, or resetting all filters.
					</p>
					<button
						type="button"
						onClick={() => {
							setSearchQuery('')
							setStatusFilter('all')
						}}
						className="mt-4 inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800"
					>
						Reset filters
					</button>
				</div>
			)}

			{!loading && !error && filteredJobs.length > 0 && (
				<div className="space-y-3">
						{filteredJobs.map((job) => (
							<div
								key={job.id}
								role="button"
								tabIndex={0}
								onClick={() => navigate(`/dashboard/jobs/${job.id}`)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault()
										navigate(`/dashboard/jobs/${job.id}`)
									}
								}}
								className="flex items-start gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/75 p-4 shadow-sm transition-colors duration-200 hover:border-primary/50 hover:bg-zinc-900 cursor-pointer"
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

								<div className="flex shrink-0 items-center gap-2">
									<StatusBadge status={job.status} />
									<JobCardMenu jobId={job.id} onDelete={handleDeleteJob} />
								</div>
							</div>
						))}
				</div>
			)}
		</div>
	)
}