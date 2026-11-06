import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import About from '../components/About.jsx'
import Experience from '../components/Experience.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import Hackathons from '../components/Hackathons.jsx'
import Statement from '../components/Statement.jsx'
import Community from '../components/Community.jsx'
import CTA from '../components/CTA.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <main id="main" tabIndex={-1}>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <HowItWorks />
        <Hackathons />
        <Statement />
        <Community />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
