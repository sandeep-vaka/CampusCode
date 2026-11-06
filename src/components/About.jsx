import SectionTag from './SectionTag.jsx'
import SectionHeading from './SectionHeading.jsx'
import { Reveal } from './Reveal.jsx'

export default function About() {
  return (
    <section id="about" className="grid min-h-[720px] items-center gap-12 border-b border-line bg-[#fafaf7] px-[8vw] py-[120px] max-lg:py-20 lg:grid-cols-[70px_1.2fr_1fr]">
      <span className="font-mono text-[10px] text-brand max-lg:hidden lg:self-start">01</span>
      <div>
        <SectionTag dot>What is CampusCode?</SectionTag>
        <SectionHeading lines={['Where', 'Students', '~Build.']} size="clamp(56px, 9vw, 140px)" className="!my-12 !leading-[0.84] !tracking-[-0.055em]" />
        <Reveal as="p" delay={0.3} className="m-0 max-w-[470px] text-sm leading-[1.8] text-[#666]">
          CampusCode brings students, teams, organizers and hackathons into one connected ecosystem.
        </Reveal>
      </div>
      <div className="relative grid min-h-[360px] place-items-center lg:min-h-[450px]" aria-hidden="true">
        <div className="orbit absolute h-[160px] w-[160px] rounded-full border border-[#7665ff40]" style={{ animationDuration: '9s' }} />
        <div className="orbit-rev absolute h-[290px] w-[290px] rounded-full border border-[#7665ff40]" />
        <div className="orbit absolute h-[min(430px,90vw)] w-[min(430px,90vw)] rounded-full border border-[#a8e62e4d]" />
        <div className="relative z-[3] grid h-[100px] w-[100px] place-items-center border border-brand bg-white/65 text-[25px] font-black text-brand shadow-[0_20px_60px_#7665ff1a]">CC</div>
        <span className="absolute left-[20%] top-[10%] font-mono text-[8px] text-[#999]">01</span>
        <span className="absolute right-[8%] top-[45%] font-mono text-[8px] text-[#999]">02</span>
        <span className="absolute bottom-[10%] left-[30%] font-mono text-[8px] text-[#999]">03</span>
      </div>
    </section>
  )
}
