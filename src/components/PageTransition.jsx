import { Suspense, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { EASE } from '../lib/motion.js'

// Handles scroll for every navigation: jump to #hash targets (smooth when already on the page),
// otherwise reset to the top. A first load without a hash is left to the browser (scroll restoration).
let firstLoad = true // module-level: Page remounts on every route change, so a ref would always read true

function Page({ hash, navKey, children }) {
  useEffect(() => {
    const initial = firstLoad
    firstLoad = false
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) target.scrollIntoView({ behavior: initial ? 'instant' : 'smooth' })
    else if (!initial) window.scrollTo({ top: 0, behavior: 'instant' })
    if (initial) return undefined
    // After a client-side navigation, move keyboard/screen-reader focus to the new page's <main>
    // (waits for the lazy page and the transition; skipped if the user already focused something).
    const t = setTimeout(() => {
      const a = document.activeElement
      if (!a || a === document.body) document.getElementById('main')?.focus({ preventScroll: true })
    }, 700)
    return () => clearTimeout(t)
  }, [hash, navKey])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>{children}</Suspense>
    </motion.div>
  )
}

// Route changes: old page fades out, new page fades/rises in (opacity + transform only).
export default function PageTransition() {
  const location = useLocation()
  const outlet = useOutlet()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Page key={location.pathname} hash={location.hash} navKey={location.key}>{outlet}</Page>
    </AnimatePresence>
  )
}
