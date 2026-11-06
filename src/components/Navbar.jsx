import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo.jsx'
import Button from './Button.jsx'
import { useAppState } from '../context/appState.js'
import { navLinks } from '../data/mockData.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAppState()
  const navigate = useNavigate()
  const toggleRef = useRef(null)
  const headerRef = useRef(null)

  // While the mobile menu is open: Escape closes it and returns focus to the toggle; a click outside closes it.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    const onDown = (e) => { if (!headerRef.current?.contains(e.target)) setOpen(false) }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const handleLogout = () => {
    setOpen(false)
    logout()
    navigate('/')
  }

  // Mobile menu: section links plus account links that depend on the mock session.
  const accountLinks = user
    ? [{ label: 'Dashboard', to: '/dashboard' }]
    : [{ label: 'Login', to: '/login' }, { label: 'Join CampusCode', to: '/signup' }]

  const linkCls = 'flex min-h-11 items-center font-mono text-xs uppercase tracking-[1px] text-soft'

  return (
    <motion.header ref={headerRef} onBlur={(e) => { if (open && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setOpen(false) }} initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="absolute left-0 top-0 z-30 w-full">
      <nav aria-label="Primary" className="flex items-center justify-between px-[var(--gutter)] py-[25px]">
        <Link to="/" aria-label="CampusCode home" className="flex min-h-11 items-center"><Logo /></Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="inline-block font-mono text-[10px] uppercase tracking-[1px] text-[#777] transition-[color,transform] duration-300 hover:-translate-y-[2px] hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-[18px]">
          {user ? (
            <>
              <span className="hidden lg:block"><Button variant="ghost" to="/dashboard">Dashboard</Button></span>
              <span className="hidden sm:block"><Button variant="box" onClick={handleLogout} className="whitespace-nowrap">Log out</Button></span>
            </>
          ) : (
            <>
              <span className="hidden lg:block"><Button variant="ghost" to="/login">Login</Button></span>
              <span className="hidden sm:block"><Button variant="box" to="/signup" icon="up-right" className="whitespace-nowrap">Join CampusCode</Button></span>
            </>
          )}
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center border border-line bg-white text-ink lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
      {open && (
        <motion.div id="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mx-[var(--gutter)] border border-line bg-white p-6 shadow-[var(--shadow-card)] lg:hidden">
          <ul className="flex flex-col gap-1">
            {[...navLinks, ...accountLinks].map((l) => (
              <li key={l.label}>
                <Link to={l.to} onClick={() => setOpen(false)} className={linkCls}>{l.label}</Link>
              </li>
            ))}
            {user && <li><button type="button" onClick={handleLogout} className={`${linkCls} w-full text-left`}>Log out</button></li>}
          </ul>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.header>
  )
}
