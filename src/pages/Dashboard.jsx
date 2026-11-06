import { Link, useNavigate } from 'react-router-dom'
import { Check, LogOut, UserPlus } from 'lucide-react'
import Button from '../components/Button.jsx'
import RegisterButton from '../components/RegisterButton.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SectionTag from '../components/SectionTag.jsx'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx'
import { useAppState } from '../context/appState.js'
import { activitySeed, builders, hackathons } from '../data/mockData.js'
import { formatDate, formatDateTime, initials } from '../lib/utils.js'
import ArrowIcon from '../components/ArrowIcon.jsx'

function PanelHeading({ n, children }) {
  return (
    <div className="mb-6 flex items-center gap-5">
      <span className="font-mono text-[10px] text-brand">{n}</span>
      <h2 className="m-0 text-[22px] font-bold uppercase tracking-[-0.04em]">{children}</h2>
    </div>
  )
}

const Avatar = ({ name, className = '' }) => (
  <span aria-hidden="true" className={`grid shrink-0 place-items-center border border-line bg-surface-soft font-mono text-[11px] font-medium text-ink ${className}`}>{initials(name)}</span>
)

export default function Dashboard() {
  const { user, registrations, invites, events, logout, toggleInvite } = useAppState()
  const navigate = useNavigate()
  const first = user.name.split(/\s+/)[0].slice(0, 14)

  const liveRegistered = hackathons.filter((h) => h.status === 'Live' && registrations.includes(h.slug)).length
  const stats = [
    { label: 'Registered', value: registrations.length },
    { label: 'Live now', value: liveRegistered },
    { label: 'Invites sent', value: invites.length },
    { label: 'Arena points', value: 120 + registrations.length * 40 + invites.length * 15 },
  ]
  const feed = [
    ...events.map((e) => ({ id: e.id, text: e.text, when: formatDateTime(e.ts) })),
    ...activitySeed,
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <main id="main" tabIndex={-1} className="min-h-screen px-[7vw] pb-24 pt-[140px] max-sm:px-[6vw]">
      <SectionTag dot>CampusCode / Dashboard</SectionTag>
      <SectionHeading as="h1" lines={['Hey,', `~${first}.`]} size="clamp(44px, 8vw, 112px)" className="!mt-8 !leading-[0.86]" />

      <Stagger as="ul" className="m-0 mt-12 grid list-none grid-cols-2 border-l border-t border-line p-0 lg:grid-cols-4">
        {stats.map((s) => (
          <StaggerItem as="li" key={s.label} className="border-b border-r border-line bg-white p-5 sm:p-6">
            <p className="mono-label !text-[9px]">{s.label}</p>
            <p className="mb-0 mt-4 text-[clamp(32px,4vw,52px)] font-black leading-none tracking-[-0.05em]">{s.value}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
        <div className="flex flex-col gap-16">
          <Reveal as="section" aria-labelledby="dash-hackathons">
            <PanelHeading n="01"><span id="dash-hackathons">Hackathons</span></PanelHeading>
            <ul className="m-0 list-none border-t border-line p-0">
              {hackathons.map((h) => (
                <li key={h.slug} className="flex flex-col gap-4 border-b border-line py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="mono-label flex items-center gap-[7px] !text-[8px]">
                      <i className={`h-[6px] w-[6px] rounded-full ${h.active ? 'bg-lime-dark shadow-[0_0_9px_#82b91a66]' : 'bg-[#aaa]'}`} />{h.status} · {h.category}
                    </p>
                    <Link to={`/hackathons/${h.slug}`} className="group mt-2 inline-flex items-center gap-2 text-[22px] font-bold uppercase tracking-[-0.04em] no-underline">
                      {h.title}
                      <ArrowIcon size={16} className="text-[#888] transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
                    </Link>
                    <p className="m-0 mt-1 text-xs text-[#777]">{h.dates}</p>
                  </div>
                  <RegisterButton hackathon={h} />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" aria-labelledby="dash-team">
            <PanelHeading n="02"><span id="dash-team">Team up</span></PanelHeading>
            <ul className="m-0 list-none border-t border-line p-0">
              {builders.map((b) => {
                const invited = invites.includes(b.id)
                return (
                  <li key={b.id} className="flex items-center gap-4 border-b border-line py-4">
                    <Avatar name={b.name} className="h-11 w-11" />
                    <div className="min-w-0 flex-1">
                      <p className="m-0 truncate text-sm font-semibold">{b.name}</p>
                      <p className="m-0 mt-1 truncate font-mono text-[9px] uppercase tracking-[0.5px] text-muted">{b.role} · {b.skills.join(' / ')}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleInvite(b)}
                      aria-pressed={invited}
                      aria-label={`Invite ${b.name}`}
                      className={`inline-flex min-h-11 shrink-0 items-center gap-2 border px-4 font-mono text-[10px] uppercase tracking-[0.5px] transition-[background,color,border-color] duration-300 ${invited ? 'border-ink bg-ink text-white' : 'border-[#b8b8b0] bg-white text-ink hover:border-ink'}`}
                    >
                      {invited ? <Check size={12} strokeWidth={2.5} aria-hidden="true" /> : <UserPlus size={12} aria-hidden="true" />}
                      {invited ? 'Invited' : 'Invite'}
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>

        <div className="flex flex-col gap-16">
          <Reveal as="section" aria-labelledby="dash-profile">
            <PanelHeading n="03"><span id="dash-profile">Profile</span></PanelHeading>
            <div className="border border-line bg-white p-6">
              <div className="flex items-center gap-4">
                <Avatar name={user.name} className="h-14 w-14 !text-sm" />
                <div className="min-w-0">
                  <p className="m-0 truncate text-base font-bold">{user.name}</p>
                  <p className="m-0 mt-1 truncate text-xs text-[#777]">{user.email}</p>
                </div>
              </div>
              <dl className="m-0 mt-6 grid gap-4 border-t border-line pt-5">
                <div><dt className="mono-label !text-[9px]">College</dt><dd className="m-0 mt-1 text-sm">{user.college || 'Not added yet'}</dd></div>
                <div><dt className="mono-label !text-[9px]">Member since</dt><dd className="m-0 mt-1 text-sm">{formatDate(user.joinedAt)}</dd></div>
              </dl>
              <Button variant="box" onClick={handleLogout} className="mt-6 w-full !py-3">
                <LogOut size={12} aria-hidden="true" />Log out
              </Button>
            </div>
          </Reveal>

          <Reveal as="section" aria-labelledby="dash-activity">
            <PanelHeading n="04"><span id="dash-activity">Activity</span></PanelHeading>
            <ol aria-live="polite" className="m-0 list-none border-t border-line p-0">
              {feed.map((a) => (
                <li key={a.id} className="border-b border-line py-4">
                  <p className="m-0 text-sm leading-[1.5]">{a.text}</p>
                  <p className="mono-label m-0 mt-1 !text-[9px]">{a.when}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
