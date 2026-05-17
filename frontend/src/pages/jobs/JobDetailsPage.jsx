export default function JobDetailsPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-400">Job Details</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Job details</h1>
        <p className="mt-2 text-sm text-slate-600">Use this page to show company info, interview notes, and application progress.</p>
      </div>

      <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-400">Status</p>
        <p className="mt-2 text-lg font-semibold text-slate-950">In progress</p>
        <p className="mt-2 text-sm text-slate-600">A good spot for next steps, reminders, and follow-up dates.</p>
      </aside>
    </section>
  )
}