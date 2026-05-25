import { Briefcase, CirclePlus, LayoutDashboard, LogOut, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuth } from '../../context/AuthContext'

const navItems = [
	{
		label: 'Dashboard',
		to: '/dashboard',
		icon: LayoutDashboard,
		exact: true,
	},
	{
		label: 'Jobs',
		to: '/dashboard/jobs',
		icon: Briefcase,
	},
	{
		label: 'Add Job',
		to: '/dashboard/jobs/new',
		icon: CirclePlus,
	},
]

export default function Sidebar({ isOpen, onClose }) {
	const navigate = useNavigate()
	const { logout, user } = useAuth()

	function handleLogout() {
		logout()
		onClose()
		navigate('/login', { replace: true })
	}

	return (
		<aside
			className={cn(
				'fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0',
				isOpen ? 'translate-x-0' : '-translate-x-full',
			)}
		>
			<div className="flex h-full flex-col gap-6 p-4 sm:p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">HireTrack</p>
						<h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Dashboard</h1>
					</div>
					<button
						type="button"
						className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 lg:hidden"
						onClick={onClose}
						aria-label="Close sidebar"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				<nav className="flex-1 space-y-2">
					{navItems.map((item) => {
						const Icon = item.icon

						return (
							<NavLink
								key={item.label}
								to={item.to}
								end={item.exact}
								className={({ isActive }) =>
									cn(
										'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200',
										isActive
											? 'bg-slate-950 text-white shadow-lg shadow-slate-950/10'
											: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
									)
								}
								onClick={onClose}
							>
								<Icon className="h-4 w-4" />
								<span>{item.label}</span>
							</NavLink>
						)
					})}
				</nav>

				<div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
					<p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Session</p>
					<p className="mt-2 text-sm font-medium text-slate-800 truncate">
						{user?.full_name ?? 'Guest'}
					</p>
					<p className="text-xs text-slate-400 truncate">{user?.email ?? ''}</p>
					<button
						type="button"
						className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-95"
						onClick={handleLogout}
					>
						<LogOut className="h-4 w-4" />
						Sign out
					</button>
				</div>
			</div>
		</aside>
	)
}