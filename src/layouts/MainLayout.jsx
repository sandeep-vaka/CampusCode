import { MotionConfig } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import PageTransition from '../components/PageTransition.jsx'
import useCursorGlow from '../hooks/useCursorGlow.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function MainLayout() {
  const glow = useCursorGlow()
  useDocumentTitle()
  return (
    <MotionConfig reducedMotion="user">
    <div className="relative w-full overflow-x-clip">
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[280px] w-[280px] rounded-full opacity-0 transition-opacity duration-500"
        style={{ background: 'var(--glow-purple)', willChange: 'transform' }}
      />
      <a href="#main" onClick={(e) => { e.preventDefault(); const m = document.getElementById('main'); m?.focus(); m?.scrollIntoView() }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:text-white">Skip to content</a>
      <Navbar />
      <PageTransition />
    </div>
    </MotionConfig>
  )
}
