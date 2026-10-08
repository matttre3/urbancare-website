type UmamiEnvironment = Record<string, string | undefined>

/** Tracker identifiers are public; no Umami account/API credentials belong here. */
export function getUmamiConfig(env: UmamiEnvironment = process.env) {
  if (env.VERCEL_ENV !== 'production' || !env.UMAMI_WEBSITE_ID || !env.UMAMI_SCRIPT_URL) return undefined
  if (!/^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i.test(env.UMAMI_WEBSITE_ID)) return undefined
  try {
    const script = new URL(env.UMAMI_SCRIPT_URL)
    const site = new URL(env.NEXT_PUBLIC_SITE_URL || 'https://www.urbancare-amministrazioni.com')
    if (script.protocol !== 'https:' || script.username || script.password || script.search || script.hash) return undefined
    if (site.protocol !== 'https:' || site.hostname === 'localhost' || site.hostname.endsWith('.vercel.app')) return undefined
    const domain = site.hostname.replace(/^www\./, '')
    return { websiteId: env.UMAMI_WEBSITE_ID, scriptUrl: script.href, domains: `${domain},www.${domain}` }
  } catch { return undefined }
}
