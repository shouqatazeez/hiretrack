import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, Calendar, ExternalLink, Loader2 } from 'lucide-react'
import { getJobById } from '../../services/jobService'

const STATUS_CONFIG = {
  applied:      { label: 'Applied',      class: 'bg-blue-50 text-blue-600 ring-blue-100' },
  interviewing: { label: 'Interviewing', class: 'bg-amber-50 text-amber-600 ring-amber-100' },
  offered:      { label: 'Offered',      class: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
  rejected:     { label: 'Rejected',     class: 'bg-red-50 text-red-500 ring-red-100' },
  withdrawn:    { label: 'Withdrawn',    class: 'bg-slate-100 text-slate-500 ring-slate-200' },
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
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to jobs
      </button>

      {loading && (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-12 shadow-sm">
          <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
          <span className="ml-2 text-sm text-slate-500">Loading job details…</span>
        </div>
      )}

      {error && !loading && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && job && (
        <>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-base font-semibold text-slate-700">
                  {job.company_name?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {job.company_name}
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                    {job.job_title}
                  </h1>
                </div>
              </div>
              <StatusBadge status={job.status} />
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
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Job posting
              </p>
              <a
                href={job.job_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex max-w-full items-center gap-1.5 break-all text-sm font-medium text-slate-700 underline underline-offset-4 transition hover:text-slate-900"
              >
                <span className="break-all">{job.job_url}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-6 text-xs text-slate-400 shadow-sm">
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
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
          <Icon className="h-4 w-4 text-slate-600" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          {label}
        </p>
      </div>
      <p className="mt-3 break-words text-base font-medium text-slate-900">{value}</p>
    </div>
  )
}
