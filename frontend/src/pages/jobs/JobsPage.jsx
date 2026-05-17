export default function JobsPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-400">Jobs</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Your job tracker</h1>
          <p className="mt-2 text-sm text-slate-600">A simple list view for the jobs you are following.</p>
        </div>
        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">12 jobs tracked</div>
      </div>

      <div className="grid gap-4">
        {['Frontend Developer', 'Product Designer', 'Full Stack Engineer'].map((job, index) => (
          <article key={job} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-400">Job {index + 1}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">{job}</h2>
            <p className="mt-2 text-sm text-slate-600">Track the status, interview notes, and next steps for this application.</p>
          </article>
        ))}
      </div>
    </section>
  )
}