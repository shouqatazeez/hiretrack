export default function DashboardPage() {
  return (
    <section className="grid gap-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-400">Overview</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Welcome to HireTrack. Use the sidebar to move between your dashboard, job list, and job creation flow.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Active Jobs</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">12</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Interviews</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">4</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Offers</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">2</p>
        </article>
      </div>
    </section>
  )
}