import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Eye, EyeOff, Lock, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.14),transparent_38%),linear-gradient(180deg,rgba(248,250,252,1),rgba(241,245,249,1))] px-4 py-10 text-slate-950 dark:bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.08),transparent_38%),linear-gradient(180deg,rgba(2,6,23,1),rgba(15,23,42,1))] dark:text-slate-50 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] dark:opacity-20" />

      <section className="relative z-10 flex w-full max-w-[420px] flex-col items-center">
        <div className="mb-6 flex items-center gap-3 text-slate-700 dark:text-slate-200">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            <Briefcase className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">HireTrack</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Job application workspace</p>
          </div>
        </div>

        <Card className="w-full border-white/70 bg-white/90 shadow-[0_20px_70px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75">
          <CardHeader>
            <CardTitle className="text-center text-3xl sm:text-[2rem]">Welcome back</CardTitle>
            <CardDescription className="mx-auto max-w-sm text-center">
              Sign in to continue tracking applications, interviews, and follow-ups in one calm workspace.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="h-11 rounded-2xl border-slate-200 bg-white/80 pl-10 text-slate-950 shadow-sm placeholder:text-slate-400 focus-visible:ring-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="h-11 rounded-2xl border-slate-200 bg-white/80 pl-10 pr-11 text-slate-950 shadow-sm placeholder:text-slate-400 focus-visible:ring-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-white"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-400 dark:border-white/20"
                  />
                  Remember me
                </label>
                <span className="hidden sm:inline">Secure sign in</span>
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-2xl bg-slate-950 text-sm font-medium text-white shadow-lg shadow-slate-950/15 transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-950/20 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span>Sign in</span>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-medium text-slate-950 underline-offset-4 transition hover:underline dark:text-white">
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
