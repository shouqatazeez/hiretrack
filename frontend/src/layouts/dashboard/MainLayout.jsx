import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'

export default function MainLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-100">
			<div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_42%)]" />
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

			{isSidebarOpen && (
				<button
					type="button"
					aria-label="Close sidebar overlay"
					className="fixed inset-0 z-30 bg-zinc-950/70 backdrop-blur-sm lg:hidden"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			<div className="flex min-h-screen flex-col lg:pl-64">
				<Navbar onMenuClick={() => setIsSidebarOpen(true)} />
				<main className="relative flex-1 px-4 py-6 sm:px-6 lg:px-8">
					<div className="mx-auto w-full max-w-5xl">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	)
}