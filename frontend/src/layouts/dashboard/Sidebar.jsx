import { Briefcase, CirclePlus, LayoutDashboard, LogOut, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuth } from '../../context/AuthContext'

const navItems = [
	{ label: 'Dashboard', to: '/dashboard',          icon: LayoutDashboard, end: true },
	{ label: 'Jobs',      to: '/dashboard/jobs',      icon: Briefcase,       end: true },
	{ label: 'Add Job',   to: '/dashboard/jobs/new',  icon: CirclePlus,      end: true },
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
				'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-zinc-800/80 bg-zinc-950/95 text-zinc-100 shadow-2xl shadow-black/20 transition-transform duration-300 lg:translate-x-0',
				isOpen ? 'translate-x-0' : '-translate-x-full',
			)}
		>
			<div className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800/80 px-5">
				<div className="flex items-center gap-2.5">
					<div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
						<Briefcase className="h-3.5 w-3.5 text-primary-foreground" />
					</div>
					<span className="text-sm font-semibold tracking-tight text-zinc-50">HireTrack</span>
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

			<nav className="flex-1 overflow-y-auto px-3 py-4">
				<p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
					Menu
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
											'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
											isActive
												? 'bg-primary/10 text-primary border-l-2 border-primary rounded-l-none'
												: 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100',
										)
									}
								>
									{({ isActive }) => (
										<>
											<Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-primary' : 'text-zinc-500 group-hover:text-zinc-300')} />
											<span>{item.label}</span>
										</>
									)}
								</NavLink>
							</li>
						)
					})}
				</ul>
			</nav>

			<div className="shrink-0 border-t border-zinc-800/80 p-4">
				<div className="flex items-center gap-3">
					<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
						{initials}
					</div>
					<div className="min-w-0 flex-1">
						<p className="truncate text-sm font-medium text-zinc-100">{user?.full_name ?? 'User'}</p>
						<p className="truncate text-xs text-zinc-500">{user?.email ?? ''}</p>
					</div>
					<button
						type="button"
						onClick={handleLogout}
						className="shrink-0 rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
						aria-label="Sign out"
					>
						<LogOut className="h-4 w-4" />
					</button>
				</div>
			</div>
		</aside>
	)
}