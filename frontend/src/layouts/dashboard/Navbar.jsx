import { LogOut, Menu } from 'lucide-react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const titleMap = [
	{ path: '/dashboard', title: 'Dashboard' },
	{ path: '/dashboard/jobs', title: 'Jobs' },
	{ path: '/dashboard/jobs/new', title: 'Add Job' },
	{ path: '/dashboard/jobs/:jobId', title: 'Job Details' },
]

function getPageTitle(pathname) {
	const match = titleMap.find((item) => matchPath({ path: item.path, end: true }, pathname))
	return match?.title ?? 'Dashboard'
}

export default function Navbar({ onMenuClick }) {
	const location = useLocation()
	const navigate = useNavigate()
	const pageTitle = getPageTitle(location.pathname)

	const { user, logout } = useAuth()

	const initials = user?.full_name
		? user.full_name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2)
		: 'HT'

	function handleLogout() {
		logout()
		navigate('/login', { replace: true })
	}

	return (
		<header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
			<div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-3">
					<button
						type="button"
						className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 lg:hidden"
						onClick={onMenuClick}
						aria-label="Open sidebar"
					>
						<Menu className="h-5 w-5" />
					</button>
					<div>
						<p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">Workspace</p>
						<h2 className="text-lg font-semibold text-slate-950">{pageTitle}</h2>
					</div>
				</div>

				<div className="hidden items-center gap-3 sm:flex">
					<div className="text-right">
						<p className="text-xs font-medium text-slate-400">Signed in as</p>
						<p className="text-sm font-semibold text-slate-800 leading-tight">{user?.full_name ?? 'User'}</p>
					</div>

					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
						{initials}
					</div>

					<button
						type="button"
						onClick={handleLogout}
						className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 active:scale-95"
						aria-label="Sign out"
					>
						<LogOut className="h-4 w-4" />
					</button>
				</div>
			</div>
		</header>
	)
}