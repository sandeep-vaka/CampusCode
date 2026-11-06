import { Check } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppState } from '../context/appState.js'

// Register / Notify toggle shared by the dashboard and hackathon pages.
// Logged-out visitors are sent to /login and come back to the page they were on.
export default function RegisterButton({ hackathon, className = '' }) {
  const { user, registrations, toggleRegistration } = useAppState()
  const navigate = useNavigate()
  const location = useLocation()
  const on = Boolean(user) && registrations.includes(hackathon.slug)
  const upcoming = hackathon.status === 'Upcoming'
  const label = upcoming ? (on ? 'Notifying you' : 'Notify me') : on ? 'Registered' : 'Register'

  const onClick = () => {
    if (user) toggleRegistration(hackathon)
    else navigate('/login', { state: { from: location.pathname } })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={user ? on : undefined}
      aria-label={`${upcoming ? 'Notify me about' : 'Register for'} ${hackathon.title}`}
      className={`inline-flex min-h-11 items-center justify-center gap-2 border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.5px] transition-[background,color,border-color,transform] duration-300 hover:-translate-y-[2px] ${
        on ? 'border-ink bg-ink text-white hover:bg-lime hover:text-ink' : 'border-[#b8b8b0] bg-white text-ink hover:border-ink'
      } ${className}`}
    >
      {on && <Check size={12} strokeWidth={2.5} aria-hidden="true" />}
      {label}
    </button>
  )
}
