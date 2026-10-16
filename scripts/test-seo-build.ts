import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { JSDOM } from 'jsdom'
import { publicPages } from '../lib/seo'

const titles = new Set<string>()
for (const page of Object.values(publicPages)) {
  const file = '.next/server/app' + (page.path === '/' ? '/index' : page.path) + '.html'
  const document = new JSDOM(await readFile(file, 'utf8')).window.document
  assert.ok(document.title.endsWith(' | Urbancare'), 'Brand in title: ' + page.path)
  assert.ok(!titles.has(document.title), 'Unique title: ' + page.path)
  titles.add(document.title)
  assert.equal(new URL(document.querySelector('link[rel="canonical"]')!.getAttribute('href')!).href, 'https://www.urbancare-amministrazioni.com' + page.path)
  assert.equal(document.querySelectorAll('h1').length, 1, 'Single H1: ' + page.path)
  assert.equal(document.querySelectorAll('main').length, 1, 'Main landmark: ' + page.path)
  assert.ok(document.querySelector('meta[name="description"]')?.getAttribute('content'))
  for (const heading of document.querySelectorAll('h1,h2,h3')) assert.ok(heading.textContent?.trim(), 'No empty headings: ' + page.path)
  const graph = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => JSON.parse(el.textContent || '{}')['@graph'] || [])
  assert.ok(graph.some(node => node['@type'] === 'Organization'), 'Organization graph: ' + page.path)
  assert.ok(!graph.some(node => node['@type'] === 'ProfessionalService'))
  assert.ok(graph.every(node => !node.address && !node.openingHours), 'No invented address or hours')
  assert.ok(document.querySelector('footer a[href="/zone-servite"]'))
  assert.ok(document.querySelector('footer a[href="/privacy-policy"]'))
  if (page.path.startsWith('/servizi/')) {
    assert.ok(document.querySelector('h1')?.textContent?.includes('Garbagnate Milanese'))
    assert.ok(graph.some(node => node['@type'] === 'Service'))
  }
  if (page.path === '/contatti') assert.ok(document.querySelector('.p-hero .lead')?.textContent?.includes('Garbagnate Milanese'))
  if (page.path === '/') assert.ok(document.querySelector('h1')?.textContent?.includes('Garbagnate Milanese'))
  if (page.path === '/blog') {
    assert.equal(document.querySelectorAll('#grid .post-card').length, Number(document.querySelector('#statPosts')?.textContent))
    assert.ok(!document.body.textContent?.includes('Nuovo a settimana'))
  }
  if (page.path === '/zone-servite') for (const town of ['Cesate', 'Arese', 'Lainate', 'Bollate', 'Senago', 'Caronno Pertusella']) assert.ok(document.body.textContent?.includes(town))
}
const article = new JSDOM(await readFile('.next/server/app/blog/millesimi.html', 'utf8')).window.document
assert.ok(article.title.includes('Millesimi condominiali'))
assert.ok(!article.querySelector('.prose')?.textContent?.includes('Ecco un esempio con quattro unità'))
assert.ok(!article.querySelector('.prose')?.textContent?.includes('calcola la tua quota'))
assert.ok(article.querySelector('.prose a[href="/servizi/gestione-contabile"]'))
console.log('Built SEO checks passed: all public pages have unique branded titles, canonicals, one H1/main, truthful schema, geographic copy and crawlable links; CMS article cleanup confirmed.')
