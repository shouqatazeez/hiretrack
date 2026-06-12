import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, Calendar, ExternalLink, Loader2, Pencil, Trash2, MoreVertical, Sparkles, MessageSquare, FileText } from 'lucide-react'
import { deleteJob, getJobById } from '../../services/jobService'
import { Button } from '../../components/ui/button'
import { getMatchScore, getInterviewQuestions, getCoverLetter } from '../../services/aiService'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog'

const STATUS_CONFIG = {
  applied:      { label: 'Applied',      bg: 'bg-blue-500/10 text-blue-400', dot: 'bg-blue-500' },
  interviewing: { label: 'Interviewing', bg: 'bg-amber-500/10 text-amber-400', dot: 'bg-amber-500' },
  offered:      { label: 'Offered',      bg: 'bg-emerald-500/10 text-emerald-400', dot: 'bg-emerald-500' },
  rejected:     { label: 'Rejected',     bg: 'bg-rose-500/10 text-rose-400', dot: 'bg-rose-500' },
  withdrawn:    { label: 'Withdrawn',    bg: 'bg-zinc-800/50 text-zinc-400', dot: 'bg-zinc-500' },
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    bg: 'bg-zinc-800/50 text-zinc-400',
    dot: 'bg-zinc-500',
  }
  return (
    <span className={`inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-5 ${config.bg}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${config.dot}`} />
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

function SkeletonJobDetails() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4 w-full sm:w-auto">
            <div className="h-12 w-12 rounded-lg bg-zinc-800" />
            <div className="space-y-2 flex-1 min-w-[150px]">
              <div className="h-3 w-20 rounded bg-zinc-700" />
              <div className="h-5 w-36 rounded bg-zinc-700" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 w-20 rounded-full bg-zinc-800" />
            <div className="h-9 w-9 rounded-lg bg-zinc-800" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-zinc-800" />
            <div className="h-3 w-16 rounded bg-zinc-700" />
          </div>
          <div className="h-4 w-32 rounded bg-zinc-800" />
        </div>
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-zinc-800" />
            <div className="h-3 w-20 rounded bg-zinc-700" />
          </div>
          <div className="h-4 w-24 rounded bg-zinc-800" />
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg space-y-3">
        <div className="h-3 w-24 rounded bg-zinc-700" />
        <div className="h-4 w-1/2 rounded bg-zinc-800" />
      </div>
    </div>
  )
}

export default function JobDetailsPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  const [matchResult, setMatchResult] = useState(null)
  const [matchLoading, setMatchLoading] = useState(false)
  const [matchError, setMatchError] = useState(null)

  const [questionsResult, setQuestionsResult] = useState(null)
  const [questionsLoading, setQuestionsLoading] = useState(false)
  const [questionsError, setQuestionsError] = useState(null)

  const [coverResult, setCoverResult] = useState(null)
  const [coverLoading, setCoverLoading] = useState(false)
  const [coverError, setCoverError] = useState(null)

  const hasBeenUpdated = job && job.updated_at && job.created_at &&
    (new Date(job.updated_at).getTime() - new Date(job.created_at).getTime() > 1000)

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

  const handleDelete = async () => {
    try {
      setDeleting(true)
      setDeleteError(null)
      await deleteJob(jobId)
      setShowConfirmModal(false)
      navigate('/dashboard/jobs')
    } catch (err) {
      setDeleteError(
        err?.response?.data?.detail ?? 'Failed to delete job. Please try again.'
      )
    } finally {
      setDeleting(false)
    }
  }

  const handleMatchScore = async () => {
    try {
      setMatchLoading(true)
      setMatchError(null)
      const result = await getMatchScore(jobId)
      setMatchResult(result)
    } catch (err) {
      setMatchError(err.response?.data?.detail || 'Failed to get match score.')
    } finally {
      setMatchLoading(false)
    }
  }

  const handleInterviewQuestions = async () => {
    try {
      setQuestionsLoading(true)
      setQuestionsError(null)
      const result = await getInterviewQuestions(jobId)
      setQuestionsResult(result)
    } catch (err) {
      setQuestionsError(err.response?.data?.detail || 'Failed to generate questions.')
    } finally {
      setQuestionsLoading(false)
    }
  }

  const handleCoverLetter = async () => {
    try {
      setCoverLoading(true)
      setCoverError(null)
      const result = await getCoverLetter(jobId)
      setCoverResult(result)
    } catch (err) {
      setCoverError(err.response?.data?.detail || 'Failed to generate cover letter.')
    } finally {
      setCoverLoading(false)
    }
  }

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

      {loading && <SkeletonJobDetails />}

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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-lg"
                      className="text-zinc-400 hover:text-zinc-50 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800"
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36 border-zinc-800 bg-zinc-900 text-zinc-50 shadow-xl">
                    <DropdownMenuItem
                      onClick={() => navigate(`/dashboard/jobs/${job.id}/edit`)}
                      className="gap-2 cursor-pointer focus:bg-zinc-800 focus:text-zinc-50"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit Job
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setShowConfirmModal(true)}
                      className="gap-2 cursor-pointer text-rose-400 focus:bg-rose-950/30 focus:text-rose-300"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Job
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

          {job.job_description && (
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Job Description
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
                {job.job_description}
              </p>
            </div>
          )}

          {/* AI Features Section */}
          {job.job_description && (
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                AI Tools
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={matchLoading}
                  onClick={handleMatchScore}
                  className="gap-2"
                >
                  {matchLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Match Score
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={questionsLoading}
                  onClick={handleInterviewQuestions}
                  className="gap-2"
                >
                  {questionsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
                  Interview Questions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={coverLoading}
                  onClick={handleCoverLetter}
                  className="gap-2"
                >
                  {coverLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                  Cover Letter
                </Button>
              </div>

              {matchError && <p className="mt-3 text-sm text-rose-400">{matchError}</p>}
              {questionsError && <p className="mt-3 text-sm text-rose-400">{questionsError}</p>}
              {coverError && <p className="mt-3 text-sm text-rose-400">{coverError}</p>}
            </div>
          )}

          {/* Match Score Result */}
          {matchResult && (
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Match Score</p>
              <div className="flex items-center gap-4 mb-4">
                <div className={`text-4xl font-bold ${matchResult.score >= 70 ? 'text-emerald-400' : matchResult.score >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {matchResult.score}/100
                </div>
              </div>
              {matchResult.strengths?.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-emerald-400 mb-1">Strengths</p>
                  <ul className="space-y-1">
                    {matchResult.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-zinc-300 flex gap-2">
                        <span className="text-emerald-400 shrink-0">+</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {matchResult.gaps?.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-amber-400 mb-1">Gaps</p>
                  <ul className="space-y-1">
                    {matchResult.gaps.map((g, i) => (
                      <li key={i} className="text-sm text-zinc-300 flex gap-2">
                        <span className="text-amber-400 shrink-0">−</span> {g}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {matchResult.suggestion && (
                <div>
                  <p className="text-xs font-semibold text-zinc-400 mb-1">Suggestion</p>
                  <p className="text-sm text-zinc-300">{matchResult.suggestion}</p>
                </div>
              )}
            </div>
          )}

          {/* Interview Questions Result */}
          {questionsResult?.questions && (
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Interview Questions</p>
              <ol className="space-y-4">
                {questionsResult.questions.map((q, i) => (
                  <li key={i} className="border-b border-zinc-800/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-zinc-300">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">{q.question}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 bg-zinc-800 rounded px-1.5 py-0.5">{q.category}</span>
                        </div>
                        {q.tip && <p className="mt-1.5 text-xs text-zinc-400 italic">Tip: {q.tip}</p>}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Cover Letter Result */}
          {coverResult?.cover_letter && (
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Cover Letter</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(coverResult.cover_letter)}
                >
                  Copy
                </Button>
              </div>
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
                {coverResult.cover_letter}
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/75 p-6 text-xs text-zinc-400 shadow-sm">
            <span>Created {formatDate(job.created_at)}</span>
            {hasBeenUpdated && (
              <>
                <span className="mx-2">·</span>
                <span>Updated {formatDate(job.updated_at)}</span>
              </>
            )}
          </div>

          <AlertDialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Job Application</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete your application for{' '}
                  <span className="font-semibold text-zinc-200">{job.job_title}</span> at{' '}
                  <span className="font-semibold text-zinc-200">{job.company_name}</span>? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              {deleteError && (
                <div className="rounded-lg border border-rose-700/40 bg-rose-900/40 px-4 py-3 text-sm text-rose-300">
                  {deleteError}
                </div>
              )}

              <AlertDialogFooter>
                <AlertDialogCancel
                  disabled={deleting}
                  onClick={() => {
                    setShowConfirmModal(false)
                    setDeleteError(null)
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={deleting}
                  onClick={async (e) => {
                    e.preventDefault()
                    await handleDelete()
                  }}
                >
                  {deleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting…
                    </>
                  ) : (
                    'Delete'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
