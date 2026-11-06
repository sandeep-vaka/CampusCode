import SectionHeading from './SectionHeading.jsx'
import SectionTag from './SectionTag.jsx'
import { Reveal } from './Reveal.jsx'
import { hackathons } from '../data/mockData.js'

const dots = ['left-1/2 top-[15%]', 'right-[8%] top-1/2', 'bottom-[10%] left-1/2', 'left-[8%] top-1/2']
const curves = ['M-40 180 C 200 60, 420 320, 860 200', 'M-20 760 C 240 560, 520 700, 860 470']

// Split layout for Login / Signup: form on the left, decorative arena panel on the right (lg+).
export default function AuthShell({ tag, lines, lead, children }) {
  return (
    <main id="main" tabIndex={-1} className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
      <section className="px-[7vw] pb-20 pt-[140px] max-sm:px-[6vw] lg:pl-[8vw] lg:pr-[5vw]">
        <div className="mx-auto w-full max-w-[520px] lg:mx-0">
          <SectionTag dot>{tag}</SectionTag>
          <SectionHeading as="h1" lines={lines} size="clamp(44px, 6vw, 80px)" className="!mt-8 !leading-[0.86]" />
          <Reveal as="p" delay={0.2} className="mb-10 mt-6 max-w-[380px] text-sm leading-[1.75] text-[#666]">{lead}</Reveal>
          {children}
        </div>
      </section>

      <aside aria-hidden="true" className="relative hidden overflow-hidden border-l border-line bg-[#f0f0ec] lg:block">
        <div className="grid-bg absolute inset-0 [background-size:60px_60px]" />
        <div className="pointer-events-none absolute -right-24 top-[10%] h-[420px] w-[420px] rounded-full bg-[#7665ff1a] blur-[80px]" />
        <div className="hero-network pointer-events-none absolute inset-0 opacity-70">
          <svg viewBox="0 0 800 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
            {curves.map((d) => <path key={d} d={d} vectorEffect="non-scaling-stroke" />)}
            <circle cx="860" cy="200" r="5" /><circle cx="520" cy="700" r="5" style={{ animationDelay: '0.8s' }} />
          </svg>
        </div>
        <div className="absolute left-1/2 top-[40%] grid h-[min(320px,28vw)] w-[min(320px,28vw)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#d4d4ce]">
          <div className="absolute inset-[40px] rounded-full border border-line" />
          <div className="orbit absolute inset-0" style={{ animationDuration: '40s' }}>
            {dots.map((d) => <span key={d} className={`absolute h-2 w-2 rounded-full bg-brand shadow-[0_0_12px_#7665ff4d] ${d}`} />)}
          </div>
          <strong className="relative z-[3] grid h-20 w-20 place-items-center border border-brand bg-white text-xl text-brand">CC</strong>
        </div>
        <ul className="absolute inset-x-[10%] bottom-12 m-0 list-none border-t border-line p-0">
          {hackathons.map((h) => (
            <li key={h.slug} className="flex items-center justify-between border-b border-line py-3 font-mono text-[9px] uppercase tracking-[1px] text-[#777]">
              <span className="flex items-center gap-[7px]">
                <i className={`h-[6px] w-[6px] rounded-full ${h.active ? 'bg-lime-dark shadow-[0_0_9px_#82b91a66]' : 'bg-[#aaa]'}`} />{h.title}
              </span>
              <span>{h.status}</span>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  )
}
