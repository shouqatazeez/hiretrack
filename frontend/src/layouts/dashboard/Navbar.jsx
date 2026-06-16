import { LogOut, Menu } from 'lucide-react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const titleMap = [
	{ path: '/dashboard',                 title: 'Dashboard'   },
	{ path: '/dashboard/jobs',            title: 'Jobs'        },
	{ path: '/dashboard/jobs/new',        title: 'Add Job'     },
	{ path: '/dashboard/jobs/:jobId/edit',title: 'Edit Job'    },
	{ path: '/dashboard/jobs/:jobId',     title: 'Job Details' },
	{ path: '/dashboard/resume',          title: 'Resume'      },
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
		<header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-zinc-800/80 bg-zinc-950/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={onMenuClick}
					className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 lg:hidden"
					aria-label="Open sidebar"
				>
					<Menu className="h-4.5 w-4.5" />
				</button>
				<h1 className="text-base font-semibold text-zinc-50">{pageTitle}</h1>
			</div>

			<div className="flex items-center gap-3 lg:hidden">
				<div className="hidden flex-col items-end sm:flex">
					<span className="text-sm font-medium leading-tight text-zinc-100">
						{user?.full_name ?? 'User'}
					</span>
					<span className="text-xs text-zinc-500">{user?.email ?? ''}</span>
				</div>

				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
					{initials}
				</div>

				<button
					type="button"
					onClick={handleLogout}
					className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
					aria-label="Sign out"
				>
					<LogOut className="h-4 w-4" />
				</button>
			</div>
		</header>
	)
}