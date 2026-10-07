import templates from './templates.json'
import { coverSVG } from './cover-generator'
import { CATS } from './demo-data'
import type { BlogPost } from '../cms'

export type DesignPage = keyof typeof templates
export const escapeHTML = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
export const fmtDate = (d: string) => new Date(d + 'T12:00:00').toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
export const template = (page: DesignPage) => templates[page]
export const shell = (content: string) => templates.articolo.slice(0, templates.articolo.indexOf('  <header class="a-head">')) + content + templates.articolo.slice(templates.articolo.indexOf('  <footer>'))
export function cover(p: BlogPost, cls = '', wide = false) {
  return `<div class="cover ${cls}" style="--c:${CATS[p.cat].c}">${p.cover ? `<img src="${escapeHTML(p.cover)}" alt="${escapeHTML(p.coverAlt || p.t)}" loading="lazy">` : coverSVG(p, wide)}</div>`
}
export const chip = (p: BlogPost) => `<span class="chip" style="--c:${CATS[p.cat].c}">${escapeHTML(CATS[p.cat].name)}</span>`
export function card(p: BlogPost) {
  return `<a class="post-card lit-on-hover reveal" href="/blog/${encodeURIComponent(p.id)}" data-cat="${p.cat}">${cover(p)}<div class="post-body"><div class="post-meta">${chip(p)}<span>${p.min} min</span></div><h3>${escapeHTML(p.t)}</h3><p>${escapeHTML(p.x)}</p><div class="post-foot"><time datetime="${p.date}">${fmtDate(p.date)}</time><span class="read">Leggi <b>→</b></span></div></div></a>`
}
export function blogHTML(posts: BlogPost[]) {
  const feat = posts.find(p => p.featured) || posts[0]
  let html = templates.blog
  const featured = feat ? `<a class="feat-card lit-on-hover enter" style="--d:.55s" href="/blog/${encodeURIComponent(feat.id)}">${cover(feat, 'feat-cover')}<div class="feat-body"><div><div class="tagline"><span class="badge">In evidenza</span>${chip(feat)}<span class="post-meta">${feat.min} min di lettura</span></div><h2>${escapeHTML(feat.t).replace('bene.', '<span class="accent">bene.</span>')}</h2><p>${escapeHTML(feat.x)}</p></div><div style="display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap"><div class="author"><span class="avatar"><svg viewBox="0 0 304 291"><path d="M22 112 L152 22 L282 112" fill="none" stroke="#fff" stroke-width="34"/><path d="M78 128 V206 a74 74 0 0 0 148 0 V116" fill="none" stroke="#fff" stroke-width="40"/></svg></span><div><b>${escapeHTML(feat.author || 'Noele Romano')}</b><span>${fmtDate(feat.date)}</span></div></div><span class="btn primary">Leggi l’articolo <span class="round">→</span></span></div></div></a>` : ''
  html = html.replace(/(<section class="featured" id="featured">)[\s\S]*?(<\/section>)/, () => `<section class="featured" id="featured">${featured}</section>`)
  html = html.replace(/(<div class="empty"[^>]*>)/, (match) => posts.filter(p => p !== feat).map(card).join('') + match)
  return html
}
export function articleHTML(p: BlogPost, posts: BlogPost[], content?: string) {
  let html = templates.articolo
  if (p.document || p.id !== 'millesimi') {
    const title = p.id === 'millesimi' && p.t === 'Millesimi, spiegati bene.' ? 'Millesimi,<br>spiegati <span class="accent">bene.</span>' : escapeHTML(p.t)
    html = html.replace(/(<h1 class="enter"[^>]*>)[\s\S]*?(<\/h1>)/, (_, a, b) => a + title + b)
    html = html.replace(/(<p class="dek enter"[^>]*>)[\s\S]*?(<\/p>)/, (_, a, b) => a + escapeHTML(p.x) + b)
    html = html.replace(/(<div class="chips enter"[^>]*>)[\s\S]*?(<\/div>)/, (_, a, b) => a + chip(p) + b)
    html = html.replace(/(<article class="prose" id="prose">)[\s\S]*?(<\/article>)/, (_, a, b) => a + (content || `<p>${escapeHTML(p.x)}</p><p>Anteprima del mock: il contenuto completo di questo articolo va scritto e pubblicato dal CMS.</p>`) + b)
    html = html.replace(/<div class="brief">[\s\S]*?<\/div>/, '')
    html = html.replace(/(<div class="tags">)[\s\S]*?(<\/div>)/, (_, a, b) => `${a}<a href="/blog">#${escapeHTML(CATS[p.cat].name)}</a>${b}`)
  }
  html = html.replace(/<time datetime="2026-09-24">.*?<\/time>/, `<time datetime="${p.date}">${fmtDate(p.date)}</time>`)
  html = html.replaceAll('7 min', `${p.min} min`).replaceAll('Noele Romano', escapeHTML(p.author || 'Noele Romano'))
  const caption = p.document?.cover && typeof p.document.cover === 'object' ? p.document.cover.caption || '' : 'Illustrazione generata · ogni articolo del Cortile ha la sua facciata'
  html = html.replace(/(<figure[^>]*id="heroCover">)[\s\S]*?(<\/figure>)/, (_, a, b) => a + cover(p, 'big-cover', true) + `<figcaption>${escapeHTML(caption)}</figcaption>` + b)
  const preferred = p.id === 'millesimi' ? posts.filter(x => ['rendiconto', 'ascensore', 'assemblea'].includes(x.id)) : []
  const related = [...preferred, ...posts.filter(x => x.id !== p.id && !preferred.includes(x))].slice(0, 3)
  html = html.replace(/(<div[^>]*id="related">)[\s\S]*?(<\/div>)/, (_, a, b) => a + related.map(card).join('') + b)
  return html
}
