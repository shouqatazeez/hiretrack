import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'

export default function MainLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<div className="min-h-screen bg-slate-50">
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

			{isSidebarOpen && (
				<button
					type="button"
					aria-label="Close sidebar overlay"
					className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			<div className="flex min-h-screen flex-col lg:pl-64">
				<Navbar onMenuClick={() => setIsSidebarOpen(true)} />
				<main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
					<div className="mx-auto w-full max-w-5xl">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	)
}