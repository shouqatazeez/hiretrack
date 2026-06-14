import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  Briefcase,
  ArrowRight,
  LayoutDashboard,
  Bell,
  BarChart3,
  KanbanSquare,
  ShieldCheck,
  Clock,
  Menu,
  X,
  Check,
  ChevronDown,
  Quote,
  Sparkles,
  Search,
  Trophy,
  XCircle,
  FileText,
  CalendarClock,
  Plus,
  RotateCcw,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'
import { Progress } from '../../components/ui/progress'
import { Badge } from '../../components/ui/badge'
import { Avatar, AvatarFallback } from '../../components/ui/avatar'
import ActivityChart from '../../components/dashboard/ActivityChart'

function Github({ size = 24, className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function Linkedin({ size = 24, className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const valueProps = [
  {
    icon: Sparkles,
    title: 'AI Resume Match Score',
    description:
      'Get an instant compatibility score comparing your resume against any job description, with strengths, gaps, and actionable recommendations.',
  },
  {
    icon: LayoutDashboard,
    title: 'Smart Dashboard',
    description:
      'Total applications, interviews, offers, and upcoming interview reminders at a glance with a 7-day activity chart.',
  },
  {
    icon: FileText,
    title: 'AI Cover Letter Generator',
    description:
      'Generate professional, company-specific cover letters tailored to each job description and your resume in seconds.',
  },
  {
    icon: Bell,
    title: 'Interview Reminders + Google Calendar',
    description:
      'Set interview dates and add them to Google Calendar with one click. Never miss an interview again.',
  },
  {
    icon: KanbanSquare,
    title: 'AI Interview Coach',
    description:
      'Get 10 tailored interview questions with AI feedback on your practice answers, scoring, and suggested improvements.',
  },
  {
    icon: BarChart3,
    title: 'Resume Upload & Analysis',
    description:
      'Upload your PDF resume once. AI extracts the text and uses it across all features — match scoring, cover letters, and interview prep.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Upload your resume',
    description: 'Sign up and upload your PDF resume. AI extracts the text for all smart features.',
  },
  {
    number: '02',
    title: 'Track your applications',
    description: 'Add jobs with descriptions, set interview dates, and watch your pipeline grow.',
  },
  {
    number: '03',
    title: 'Let AI prepare you',
    description: 'Get match scores, practice interviews with AI feedback, and generate tailored cover letters.',
  },
]

const testimonials = [
  {
    quote:
      'I went from 30 browser tabs and a broken spreadsheet to one dashboard. I finally knew exactly where each application stood — and it landed me two interviews that week.',
    name: 'Priya M.',
    role: 'Frontend Engineer',
  },
  {
    quote:
      'HireTrack kept my search sane. Seeing everything move from applied to offer made the whole process feel manageable.',
    name: 'Daniel R.',
    role: 'Product Designer',
  },
  {
    quote:
      'I stopped letting applications fall through the cracks. The real-time status pipeline is exactly what I needed.',
    name: 'Sara K.',
    role: 'Marketing Lead',
  },
  {
    quote:
      'Setup took a minute, and I was tracking 15 applications by the end of the day. Simple and genuinely useful.',
    name: 'Marcus T.',
    role: 'Fullstack Developer',
  },
]

const faqs = [
  {
    question: 'Is HireTrack free?',
    answer:
      'Yes. All features including AI match scoring, interview coaching, and cover letter generation are free — no credit card required.',
  },
  {
    question: 'How does the AI Resume Match work?',
    answer:
      'Upload your resume and add a job description. Our AI compares them and gives you a compatibility score (0-100) with sub-scores for skills, experience, projects, and keywords — plus specific recommendations to improve your match.',
  },
  {
    question: 'What AI model powers the features?',
    answer:
      'HireTrack uses Google Gemini AI for all intelligent features. It provides fast, accurate analysis for resume matching, interview prep, and cover letter generation.',
  },
  {
    question: 'Can I export my application data?',
    answer:
      'Yes. Click "Export CSV" on the Jobs page to download all your tracked applications as a spreadsheet file.',
  },
  {
    question: 'How do interview reminders work?',
    answer:
      'Set an interview date on any job application. It appears on your dashboard with a countdown, and you can add it to Google Calendar with one click for automatic notifications.',
  },
  {
    question: 'Is my data private?',
    answer:
      'Always. Your applications, resume, and AI results are locked to your account behind secure JWT authentication. Your data is yours alone.',
  },
]

const benefits = [
  'AI-powered resume match scoring',
  'Personalized cover letter generation',
  'AI interview coach with feedback',
  'Google Calendar interview reminders',
  'CSV export for your records',
  'Unlimited job application tracking',
]

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
]

function Container({ as: Tag = 'div', className, children }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-6xl px-6', className)}>{children}</Tag>
  )
}

function SectionHeading({ eyebrow, title, description, className }) {
  return (
    <div className={cn('mx-auto max-w-2xl text-center', className)}>
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-4 mb-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
    </div>
  )
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
        <Briefcase className="h-4.5 w-4.5 text-primary-foreground" />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold tracking-wide text-zinc-100 leading-none">HireTrack</span>
        <span className="text-[10px] text-zinc-500 tracking-wide font-medium mt-1 leading-none">Job Tracker</span>
      </div>
    </Link>
  )
}

function GridBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
    </>
  )
}

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-zinc-800/60">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-zinc-100">{faq.question}</span>
        <ChevronDown
          size={18}
          className={cn(
            'shrink-0 text-zinc-500 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-200 ease-out',
          isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

const STATUS_CONFIG = {
  applied:      { label: 'Applied',      badge: 'bg-blue-500/10 text-blue-400', dot: 'bg-blue-500', bar: 'bg-blue-500', indicator: '[&_[data-slot=progress-indicator]]:!bg-blue-500' },
  interviewing: { label: 'Interviewing', badge: 'bg-amber-500/10 text-amber-400', dot: 'bg-amber-500', bar: 'bg-amber-400', indicator: '[&_[data-slot=progress-indicator]]:!bg-amber-500' },
  offered:      { label: 'Offered',      badge: 'bg-emerald-500/10 text-emerald-400', dot: 'bg-emerald-500', bar: 'bg-emerald-500', indicator: '[&_[data-slot=progress-indicator]]:!bg-emerald-500' },
  rejected:     { label: 'Rejected',     badge: 'bg-rose-500/10 text-rose-400', dot: 'bg-rose-500', bar: 'bg-rose-500', indicator: '[&_[data-slot=progress-indicator]]:!bg-rose-500' },
  withdrawn:    { label: 'Withdrawn',    badge: 'bg-zinc-800/50 text-zinc-400', dot: 'bg-zinc-500', bar: 'bg-zinc-500', indicator: '[&_[data-slot=progress-indicator]]:!bg-zinc-500' },
}

const PIPELINE_ORDER = ['applied', 'interviewing', 'offered', 'rejected', 'withdrawn']

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    badge: 'bg-zinc-800/50 text-zinc-400',
    dot: 'bg-zinc-500',
  }
  return (
    <Badge
      variant="outline"
      className={cn("inline-flex items-center gap-x-1.5 h-auto px-2.5 py-1 text-xs font-semibold leading-5 border-none", config.badge)}
    >
      <span className={cn("inline-block h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </Badge>
  )
}

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const INITIAL_DEMO_JOBS = [
  { id: '1', job_title: 'Senior Frontend Engineer', company_name: 'Vercel', status: 'interviewing', applied_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '2', job_title: 'Product Designer', company_name: 'Linear', status: 'offered', applied_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '3', job_title: 'Full Stack Developer', company_name: 'Stripe', status: 'applied', applied_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '4', job_title: 'Software Engineer', company_name: 'Google', status: 'applied', applied_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
  { id: '5', job_title: 'Backend Engineer', company_name: 'Supabase', status: 'rejected', applied_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
]

function InteractiveDemoDashboard() {
  const [jobs, setJobs] = useState(INITIAL_DEMO_JOBS)
  const [filter, setFilter] = useState('all')
  const [companyName, setCompanyName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [status, setStatus] = useState('applied')
  const [error, setError] = useState('')

  const total = jobs.length
  const interviews = jobs.filter((j) => j.status === 'interviewing').length
  const offers = jobs.filter((j) => j.status === 'offered').length
  const rejected = jobs.filter((j) => j.status === 'rejected').length

  const counts = PIPELINE_ORDER.map((s) => ({
    status: s,
    label: STATUS_CONFIG[s].label,
    bar: STATUS_CONFIG[s].bar,
    indicator: STATUS_CONFIG[s].indicator,
    count: jobs.filter((j) => j.status === s).length,
  })).filter((entry) => entry.count > 0)

  const chartData = (() => {
    const data = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const label = d.toLocaleDateString('en-US', { weekday: 'short' })
      const count = jobs.filter((j) => j.applied_at && j.applied_at.startsWith(dateStr)).length
      data.push({ label, count, dateStr })
    }
    return data
  })()

  const handleAddJob = (e) => {
    e.preventDefault()
    if (!companyName.trim() || !jobTitle.trim()) {
      setError('Please fill in both fields')
      return
    }
    setError('')
    const newJob = {
      id: String(Date.now()),
      job_title: jobTitle,
      company_name: companyName,
      status: status,
      applied_at: new Date().toISOString(),
    }
    setJobs([newJob, ...jobs])
    setCompanyName('')
    setJobTitle('')
    setStatus('applied')
  }

  const handleReset = () => {
    setJobs(INITIAL_DEMO_JOBS)
    setFilter('all')
    setCompanyName('')
    setJobTitle('')
    setStatus('applied')
    setError('')
  }

  const filteredJobs = filter === 'all' ? jobs : jobs.filter((j) => j.status === filter)

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 sm:p-6 text-left w-full select-none">
      <div className="mb-6 flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-rose-500 animate-pulse" />
          <span className="h-3 w-3 rounded-full bg-amber-500" />
          <span className="h-3 w-3 rounded-full bg-emerald-500" />
          <span className="ml-2 text-xs font-semibold text-zinc-500 tracking-wider uppercase">Interactive Demo</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            title="Reset to default data"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        {[
          { label: 'Total Applications', value: total, icon: Briefcase, filterKey: 'all', highlight: true },
          { label: 'Interviewing', value: interviews, icon: CalendarClock, filterKey: 'interviewing' },
          { label: 'Offers', value: offers, icon: Trophy, filterKey: 'offered' },
          { label: 'Rejected', value: rejected, icon: XCircle, filterKey: 'rejected' },
        ].map((stat) => {
          const isActive = filter === stat.filterKey
          return (
            <button
              key={stat.label}
              onClick={() => setFilter(isActive ? 'all' : stat.filterKey)}
              className={cn(
                "transition hover:shadow-lg p-4 border rounded-3xl text-zinc-100 text-left cursor-pointer transition-all",
                stat.highlight && !isActive && "border-primary/30 bg-linear-to-br from-primary/80 to-emerald-800/80 shadow-md shadow-primary/10 text-primary-foreground",
                isActive && "border-primary ring-2 ring-primary/30 bg-zinc-900 shadow-md",
                !stat.highlight && !isActive && "border-zinc-800 bg-zinc-900/75"
              )}
            >
              <div className="flex flex-row items-center justify-between space-y-0 p-0">
                <p className={cn(
                  "text-xs font-medium text-zinc-400",
                  stat.highlight && !isActive && "text-primary-foreground/85",
                  isActive && "text-primary/90"
                )}>
                  {stat.label}
                </p>
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800",
                    stat.highlight && !isActive && "bg-white/15",
                    isActive && "bg-primary/20"
                  )}
                >
                  <stat.icon className={cn(
                    "h-3.5 w-3.5 text-zinc-300",
                    stat.highlight && !isActive && "text-primary-foreground",
                    isActive && "text-primary"
                  )} />
                </div>
              </div>
              <div className="p-0 mt-2">
                <div className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                  {stat.value}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3">
          <ActivityChart data={chartData} />
        </div>
        <Card className="border border-zinc-800 bg-zinc-900/50 p-5 shadow-lg shadow-black/10 lg:col-span-2">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-semibold text-zinc-50">Application Status</h3>
            <span className="text-xs font-medium text-zinc-500">{total} total</span>
          </div>
          <div className="space-y-4">
            {counts.map((entry) => {
              const pct = Math.round((entry.count / total) * 105 / 105)
              const pctVal = Math.round((entry.count / total) * 100)
              return (
                <div key={entry.status} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-300">{entry.label}</span>
                    <span className="text-zinc-500">
                      {entry.count} · {pctVal}%
                    </span>
                  </div>
                  <Progress
                    value={pctVal}
                    className={cn("h-2 bg-zinc-850", entry.indicator)}
                  />
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="border border-zinc-800 bg-zinc-900/50 p-5 shadow-lg shadow-black/10 lg:col-span-3">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-semibold text-zinc-50">
              {filter === 'all' ? 'Recent Applications' : `${STATUS_CONFIG[filter]?.label ?? filter} Applications`}
            </h3>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="text-xs text-primary hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>
          {filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 py-8 text-center bg-zinc-950/20">
              <p className="text-xs font-medium text-zinc-400">No applications match this filter</p>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-800/80 max-h-[260px] overflow-y-auto pr-1">
              {filteredJobs.map((job) => (
                <li key={job.id} className="py-2.5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-zinc-800 text-xs font-semibold text-zinc-300">
                        {job.company_name?.[0]?.toUpperCase() ?? '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-zinc-100">{job.job_title}</p>
                      <p className="truncate text-[11px] text-zinc-500">
                        {job.company_name} · {formatDate(job.applied_at)}
                      </p>
                    </div>
                    <StatusBadge status={job.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="border border-zinc-800 bg-zinc-900/50 p-5 shadow-lg shadow-black/10 lg:col-span-2">
          <div className="pb-3">
            <h3 className="text-sm font-semibold text-zinc-50 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Try tracking a job
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Add a mock role to test the dashboard updates.
            </p>
          </div>
          <form onSubmit={handleAddJob} className="space-y-3">
            <div>
              <label htmlFor="companyName" className="block text-[10px] font-medium text-zinc-400 mb-1">
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                required
                placeholder="e.g. OpenAI"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="jobTitle" className="block text-[10px] font-medium text-zinc-400 mb-1">
                Job Title
              </label>
              <input
                id="jobTitle"
                type="text"
                required
                placeholder="e.g. Research Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-[10px] font-medium text-zinc-400 mb-1">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1.5 text-xs text-zinc-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offered">Offered</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
            {error && <p className="text-[10px] text-rose-500 font-medium">{error}</p>}
            <button
              type="submit"
              className="w-full flex h-8.5 items-center justify-center gap-1 rounded-md bg-primary text-[11px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99]"
            >
              <Plus className="h-3.5 w-3.5 animate-pulse" />
              <span>Add to Dashboard</span>
            </button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300">
      <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-[0.8125rem] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get started
              <ArrowRight size={15} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </Container>

        {menuOpen && (
          <div className="border-t border-zinc-800/60 md:hidden">
            <Container className="py-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 flex flex-col gap-2 border-t border-zinc-800/60 pt-3">
                  <Link
                    to="/login"
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-900"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary text-[0.8125rem] font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Get started
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </nav>
            </Container>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden">
        <GridBackground />
        <div className="pointer-events-none absolute left-1/2 top-0 h-125 w-250 max-w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--color-primary)_18%,transparent)_0%,transparent_70%)] blur-2xl" />
        <Container className="relative flex flex-col items-center pt-20 pb-0 text-center sm:pt-28 sm:pb-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-medium text-zinc-400">
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
            Your job search, finally organized
          </span>

          <h1 className="mt-7 mb-2 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
            Track every application from{' '}
            <span className="text-zinc-400">applied</span> to{' '}
            <span className="text-primary">offer</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
            One clean dashboard for your entire job hunt. No scattered tabs, no
            forgotten follow-ups, no guessing where things stand.
          </p>

          <div className="mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row">
            <Link
              to="/register"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
            >
              Start tracking free
              <ArrowRight size={16} />
            </Link>
            <a
              href="#how-it-works"
              className="flex h-12 w-full items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 px-6 text-sm font-semibold text-zinc-100 transition-colors hover:border-zinc-600 hover:bg-zinc-800 sm:w-auto"
            >
              See how it works
            </a>
          </div>

          <div className="mt-7 flex max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-zinc-400 sm:max-w-none">
            {['Free to start', 'No credit card required', 'Set up in under a minute'].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Check size={13} className="text-primary" />
                  {item}
                </span>
              ),
            )}
          </div>

          <div className="relative mx-auto mt-16 max-w-4xl w-full">
            <div className="rounded-2xl border border-zinc-850 bg-zinc-900/40 p-2 shadow-2xl backdrop-blur">
              <InteractiveDemoDashboard />
            </div>
            <div className="pointer-events-none absolute inset-x-0 -bottom-px h-24 bg-linear-to-t from-zinc-950 to-transparent" />
          </div>
        </Container>
      </section>

      <section className="border-y border-zinc-800/60 bg-zinc-900/20">
        <Container className="flex flex-col items-center justify-center gap-x-8 gap-y-4 py-10 text-center sm:flex-row">
          <p className="text-sm font-medium text-zinc-300">
            Trusted by job seekers to stay organized through every stage
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-semibold">
            <StatusBadge status="applied" />
            <ArrowRight size={14} className="text-zinc-600" />
            <StatusBadge status="interviewing" />
            <ArrowRight size={14} className="text-zinc-600" />
            <StatusBadge status="offered" />
          </div>
        </Container>
      </section>

      <section id="features" className="pt-12 pb-20 sm:pt-16 sm:pb-24">
        <Container>
          <SectionHeading 
            eyebrow="Features"
            title="Everything you need to land your next role"
            description="Stop managing your career out of a spreadsheet. HireTrack is a dedicated workspace built to keep your pipeline organized, your search efficient, and your job search moving forward."
          />

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((feature) => (
              <div
                key={feature.title}
                className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 transition-colors hover:bg-zinc-900/60"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 transition-colors group-hover:border-zinc-700">
                  <feature.icon className="h-5 w-5 text-zinc-300" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-zinc-100">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="border-t border-zinc-800/60 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Get organized in three steps"
            description="Log every role, track each stage, and never miss a follow-up again."
          />

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8"
              >
                <span className="text-sm font-semibold text-primary">{step.number}</span>
                <h3 className="mt-4 text-base font-semibold text-zinc-100">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="testimonials" className="border-t border-zinc-800/60 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Loved by job seekers"
            title="From scattered tabs to landed offers"
          />

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8"
              >
                <Quote className="h-6 w-6 text-zinc-700" />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-zinc-300">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-zinc-200">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="border-t border-zinc-800/60 py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />

          <div className="mx-auto mt-16 max-w-3xl">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.question}
                faq={faq}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-zinc-800/60 py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-12">
            <GridBackground />
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/50 px-3 py-1 text-xs font-medium text-zinc-400">
                  <Sparkles size={12} className="text-primary" />
                  Free to start
                </span>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                  Ready to take control of your job search?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  Create your free workspace and start tracking applications in under a
                  minute. No credit card required.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/register"
                    className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Create free account
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/login"
                    className="flex h-11 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/50 px-6 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
                  >
                    Sign in
                  </Link>
                </div>
              </div>

              <ul className="space-y-3.5">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </span>
                    <span className="text-sm text-zinc-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <footer className="border-t border-zinc-900 bg-zinc-950 py-6">
        <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden h-4 w-px bg-zinc-800 sm:inline-block" />
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} HireTrack. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <nav className="flex items-center gap-5 text-xs text-zinc-400">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-zinc-100"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <span className="hidden h-4 w-px bg-zinc-850 sm:inline-block" />
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/shouqatazeez/hiretrack.git"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-850 bg-zinc-900/40 p-1.5 text-zinc-400 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
                aria-label="GitHub Repository"
              >
                <Github size={14} />
              </a>
              <a
                href="https://www.linkedin.com/in/shouqat-azeez-mohammad/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-850 bg-zinc-900/40 p-1.5 text-zinc-400 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}
