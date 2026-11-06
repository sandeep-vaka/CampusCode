// Up-right arrow shown as the "↗️" emoji (the reference site uses the emoji glyph, which renders as a blue arrow tile on many systems).
export default function ArrowIcon({ size = 14, className = '' }) {
  return (
    <span aria-hidden="true" className={`inline-block leading-none ${className}`} style={{ fontSize: size }}>↗️</span>
  )
}
