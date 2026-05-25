import { LogOut, Menu } from 'lucide-react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const titleMap = [
	{ path: '/dashboard',            title: 'Dashboard'   },
	{ path: '/dashboard/jobs',       title: 'Jobs'        },
	{ path: '/dashboard/jobs/new',   title: 'Add Job'     },
	{ path: '/dashboard/jobs/:jobId',title: 'Job Details' },
]

function getPageTitle(pathname) {
	const match = titleMap.find((item) => matchPath({ path: item.path, end: true }, pathname))
	return match?.title ?? 'Dashboard'
}

export default function Navbar({ onMenuClick }) {
	const location = useLocation()
	const navigate  = useNavigate()
	const pageTitle = getPageTitle(location.pathname)
	const { user, logout } = useAuth()

	const initials = user?.full_name
		? user.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
		: 'HT'

	function handleLogout() {
		logout()
		navigate('/login', { replace: true })
	}

	return (
		<header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
			{/* Left: hamburger + page title */}
			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={onMenuClick}
					className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 lg:hidden"
					aria-label="Open sidebar"
				>
					<Menu className="h-4.5 w-4.5" />
				</button>
				<h1 className="text-base font-semibold text-slate-900">{pageTitle}</h1>
			</div>

			{/* Right: user name + avatar + logout */}
			<div className="flex items-center gap-3">
				<div className="hidden flex-col items-end sm:flex">
					<span className="text-sm font-medium leading-tight text-slate-800">
						{user?.full_name ?? 'User'}
					</span>
					<span className="text-xs text-slate-400">{user?.email ?? ''}</span>
				</div>

				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
					{initials}
				</div>

				<button
					type="button"
					onClick={handleLogout}
					className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
					aria-label="Sign out"
				>
					<LogOut className="h-4 w-4" />
				</button>
			</div>
		</header>
	)
}