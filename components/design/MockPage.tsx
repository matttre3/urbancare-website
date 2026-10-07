/* eslint-disable @next/next/no-css-tags -- Page-specific mock stylesheets precede the shared navigation overrides. */
import Script from 'next/script'
import { template, type DesignPage, escapeHTML } from '@/lib/design/render'
import { getSiteSettings, type BlogPost } from '@/lib/cms'
import { siteConfig } from '@/lib/site'

/** Only checked-in design HTML and escaped / Lexical-rendered CMS data enter this component. */
export async function MockPage({ page, html, posts, shellOnly = false, children }: { page: DesignPage; html?: string; posts?: BlogPost[]; shellOnly?: boolean; children?: React.ReactNode }) {
  let markup = html || template(page)
  markup = markup.replace(/(<div class="dd">)<a[^>]*>Servizi<\/a>/, '$1<button class="services-toggle" type="button" aria-expanded="false" aria-controls="services-menu">Servizi</button>')
    .replace('<div class="dd-menu">', '<div class="dd-menu" id="services-menu" inert>')
    .replace('<div class="nav-links">', '<div class="nav-links" id="navigation-links">')
  const settings = await getSiteSettings()
  if (settings) {
    const phone = settings.phone.replace(/[^+\d]/g, '')
    markup = markup.replaceAll(siteConfig.email, escapeHTML(settings.email)).replaceAll(siteConfig.pec, escapeHTML(settings.pec))
      .replaceAll('+393275306234', escapeHTML(phone)).replace(/(?:\+39\s*)?327 530 6234/g, () => escapeHTML(settings.phone))
      .replaceAll('Garbagnate Milanese', escapeHTML(settings.location)).replaceAll('https://condomini.baslab.it/auth/login/BAS20559', escapeHTML(settings.portalUrl))
  }
  const data = posts?.map(p => ({ id:p.id, cat:p.cat, v:p.v, date:p.date, min:p.min, t:p.t, x:p.x, featured:p.featured, cover:p.cover, coverAlt:p.coverAlt }))
  return <>
    <link rel="stylesheet" href={`/design/${page}.css`} />
    <link rel="stylesheet" href="/design/navigation.css" />
    {data && <Script id="uc-post-data" strategy="afterInteractive">{`window.__UC_POSTS__=${JSON.stringify(data).replaceAll('<', '\\u003c')};`}</Script>}
    {children ? <>
      <div className="mock-page" dangerouslySetInnerHTML={{ __html: markup.split('<!--content-->')[0] }} />
      {children}
      <div className="mock-page" dangerouslySetInnerHTML={{ __html: markup.split('<!--content-->')[1] || '' }} />
    </> : <div className="mock-page" dangerouslySetInnerHTML={{ __html: markup }} />}
    <Script src={`/design/${shellOnly ? 'shell' : page}.js`} strategy="afterInteractive" />
    <Script src="/design/navigation.js" strategy="afterInteractive" />
  </>
}
