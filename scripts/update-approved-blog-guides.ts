import assert from 'node:assert/strict'
import { getPayload } from 'payload'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { JSDOM } from 'jsdom'
import config from '../payload.config'
import { guides } from './content/blog-guides'

const publish = process.argv.includes('--publish')
const normalize = (text: string) => text.replace(/\s+/g, ' ').trim()
const payload = await getPayload({ config })
try {
  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const entries = await Promise.all(Object.entries(guides).map(async ([slug, guide]) => {
    const found = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, draft: true, limit: 2 })
    assert.equal(found.docs.length, 1, `Expected one existing article: ${slug}`)
    const html = `<p>${guide.intro}</p>${guide.content}`
    const content = convertHTMLToLexical({ editorConfig, html, JSDOM })
    const converted = new JSDOM(convertLexicalToHTML({ data: content })).window.document.body.textContent || ''
    const expected = guide.sourceParagraphs.join(' ')
    // Compare paragraph boundaries too, rather than concatenating adjacent block text.
    const blocks = new JSDOM(convertLexicalToHTML({ data: content })).window.document.querySelectorAll('p,h2,li')
    assert.equal(normalize([...blocks].map(block => block.textContent).join(' ')), normalize(expected), `Word to CMS fidelity: ${slug}`)
    assert.ok(converted.length)
    return { post: found.docs[0], guide, content, readTime: Math.ceil(expected.split(/\s+/).length / 200) }
  }))
  for (const { post, guide, content, readTime } of entries) {
    if (!publish) { console.log(JSON.stringify({ slug: post.slug, title: guide.title, source: guide.source, readTime, action: 'replace-with-approved-copy' })); continue }
    const updated = await payload.update({ collection: 'posts', id: post.id, context: { disableRevalidation: true }, data: {
      title: guide.title, excerpt: guide.intro, content, readTime,
      seo: { title: guide.title, description: guide.description }, _status: 'published',
    } })
    assert.equal(updated.title, guide.title)
    assert.equal(updated.seo?.description, guide.description)
    assert.equal(updated.publishedAt, post.publishedAt, 'Keep original publication date')
    console.log(`Aggiornato con testo approvato: ${updated.slug}`)
  }
} finally { await payload.destroy() }
process.exit(0)
