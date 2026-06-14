import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { getJobById, updateJob } from '../../services/jobService'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'

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

function SkeletonEditJob() {
  return (
    <div className="space-y-6 animate-pulse">
      <Card>
        <CardHeader className="text-left space-y-2">
          <div className="h-3 w-12 rounded bg-zinc-700" />
          <div className="h-6 w-32 rounded bg-zinc-700" />
          <div className="h-4 w-64 rounded bg-zinc-800" />
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-8">
          <div className="space-y-5">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="space-y-2">
                <div className="h-4 w-28 rounded bg-zinc-700" />
                <div className="h-11 w-full rounded bg-zinc-800" />
              </div>
            ))}
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <div className="h-11 w-24 rounded bg-zinc-800" />
            <div className="h-11 w-32 rounded bg-zinc-800" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
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
    interview_date: '',
    job_description: '',
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
          interview_date: job.interview_date ? new Date(job.interview_date).toISOString().slice(0, 16) : '',
          job_description: job.job_description ?? '',
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
        interview_date: formData.interview_date || null,
        job_description: formData.job_description.trim() || null,
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
        <SkeletonEditJob />
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6">
      <Card>
        <CardHeader className="text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Edit</p>
          <CardTitle className="mt-1">Edit job</CardTitle>
          <CardDescription className="mt-1">Update the details of this application below.</CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="space-y-6 pt-8">
            {error && (
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="company_name">
                  Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="company_name"
                  name="company_name"
                  type="text"
                  placeholder="e.g. Acme Corp"
                  required
                  maxLength={255}
                  value={formData.company_name}
                  onChange={handleChange}
                  disabled={saving}
                  className="h-11 bg-zinc-900/50 mt-1.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_title">
                  Job Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="job_title"
                  name="job_title"
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer"
                  required
                  maxLength={255}
                  value={formData.job_title}
                  onChange={handleChange}
                  disabled={saving}
                  className="h-11 bg-zinc-900/50 mt-1.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">
                  Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                  disabled={saving}
                >
                  <SelectTrigger id="status" className="h-11 w-full justify-between bg-zinc-900/50 border-input text-zinc-50 mt-1.5">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="border border-zinc-800 bg-zinc-900 text-zinc-50 shadow-xl shadow-black/30 ">
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-zinc-300 focus:bg-primary/15 focus:text-zinc-50 data-[state=checked]:text-primary dark:data-[state=checked]:text-emerald-400">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="applied_at">
                  Applied On
                </Label>
                <Input
                  id="applied_at"
                  name="applied_at"
                  type="date"
                  value={formData.applied_at}
                  onChange={handleChange}
                  disabled={saving}
                  className="h-11 bg-zinc-900/50 scheme-dark mt-1.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interview_date">
                  Interview Date & Time <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="interview_date"
                  name="interview_date"
                  type="datetime-local"
                  value={formData.interview_date}
                  onChange={handleChange}
                  disabled={saving}
                  className="h-11 bg-zinc-900/50 scheme-dark mt-1.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_url">
                  Job Posting URL <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="job_url"
                  name="job_url"
                  type="url"
                  placeholder="https://..."
                  value={formData.job_url}
                  onChange={handleChange}
                  disabled={saving}
                  className="h-11 bg-zinc-900/50 mt-1.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_description">
                  Job Description <span className="text-muted-foreground">(optional)</span>
                </Label>
                <textarea
                  id="job_description"
                  name="job_description"
                  placeholder="Paste the job description here..."
                  rows={6}
                  maxLength={5000}
                  value={formData.job_description}
                  onChange={handleChange}
                  disabled={saving}
                  className="w-full rounded-md border border-input bg-zinc-900/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:opacity-50 resize-y mt-1.5"
                />
                <p className="text-xs text-muted-foreground">{formData.job_description.length}/5,000 characters</p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/dashboard/jobs/${jobId}`)}
                disabled={saving}
                className="h-11 px-5"
              >
                <ArrowLeft className="h-4 w-4" />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={saving}
                className="h-11 px-5 font-semibold"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  'Save changes'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </section>
  )
}
