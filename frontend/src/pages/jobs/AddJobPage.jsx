export default function AddJobPage() {
  return (
    <section className="grid gap-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-400">Create</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Add a new job</h1>
        <p className="mt-2 text-sm text-slate-600">This page is ready for a form once you connect your API or local state.</p>
      </div>

      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500 shadow-sm">
        Form fields can go here: company name, role, location, salary, status, and application notes.
      </div>
    </section>
  )
}