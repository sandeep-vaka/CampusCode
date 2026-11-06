import SectionHeading from './SectionHeading.jsx'
import { Reveal } from './Reveal.jsx'

const dots = ['left-1/2 top-[15%]', 'right-[8%] top-1/2', 'bottom-[10%] left-1/2', 'left-[8%] top-1/2', 'right-[20%] top-[30%]']

export default function Community() {
  return (
    <section id="community" className="grid min-h-[650px] border-b border-line bg-[#fafaf7] md:grid-cols-2">
      <div className="border-line px-[8vw] py-[100px] max-md:border-b max-md:py-20 md:border-r">
        <span className="font-mono text-[9px] uppercase text-[#888]">The network</span>
        <SectionHeading lines={['Find', 'Your', '~People.']} size="clamp(56px, 9vw, 130px)" className="!mt-14 !leading-[0.84] !tracking-[-0.055em]" />
      </div>
      <Reveal className="flex flex-col items-center justify-center gap-11 py-16">
        <div className="relative grid h-[min(330px,80vw)] w-[min(330px,80vw)] place-items-center rounded-full border border-[#d4d4ce]" aria-hidden="true">
          <div className="absolute inset-[45px] rounded-full border border-line" />
          <div className="orbit absolute inset-0" style={{ animationDuration: '40s' }}>
            {dots.map((d) => <span key={d} className={`absolute h-2 w-2 rounded-full bg-brand shadow-[0_0_12px_#7665ff4d] ${d}`} />)}
          </div>
          <strong className="relative z-[3] grid h-20 w-20 place-items-center border border-brand bg-white text-xl text-brand">CC</strong>
        </div>
        <p className="m-0 text-center text-[13px] leading-[1.8] text-[#777]">
          Build with developers.<br />Think with designers.<br />Compete with builders.
        </p>
      </Reveal>
    </section>
  )
}
