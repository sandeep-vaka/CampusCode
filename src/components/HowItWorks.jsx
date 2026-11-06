import { steps } from '../data/mockData.js'
import { Reveal, Stagger, StaggerItem } from './Reveal.jsx'
import ArrowIcon from './ArrowIcon.jsx'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-line bg-bg px-[7vw] py-[110px] max-md:py-20">
      <Reveal className="mb-14 flex items-end justify-between">
        <div className="flex items-center gap-5">
          <span className="font-mono text-[10px] text-brand">03</span>
          <h2 className="m-0 text-[27px] font-bold uppercase tracking-[-0.04em]">How it works</h2>
        </div>
        <p className="m-0 text-right font-mono text-[8px] uppercase leading-[1.6] text-[#888] max-sm:hidden">From idea<br />to impact</p>
      </Reveal>
      <Stagger gap={0.1} className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <StaggerItem key={s.n} className="h-full">
          <article className="group relative h-full min-h-[300px] border-b border-r border-line bg-[#fafaf8] p-7 transition-[transform,background,box-shadow] duration-[350ms] hover:-translate-y-[7px] hover:bg-white hover:shadow-[0_20px_50px_#0000000f] lg:min-h-[350px]">
            <span className="font-mono text-[10px] text-[#999]">{s.n}</span>
            <div className="my-[30px] h-px w-full bg-line" />
            <h3 className="mb-[18px] mt-0 text-[clamp(28px,3vw,35px)] font-bold uppercase tracking-[-0.05em]">{s.title}</h3>
            <p className="max-w-[220px] text-xs leading-[1.7] text-[#777]">{s.text}</p>
            <ArrowIcon size={18} className="absolute bottom-[25px] right-[25px] text-brand" />
          </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
