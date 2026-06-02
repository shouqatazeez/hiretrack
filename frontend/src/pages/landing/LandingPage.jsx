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
} from 'lucide-react'

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

const valueProps = [
  {
    icon: KanbanSquare,
    title: 'Built for the search, not the spreadsheet',
    description:
      'A real pipeline that moves applications from applied to offer, so your search never falls apart by week two.',
  },
  {
    icon: LayoutDashboard,
    title: 'Everything on one dashboard',
    description:
      'Total applications, active interviews, and offers at a glance. No scattered tabs, no guessing where things stand.',
  },
  {
    icon: Search,
    title: 'Find applications instantly',
    description:
      'Search and filter your applications in real-time by title, company, or status as your pipeline grows.',
  },
  {
    icon: Clock,
    title: 'Add a job in seconds',
    description:
      'Capture a new application the moment you hit submit, with just the details that matter to you.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by default',
    description:
      'Secure authentication keeps your search locked to your account. Your search is yours alone.',
  },
  {
    icon: BarChart3,
    title: 'See your momentum',
    description:
      'Watch progress build as roles move through each stage and stay motivated through the whole search.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create your workspace',
    description: 'Sign up in seconds and get a clean, private space built for your job search.',
  },
  {
    number: '02',
    title: 'Add your applications',
    description: 'Log every role you apply to with company and status to keep your pipeline organized.',
  },
  {
    number: '03',
    title: 'Track to the offer',
    description: 'Move each application through your pipeline until you land the right one.',
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
      'Yes. You can create a workspace and start tracking applications for free — no credit card required.',
  },
  {
    question: 'How is this better than a spreadsheet?',
    answer:
      'HireTrack is purpose-built for job searching. Instead of fighting with rows and columns, you get a visual pipeline, a live dashboard, and real-time search capabilities — all in one place that stays organized as your search grows.',
  },
  {
    question: 'Can I track unlimited applications?',
    answer:
      "Yes. Add as many roles as you're applying to, with company and status for each.",
  },
  {
    question: 'Is my data private?',
    answer:
      'Always. Your applications are locked to your account behind secure authentication. Your search is yours alone.',
  },
  {
    question: 'How long does setup take?',
    answer:
      "Under a minute. Sign up, add your first application, and you're tracking.",
  },
  {
    question: 'What stages can I track?',
    answer:
      'Every application moves through clear stages — applied, interviewing, and offer — so you always know where things stand.',
  },
]

const benefits = [
  'Unlimited application tracking',
  'Status pipeline from applied to offer',
  'Clean dashboard with live stats',
  'Real-time search and filter capabilities',
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
      <span className="text-sm font-semibold tracking-wide text-zinc-100">HireTrack</span>
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

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300">
      {/* Header */}
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

      {/* Hero */}
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

          {/* Dashboard preview */}
          <div className="relative mx-auto mt-16 max-w-4xl w-full">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-2 shadow-2xl backdrop-blur">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: 'Total Applications', value: '24', icon: Briefcase },
                    { label: 'Interviewing', value: '6', icon: Clock },
                    { label: 'Offers', value: '2', icon: Trophy },
                    { label: 'Rejected', value: '1', icon: XCircle },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-zinc-500">{stat.label}</p>
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-800">
                          <stat.icon className="h-3.5 w-3.5 text-zinc-400" />
                        </div>
                      </div>
                      <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    { role: 'Frontend Engineer · Vercel', status: 'Interviewing', tone: 'text-amber-400 bg-amber-400/10' },
                    { role: 'Product Designer · Linear', status: 'Offer', tone: 'text-primary bg-primary/10' },
                    { role: 'Fullstack Developer · Stripe', status: 'Applied', tone: 'text-zinc-300 bg-zinc-700/40' },
                  ].map((row) => (
                    <div
                      key={row.role}
                      className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-left"
                    >
                      <span className="text-sm text-zinc-300">{row.role}</span>
                      <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', row.tone)}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
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
            <span className="rounded-full bg-zinc-800/60 px-3 py-1 text-zinc-300">Applied</span>
            <ArrowRight size={14} className="text-zinc-600" />
            <span className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-400">Interviewing</span>
            <ArrowRight size={14} className="text-zinc-600" />
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">Offer</span>
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

      {/* Testimonials */}
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

      <footer className="border-t border-zinc-800/60 py-10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Logo />
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-zinc-800/60 pt-4 md:border-t-0 md:border-l md:border-zinc-800/60 md:pt-0 md:pl-6">
                <a
                  href="https://github.com/shouqatazeez/hiretrack.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                >
                  <Github size={15} />
                  GitHub Repository
                </a>
                <a
                  href="https://hiretrack-api.vercel.app/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                >
                  <FileText size={15} />
                  API Docs
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-zinc-800/60 pt-6 text-center">
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} HireTrack. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
