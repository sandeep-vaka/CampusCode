import { useParams } from 'react-router-dom'
import Button from '../components/Button.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SectionTag from '../components/SectionTag.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { infoPages } from '../data/mockData.js'
import NotFound from './NotFound.jsx'

// One generic placeholder page behind every footer link that has no dedicated screen yet.
export default function InfoPage() {
  const { slug } = useParams()
  const page = Object.hasOwn(infoPages, slug) ? infoPages[slug] : null
  if (!page) return <NotFound />

  return (
    <main id="main" tabIndex={-1} className="min-h-[80vh] px-[7vw] pb-24 pt-[140px] max-sm:px-[6vw]">
      <SectionTag dot>CampusCode / Info</SectionTag>
      <SectionHeading as="h1" lines={page.title.split(' ').map((w, i, a) => (i === a.length - 1 ? `~${w}.` : w))} size="clamp(44px, 9vw, 130px)" className="!mt-8 !leading-[0.86]" />
      <Reveal delay={0.2}>
        <p className="mt-10 max-w-[520px] text-[15px] leading-[1.8] text-[#555]">{page.blurb}</p>
        <p className="mono-label mt-6">Placeholder content for the demo build.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button variant="dark" to="/signup" className="!px-[22px] !py-[17px] !text-xs">Join CampusCode <span className="text-lime">↗️</span></Button>
          <Button variant="box" to="/#hackathons" className="!py-[17px]">Explore hackathons</Button>
        </div>
      </Reveal>
    </main>
  )
}
