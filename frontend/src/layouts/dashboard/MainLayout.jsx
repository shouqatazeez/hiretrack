import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'

export default function MainLayout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	function closeSidebar() {
		setIsSidebarOpen(false)
	}

	function openSidebar() {
		setIsSidebarOpen(true)
	}

	return (
		<div className="min-h-screen bg-slate-50 text-slate-950">
			<Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
			{isSidebarOpen && (
				<button
					type="button"
					aria-label="Close sidebar overlay"
					className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
					onClick={closeSidebar}
				/>
			)}

			<div className="min-h-screen lg:pl-72">
				<Navbar onMenuClick={openSidebar} />
				<main className="px-4 py-6 sm:px-6 lg:px-8">
					<div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	)
}