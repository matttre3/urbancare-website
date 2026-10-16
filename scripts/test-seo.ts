import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'
import { createPageMetadata } from '../lib/metadata'
import { publicPages, siteStructuredData, shortDescription } from '../lib/seo'
import { articleHTML, blogHTML } from '../lib/design/render'
import type { BlogPost } from '../lib/cms'

for (const page of Object.values(publicPages)) {
  const meta = createPageMetadata(page)
  assert.ok(JSON.stringify(meta.title).includes('Urbancare'))
  assert.equal(meta.alternates?.canonical, 'https://www.urbancare-amministrazioni.com' + page.path)
  assert.ok(page.description.length > 40)
}
const customImage = 'https://example.com/article.webp'
const social = createPageMetadata({ ...publicPages.blog, image: { url: customImage, alt: 'Article cover' } })
assert.ok(JSON.stringify(social.openGraph).includes(customImage))
assert.ok(JSON.stringify(social.twitter).includes(customImage))
assert.ok(shortDescription('word '.repeat(100)).length <= 160)
const graph = siteStructuredData(undefined, 'amministrazione')['@graph']
assert.ok(graph.some(item => item['@type'] === 'Service'))
assert.ok(graph.some(item => item['@type'] === 'Organization'))
assert.ok(!JSON.stringify(graph).includes('streetAddress'))
assert.ok(!JSON.stringify(graph).includes('openingHours'))
assert.ok(!JSON.stringify(graph).includes('ProfessionalService'))
const breadcrumb = graph.find(item => item['@type'] === 'BreadcrumbList')
assert.ok(JSON.stringify(breadcrumb).includes('/servizi'))
const post: BlogPost = { id: 'example-post', t: 'Example post', x: 'An article about condominium accounts.', cat: 'guide', v: 'facade', date: '2026-01-01', min: 3, featured: true, cover: customImage, coverCard: 'https://example.com/card.webp', coverAlt: 'Article cover' }
const one = new JSDOM(blogHTML([post])).window.document
assert.equal(one.querySelectorAll('#grid .post-card').length, 1, 'Featured article remains available in the filterable list')
assert.ok(!one.querySelectorAll('.post-card:not(#grid .post-card)').length, 'SSR cards belong to the grid')
assert.equal(one.querySelector('.feat-cover img')?.getAttribute('loading'), 'eager')
assert.equal(one.querySelector('#grid img')?.getAttribute('src'), post.coverCard)
assert.ok(one.querySelector('#grid img')?.hasAttribute('srcset'))
const article = new JSDOM(articleHTML(post, [post], '<h2>Example section</h2><p>Public body.</p>')).window.document
assert.equal(article.querySelector('.related'), null, 'No empty related-articles section')
assert.equal(article.querySelector('.prose h2')?.textContent, 'Example section')
assert.equal(article.querySelector('#heroCover img')?.getAttribute('fetchpriority'), 'high')
console.log('SEO checks passed: canonicals, title branding, social covers, honest organization schema, breadcrumbs, SSR article list, responsive covers and related sections.')
