import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Building2,
  Calendar,
  ExternalLink,
  Loader2,
  Pencil,
  Trash2,
  MoreVertical,
  Sparkles,
  MessageSquare,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react'
import { deleteJob, getJobById } from '../../services/jobService'
import { Button } from '../../components/ui/button'
import { getMatchScore, getInterviewQuestions, getCoverLetter } from '../../services/aiService'
import MatchScoreCircle from '../../components/jobs/MatchScoreCircle'
import QuestionAccordionItem from '../../components/jobs/QuestionAccordionItem'
import CoverLetterDocument from '../../components/jobs/CoverLetterDocument'
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
  applied:      { label: 'Applied',      bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: 'bg-blue-500' },
  interviewing: { label: 'Interviewing', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20', dot: 'bg-amber-500' },
  offered:      { label: 'Offered',      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-500' },
  rejected:     { label: 'Rejected',     bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20', dot: 'bg-rose-500' },
  withdrawn:    { label: 'Withdrawn',    bg: 'bg-zinc-800/50 text-zinc-400 border-zinc-700/30', dot: 'bg-zinc-500' },
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    bg: 'bg-zinc-800/50 text-zinc-400 border-zinc-700/30',
    dot: 'bg-zinc-500',
  }
  return (
    <span className={`inline-flex items-center gap-x-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold leading-5 ${config.bg}`}>
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

function formatDateTime(value) {
  if (!value) return '—'
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function InterviewProgress({ jobId, totalQuestions }) {
  const completed = Array.from({ length: totalQuestions }, (_, i) => {
    return localStorage.getItem(`interview_complete_${jobId}_${i}`) === 'true'
  }).filter(Boolean).length

  const percent = totalQuestions > 0 ? Math.round((completed / totalQuestions) * 100) : 0

  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/30 p-4 space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-zinc-300 uppercase tracking-wider">Interview Progress</span>
        <span className="text-zinc-400">{completed} of {totalQuestions} completed</span>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

function SkeletonJobDetails() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-2xl border border-zinc-800/85 bg-zinc-900/40 p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4 w-full sm:w-auto">
            <div className="h-16 w-16 rounded-2xl bg-zinc-800" />
            <div className="space-y-2 flex-1 min-w-[200px] mt-1">
              <div className="h-5 w-48 rounded bg-zinc-850" />
              <div className="h-3 w-32 rounded bg-zinc-850" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 w-20 rounded-full bg-zinc-800" />
            <div className="h-9 w-9 rounded-lg bg-zinc-800" />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-zinc-800/85 bg-zinc-900/40 p-6 space-y-3">
            <div className="h-4 w-28 rounded bg-zinc-800" />
            <div className="h-3 w-full rounded bg-zinc-850" />
            <div className="h-3 w-5/6 rounded bg-zinc-850" />
          </div>
          <div className="rounded-2xl border border-zinc-800/85 bg-zinc-900/40 p-6 h-60 bg-zinc-900/20" />
        </div>
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

  const [activeTab, setActiveTab] = useState('match')
  const [isDescExpanded, setIsDescExpanded] = useState(false)

  const [matchResult, setMatchResult] = useState(null)
  const [matchLoading, setMatchLoading] = useState(false)
  const [matchError, setMatchError] = useState(null)

  const [questionsResult, setQuestionsResult] = useState(null)
  const [questionsLoading, setQuestionsLoading] = useState(false)
  const [questionsError, setQuestionsError] = useState(null)

  const [coverResult, setCoverResult] = useState(null)
  const [coverLoading, setCoverLoading] = useState(false)
  const [coverError, setCoverError] = useState(null)
  const [progressKey, setProgressKey] = useState(0)

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

  // Populate state with saved AI features if present
  useEffect(() => {
    if (job) {
      if (job.ai_match_score) {
        setMatchResult(job.ai_match_score)
      } else {
        setMatchResult(null)
      }
      if (job.ai_interview_questions) {
        setQuestionsResult(job.ai_interview_questions)
      } else {
        setQuestionsResult(null)
      }
      if (job.ai_cover_letter) {
        setCoverResult({ cover_letter: job.ai_cover_letter })
      } else {
        setCoverResult(null)
      }
    }
  }, [job])

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
      // Update local job state to keep timestamps current without full reload
      setJob(prev => prev ? {
        ...prev,
        ai_match_score: result,
        ai_match_score_updated_at: new Date().toISOString()
      } : null)
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
      setJob(prev => prev ? {
        ...prev,
        ai_interview_questions: result,
        ai_interview_questions_updated_at: new Date().toISOString()
      } : null)
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
      setJob(prev => prev ? {
        ...prev,
        ai_cover_letter: result.cover_letter,
        ai_cover_letter_updated_at: new Date().toISOString()
      } : null)
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
          {/* 1. Premium Job Header */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/45 p-6 md:p-8 shadow-xl backdrop-blur-md">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 text-2xl font-bold text-primary shadow-md">
                  {job.company_name?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div className="space-y-1">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50 leading-tight">
                    {job.job_title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400">
                    <span className="font-semibold text-zinc-300">{job.company_name}</span>
                    <span className="text-zinc-650">•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                      Applied {formatDate(job.applied_at)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:self-center">
                {job.job_url && (
                  <a
                    href={job.job_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-50"
                  >
                    View Post <ExternalLink className="h-3 w-3" />
                  </a>
                )}
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

          {/* Content - Single Column */}
          <div className="space-y-5">
              
              {/* Job Description Card */}
              {job.job_description && (
                <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 md:p-8 shadow-lg space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-850 pb-2.5">
                    Job Description
                  </h2>
                  <div>
                    <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-zinc-300 font-sans tracking-wide">
                      {isDescExpanded
                        ? job.job_description
                        : job.job_description.length > 300
                        ? job.job_description.slice(0, 300) + '...'
                        : job.job_description}
                    </p>
                    {job.job_description.length > 300 && (
                      <button
                        type="button"
                        onClick={() => setIsDescExpanded(!isDescExpanded)}
                        className="mt-3 text-xs font-semibold text-primary hover:text-primary flex items-center gap-1 transition-colors"
                      >
                        {isDescExpanded ? (
                          <>
                            Read Less <ChevronUp className="h-3 w-3" />
                          </>
                        ) : (
                          <>
                            Read More <ChevronDown className="h-3 w-3" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* AI Workspace Container */}
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 md:p-8 shadow-lg space-y-6">
                
                {/* AI Workspace Tabs Header */}
                <div className="flex border-b border-zinc-800/60 pb-px gap-2 overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setActiveTab('match')}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                      activeTab === 'match'
                        ? 'border-primary text-primary bg-primary/5 rounded-t-xl'
                        : 'border-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <Sparkles className="h-4 w-4" />
                    Resume Match
                  </button>
                  <button
                    onClick={() => setActiveTab('interview')}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                      activeTab === 'interview'
                        ? 'border-primary text-primary bg-primary/5 rounded-t-xl'
                        : 'border-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Interview Coach
                  </button>
                  <button
                    onClick={() => setActiveTab('cover')}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                      activeTab === 'cover'
                        ? 'border-primary text-primary bg-primary/5 rounded-t-xl'
                        : 'border-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    Cover Letter
                  </button>
                </div>

                {/* AI Workspace Tabs Content */}
                <div className="space-y-4 min-h-[250px]">
                  
                  {/* TAB 1: Resume Match */}
                  {activeTab === 'match' && (
                    <div className="space-y-4">
                      {!matchResult && !matchLoading && (
                        <div className="flex flex-col items-center justify-center text-center p-8 space-y-4 bg-zinc-950/20 rounded-2xl border border-zinc-800/50">
                          <div className="p-3.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            <Sparkles className="h-6 w-6 animate-pulse" />
                          </div>
                          <div className="space-y-1.5 max-w-md">
                            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">Analyze Resume Match</h3>
                            <p className="text-xs leading-relaxed text-zinc-400">
                              Run our AI analysis to see how well your profile aligns with this job description. Identify matching skills, gap areas, and key recommendations.
                            </p>
                          </div>
                          <Button
                            variant="default"
                            onClick={handleMatchScore}
                            className="bg-primary hover:bg-primary text-white gap-2 px-6 shadow-lg shadow-primary/10 cursor-pointer"
                          >
                            <Sparkles className="h-4 w-4" />
                            Analyze Fit
                          </Button>
                        </div>
                      )}

                      {matchLoading && (
                        <div className="flex flex-col items-center justify-center text-center p-12 space-y-4">
                          <Loader2 className="h-8 w-8 text-primary animate-spin" />
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-zinc-300">Comparing Resume and Job Description...</p>
                            <p className="text-xs text-zinc-500">Gemini AI is parsing and scoring compatibility...</p>
                          </div>
                        </div>
                      )}

                      {matchResult && !matchLoading && (
                        <div className="space-y-6">
                          {/* Radial Score Gauge Card */}
                          <div className="flex flex-col sm:flex-row items-center gap-6 bg-zinc-950/20 p-6 rounded-2xl border border-zinc-800/50">
                            <MatchScoreCircle score={matchResult.score} />
                            <div className="space-y-2 text-center sm:text-left flex-1">
                              <h3 className="text-base font-bold text-zinc-100">Compatibility Score</h3>
                              <p className="text-xs leading-relaxed text-zinc-400">
                                {matchResult.score >= 80 
                                  ? "Excellent match! Your resume shows highly relevant skills and experience matching this job description perfectly."
                                  : matchResult.score >= 60 
                                  ? "Good match, but there are some missing key skills or experience. Check recommendations to optimize your application."
                                  : "Low match. Consider rewriting sections of your resume or acquiring matching credentials before applying."}
                              </p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleMatchScore}
                                className="text-xs hover:bg-zinc-850 mt-1 gap-1.5 hover:text-zinc-50 cursor-pointer"
                              >
                                <Sparkles className="h-3.5 w-3.5 text-primary" />
                                Refresh Analysis
                              </Button>
                            </div>
                          </div>

                          {/* Strengths and Gaps Lists */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Strengths */}
                            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-5">
                              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 pb-3 mb-3 border-b border-emerald-500/10">
                                <CheckCircle2 className="h-4 w-4" /> Top Matching Skills
                              </p>
                              {matchResult.strengths?.length > 0 ? (
                                <ul className="space-y-2.5">
                                  {matchResult.strengths.map((s, i) => (
                                    <li key={i} className="text-xs text-zinc-350 flex items-start gap-2">
                                      <span className="text-emerald-400 shrink-0 select-none">•</span>
                                      <span>{s}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-xs text-zinc-500 italic">No clear strengths highlighted.</p>
                              )}
                            </div>

                            {/* Gaps */}
                            <div className="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-5">
                              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 pb-3 mb-3 border-b border-amber-500/10">
                                <AlertTriangle className="h-4 w-4" /> Missing / Gap Skills
                              </p>
                              {matchResult.gaps?.length > 0 ? (
                                <ul className="space-y-2.5">
                                  {matchResult.gaps.map((g, i) => (
                                    <li key={i} className="text-xs text-zinc-355 flex items-start gap-2">
                                      <span className="text-amber-400 shrink-0 select-none">•</span>
                                      <span>{g}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-xs text-zinc-500 italic">No critical skill gaps identified.</p>
                              )}
                            </div>
                          </div>

                          {/* Recommendations */}
                          {matchResult.suggestion && (
                            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-5">
                              <p className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 pb-3 mb-3 border-b border-primary/10">
                                <Award className="h-4 w-4" /> AI Recommendations
                              </p>
                              <p className="text-sm leading-relaxed text-zinc-300">
                                {matchResult.suggestion}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {matchError && <p className="text-xs font-semibold text-rose-455 bg-rose-950/20 border border-rose-800/30 p-3.5 rounded-xl">{matchError}</p>}
                    </div>
                  )}

                  {/* TAB 2: Interview Coach */}
                  {activeTab === 'interview' && (
                    <div className="space-y-4">
                      {!questionsResult && !questionsLoading && (
                        <div className="flex flex-col items-center justify-center text-center p-8 space-y-4 bg-zinc-950/20 rounded-2xl border border-zinc-800/50">
                          <div className="p-3.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            <MessageSquare className="h-6 w-6 animate-pulse" />
                          </div>
                          <div className="space-y-1.5 max-w-md">
                            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">AI Interview Prep Coach</h3>
                            <p className="text-xs leading-relaxed text-zinc-400">
                              Generate 10 tailored behavioral, technical, and situational interview questions with advice tips, specifically built around this job and your resume.
                            </p>
                          </div>
                          <Button
                            variant="default"
                            onClick={handleInterviewQuestions}
                            className="bg-primary hover:bg-primary text-white gap-2 px-6 shadow-lg shadow-primary/10 cursor-pointer"
                          >
                            <MessageSquare className="h-4 w-4" />
                            Generate Coach Questions
                          </Button>
                        </div>
                      )}

                      {questionsLoading && (
                        <div className="flex flex-col items-center justify-center text-center p-12 space-y-4">
                          <Loader2 className="h-8 w-8 text-primary animate-spin" />
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-zinc-300">Generating Tailored Questions...</p>
                            <p className="text-xs text-zinc-500">Gemini AI is crafting behavioral, technical, and situational prompts...</p>
                          </div>
                        </div>
                      )}

                      {questionsResult?.questions && !questionsLoading && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-zinc-950/20 p-4 rounded-xl border border-zinc-800/50">
                            <div>
                              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">Interview Preparation Questions</h3>
                              <p className="text-[11px] text-zinc-400 mt-0.5">Click any question to view tips and draft your response.</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleInterviewQuestions}
                              className="text-xs hover:bg-zinc-850 hover:text-zinc-50 gap-1.5 cursor-pointer"
                            >
                              <MessageSquare className="h-3.5 w-3.5 text-primary" />
                              Regenerate
                            </Button>
                          </div>

                          {/* Progress Bar */}
                          <InterviewProgress key={progressKey} jobId={jobId} totalQuestions={questionsResult.questions.length} />

                          <div className="space-y-3.5">
                            {questionsResult.questions.map((q, i) => (
                              <QuestionAccordionItem
                                key={i}
                                question={q}
                                index={i}
                                jobId={jobId}
                                onComplete={() => setProgressKey(k => k + 1)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {questionsError && <p className="text-xs font-semibold text-rose-455 bg-rose-950/20 border border-rose-800/30 p-3.5 rounded-xl">{questionsError}</p>}
                    </div>
                  )}

                  {/* TAB 3: Cover Letter */}
                  {activeTab === 'cover' && (
                    <div className="space-y-4">
                      {!coverResult && !coverLoading && (
                        <div className="flex flex-col items-center justify-center text-center p-8 space-y-4 bg-zinc-950/20 rounded-2xl border border-zinc-800/50">
                          <div className="p-3.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            <FileText className="h-6 w-6 animate-pulse" />
                          </div>
                          <div className="space-y-1.5 max-w-md">
                            <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">Create Targeted Cover Letter</h3>
                            <p className="text-xs leading-relaxed text-zinc-400">
                              Generate a tailored cover letter structure leveraging your background details matched to the explicit roles of this posting.
                            </p>
                          </div>
                          <Button
                            variant="default"
                            onClick={handleCoverLetter}
                            className="bg-primary hover:bg-primary text-white gap-2 px-6 shadow-lg shadow-primary/10 cursor-pointer"
                          >
                            <FileText className="h-4 w-4" />
                            Write Cover Letter
                          </Button>
                        </div>
                      )}

                      {coverLoading && (
                        <div className="flex flex-col items-center justify-center text-center p-12 space-y-4">
                          <Loader2 className="h-8 w-8 text-primary animate-spin" />
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-zinc-300">Drafting Personalized Letter...</p>
                            <p className="text-xs text-zinc-500">Gemini AI is framing paragraphs based on your resume matching...</p>
                          </div>
                        </div>
                      )}

                      {coverResult?.cover_letter && !coverLoading && (
                        <div className="space-y-4">
                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCoverLetter}
                              className="text-xs hover:bg-zinc-850 hover:text-zinc-50 gap-1.5 cursor-pointer"
                            >
                              <FileText className="h-3.5 w-3.5 text-primary" />
                              Regenerate Letter
                            </Button>
                          </div>
                          <CoverLetterDocument
                            coverLetter={coverResult.cover_letter}
                            jobTitle={job.job_title}
                            companyName={job.company_name}
                          />
                        </div>
                      )}

                      {coverError && <p className="text-xs font-semibold text-rose-455 bg-rose-950/20 border border-rose-800/30 p-3.5 rounded-xl">{coverError}</p>}
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Compact Info Footer */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-zinc-800/60 bg-zinc-900/30 px-5 py-3 text-xs text-zinc-400">
              <span>Created: {formatDate(job.created_at)}</span>
              {hasBeenUpdated && <span>Last Activity: {formatDate(job.updated_at)}</span>}
              {matchResult && (
                <span className="flex items-center gap-1.5">
                  Match: <span className={`font-bold ${matchResult.score >= 80 ? 'text-emerald-400' : matchResult.score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>{matchResult.score}%</span>
                </span>
              )}
              {questionsResult?.questions && (
                <span className="flex items-center gap-1.5">
                  Interview: <span className="font-bold text-primary">{questionsResult.questions.length} Qs</span>
                </span>
              )}
              {coverResult?.cover_letter && (
                <span className="flex items-center gap-1.5">
                  Cover Letter: <span className="font-bold text-emerald-400">Ready</span>
                </span>
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

