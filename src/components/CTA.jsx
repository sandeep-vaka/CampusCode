import Button from './Button.jsx'
import { Reveal } from './Reveal.jsx'

export default function CTA() {
  return (
    <section id="join" className="relative flex min-h-[700px] items-center justify-center overflow-hidden border-b border-line text-center" style={{ background: 'radial-gradient(circle, #7665ff1a, transparent 35%), #f0f0ec' }}>
      <div className="grid-bg absolute inset-0 [background-size:60px_60px]" aria-hidden="true" />
      <div className="orbit absolute h-[min(500px,90vw)] w-[min(500px,90vw)] rounded-full border border-[#7665ff2e]" aria-hidden="true" />
      <div className="relative z-[5] px-[5vw]">
        <Reveal as="small" className="block font-mono text-[9px] uppercase tracking-[2px] text-brand">Ready?</Reveal>
        <h2 className="display !my-10 !leading-[0.82] !tracking-[-0.055em]" style={{ fontSize: 'clamp(54px, 11vw, 170px)' }}>
          <span className="block">Your next</span>
          <span className="display-outline block">Project</span>
          <span className="block">Starts here.</span>
        </h2>
        <Reveal delay={0.35}>
          <Button variant="dark" to="/signup" className="!px-[22px] !py-[17px] !text-xs font-extrabold">
            Join CampusCode <span className="text-lime">↗️</span>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
