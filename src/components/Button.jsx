import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ArrowIcon from './ArrowIcon.jsx'

// variants: box (outlined mono, inverts on hover), dark (solid black), pill (lime CTA), ghost (text link)
const base = 'inline-flex items-center justify-center gap-4 transition-[background,color,border-color,transform] duration-300 ease-out disabled:pointer-events-none disabled:opacity-60'
const variants = {
  box: 'font-mono text-[10px] tracking-[0.5px] uppercase bg-white/65 text-ink border border-[#b8b8b0] px-[15px] py-3 hover:bg-ink hover:text-white hover:border-ink hover:-translate-y-[3px]',
  dark: 'font-mono text-[10px] tracking-[0.5px] uppercase bg-ink text-white border border-ink px-5 py-[14px] hover:bg-lime hover:text-ink hover:border-lime hover:-translate-y-[3px]',
  pill: 'text-[clamp(16px,1.6vw,20px)] uppercase bg-lime text-ink rounded-full px-[clamp(32px,4vw,52px)] py-[clamp(16px,1.8vw,22px)] hover:-translate-y-1 hover:shadow-[0_14px_30px_rgb(168_230_46/0.45)]',
  ghost: 'font-mono text-[10px] tracking-[1px] uppercase text-[#777] hover:text-ink hover:-translate-y-[2px]',
}

export default function Button({ variant = 'box', href, to, icon, className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`
  const content = (
    <>
      {children}
      {icon === 'arrow' && <ArrowRight size={variant === 'pill' ? 20 : 12} strokeWidth={2} aria-hidden="true" />}
      {icon === 'up-right' && <ArrowIcon size={variant === 'pill' ? 20 : 12} />}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>
  return href ? (
    <a href={href} className={cls} {...rest}>{content}</a>
  ) : (
    <button type="button" className={cls} {...rest}>{content}</button>
  )
}
