import { motion } from 'framer-motion'
import { EASE } from '../lib/motion.js'

// lines: array of strings; a line prefixed with "~" renders as outlined text.
// Each line slides up out of a mask when the heading scrolls into view.
export default function SectionHeading({ lines, size = 'clamp(48px,9vw,140px)', className = '', as = 'h2' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={`display ${className}`}
      style={{ fontSize: size }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
    >
      {lines.map((line) => {
        const outline = line.startsWith('~')
        return (
          <span key={line} className="block overflow-hidden pb-[0.07em]">
            <motion.span
              className={`block ${outline ? 'display-outline' : ''}`}
              variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 0.9, ease: EASE } } }}
            >
              {outline ? line.slice(1) : line}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}
