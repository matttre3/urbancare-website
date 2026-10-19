import { getPayload } from 'payload'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'
import config from '../payload.config'
import { guides } from './content/blog-guides'

if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) throw new Error('CMS non configurato')
const publish = process.argv.includes('--publish')
const payload = await getPayload({ config })
try {
  // Check both slugs before writing; existing CMS content is never overwritten.
  const entries = await Promise.all(Object.entries(guides).map(async ([slug, guide]) => {
    const found = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, draft: true, limit: 1 })
    if (found.docs[0] && found.docs[0]._status !== 'published') throw new Error(`Esiste già una bozza: ${slug}. Nessuna sovrascrittura.`)
    return { slug, guide, existing: found.docs[0] }
  }))
  if (!publish) {
    console.log(JSON.stringify(entries.map(({ slug, existing }) => ({ slug, action: existing ? 'already-published' : 'create-published' })), null, 2))
  } else {
    const editorConfig = await editorConfigFactory.default({ config: payload.config })
    for (const { slug, guide, existing } of entries) {
      if (existing) { console.log(`Già pubblicato: ${slug}`); continue }
      const html = `<p>${guide.intro}</p>${guide.content}`
      const readTime = Math.max(1, Math.ceil(html.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length / 200))
      const post = await payload.create({ collection: 'posts', context: { disableRevalidation: true }, data: {
        title: guide.title, slug, excerpt: guide.intro, category: 'guide',
        illustration: slug.startsWith('costo') ? 'blocks' : 'facade',
        author: 'Urbancare', readTime, featured: false, publishedAt: new Date().toISOString(),
        content: convertHTMLToLexical({ editorConfig, html, JSDOM }),
        seo: { title: guide.title, description: guide.description }, _status: 'published',
      } })
      console.log(`Pubblicato: ${post.slug} (${post._status})`)
    }
  }
} finally { await payload.destroy() }
process.exit(0)
