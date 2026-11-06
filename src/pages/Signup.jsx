import { Link, Navigate, useLocation } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import AuthShell from '../components/AuthShell.jsx'
import Button from '../components/Button.jsx'
import FormField, { FieldError, PasswordField } from '../components/FormField.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { useAppState } from '../context/appState.js'
import useForm from '../hooks/useForm.js'
import { safeRedirect } from '../lib/utils.js'
import { passwordScore, validateSignup } from '../lib/validation.js'

const initial = { name: '', email: '', college: '', password: '', confirm: '', terms: false }
const strength = ['', 'Weak', 'Okay', 'Good', 'Strong']

function PasswordMeter({ value }) {
  const score = passwordScore(value)
  return (
    <div className="-mt-3 mb-2 flex items-center gap-3" aria-live="polite">
      <div className="flex flex-1 gap-1" aria-hidden="true">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={`h-[3px] flex-1 transition-colors duration-300 ${i <= score ? (score < 3 ? 'bg-[#c0392b]' : 'bg-lime-dark') : 'bg-line'}`} />
        ))}
      </div>
      <span className="mono-label w-12 text-right !text-[9px]">{value ? strength[score] : ''}</span>
    </div>
  )
}

export default function Signup() {
  const { user, signup } = useAppState()
  const from = safeRedirect(useLocation().state?.from)
  const form = useForm({ initial, validate: validateSignup, onSubmit: signup })

  if (user) return <Navigate to={from} replace />

  return (
    <AuthShell tag="CampusCode / Join" lines={['Join the', '~arena.']} lead="Create a free account to register for hackathons and find your team.">
      <Reveal delay={0.3}>
        <form onSubmit={form.handleSubmit} noValidate>
          <FormField label="Full name" autoComplete="name" placeholder="Aarav Sharma" {...form.field('name')} />
          <FormField label="Email" type="email" inputMode="email" autoComplete="email" placeholder="you@college.edu" {...form.field('email')} />
          <FormField label="College" autoComplete="organization" placeholder="Where do you study?" {...form.field('college')} />
          <div className="grid gap-x-4 sm:grid-cols-2">
            <PasswordField label="Password" autoComplete="new-password" placeholder="8+ characters" {...form.field('password')} />
            <PasswordField label="Confirm password" autoComplete="new-password" placeholder="Repeat it" {...form.field('confirm')} />
          </div>
          <PasswordMeter value={form.values.password} />

          <label className="flex items-start gap-3 text-[13px] leading-[1.6] text-[#666]">
            <input type="checkbox" className="mt-[3px] h-4 w-4 shrink-0 accent-[#111]" aria-invalid={Boolean(form.checkbox('terms').error)} aria-describedby="terms-err" {...form.checkbox('terms')} />
            <span>
              I agree to the <Link to="/info/terms" className="tap link-underline font-semibold text-ink no-underline">Terms</Link> and{' '}
              <Link to="/info/privacy" className="tap link-underline font-semibold text-ink no-underline">Privacy notice</Link>.
            </span>
          </label>
          <FieldError id="terms-err">{form.checkbox('terms').error}</FieldError>

          {form.formError && <p role="alert" className="mb-3 border border-[#c0392b]/40 bg-[#c0392b]/5 p-3 text-[13px] text-[#a52a2a]">{form.formError}</p>}
          <Button variant="dark" type="submit" disabled={form.submitting} className="mt-2 w-full !py-4">
            {form.submitting ? <><LoaderCircle size={14} className="animate-spin" aria-hidden="true" />Creating account…</> : <>Create account <span className="text-lime">↗️</span></>}
          </Button>
        </form>

        <p className="mono-label mt-8 !normal-case !tracking-[0.5px] leading-[1.7]">Demo mode: no real account is created. Your details stay in this browser.</p>
        <p className="mt-4 text-sm text-[#666]">
          Already a member? <Link to="/login" className="tap link-underline font-semibold text-ink no-underline">Log in</Link>
        </p>
      </Reveal>
    </AuthShell>
  )
}
