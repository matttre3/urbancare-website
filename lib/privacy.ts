export const privacyStorageKey = 'urbancare-privacy-v1'
export const consentLifetime = 180 * 24 * 60 * 60 * 1000
export type PrivacyChoice = { version: 1; analytics: boolean; savedAt: number }
export function createPrivacyChoice(analytics: boolean, now = Date.now()): PrivacyChoice {
  return { version: 1, analytics, savedAt: now }
}
export function readPrivacyChoice(raw: string | null, now = Date.now()): PrivacyChoice | null {
  try {
    const value = JSON.parse(raw || 'null')
    return value?.version === 1 && typeof value.analytics === 'boolean' && Number.isFinite(value.savedAt) && value.savedAt <= now && now - value.savedAt < consentLifetime ? value : null
  } catch { return null }
}
export function minimiseAnalyticsPayload(type: string, payload: Record<string, unknown>, origin: string) {
  if (type !== 'event' || !payload || payload.name || payload.id) return false
  const clean = { ...payload }
  for (const key of ['url', 'referrer']) {
    if (!clean[key]) continue
    try {
      const url = new URL(String(clean[key]), origin)
      if (!['http:', 'https:'].includes(url.protocol)) return false
      clean[key] = key === 'url' ? url.pathname : url.origin + url.pathname
    } catch { return false }
  }
  delete clean.data
  return clean
}
