import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import { spawn } from 'node:child_process'
import { writeFile, readFile } from 'node:fs/promises'
import { PGlite } from '@electric-sql/pglite'
import { PGLiteSocketServer } from '@electric-sql/pglite-socket'

// Production rendering + invalidation against a disposable database only.
const db = await PGlite.create()
const socket = new PGLiteSocketServer({ db, port: 0, host: '127.0.0.1', maxConnections: 20 })
await socket.start()
process.env.DATABASE_URL = 'postgres://postgres:postgres@' + socket.getServerConn() + '/postgres'
process.env.PAYLOAD_SECRET = randomBytes(32).toString('hex')
for (const key of ['VERCEL', 'VERCEL_ENV', 'BLOB_READ_WRITE_TOKEN', 'RESEND_API_KEY']) process.env[key] = ''
const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config')
const payload = await getPayload({ config })
const context = { disableRevalidation: true }
let app: ReturnType<typeof spawn> | undefined
let logs = ''
const base = 'http://127.0.0.1:3102'
try {
  await payload.db.migrate()
  const password = randomBytes(24).toString('hex')
  await payload.create({ collection: 'users', data: { email: 'static-test@example.com', password, name: 'Rendering test', role: 'admin' } })
  const { convertHTMLToLexical, editorConfigFactory } = await import('@payloadcms/richtext-lexical')
  const { JSDOM } = await import('jsdom')
  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const content = convertHTMLToLexical({ editorConfig, JSDOM, html: '<h2>Static rendering</h2><p>Public fixture body.</p>' })
  const data = { title: 'Static fixture', slug: 'static-fixture', excerpt: 'Public fixture', author: 'Test', category: 'guide' as const, readTime: 2, publishedAt: '2026-01-01T12:00:00.000Z', content }
  const post = await payload.create({ collection: 'posts', context, data: { ...data, _status: 'published' } })
  await payload.create({ collection: 'posts', context, draft: true, data: { ...data, slug: 'private-fixture', title: 'Private fixture', _status: 'draft' } })
  await payload.create({ collection: 'posts', context, data: { ...data, slug: 'future-fixture', publishedAt: '2099-01-01T00:00:00.000Z', _status: 'published' } })
  await payload.updateGlobal({ slug: 'site-settings', context, data: { phone: '+39 327 530 6234' } })
  const build = spawn('pnpm', ['build'], { env: process.env, stdio: ['ignore', 'pipe', 'pipe'] })
  build.stdout.on('data', b => { logs += b; process.stdout.write(b) })
  build.stderr.on('data', b => { logs += b; process.stderr.write(b) })
  assert.equal(await new Promise(resolve => build.once('exit', resolve)), 0, 'Production build must pass')
  const manifest = JSON.parse(await readFile('.next/prerender-manifest.json', 'utf8'))
  const paths = ['/', '/lo-studio', '/servizi', '/servizi/amministrazione-condominiale', '/servizi/consulenza-condominiale', '/servizi/condominio-online', '/servizi/gestione-contabile', '/contatti', '/zone-servite', '/privacy-policy', '/blog', '/blog/static-fixture', '/sitemap.xml']
  for (const path of paths) assert.ok(manifest.routes[path], 'Prerendered: ' + path)
  assert.equal(manifest.routes['/blog/private-fixture'], undefined)
  assert.equal(manifest.routes['/blog/future-fixture'], undefined)
  app = spawn('pnpm', ['start', '--port', '3102'], { env: process.env, stdio: ['ignore', 'pipe', 'pipe'] })
  app.stdout!.on('data', b => { logs += b })
  app.stderr!.on('data', b => { logs += b })
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(base)).ok) break } catch {}
    await new Promise(resolve => setTimeout(resolve, 200))
  }
  async function html(path: string) {
    const res = await fetch(base + path)
    return { res, text: await res.text() }
  }
  for (const path of ['/', '/contatti', '/blog', '/blog/static-fixture', '/sitemap.xml']) {
    const { res } = await html(path)
    assert.equal(res.status, 200)
    assert.equal(res.headers.get('x-nextjs-cache'), 'HIT', 'Full route cache hit: ' + path)
  }
  const login = await fetch(base + '/api/users/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'static-test@example.com', password }) })
  const { token } = await login.json()
  assert.ok(token, 'Admin login')
  async function mutate(path: string, body: unknown, method = 'PATCH') {
    // PGlite serializes connections: skip Payload's editor-lock query outside
    // the write transaction. This option still requires authenticated access.
    const res = await fetch(base + path + '?overrideLock=true', { method, headers: { 'Content-Type': 'application/json', Authorization: 'JWT ' + token }, body: JSON.stringify(body) })
    assert.ok(res.ok, 'CMS mutation: ' + path + ' ' + res.status + ' ' + await res.text())
  }
  await mutate('/api/posts/' + post.id, { title: 'Updated cached fixture', _status: 'published' })
  assert.ok((await html('/blog/static-fixture')).text.includes('Updated cached fixture'), 'Article updated without rebuild')
  assert.ok((await html('/blog')).text.includes('Updated cached fixture'), 'Blog updated without rebuild')
  assert.equal((await html('/blog/new-fixture')).res.status, 404)
  await mutate('/api/posts', { ...data, slug: 'new-fixture', title: 'New published fixture', _status: 'published' }, 'POST')
  assert.equal((await html('/blog/new-fixture')).res.status, 200, 'New slug generated on demand after a cached 404')
  assert.ok((await html('/sitemap.xml')).text.includes('/blog/new-fixture'), 'New slug in sitemap')
  await mutate('/api/posts/' + post.id, { slug: 'renamed-fixture', _status: 'published' })
  assert.equal((await html('/blog/static-fixture')).res.status, 404, 'Old slug removed')
  assert.equal((await html('/blog/renamed-fixture')).res.status, 200, 'Renamed slug generated')
  await mutate('/api/posts/' + post.id, { _status: 'draft' })
  assert.equal((await html('/blog/renamed-fixture')).res.status, 404, 'Unpublished article removed')
  assert.ok(!(await html('/sitemap.xml')).text.includes('/blog/renamed-fixture'), 'Unpublished article removed from sitemap')
  await mutate('/api/globals/site-settings', { phone: '+39 02 12345678' }, 'POST')
  assert.ok((await html('/')).text.includes('+39 02 12345678'), 'Settings invalidate home')
  assert.ok((await html('/contatti')).text.includes('+39 02 12345678'), 'Settings invalidate contacts')
  assert.ok((await html('/')).text.includes('\"telephone\":\"+39 02 12345678\"'), 'Structured data uses the updated CMS phone too')
  assert.equal((await html('/blog/private-fixture')).res.status, 404)
  assert.equal((await html('/blog/future-fixture')).res.status, 404)
  assert.equal((await html('/admin/login')).res.headers.get('x-nextjs-cache'), null, 'Admin remains dynamic')
  console.log('PASS: public SSG/ISR cache hits; CMS edit, publish, cached 404, slug rename, unpublish, sitemap/settings invalidation; drafts/future private; admin dynamic.')
} finally {
  await writeFile('/tmp/urbancare-static-rendering-test.log', logs)
  if (app) {
    app.kill('SIGTERM')
    await new Promise(resolve => app!.once('exit', resolve))
  }
  payload.db.pool.on('error', () => {})
  await payload.destroy()
  await socket.stop()
}
process.exit(0)
