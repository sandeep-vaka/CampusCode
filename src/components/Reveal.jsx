import { motion } from 'framer-motion'
import { EASE } from '../lib/motion.js'

// Shared motion conventions (see CHECKPOINT.md): one easing, 0.7s, 0.08s stagger, play once.
const viewport = { once: true, margin: '0px 0px -12% 0px' }

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

// Fade + rise a single block when it scrolls into view.
export function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: item.hidden, show: { ...item.show, transition: { ...item.show.transition, delay } } }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Parent that staggers its <StaggerItem> children.
export function Stagger({ as = 'div', gap = 0.08, className = '', children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({ as = 'div', className = '', children, ...rest }) {
  const Tag = motion[as]
  return <Tag className={className} variants={item} {...rest}>{children}</Tag>
}
