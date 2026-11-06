// Mock persistence: one localStorage key, every access wrapped in try/catch
// (storage can be blocked or throw in private windows; state then lives in memory only).
const KEY = 'campuscode.v1'
const empty = () => ({ session: null, profiles: {}, data: {} })

export function loadStore() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY))
    if (!parsed || typeof parsed !== 'object') return empty()
    return {
      session: parsed.session && typeof parsed.session.email === 'string' ? parsed.session : null,
      profiles: parsed.profiles && typeof parsed.profiles === 'object' ? parsed.profiles : {},
      data: parsed.data && typeof parsed.data === 'object' ? parsed.data : {},
    }
  } catch {
    return empty()
  }
}

export function saveStore(store) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store))
  } catch {
    // Ignore: the app keeps working from memory.
  }
}
