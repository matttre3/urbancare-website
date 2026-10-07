/* eslint-disable @next/next/no-page-custom-font -- The supplied mock fonts are shared by every App Router page. */
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { siteConfig, absoluteUrl } from '@/lib/site'

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#08111f' }
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: 'UrbanCare | Amministrazione condominiale Milano', template: '%s | UrbanCare' },
  description: siteConfig.description,
  robots: process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production' ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: { siteName: 'UrbanCare', locale: 'it_IT', type: 'website', images: [{ url: absoluteUrl('/opengraph-image'), width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="it" suppressHydrationWarning>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700;800&family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
    </head>
    <body><Script src="/design/theme.js" strategy="beforeInteractive" />{children}</body>
  </html>
}
