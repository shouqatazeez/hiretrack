import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { createJob } from '../../services/jobService'

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

export default function AddJobPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    company_name: '',
    job_title: '',
    status: 'applied',
    job_url: '',
    job_description: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const payload = {
        company_name: formData.company_name.trim(),
        job_title:    formData.job_title.trim(),
        status:       formData.status,
      }

      const url = formData.job_url.trim()
      if (url) payload.job_url = url

      const desc = formData.job_description.trim()
      if (desc) payload.job_description = desc

      await createJob(payload)
      navigate('/dashboard/jobs')
    } catch (err) {
      const detail = err?.response?.data?.detail
      if (Array.isArray(detail)) {
        setError(detail[0]?.msg || 'Validation error. Please check your inputs.')
      } else {
        setError(detail || 'Failed to add job. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-2xl space-y-6">
      <Card>
        <CardHeader className="text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Create</p>
          <CardTitle className="mt-1">Add a new job</CardTitle>
          <CardDescription className="mb-5 ">Track a new application by filling in the details below.</CardDescription>
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
                  disabled={loading}
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
                  disabled={loading}
                  className="h-11 bg-zinc-900/50 mt-1.5"
                />
              </div>

              <div className="space-y-2 ">
                <Label htmlFor="status">
                  Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                  disabled={loading}
                >
                  <SelectTrigger id="status" className="h-11 w-full justify-between bg-zinc-900/50 border-input text-zinc-50 mt-1.5">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="border border-zinc-800 bg-zinc-900 text-zinc-50 shadow-xl shadow-black/30">
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-zinc-300 focus:bg-primary/15 focus:text-zinc-50 data-[state=checked]:text-primary dark:data-[state=checked]:text-emerald-400">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  disabled={loading}
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
                  disabled={loading}
                  className="w-full rounded-md border border-input bg-zinc-900/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:opacity-50 resize-y mt-1.5"
                />
                <p className="text-xs text-muted-foreground">{formData.job_description.length}/5,000 characters</p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={loading}
                className="h-11 px-5"
              >
                <ArrowLeft className="h-4 w-4" />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="h-11 px-5 font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  'Add Job'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </section>
  )
}
