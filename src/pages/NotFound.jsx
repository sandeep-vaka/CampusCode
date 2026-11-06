import Button from '../components/Button.jsx'
import SectionTag from '../components/SectionTag.jsx'

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="relative grid min-h-screen place-items-center overflow-hidden px-[7vw] pb-20 pt-[120px] text-center">
      <div className="grid-bg absolute inset-0 [background-size:60px_60px]" aria-hidden="true" />
      <div className="relative">
        <SectionTag dot className="justify-center">CampusCode / Error</SectionTag>
        <h1 className="display display-outline !my-8" style={{ fontSize: 'clamp(110px, 24vw, 320px)' }}>404</h1>
        <p className="mx-auto mb-8 max-w-[340px] text-sm leading-[1.75] text-[#666]">This page isn't part of the arena. It may have moved, or the link may be wrong.</p>
        <Button variant="dark" to="/" className="!px-[22px] !py-[17px] !text-xs font-extrabold">Back to home <span className="text-lime">↗️</span></Button>
      </div>
    </main>
  )
}
