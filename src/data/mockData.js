export const navLinks = [
  { label: 'About', to: '/#about' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Hackathons', to: '/#hackathons' },
  { label: 'Community', to: '/#community' },
]


export const marqueeWords = ['Community', 'Ideas', 'People', 'Products', 'Innovation']

export const steps = [
  { n: '01', title: 'Discover', text: 'Find a challenge that makes you want to build.' },
  { n: '02', title: 'Team Up', text: 'Find people who share your ambition.' },
  { n: '03', title: 'Build', text: 'Turn your idea into something people can use.' },
  { n: '04', title: 'Ship', text: 'Submit your work and take it to the arena.' },
]

// Sample data: dates, prizes and descriptions are placeholders, not real events.
export const hackathons = [
  {
    n: '01', slug: 'ai-innovation', category: 'Artificial Intelligence', title: 'AI Innovation',
    text: 'Build intelligent solutions for problems that matter.', status: 'Live', active: true,
    dates: 'Oct 20 – Nov 24, 2026', mode: 'Hybrid · Chennai', team: '2–4 builders', prize: '₹50,000 pool', currentRound: 1,
    about: 'Teams pick a real campus or community problem and use machine learning to solve it. Judges look for ideas that work, not just demos that dazzle.',
  },
  {
    n: '02', slug: 'future-web', category: 'Web Development', title: 'Future Web',
    text: 'Design and ship the next generation of digital experiences.', status: 'Open', active: true,
    dates: 'Dec 1 – Dec 15, 2026', mode: 'Online', team: '1–3 builders', prize: '₹30,000 pool', currentRound: null,
    about: 'Design, build and deploy a web experience that feels like it belongs five years from now. Performance, accessibility and craft all count.',
  },
  {
    n: '03', slug: 'campus-tech', category: 'Smart Technology', title: 'Campus Tech',
    text: 'Create technology that makes student life better.', status: 'Upcoming', active: false,
    dates: 'Starts Jan 12, 2027', mode: 'On campus · Chennai', team: '3–5 builders', prize: '₹40,000 pool', currentRound: null,
    about: 'From timetables to canteen queues, build technology that makes student life easier. Hardware, software and mixed projects are all welcome.',
  },
]

// Round 2/3 names are assumed (only "Round 1 Problem" was visible in the recording).
export const rounds = [
  { r: 'Round 1', label: 'Problem' },
  { r: 'Round 2', label: 'Prototype' },
  { r: 'Round 3', label: 'Pitch' },
]

export const footerColumns = [
  { title: 'Product', links: [
    { label: 'About', to: '/#about' }, { label: 'Hackathons', to: '/#hackathons' },
    { label: 'How it works', to: '/#how-it-works' }, { label: 'Community', to: '/#community' },
  ] },
  { title: 'Builders', links: [
    { label: 'Students', to: '/info/students' }, { label: 'Teams', to: '/info/teams' },
    { label: 'Organizers', to: '/info/organizers' }, { label: 'Developers', to: '/info/developers' },
  ] },
  { title: 'Guides', links: [
    { label: 'Hackathon Rules', to: '/info/rules' }, { label: 'FAQ', to: '/info/faq' },
    { label: 'Support', to: '/info/support' }, { label: 'Contact', to: '/info/contact' },
  ] },
]

export const footerLegal = [
  { label: 'Terms', to: '/info/terms' },
  { label: 'Privacy', to: '/info/privacy' },
  { label: 'Contact', to: '/info/contact' },
]

// Placeholder copy for the footer destinations (one generic page, /info/:slug).
export const infoPages = {
  students: { title: 'Students', blurb: 'Find a hackathon, join a team and ship something real. CampusCode is built for students who learn by making.' },
  teams: { title: 'Teams', blurb: 'Teams of two to five builders register together, share one project and move through the rounds side by side.' },
  organizers: { title: 'Organizers', blurb: 'Colleges and clubs can run hackathons here, with rounds, scoring and announcements in one place.' },
  developers: { title: 'Developers', blurb: 'Mentors and developers can review prototypes, judge rounds and give student teams honest feedback.' },
  rules: { title: 'Hackathon Rules', blurb: 'Every hackathon runs in three rounds: Problem, Prototype and Pitch. Work must be original and stay within the announced team size.' },
  faq: { title: 'FAQ', blurb: 'Quick answers on registering, forming a team and submitting your work will live here.' },
  support: { title: 'Support', blurb: 'Stuck on registration or a submission? The support desk will be reachable from this page.' },
  contact: { title: 'Contact', blurb: 'Questions, partnerships and press enquiries: contact details will be published here.' },
  terms: { title: 'Terms', blurb: 'Demo terms placeholder. This site is a frontend recreation: there are no real accounts, payments or data collection.' },
  privacy: { title: 'Privacy', blurb: 'Demo privacy notice. Anything you enter is kept in your own browser storage and is never sent anywhere.' },
}

// Used by the "Use demo account" button on the login page.
export const demoUser = { name: 'Aarav Sharma', email: 'aarav@campuscode.dev', college: 'Demo College, Chennai' }

// Fictional builders shown in the dashboard "Team up" list.
export const builders = [
  { id: 'b1', name: 'Meera Iyer', role: 'Frontend · Design', skills: ['React', 'Figma'] },
  { id: 'b2', name: 'Karthik Raj', role: 'Backend · ML', skills: ['Python', 'FastAPI'] },
  { id: 'b3', name: 'Nisha Fernando', role: 'Product · Pitching', skills: ['Research', 'Slides'] },
  { id: 'b4', name: 'Rohan Mehta', role: 'Mobile', skills: ['Flutter', 'Firebase'] },
]

// Static feed entries; the user's own actions are prepended at runtime.
export const activitySeed = [
  { id: 's1', text: 'AI Innovation moved to Round 2: Prototype', when: 'Live update' },
  { id: 's2', text: 'Future Web registrations are open', when: 'Open now' },
  { id: 's3', text: 'Campus Tech opens on Jan 12, 2027', when: 'Coming up' },
]
