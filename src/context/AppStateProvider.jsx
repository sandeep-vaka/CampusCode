import { useCallback, useEffect, useMemo, useState } from 'react'
import { AppStateContext } from './appState.js'
import { loadStore, saveStore } from '../lib/storage.js'

// Frontend-only "backend": session, profiles and per-user activity live in React state,
// mirrored to localStorage. There are no passwords and no real authentication.
const EMPTY_DATA = { registrations: [], invites: [], events: [] }
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const normalize = (email) => email.trim().toLowerCase()
const nameFromEmail = (email) =>
  email.split('@')[0].replace(/[._-]+/g, ' ').trim().replace(/\b\w/g, (c) => c.toUpperCase()) || 'Builder'

export default function AppStateProvider({ children }) {
  const [store, setStore] = useState(loadStore)
  useEffect(() => { saveStore(store) }, [store])

  const user = store.session
  const data = (user && store.data[user.email]) || EMPTY_DATA

  const patchData = useCallback((update) => {
    setStore((s) => {
      if (!s.session) return s
      const key = s.session.email
      return { ...s, data: { ...s.data, [key]: update(s.data[key] || EMPTY_DATA) } }
    })
  }, [])

  const startSession = useCallback((key, profile) => {
    setStore((s) => ({ ...s, profiles: { ...s.profiles, [key]: profile }, session: { email: key, ...profile } }))
  }, [])

  // Any password is accepted: this is a UI demo, not authentication.
  const login = useCallback(async ({ email, name, college }) => {
    await delay(700)
    const key = normalize(email)
    const joinedAt = Date.now()
    const known = store.profiles[key]
    startSession(key, known || { name: name || nameFromEmail(key), college: college || '', joinedAt })
  }, [store.profiles, startSession])

  const signup = useCallback(async ({ name, email, college }) => {
    await delay(900)
    const key = normalize(email)
    if (store.profiles[key]) throw new Error('An account with this email already exists. Try logging in instead.')
    startSession(key, { name: name.trim(), college: college.trim(), joinedAt: Date.now() })
  }, [store.profiles, startSession])

  const logout = useCallback(() => setStore((s) => ({ ...s, session: null })), [])

  const record = (d, text, ts) => [{ id: `${ts}`, ts, text }, ...d.events].slice(0, 20)

  const toggleRegistration = useCallback((hackathon) => {
    const ts = Date.now()
    const upcoming = hackathon.status === 'Upcoming'
    patchData((d) => {
      const on = d.registrations.includes(hackathon.slug)
      const text = upcoming
        ? `${on ? 'Turned off' : 'Turned on'} notifications for ${hackathon.title}`
        : `${on ? 'Left' : 'Registered for'} ${hackathon.title}`
      return {
        ...d,
        registrations: on ? d.registrations.filter((s) => s !== hackathon.slug) : [...d.registrations, hackathon.slug],
        events: record(d, text, ts),
      }
    })
  }, [patchData])

  const toggleInvite = useCallback((builder) => {
    const ts = Date.now()
    patchData((d) => {
      const on = d.invites.includes(builder.id)
      return {
        ...d,
        invites: on ? d.invites.filter((i) => i !== builder.id) : [...d.invites, builder.id],
        events: record(d, `${on ? 'Withdrew invite to' : 'Invited'} ${builder.name}`, ts),
      }
    })
  }, [patchData])

  const value = useMemo(() => ({
    user,
    registrations: data.registrations,
    invites: data.invites,
    events: data.events,
    login, signup, logout, toggleRegistration, toggleInvite,
  }), [user, data, login, signup, logout, toggleRegistration, toggleInvite])

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}
