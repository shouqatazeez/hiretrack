import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="flex min-h-screen bg-zinc-950">
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-[45%] lg:px-12 xl:px-20">
        <div className="w-full max-w-[380px]">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
              <Briefcase className="h-4.5 w-4.5 text-zinc-950" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-zinc-300">
              HireTrack
            </span>
          </div>

          <div className="mb-8 space-y-2">
            <h1 className="text-[1.7rem] font-semibold leading-tight tracking-tight text-zinc-100">
              Welcome back
            </h1>
            <p className="text-sm leading-relaxed text-zinc-400">
              Sign in to your hiring workspace.
            </p>
          </div>

          <form className="space-y-5">
            <div className="space-y-2 ">
              <label
                htmlFor="email"
                className="text-[0.8125rem] font-medium text-zinc-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-11 w-full mt-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-600 focus:bg-zinc-900/80"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-[0.8125rem] font-medium text-zinc-300 "
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 pr-11 pl-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-600 focus:bg-zinc-900/80"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-zinc-500 transition-colors hover:text-zinc-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="flex  mb-3.5 h-11 w-full items-center justify-center gap-2 rounded-lg bg-white text-[0.8125rem] font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              Sign in
              <ArrowRight size={15} />
            </button>
          </form>

          <p className="mt-6 text-center text-[0.8125rem] text-zinc-500">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-zinc-300 underline-offset-4 transition hover:text-white hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden w-[55%] items-center justify-center border-l border-zinc-800 bg-zinc-900/50 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-[380px] space-y-6 text-center">
          <p className="text-xl font-medium leading-relaxed tracking-tight text-zinc-200">
            Stay organized during your job search.
          </p>

          <p className="text-base leading-relaxed text-zinc-400">
            Monitor applications, interviews, and offers through a clean hiring pipeline dashboard.
          </p>
        </div>
      </div>
    </main>
  )
}
