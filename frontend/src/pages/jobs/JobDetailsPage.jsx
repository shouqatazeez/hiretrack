import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, Calendar, ExternalLink, Loader2, Pencil } from 'lucide-react'
import { getJobById } from '../../services/jobService'

const STATUS_CONFIG = {
  applied:      { label: 'Applied',      class: 'bg-blue-900/25 text-blue-300 ring-blue-800/40' },
  interviewing: { label: 'Interviewing', class: 'bg-amber-900/25 text-amber-300 ring-amber-800/40' },
  offered:      { label: 'Offered',      class: 'bg-emerald-900/25 text-emerald-300 ring-emerald-800/40' },
  rejected:     { label: 'Rejected',     class: 'bg-rose-900/25 text-rose-300 ring-rose-800/40' },
  withdrawn:    { label: 'Withdrawn',    class: 'bg-zinc-800/40 text-zinc-300 ring-zinc-700/40' },
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    class: 'bg-slate-100 text-slate-500 ring-slate-200',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${config.class}`}
    >
      {config.label}
    </span>
  )
}

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function JobDetailsPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadJob() {
      try {
        setLoading(true)
        setError(null)
        const data = await getJobById(jobId)
        setJob(data)
      } catch (err) {
        const status = err?.response?.status
        if (status === 404) {
          setError('This job application was not found.')
        } else {
          setError(
            err?.response?.data?.detail ?? 'Failed to load job. Please try again.'
          )
        }
      } finally {
        setLoading(false)
      }
    }

    loadJob()
  }, [jobId])

  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={() => navigate('/dashboard/jobs')}
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-zinc-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to jobs
      </button>

      {loading && (
        <div className="flex items-center justify-center rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-12 shadow-lg">
          <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
          <span className="ml-2 text-sm text-zinc-400">Loading job details…</span>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-2xl border border-rose-700/40 bg-rose-900/40 p-5 text-sm text-rose-300">
          {error}
        </div>
      )}

      {!loading && !error && job && (
        <>
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-zinc-800/60 text-base font-semibold text-zinc-100">
                  {job.company_name?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                    {job.company_name}
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
                    {job.job_title}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={job.status} />
                <button
                  type="button"
                  onClick={() => navigate(`/dashboard/jobs/${job.id}/edit`)}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailCard
              icon={Building2}
              label="Company"
              value={job.company_name}
            />
            <DetailCard
              icon={Calendar}
              label="Applied on"
              value={formatDate(job.applied_at)}
            />
          </div>

          {job.job_url && (
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Job posting
              </p>
              <a
                href={job.job_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex max-w-full items-center gap-1.5 break-all text-sm font-medium text-zinc-100 underline underline-offset-4 transition hover:text-zinc-50"
              >
                <span className="break-all">{job.job_url}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-300" />
              </a>
            </div>
          )}

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 text-xs text-zinc-400 shadow-sm">
            <span>Created {formatDate(job.created_at)}</span>
            <span className="mx-2">·</span>
            <span>Updated {formatDate(job.updated_at)}</span>
          </div>
        </>
      )}
    </section>
  )
}

function DetailCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-5 shadow-lg">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/60">
          <Icon className="h-4 w-4 text-zinc-300" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          {label}
        </p>
      </div>
      <p className="mt-3 wrap-break-word text-base font-medium text-zinc-50">{value}</p>
    </div>
  )
}
