import { useEffect, useRef, useState } from 'react'

const VIDEO = '/videos/what-is-campuscode.mp4'
const POSTER = '/videos/what-is-campuscode-poster.jpg'

// Experience section: a large "What is CampusCode" film that plays while it is on screen.
// The whole film is the control (role="button"). It starts muted (browsers require it):
// first tap turns the sound on, after that taps pause and play. Normal page flow, nothing pinned.
export default function Experience() {
  const videoRef = useRef(null)
  const filmRef = useRef(null)
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  // Play while at least half of the film is visible; pause when it scrolls away.
  // Reduced motion: no autoplay, the poster stays until the visitor taps.
  useEffect(() => {
    const v = videoRef.current
    const film = filmRef.current
    if (!v || !film) return undefined
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!reduce && !userPaused.current) v.play().catch(() => {})
      } else {
        v.pause()
      }
    }, { threshold: 0.5 })
    io.observe(film)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.muted && !v.paused) {
      v.muted = false // first tap: turn the sound on
    } else if (v.paused) {
      userPaused.current = false
      v.play().catch(() => {})
    } else {
      userPaused.current = true
      v.pause()
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  const hint = playing ? (muted ? 'Tap for sound' : 'Tap to pause') : 'Tap to play'
  const aria = !playing ? 'Play the What is CampusCode film' : muted ? 'Turn on sound for the What is CampusCode film' : 'Pause the What is CampusCode film'

  return (
    <section aria-label="The CampusCode experience" className="relative overflow-hidden border-b border-line bg-[#eeeeea] pb-[clamp(32px,5vw,72px)]" style={{ background: 'radial-gradient(circle at 50% 0%, #7665ff1f, transparent 38%), #eeeeea' }}>
      <div className="grid-bg absolute inset-0 [background-size:50px_50px]" aria-hidden="true" />
      <div className="relative z-[5] flex justify-between px-[5vw] pt-6 font-mono text-[8px] uppercase tracking-[1px] text-[#777]">
        <span>02 — Experience</span><span>Plays as you scroll ↓</span>
      </div>
      <div className="relative z-[4] pb-[clamp(20px,3vw,40px)] pt-[clamp(28px,4vw,56px)] text-center">
        <p className="mb-2 font-mono text-[8px] uppercase tracking-[1px] text-[#777]">The CampusCode experience</p>
        <h2 className="display m-0 text-[clamp(40px,6vw,84px)] !leading-[0.9] !tracking-[-0.05em]"><span className="block">Build</span><span className="block">Together.</span></h2>
      </div>

      {/* Hover: the film rises (same lift as the How It Works cards and arena rows) and a purple/lime gradient glow behind it brightens. */}
      <div className="group relative z-[4] mx-auto w-[min(95vw,calc((100svh-96px)*16/9))] transition-transform duration-[350ms] ease-out hover:-translate-y-[7px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[5%] -z-10 rounded-[48px] opacity-35 blur-3xl transition-opacity duration-[350ms] group-hover:opacity-100"
          style={{ background: 'radial-gradient(circle at 15% 15%, #7665ffa6, transparent 55%), radial-gradient(circle at 88% 88%, #a8e62e8c, transparent 55%)' }}
        />
        <div
          ref={filmRef}
          role="button"
          tabIndex={0}
          aria-label={aria}
          onClick={toggle}
          onKeyDown={onKeyDown}
          className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border border-[#c9c9d8] bg-[#f7f8f3] shadow-[var(--shadow-card)] transition-shadow duration-[350ms] group-hover:shadow-[0_20px_50px_#0000001f]"
        >
          <video
            ref={videoRef}
            className="block h-full w-full object-cover"
            src={VIDEO}
            poster={POSTER}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          />
          <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-[#666] px-3 py-[5px] font-sans text-[9px] uppercase tracking-[1px] text-white">{hint}</span>
        </div>
      </div>
      <p className="sr-only">What is CampusCode: Build, Compete, Ship. The digital home for student innovation, with an AI copilot in every corner, three rounds, a scannable hackathon ID, and a call to join.</p>
    </section>
  )
}
