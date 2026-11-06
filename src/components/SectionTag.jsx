// Small mono label such as "CAMPUSCODE / 002"
export default function SectionTag({ children, dot = false, className = '' }) {
  return (
    <p className={`mono-label flex items-center gap-2 ${className}`}>
      {dot && <i className="inline-block h-[6px] w-[6px] rounded-full bg-lime-dark shadow-[0_0_10px_rgb(130_185_26/0.5)]" />}
      {children}
    </p>
  )
}
