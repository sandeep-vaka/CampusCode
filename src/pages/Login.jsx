import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import AuthShell from '../components/AuthShell.jsx'
import Button from '../components/Button.jsx'
import { PasswordField } from '../components/FormField.jsx'
import FormField from '../components/FormField.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { useAppState } from '../context/appState.js'
import { demoUser } from '../data/mockData.js'
import useForm from '../hooks/useForm.js'
import { safeRedirect } from '../lib/utils.js'
import { validateLogin } from '../lib/validation.js'

const initial = { email: '', password: '' }

export default function Login() {
  const { user, login } = useAppState()
  const from = safeRedirect(useLocation().state?.from)
  const [demoBusy, setDemoBusy] = useState(false)
  const form = useForm({ initial, validate: validateLogin, onSubmit: ({ email }) => login({ email }) })
  const busy = form.submitting || demoBusy

  if (user) return <Navigate to={from} replace />

  const useDemo = async () => {
    setDemoBusy(true)
    await login(demoUser)
    setDemoBusy(false)
  }

  return (
    <AuthShell tag="CampusCode / Access" lines={['Welcome', '~back.']} lead="Log in to follow your hackathons, teams and submissions.">
      <Reveal delay={0.3}>
        <form onSubmit={form.handleSubmit} noValidate>
          <FormField label="Email" type="email" inputMode="email" autoComplete="email" placeholder="you@college.edu" {...form.field('email')} />
          <PasswordField label="Password" autoComplete="current-password" placeholder="Your password" {...form.field('password')} />
          {form.formError && <p role="alert" className="mb-3 border border-[#c0392b]/40 bg-[#c0392b]/5 p-3 text-[13px] text-[#a52a2a]">{form.formError}</p>}
          <Button variant="dark" type="submit" disabled={busy} className="mt-2 w-full !py-4">
            {form.submitting ? <><LoaderCircle size={14} className="animate-spin" aria-hidden="true" />Logging in…</> : <>Log in <span className="text-lime">↗️</span></>}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[1px] text-muted" aria-hidden="true">
          <span className="h-px flex-1 bg-line" />or<span className="h-px flex-1 bg-line" />
        </div>

        <Button variant="box" disabled={busy} onClick={useDemo} className="w-full !py-4">
          {demoBusy ? <><LoaderCircle size={14} className="animate-spin" aria-hidden="true" />Opening demo…</> : 'Use demo account'}
        </Button>

        <p className="mono-label mt-8 !normal-case !tracking-[0.5px] leading-[1.7]">
          Demo mode: any email and password works. Nothing leaves your browser.
        </p>
        <p className="mt-4 text-sm text-[#666]">
          New to CampusCode? <Link to="/signup" className="tap link-underline font-semibold text-ink no-underline">Join the arena</Link>
        </p>
      </Reveal>
    </AuthShell>
  )
}
