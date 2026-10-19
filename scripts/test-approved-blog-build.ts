import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { JSDOM } from 'jsdom'
import { guides } from './content/blog-guides'
const normalize = (s: string) => s.replace(/\s+/g, ' ').trim()
for (const [slug, guide] of Object.entries(guides)) {
  const doc = new JSDOM(await readFile(`.next/server/app/blog/${slug}.html`, 'utf8')).window.document
  assert.equal(doc.querySelector('h1')?.textContent, guide.title)
  assert.equal(doc.querySelector('meta[name="description"]')?.getAttribute('content'), guide.description)
  const paragraphs = [...doc.querySelectorAll('.prose p,.prose h2,.prose li')].map(p => p.textContent || '')
  assert.equal(normalize(paragraphs.join(' ')), normalize(guide.sourceParagraphs.join(' ')), `Exact approved copy: ${slug}`)
  assert.ok(doc.querySelector('.prose a[href="/contatti#preventivo"]'))
}
console.log('Approved article checks passed: complete Word copy, titles, meta descriptions and CTA retained in built CMS pages.')
