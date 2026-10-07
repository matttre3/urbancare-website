import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { PGlite } from '@electric-sql/pglite'
import { PGLiteSocketServer } from '@electric-sql/pglite-socket'

// Always uses a fresh in-memory database; never reads a real DATABASE_URL.
const db = await PGlite.create()
const server = new PGLiteSocketServer({ db, port: 0, host: '127.0.0.1', maxConnections: 10 })
await server.start()
process.env.DATABASE_URL = 'postgres://postgres:postgres@' + server.getServerConn() + '/postgres'
process.env.PAYLOAD_SECRET = randomBytes(32).toString('hex')
delete process.env.BLOB_READ_WRITE_TOKEN
delete process.env.RESEND_API_KEY
delete process.env.VERCEL
const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config')
const payload = await getPayload({ config })
try {
  await payload.db.migrate()
  await payload.db.migrate() // Re-running the deployment command must be safe.
  const adminPassword = randomBytes(24).toString('hex')
  const user = await payload.create({ collection: 'users', data: { email: 'admin@example.com', password: adminPassword, name: 'Test Admin', role: 'admin' } })
  assert.equal(user.role, 'admin', 'The first user must be able to manage users.')
  const { editorConfigFactory, convertHTMLToLexical } = await import('@payloadcms/richtext-lexical')
  const { JSDOM } = await import('jsdom')
  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const content = convertHTMLToLexical({ editorConfig, JSDOM, html: '<h2>Test heading</h2><p>Hello <strong>CMS</strong>.</p>' })
  const data = { author: 'Noele Romano', title: 'Published example', slug: 'published-example', excerpt: 'An example', category: 'guide' as const, readTime: 5, publishedAt: '2026-01-01T00:00:00.000Z', content }
  const published = await payload.create({ collection: 'posts', data: { ...data, _status: 'published' } })
  await payload.create({ collection: 'posts', draft: true, data: { ...data, title: 'Private draft', slug: 'private-draft', _status: 'draft' } })
  await payload.create({ collection: 'posts', data: { ...data, slug: 'future-post', publishedAt: '2099-01-01T00:00:00.000Z', _status: 'published' } })
  const publicPosts = await payload.find({ collection: 'posts', overrideAccess: false })
  assert.deepEqual(publicPosts.docs.map(p => p.slug), ['published-example'])
  const privateDraft = await payload.find({ collection: 'posts', overrideAccess: false, draft: true, where: { slug: { equals: 'private-draft' } } })
  assert.equal(privateDraft.totalDocs, 0)
  await assert.rejects(() => payload.create({ collection: 'posts', overrideAccess: false, data: { ...data, slug: 'anonymous' } }))
  await payload.create({ collection: 'subscribers', data: { email: 'subscriber@example.com', consentedAt: new Date().toISOString(), consentVersion: 'test' } })
  await assert.rejects(() => payload.find({ collection: 'subscribers', overrideAccess: false }))
  await assert.rejects(() => payload.create({ collection: 'users', overrideAccess: false, data: { email: 'attacker@example.com', name: 'Anonymous', role: 'admin', password: 'not-a-real-password' } }))
  const editor = await payload.create({ collection: 'users', data: { email: 'editor@example.com', name: 'Editor', role: 'editor', password: randomBytes(24).toString('hex') } })
  await payload.update({ collection: 'users', id: editor.id, user: { ...editor, collection: 'users' }, overrideAccess: false, data: { role: 'admin' } })
  assert.equal((await payload.findByID({ collection: 'users', id: editor.id })).role, 'editor')
  await payload.update({ collection: 'posts', id: published.id, data: { title: 'Updated from CMS' } })
  assert.equal((await payload.find({ collection: 'posts', overrideAccess: false })).docs[0].title, 'Updated from CMS')
  const { convertLexicalToHTML } = await import('@payloadcms/richtext-lexical/html')
  assert.match(convertLexicalToHTML({ data: content }), /<strong>CMS<\/strong>/)
  const sharp = (await import('sharp')).default
  const image = await sharp({create:{width:1800,height:1200,channels:3,background:'#3557c8'}}).png().toBuffer()
  const media = await payload.create({collection:'media',data:{alt:'CMS test cover'},file:{name:'cms-test-cover.png',mimetype:'image/png',size:image.length,data:image}})
  assert.ok(media.sizes?.card?.filename)
  await payload.update({collection:'posts',id:published.id,data:{cover:media.id}})
  const { spawn } = await import('node:child_process')
  const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3101'], { env: process.env, stdio: ['ignore', 'pipe', 'pipe'] })
  let childOutput = ''; child.stdout.on('data', v => { childOutput += v }); child.stderr.on('data', v => { childOutput += v })
  const { chromium } = await import('@playwright/test')
  const browser = await chromium.launch()
  try {
    for(let i=0;i<100;i++){try{await fetch('http://127.0.0.1:3101/api/posts');break}catch{await new Promise(r=>setTimeout(r,200))}}
    const page = await browser.newPage({viewport:{width:1440,height:1000}})
    const errors: string[] = []; page.on('pageerror', e=>errors.push(e.message))
    await page.goto('http://127.0.0.1:3101/admin/login')
    await page.locator('input[name="email"]').fill('admin@example.com')
    await page.locator('input[name="password"]').fill(adminPassword)
    await page.locator('button[type="submit"]').click()
    await page.waitForURL('**/admin')
    await page.screenshot({path:'/private/tmp/urbancare-review/admin-dashboard.png'})
    await page.locator('a[href="/admin/collections/posts"]').last().click()
    await page.waitForSelector('a[href*="/admin/collections/posts/"]')
    await page.goto('http://127.0.0.1:3101/admin/collections/posts/'+published.id)
    await page.waitForSelector('[contenteditable="true"]')
    await page.screenshot({path:'/private/tmp/urbancare-review/admin-editor.png'})
    assert.equal((await fetch('http://127.0.0.1:3101/api/subscribers')).status, 403)
    const apiPosts = await (await fetch('http://127.0.0.1:3101/api/posts')).json() as {docs:{slug:string}[]}
    assert.deepEqual(apiPosts.docs.map(p=>p.slug), ['published-example'])
    await page.goto('http://127.0.0.1:3101/blog/published-example')
    assert.equal(await page.locator('h1').textContent(), 'Updated from CMS')
    await page.locator('#heroCover img').waitFor()
    assert.equal(await page.locator('#heroCover img').getAttribute('alt'), 'CMS test cover')
    assert.ok(await page.locator('#heroCover img').evaluate((img: HTMLImageElement)=>img.complete && img.naturalWidth>0))
    await page.waitForTimeout(1500)
    assert.deepEqual(errors, [])
    await payload.delete({collection:'media',id:media.id})
    console.log('Admin and frontend checks passed: real login, admin navigation, public REST access, dynamic CMS article rendering.')
  } catch (error) { console.error(childOutput); throw error }
  finally { await browser.close(); child.kill('SIGTERM'); await new Promise<void>(resolve => child.once('exit',()=>resolve())) }
  console.log('CMS checks passed: migration idempotency, first admin, published/draft/future access, private subscribers, user creation, role escalation, editable content.')
} finally {
  // The in-memory database belongs only to this process. The socket shim schedules
  // asynchronous detach callbacks; do not unload WASM while they are pending.
  payload.db.pool.on('error', () => {})
  await payload.destroy()
  await server.stop()
}
process.exit(0)
