import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { getJobById, updateJob } from '../../services/jobService'

const STATUS_OPTIONS = [
  { value: 'applied',      label: 'Applied' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'offered',      label: 'Offered' },
  { value: 'rejected',     label: 'Rejected' },
  { value: 'withdrawn',    label: 'Withdrawn' },
]

function toDateInputValue(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toISOString().slice(0, 10)
}

export default function EditJobPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    company_name: '',
    job_title: '',
    status: 'applied',
    job_url: '',
    applied_at: '',
  })

  const [fetching, setFetching] = useState(true)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState(null)

  useEffect(() => {
    async function loadJob() {
      try {
        setFetching(true)
        setError(null)
        const job = await getJobById(jobId)
        setFormData({
          company_name: job.company_name ?? '',
          job_title:    job.job_title ?? '',
          status:       job.status ?? 'applied',
          job_url:      job.job_url ?? '',
          applied_at:   toDateInputValue(job.applied_at),
        })
      } catch (err) {
        const status = err?.response?.status
        if (status === 404) {
          setError('This job application was not found.')
        } else {
          setError(err?.response?.data?.detail ?? 'Failed to load job. Please try again.')
        }
      } finally {
        setFetching(false)
      }
    }

    loadJob()
  }, [jobId])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSaving(true)

    try {
      const payload = {
        company_name: formData.company_name.trim(),
        job_title:    formData.job_title.trim(),
        status:       formData.status,
        job_url:      formData.job_url.trim() || null,
        applied_at:   formData.applied_at || null,
      }

      await updateJob(jobId, payload)
      navigate(`/dashboard/jobs/${jobId}`)
    } catch (err) {
      const detail = err?.response?.data?.detail
      if (Array.isArray(detail)) {
        setError(detail[0]?.msg || 'Validation error. Please check your inputs.')
      } else {
        setError(detail || 'Failed to update job. Please try again.')
      }
    } finally {
      setSaving(false)
    }
  }

  if (fetching) {
    return (
      <section className="mx-auto w-full max-w-2xl">
        <div className="flex items-center justify-center rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-12 shadow-lg">
          <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
          <span className="ml-2 text-sm text-zinc-400">Loading job details…</span>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6 text-zinc-100">
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Edit</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">Edit job</h1>
        <p className="mt-1 text-sm text-zinc-400">Update the details of this application below.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg">
        {error && (
          <div className="mb-5 rounded-lg border border-rose-700/40 bg-rose-900/40 px-4 py-3 text-sm text-rose-300">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="company_name" className="text-sm font-medium text-zinc-100">
              Company name <span className="text-red-500">*</span>
            </label>
            <input
              id="company_name"
              name="company_name"
              type="text"
              placeholder="e.g. Acme Corp"
              required
              maxLength={255}
              value={formData.company_name}
              onChange={handleChange}
              disabled={saving}
              className="h-11 w-full rounded-lg border border-zinc-800/80 bg-zinc-900/75 px-3.5 text-sm text-zinc-50 placeholder:text-zinc-500 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="job_title" className="text-sm font-medium text-zinc-100">
              Job title <span className="text-red-500">*</span>
            </label>
            <input
              id="job_title"
              name="job_title"
              type="text"
              placeholder="e.g. Senior Frontend Engineer"
              required
              maxLength={255}
              value={formData.job_title}
              onChange={handleChange}
              disabled={saving}
              className="h-11 w-full rounded-lg border border-zinc-800/80 bg-zinc-900/75 px-3.5 text-sm text-zinc-50 placeholder:text-zinc-500 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium text-zinc-100">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
              disabled={saving}
              className="h-11 w-full rounded-lg border border-zinc-800/80 bg-zinc-900/75 px-3.5 text-sm text-zinc-50 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="applied_at" className="text-sm font-medium text-zinc-100">
              Applied on
            </label>
            <input
              id="applied_at"
              name="applied_at"
              type="date"
              value={formData.applied_at}
              onChange={handleChange}
              disabled={saving}
              className="h-11 w-full rounded-lg border border-zinc-800/80 bg-zinc-900/75 px-3.5 text-sm text-zinc-50 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 scheme-dark"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="job_url" className="text-sm font-medium text-zinc-100">
              Job posting URL <span className="text-slate-400">(optional)</span>
            </label>
            <input
              id="job_url"
              name="job_url"
              type="url"
              placeholder="https://..."
              value={formData.job_url}
              onChange={handleChange}
              disabled={saving}
              className="h-11 w-full rounded-lg border border-zinc-800/80 bg-zinc-900/75 px-3.5 text-sm text-zinc-50 placeholder:text-zinc-500 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(`/dashboard/jobs/${jobId}`)}
            disabled={saving}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-800/80 bg-zinc-900/75 px-5 text-sm font-medium text-zinc-100 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              'Save changes'
            )}
          </button>
        </div>
      </form>
    </section>
  )
}
