import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import RegisterButton from '../components/RegisterButton.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SectionTag from '../components/SectionTag.jsx'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx'
import { hackathons, rounds } from '../data/mockData.js'
import NotFound from './NotFound.jsx'
import ArrowIcon from '../components/ArrowIcon.jsx'

const roundState = (i, current) => (current === null ? 'Upcoming' : i < current ? 'Done' : i === current ? 'In progress' : 'Upcoming')

export default function HackathonDetail() {
  const { slug } = useParams()
  const h = hackathons.find((x) => x.slug === slug)
  if (!h) return <NotFound />

  const words = h.title.split(' ')
  const lines = [...words.slice(0, -1), `~${words.at(-1)}.`]
  const meta = [['Dates', h.dates], ['Format', h.mode], ['Team size', h.team], ['Prize', h.prize]]
  const others = hackathons.filter((x) => x.slug !== h.slug)

  return (
    <main id="main" tabIndex={-1} className="min-h-screen px-[7vw] pb-24 pt-[140px] max-sm:px-[6vw]">
      <Link to="/#hackathons" className="link-underline inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[1px] text-[#777] no-underline hover:text-ink">
        <ArrowLeft size={12} aria-hidden="true" />All hackathons
      </Link>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
        <SectionTag>CampusCode / {h.n}</SectionTag>
        <p className="mono-label flex items-center gap-[7px]">
          <i className={`h-[6px] w-[6px] rounded-full ${h.active ? 'bg-lime-dark shadow-[0_0_9px_#82b91a66]' : 'bg-[#aaa]'}`} />{h.status} · {h.category}
        </p>
      </div>
      <SectionHeading as="h1" lines={lines} size="clamp(40px, 8.4vw, 128px)" className="!mt-8 !leading-[0.86]" />

      <Reveal className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <p className="m-0 max-w-[520px] text-[15px] leading-[1.8] text-[#555]">{h.about}</p>
          <div className="mt-8"><RegisterButton hackathon={h} className="!px-8" /></div>
        </div>
        <dl className="m-0 grid grid-cols-2 border-l border-t border-line">
          {meta.map(([k, v]) => (
            <div key={k} className="border-b border-r border-line bg-white p-5">
              <dt className="mono-label !text-[9px]">{k}</dt>
              <dd className="m-0 mt-3 text-sm font-semibold leading-[1.4]">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <section aria-labelledby="rounds-title" className="mt-20">
        <Reveal className="mb-6 flex items-center gap-5">
          <span className="font-mono text-[10px] text-brand">01</span>
          <h2 id="rounds-title" className="m-0 text-[22px] font-bold uppercase tracking-[-0.04em]">Rounds</h2>
        </Reveal>
        <Stagger as="ol" className="m-0 grid list-none border-l border-t border-line p-0 md:grid-cols-3">
          {rounds.map((r, i) => {
            const state = roundState(i, h.currentRound)
            return (
              <StaggerItem as="li" key={r.r} className="border-b border-r border-line bg-white p-6">
                <p className="mono-label !text-[9px]">{r.r}</p>
                <p className="mb-0 mt-6 text-[26px] font-black uppercase leading-none tracking-[-0.04em]">{r.label}</p>
                <p className={`mono-label mb-0 mt-6 flex items-center gap-[7px] !text-[9px] ${state === 'In progress' ? '!text-ink' : ''}`}>
                  <i className={`h-[6px] w-[6px] rounded-full ${state === 'In progress' ? 'bg-lime-dark shadow-[0_0_9px_#82b91a66]' : state === 'Done' ? 'bg-ink' : 'bg-[#bbb]'}`} />{state}
                </p>
              </StaggerItem>
            )
          })}
        </Stagger>
      </section>

      <section aria-labelledby="more-title" className="mt-20">
        <Reveal className="mb-6 flex items-center gap-5">
          <span className="font-mono text-[10px] text-brand">02</span>
          <h2 id="more-title" className="m-0 text-[22px] font-bold uppercase tracking-[-0.04em]">More hackathons</h2>
        </Reveal>
        <ul className="m-0 list-none border-t border-line p-0">
          {others.map((o) => (
            <li key={o.slug}>
              <Link to={`/hackathons/${o.slug}`} className="group flex items-center justify-between gap-4 border-b border-line py-5 no-underline transition-[padding,background] duration-300 hover:bg-white/65 hover:pl-[15px]">
                <span className="text-[clamp(20px,2.4vw,26px)] font-bold uppercase tracking-[-0.04em]">{o.title}</span>
                <span className="flex items-center gap-4 font-mono text-[9px] uppercase text-[#777]">
                  {o.status}
                  <ArrowIcon size={16} className="text-[#888] transition-all duration-[250ms] group-hover:-translate-y-[3px] group-hover:translate-x-[3px] group-hover:text-brand" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
