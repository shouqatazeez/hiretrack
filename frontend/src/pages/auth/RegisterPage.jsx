import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Briefcase, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { registerUser } from '../../services/authService'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await registerUser({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      })

      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      const serverMessage = err?.response?.data?.detail

      if (Array.isArray(serverMessage)) {
        setError(serverMessage[0]?.msg || 'Validation error. Please check your inputs.')
      } else {
        setError(serverMessage || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen bg-zinc-950">

      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-[45%] lg:px-12 xl:px-20">
        <div className="w-full max-w-95">

          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-zinc-300">
              HireTrack
            </span>
          </div>

          <div className="mb-8 space-y-2">
            <h1 className="text-[1.7rem] font-semibold leading-tight tracking-tight text-zinc-100">
              Create your account
            </h1>
            <p className="text-sm leading-relaxed text-zinc-400">
              Start your hiring journey with clarity.
            </p>
          </div>

          {success && (
            <div className="mb-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              🎉 Account created! Redirecting you to login…
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>

            <div className="space-y-2">
              <label htmlFor="full_name" className="text-[0.8125rem] font-medium text-zinc-300">
                Full name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Your full name"
                autoComplete="name"
                required
                value={formData.full_name}
                onChange={handleChange}
                disabled={loading}
                className="mt-1 h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors focus:border-primary focus:bg-zinc-900/80 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-[0.8125rem] font-medium text-zinc-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="mt-1 h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors focus:border-primary focus:bg-zinc-900/80 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-[0.8125rem] font-medium text-zinc-300">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password (min. 8 chars)"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-900 pr-11 pl-3.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors focus:border-primary focus:bg-zinc-900/80 disabled:opacity-50"
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
              disabled={loading}
              className="mb-3.5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[0.8125rem] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={15} />
                </>
              )}
            </button>

          </form>

          <p className="mt-6 text-center text-[0.8125rem] text-zinc-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-zinc-300 underline-offset-4 transition hover:text-white hover:underline"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>

      <div className="relative hidden w-[55%] items-center justify-center border-l border-zinc-700/40 bg-zinc-900/50 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-95 space-y-6 text-center">
          <p className="text-xl font-medium leading-relaxed tracking-tight text-zinc-200">
            Start your hiring journey with clarity.
          </p>
          <p className="text-base leading-relaxed text-zinc-400">
            Manage applications, interviews, and offers without losing track of opportunities.
          </p>
        </div>
      </div>

    </main>
  )
}