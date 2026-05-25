import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchJobs } from '../../services/jobService'

const STATUS_STYLES = {
  applied:     'bg-blue-50 text-blue-600',
  interviewing:'bg-amber-50 text-amber-600',
  offered:     'bg-emerald-50 text-emerald-600',
  rejected:    'bg-red-50 text-red-500',
  withdrawn:   'bg-slate-100 text-slate-500',
}

export default function JobsPage() {
  const [jobs, setJobs]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    async function loadJobs() {
      try {
        const data = await fetchJobs()
        setJobs(data)
      } catch (err) {
        setError(err.response?.data?.detail ?? 'Failed to load jobs. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-400">Jobs</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Your job tracker</h1>
          <p className="mt-2 text-sm text-slate-600">A simple list view for the jobs you are following.</p>
        </div>
        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
          {loading ? '...' : `${jobs.length} ${jobs.length === 1 ? 'job' : 'jobs'} tracked`}
        </div>
      </div>

      {loading && (
        <div className="grid gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-28 animate-pulse rounded-3xl border border-slate-200 bg-slate-100" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && jobs.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-400">No jobs tracked yet</p>
          <p className="mt-1 text-sm text-slate-500">
            <Link to="/dashboard/jobs/new" className="font-medium text-slate-950 underline underline-offset-4">
              Add your first job
            </Link>{' '}
            to get started.
          </p>
        </div>
      )}

      {!loading && !error && jobs.length > 0 && (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <article key={job.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-400">{job.company_name}</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-950">{job.job_title}</h2>
                  {job.job_url && (
                    <a
                      href={job.job_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs text-slate-400 underline underline-offset-4 hover:text-slate-600"
                    >
                      View posting ↗
                    </a>
                  )}
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[job.status] ?? 'bg-slate-100 text-slate-500'}`}>
                  {job.status}
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Applied {new Date(job.applied_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}