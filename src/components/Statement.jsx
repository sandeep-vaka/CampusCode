import SectionHeading from './SectionHeading.jsx'
import { Reveal } from './Reveal.jsx'

export default function Statement() {
  return (
    <section className="relative flex min-h-[760px] items-center overflow-hidden border-b border-line px-[10vw] py-[100px] max-md:min-h-[600px] max-md:py-20" style={{ background: 'radial-gradient(circle at 75% 50%, #7665ff14, transparent 34%), #f5f5f1' }}>
      <div aria-hidden="true" className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 -rotate-[8deg] select-none whitespace-nowrap text-[20vw] font-black tracking-[-0.06em] text-black/[0.025]">CAMPUSCODE</div>
      <div className="relative z-[3]">
        <span className="font-mono text-[9px] uppercase text-brand">05 — The mission</span>
        <SectionHeading lines={['Great', 'Ideas', '~Need', '~Builders.']} size="clamp(60px, 11vw, 170px)" className="!my-12 !leading-[0.84] !tracking-[-0.055em]" />
        <Reveal as="p" delay={0.3} className="m-0 max-w-[450px] text-sm leading-[1.8] text-[#777]">
          Your university is full of people with ideas. CampusCode gives those ideas somewhere to go.
        </Reveal>
      </div>
    </section>
  )
}
