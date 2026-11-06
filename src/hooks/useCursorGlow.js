import { useEffect, useRef } from 'react'

// Moves a fixed, pointer-events-none element to follow the mouse. Skips touch + reduced motion.
export default function useCursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el || !fine || calm) return
    el.style.opacity = '1'
    const move = (e) => {
      el.style.transform = `translate3d(${e.clientX - 140}px, ${e.clientY - 140}px, 0)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return ref
}
