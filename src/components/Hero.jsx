import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from './Button.jsx'
import SectionTag from './SectionTag.jsx'

const ease = [0.16, 1, 0.3, 1]
const rise = (i) => ({
  initial: { y: '105%' },
  animate: { y: 0 },
  transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease },
})
const fade = (d) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease },
})

// Dashed network curves and pulsing nodes (viewBox is stretched to the hero)
const curves = [
  'M-50 200 C 250 60, 450 380, 800 220 S 1250 100, 1500 330',
  'M200 900 C 500 640, 900 780, 1150 520 S 1450 380, 1600 460',
  'M600 -20 C 800 220, 1100 160, 1300 420',
]
const nodes = [[800, 220, 0], [1150, 520, 0.8], [1300, 420, 1.6], [450, 330, 0.4], [1480, 300, 1.2]]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const netY = useTransform(scrollYProgress, [0, 1], [0, 60])
  return (
    <section ref={ref} id="top" className="relative min-h-[820px] overflow-hidden border-b border-line"
      style={{ background: 'radial-gradient(circle at 78% 38%, rgb(118 101 255 / 0.11), transparent 27%), radial-gradient(circle at 30% 60%, rgb(168 230 46 / 0.08), transparent 25%), var(--bg)' }}>
      <div className="hero-grid absolute inset-0 opacity-75" aria-hidden="true" />
      <motion.div style={{ y: glowY }} className="absolute inset-0" aria-hidden="true">
      <div className="pointer-events-none absolute right-[5%] top-[18%] h-[450px] w-[450px] rounded-full bg-[#7665ff1a] blur-[80px]" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[8%] left-[40%] h-[300px] w-[300px] rounded-full bg-[#a8e62e1a] blur-[80px]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-[5%] top-[20%] h-[260px] w-[260px] rounded-full bg-[#526eff0f] blur-[80px]" aria-hidden="true" />
      </motion.div>

      <motion.div style={{ y: netY }} className="hero-network pointer-events-none absolute inset-0 opacity-80" aria-hidden="true">
        <svg viewBox="0 0 1500 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          {curves.map((d) => <path key={d} d={d} vectorEffect="non-scaling-stroke" />)}
          {nodes.map(([cx, cy, delay]) => <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="5" style={{ animationDelay: `${delay}s` }} />)}
        </svg>
      </motion.div>

      <div className="absolute left-[var(--gutter)] right-[var(--gutter)] top-[104px] flex justify-between font-mono text-[9px] uppercase tracking-[1px] text-muted">
        <SectionTag dot className="!text-[9px]">The digital home for student innovation</SectionTag>
        <span className="hidden sm:block">Chennai · India</span>
      </div>

      <div className="relative z-[4] px-[8vw] pb-28 pt-[190px] max-sm:px-[6vw]">
        <motion.p {...fade(0.05)} className="font-mono text-[10px] uppercase tracking-[2px] text-[#999]">CampusCode / 001</motion.p>

        <h1 className="my-10 font-black uppercase leading-[0.78] tracking-[-0.055em] text-ink" style={{ fontSize: 'min(max(min(17vw, 68px), 15vw), 220px)' }}>
          {[['Build', ''], ['Compete', 'hero-outline'], ['Ship.', '']].map(([word, cls], i) => (
            <span key={word} className="block overflow-hidden pb-[0.06em]">
              <motion.span {...rise(i)} className={`block ${cls}`}>{word}</motion.span>
            </span>
          ))}
        </h1>

        <motion.div {...fade(0.7)} className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-[60px]">
          <p className="m-0 max-w-[260px] text-sm leading-[1.75] text-[#666]">
            A digital arena for students who don't just have ideas. They build them.
          </p>
          <Button variant="box" to="/#hackathons" icon="up-right" className="!border-[#999] !bg-white !py-[15px] hover:!border-ink hover:!bg-ink hover:!text-white">Explore Hackathons</Button>
        </motion.div>
      </div>

      <div className="absolute bottom-[30px] left-[var(--gutter)] right-[var(--gutter)] flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.5px] text-[#999]">
        <span>Scroll to explore</span>
        <span className="hidden h-px w-[110px] overflow-hidden bg-[#d2d2cc] sm:block" aria-hidden="true"><i className="scroll-line block h-px w-[30%] bg-ink" /></span>
        <span>01 / 06</span>
      </div>
    </section>
  )
}
