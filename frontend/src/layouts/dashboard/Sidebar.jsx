import { Briefcase, CirclePlus, FileText, LayoutDashboard, LogOut, X, ChevronRight } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuth } from '../../context/AuthContext'

const navItems = [
	{ label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, end: true },
	{ label: 'Jobs', to: '/dashboard/jobs', icon: Briefcase, end: true },
	{ label: 'Add Job', to: '/dashboard/jobs/new', icon: CirclePlus, end: true },
	{ label: 'Resume', to: '/dashboard/resume', icon: FileText, end: true },
]

export default function Sidebar({ isOpen, onClose }) {
	const navigate = useNavigate()
	const { logout, user } = useAuth()

	const initials = user?.full_name
		? user.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
		: 'HT'

	function handleLogout() {
		logout()
		onClose()
		navigate('/login', { replace: true })
	}

	return (
		<aside
			className={cn(
				'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-zinc-800/80 bg-zinc-950 shadow-2xl shadow-black/30 transition-transform duration-300 lg:translate-x-0',
				isOpen ? 'translate-x-0' : '-translate-x-full',
			)}
		>

			<div className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800/80 px-5">
				<div className="flex items-center gap-2.5">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
						<Briefcase className="h-4 w-4 text-primary-foreground" />
					</div>
					<div>
						<span className="block text-sm font-semibold text-zinc-50">HireTrack</span>
						<span className="block text-[10px] text-zinc-500">Job Tracker</span>
					</div>
				</div>
				<button
					type="button"
					onClick={onClose}
					className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 lg:hidden"
					aria-label="Close sidebar"
				>
					<X className="h-4 w-4" />
				</button>
			</div>


			<nav className="flex-1 overflow-y-auto px-3 py-5">
				<p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
					Main
				</p>
				<ul className="space-y-0.5">
					{navItems.map((item) => {
						const Icon = item.icon
						return (
							<li key={item.label}>
								<NavLink
									to={item.to}
									end={item.end}
									onClick={onClose}
									className={({ isActive }) =>
										cn(
											'relative flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors duration-150',
											isActive
												? 'bg-primary/10 text-primary'
												: 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100',
										)
									}
								>
									{({ isActive }) => (
										<>

											{isActive && (
												<span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
											)}
											<Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-primary' : 'text-zinc-500')} />
											<span className="flex-1">{item.label}</span>
											{isActive && (
												<ChevronRight className=" h-4 w-4 text-primary shrink-0" />
											)}
										</>
									)}
								</NavLink>
							</li>
						)
					})}
				</ul>
			</nav>


			<div className="shrink-0 p-3 mt-auto">
				<div className="flex items-center gap-2.5 rounded-xl border border-zinc-800/40 bg-zinc-900/20 p-2.5">
					<div className="  flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-emerald-600 text-xs font-semibold text-primary-foreground shadow-xs">
						{initials}
					</div>
					<div className="min-w-0 flex-1 flex flex-col gap-1">
						<p className="truncate text-[13px] font-semibold text-zinc-200 leading-none">{user?.full_name ?? 'User'}</p>
						<p className="truncate text-xs text-zinc-500 leading-none">{user?.email ?? ''}</p>
					</div>
					<button
						type="button"
						onClick={handleLogout}
						className="shrink-0 rounded-lg p-1.5 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
						aria-label="Sign out"
					>
						<LogOut className="h-3.5 w-3.5" />
					</button>
				</div>
			</div>
		</aside>
	)
}
