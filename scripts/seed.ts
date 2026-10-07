import { getPayload } from 'payload'
import config from '../payload.config'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'
import { POSTS } from '../lib/design/demo-data'
import templates from '../lib/design/templates.json'

if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) throw new Error('Configura DATABASE_URL e PAYLOAD_SECRET prima di importare le bozze.')
const payload = await getPayload({ config })
try {
  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const article = templates.articolo.match(/<article class="prose" id="prose">([\s\S]*?)<\/article>/)?.[1] || ''
  // The interactive calculator is an independent optional component.
  const prose = article.replace(/<div class="table-wrap">[\s\S]*?<\/table>\s*<\/div>/, '').replace(/<div class="calc"[\s\S]*?(?=<p>Ricorda:)/, '')
  for (const p of POSTS) {
    const found = await payload.find({ collection: 'posts', where: { slug: { equals: p.id } }, limit: 1, draft: true })
    if (found.totalDocs) continue
    const html = p.id === 'millesimi' ? prose : `<p>${p.x}</p><p>Bozza importata dal mock. Scrivere e verificare il contenuto completo prima della pubblicazione.</p>`
    await payload.create({ collection: 'posts', draft: true, data: {
      title: p.t, slug: p.id, excerpt: p.x, category: p.cat as 'guide', illustration: p.v as 'facade',
      readTime: p.min, featured: p.featured || false, author: 'Noele Romano', publishedAt: p.date + 'T12:00:00.000Z',
      content: convertHTMLToLexical({ editorConfig, html, JSDOM }), calculator: p.id === 'millesimi', _status: 'draft',
    } })
  }
  console.log('Import completato. Articoli in bozza: verifica e pubblica da /admin. Nessun articolo esistente è stato sovrascritto.')
} finally { await payload.destroy() }

process.exit(0)
