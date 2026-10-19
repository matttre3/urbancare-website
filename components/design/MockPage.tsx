/* eslint-disable @next/next/no-css-tags -- Page-specific mock stylesheets precede the shared navigation overrides. */
import Script from 'next/script'
import { template, type DesignPage, escapeHTML } from '@/lib/design/render'
import { getSiteSettings, type BlogPost } from '@/lib/cms'
import { siteConfig } from '@/lib/site'
import { JsonLd } from '@/components/JsonLd'
import { publicPages, siteStructuredData, type PublicPage } from '@/lib/seo'

/** Only checked-in design HTML and escaped / Lexical-rendered CMS data enter this component. */
export async function MockPage({ page, html, posts, shellOnly = false, children, seo }: { page: DesignPage; html?: string; posts?: BlogPost[]; shellOnly?: boolean; children?: React.ReactNode; seo?: PublicPage | false }) {
  const seoPage = seo === false ? undefined : seo || (page in publicPages ? page as PublicPage : undefined)
  let markup = html || template(page)
  if (page !== 'home') markup = markup.replace('</nav>\n  </div>', '</nav>\n  </div><div class="nav-spacer" aria-hidden="true"></div>')
  markup = markup.replace(/(<div class="dd">)<a[^>]*>Servizi<\/a>/, '$1<button class="services-toggle" type="button" aria-expanded="false" aria-controls="services-menu">Servizi</button>')
    .replace('<div class="dd-menu">', '<div class="dd-menu" id="services-menu" inert>')
    .replace('<div class="nav-links">', '<div class="nav-links" id="navigation-links">')
  markup = markup.replace(/(<a\b[^>]*href="\/privacy-policy"[^>]*>Privacy Policy<\/a>)/, '$1 · <button type="button" class="footer-privacy-settings" data-privacy-settings aria-haspopup="dialog" aria-controls="uc-privacy-dialog">Preferenze privacy</button>')
  const settings = await getSiteSettings()
  if (settings) {
    const phone = settings.phone.replace(/[^+\d]/g, '')
    markup = markup.replaceAll(siteConfig.email, escapeHTML(settings.email)).replaceAll(siteConfig.pec, escapeHTML(settings.pec))
      .replaceAll('+393275306234', escapeHTML(phone)).replace(/(?:\+39\s*)?327 530 6234/g, () => escapeHTML(settings.phone))
      .replaceAll('Garbagnate Milanese', escapeHTML(settings.location)).replaceAll('https://condomini.baslab.it/auth/login/BAS20559', escapeHTML(settings.portalUrl))
  }
  if (!children && !markup.includes('<main')) {
    const start = markup.search(/<(?:header|section)\b/)
    const end = markup.lastIndexOf('<footer>')
    if (start >= 0 && end > start) markup = markup.slice(0, start) + '<main id="main-content">' + markup.slice(start, end) + '</main>' + markup.slice(end)
  }
  const data = posts?.map(p => ({ id:p.id, cat:p.cat, v:p.v, date:p.date, min:p.min, t:p.t, x:p.x, featured:p.featured, cover:p.cover, coverCard:p.coverCard, coverAlt:p.coverAlt }))
  return <>
    {seo !== false && <JsonLd data={siteStructuredData(settings, seoPage)} />}
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
