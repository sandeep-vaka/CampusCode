import { marqueeWords } from '../data/mockData.js'

export default function Marquee() {
  const items = [...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords]
  return (
    <div className="marquee overflow-hidden whitespace-nowrap border-y border-line bg-[#f4f4f0] py-[17px]" aria-hidden="true">
      <div className="marquee-track font-mono text-[10px] uppercase tracking-[1px] text-[#777]">
        {items.map((w, i) => (
          <span key={i} className="inline-flex items-center gap-[30px]">{w}<b className="text-brand">•</b></span>
        ))}
      </div>
    </div>
  )
}
