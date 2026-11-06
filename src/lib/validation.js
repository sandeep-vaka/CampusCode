// Client-side form rules. Each rule returns an error message or '' and receives (value, allValues).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const text = (label, min, max) => (v) => {
  const s = (v ?? '').trim()
  if (!s) return `Enter ${label}.`
  if (s.length < min) return `Use at least ${min} characters.`
  if (s.length > max) return `Keep it under ${max} characters.`
  return ''
}

const email = (v) => {
  const s = (v ?? '').trim()
  if (!s) return 'Enter your email address.'
  return EMAIL_RE.test(s) ? '' : 'Enter a valid email, like you@college.edu.'
}

const newPassword = (v) => {
  if (!v) return 'Create a password.'
  if (v.length < 8) return 'Use at least 8 characters.'
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return 'Include at least one letter and one number.'
  return ''
}

const loginSpec = {
  email,
  password: (v) => (v ? '' : 'Enter your password.'),
}

const signupSpec = {
  name: text('your full name', 2, 60),
  email,
  college: text('your college', 2, 80),
  password: newPassword,
  confirm: (v, all) => (!v ? 'Confirm your password.' : v === all.password ? '' : 'Passwords do not match.'),
  terms: (v) => (v ? '' : 'Accept the terms to continue.'),
}

function validateWith(spec, values) {
  const errors = {}
  for (const [key, rule] of Object.entries(spec)) {
    const msg = rule(values[key], values)
    if (msg) errors[key] = msg
  }
  return errors
}

export const validateLogin = (values) => validateWith(loginSpec, values)
export const validateSignup = (values) => validateWith(signupSpec, values)

// 0-4: length, mixed case, digit, symbol (or 12+ chars).
export function passwordScore(pw) {
  if (!pw) return 0
  let score = 0
  if (pw.length >= 8) score++
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) score++
  return score
}
