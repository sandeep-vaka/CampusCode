import { Link } from 'react-router-dom'
import { hackathons } from '../data/mockData.js'
import { Reveal, Stagger, StaggerItem } from './Reveal.jsx'
import ArrowIcon from './ArrowIcon.jsx'

export default function Hackathons() {
  return (
    <section id="hackathons" className="border-b border-line bg-bg px-[7vw] py-[110px] max-md:py-20">
      <Reveal className="mb-14 flex items-end justify-between">
        <div className="flex items-center gap-5">
          <span className="font-mono text-[10px] text-brand">04</span>
          <h2 className="m-0 text-[27px] font-bold uppercase tracking-[-0.04em]">Enter the arena</h2>
        </div>
        <Link to="/dashboard" className="inline-flex min-h-11 items-center font-mono text-[9px] uppercase text-[#666] transition-colors hover:text-ink">View all ↗️</Link>
      </Reveal>
      <Stagger as="ul" className="m-0 list-none border-t border-line p-0">
        {hackathons.map((h) => (
          <StaggerItem as="li" key={h.n}>
            <Link to={`/hackathons/${h.slug}`} className="group grid min-h-[150px] items-center gap-x-5 gap-y-3 border-b border-line py-6 transition-[padding,background] duration-300 hover:bg-white/65 hover:pl-[15px] max-md:grid-cols-[1fr_24px] md:grid-cols-[80px_1.5fr_1.3fr_120px_30px]">
              <span className="font-mono text-[10px] text-[#999] max-md:hidden">{h.n}</span>
              <div>
                <small className="font-mono text-[8px] uppercase text-[#888]">{h.category}</small>
                <h3 className="mb-0 mt-[10px] text-[clamp(22px,2.4vw,29px)] font-bold uppercase tracking-[-0.04em]">{h.title}</h3>
              </div>
              <p className="m-0 text-xs leading-[1.6] text-[#777] max-md:order-4 max-md:col-span-2">{h.text}</p>
              <span className="flex items-center gap-[7px] font-mono text-[8px] uppercase text-[#777] max-md:hidden">
                <i className={`h-[6px] w-[6px] rounded-full ${h.active ? 'bg-lime-dark shadow-[0_0_9px_#82b91a66]' : 'bg-[#aaa]'}`} />{h.status}
              </span>
              <ArrowIcon size={16} className="text-[#888] transition-all duration-[250ms] group-hover:-translate-y-[3px] group-hover:translate-x-[3px] group-hover:text-brand" />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
