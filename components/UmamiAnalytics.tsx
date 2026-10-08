import Script from 'next/script'
import { getUmamiConfig } from '@/lib/umami'

export function UmamiAnalytics() {
  const config = getUmamiConfig()
  if (!config) return null
  return <>
    <Script
      id="umami-tracker"
      src={config.scriptUrl}
      strategy="afterInteractive"
      data-website-id={config.websiteId}
      data-domains={config.domains}
      data-exclude-search="true"
      data-exclude-hash="true"
      data-do-not-track="true"
      data-fetch-credentials="omit"
      data-before-send="urbancareUmamiBeforeSend"
    />
  </>
}
