import { Link } from 'react-router-dom'
import { footerColumns, footerLegal } from '../data/mockData.js'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f7f7f5] px-[7vw] pb-6 pt-20 text-[#161616]">
      <div className="relative z-[4] mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[2.2fr_1fr_1fr_1fr] md:gap-[70px]">
        <div>
          <Logo />
          <p className="mt-6 max-w-[300px] text-sm leading-[1.7] text-[#666]">The student hackathon arena.<br />You build the idea,<br />we run the competition.</p>
        </div>
        {footerColumns.map((c) => (
          <nav key={c.title} aria-label={c.title} className="flex flex-col md:gap-[14px]">
            <h3 className="mb-3 mt-0 font-mono text-[10px] font-medium uppercase tracking-[1px] text-[#3e37d9]">{c.title}</h3>
            {c.links.map((l) => (
              <Link key={l.label} to={l.to} className="link-underline inline-flex min-h-11 w-fit items-center text-sm md:min-h-0 text-[#666] no-underline transition-[color,transform] duration-200 hover:translate-x-1 hover:text-ink">{l.label}</Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="relative z-[4] mx-auto mt-12 flex max-w-[1200px] flex-wrap items-center gap-x-[30px] gap-y-0 pb-14 font-mono text-[9px] uppercase tracking-[0.5px] text-[#777]">
        <div className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-[#18b777] shadow-[0_0_0_4px_#18b77714]" />All systems operational</div>
        {footerLegal.map((t) => <Link key={t.label} to={t.to} className="inline-flex min-h-11 items-center no-underline transition-colors hover:text-ink">{t.label}</Link>)}
      </div>
      <div aria-hidden="true" className="pointer-events-none relative z-[1] -mt-2 select-none whitespace-nowrap text-center font-black leading-[0.72] tracking-[-0.07em] text-[#e9e9ed]" style={{ fontSize: 'clamp(80px, 18vw, 290px)' }}>CampusCode</div>
      <div className="relative z-[5] mx-auto mt-11 flex max-w-[1200px] flex-wrap justify-between gap-2 border-t border-[#deded9] pt-5 font-mono text-[8px] uppercase tracking-[0.5px] text-[#999]">
        <span>© 2026 CampusCode</span>
        <span>Learn · Build · Compete · Ship</span>
        <span>Chennai · India</span>
      </div>
    </footer>
  )
}
