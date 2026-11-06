export const initials = (name = '') =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'CC'

export const formatDate = (ts) =>
  new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export const formatDateTime = (ts) =>
  new Date(ts).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })

// Only allow in-app absolute paths as a post-login redirect target.
export const safeRedirect = (from, fallback = '/dashboard') =>
  typeof from === 'string' && from.startsWith('/') && !from.startsWith('//') ? from : fallback
