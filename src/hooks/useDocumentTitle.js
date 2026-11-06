import { useEffect } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { hackathons, infoPages } from '../data/mockData.js'

const SITE = 'CampusCode'

// One place that maps every route to a document title (also announced by screen readers on navigation).
function titleFor(pathname) {
  if (pathname === '/') return `${SITE} | Build, compete, ship`
  if (pathname === '/login') return `Log in | ${SITE}`
  if (pathname === '/signup') return `Join | ${SITE}`
  if (pathname === '/dashboard') return `Dashboard | ${SITE}`
  const hack = matchPath('/hackathons/:slug', pathname)
  if (hack) {
    const h = hackathons.find((x) => x.slug === hack.params.slug)
    if (h) return `${h.title} | ${SITE}`
  }
  const info = matchPath('/info/:slug', pathname)
  if (info && Object.hasOwn(infoPages, info.params.slug)) return `${infoPages[info.params.slug].title} | ${SITE}`
  return `Page not found | ${SITE}`
}

export default function useDocumentTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = titleFor(pathname)
  }, [pathname])
}
