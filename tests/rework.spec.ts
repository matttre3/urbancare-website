import { test, expect } from '@playwright/test'
const paths=['/','/servizi','/servizi/amministrazione-condominiale','/servizi/consulenza-condominiale','/servizi/condominio-online','/servizi/gestione-contabile','/lo-studio','/contatti','/blog','/blog/millesimi','/blog/portale','/privacy-policy']
for(const path of paths) test(`renders ${path} without runtime errors`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message))
  const response=await page.goto(path)
  expect(response?.status()).toBe(200)
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('.theme-toggle')).toBeVisible()
  await page.waitForTimeout(path==='/'?3200:1800)
  expect(errors).toEqual([])
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true)
  await expect(page.locator('iframe')).toHaveCount(0)
})
test('theme persists across document navigation',async({page})=>{
  await page.goto('/');await page.locator('.theme-toggle').click()
  const theme=await page.locator('html').getAttribute('data-theme')
  await page.goto('/lo-studio');await expect(page.locator('html')).toHaveAttribute('data-theme',theme!)
})
test('mobile menu opens and closes with Escape',async({page,isMobile})=>{
  test.skip(!isMobile)
  await page.goto('/');await page.locator('.burger').click()
  await expect(page.locator('.burger')).toHaveAttribute('aria-expanded','true')
  await expect(page.locator('.nav-links>a[href="/blog"]')).toBeVisible()
  await page.keyboard.press('Escape');await expect(page.locator('.burger')).toHaveAttribute('aria-expanded','false')
})
test('blog search, category filter and distinct article links',async({page})=>{
  await page.goto('/blog');await expect(page.locator('.post-card')).toHaveCount(8)
  await page.locator('#q').fill('rendiconto');await expect(page.locator('.post-card:visible')).toHaveCount(1)
  await page.locator('#q').fill('no matching content');await expect(page.locator('.post-card:visible')).toHaveCount(0)
  await page.locator('#q').fill('');await page.locator('.filter[data-cat="digitale"]').click()
  await expect(page.locator('.post-card:visible')).toHaveCount(1)
  await page.locator('.post-card:visible').click();await expect(page).toHaveURL(/\/blog\/portale$/)
  await expect(page.locator('h1')).toContainText('Il portale online')
})
test('article calculator computes quotas',async({page})=>{
  await page.goto('/blog/millesimi');await page.locator('#cSpesa').fill('20000');await page.locator('#cMil').fill('100')
  await expect(page.locator('#cOut')).toContainText(/2[.,]?000/)
  await expect(page.locator('#liftList li')).toHaveCount(7)
})
test('quote tab and illustration respond to form fields',async({page})=>{
  await page.goto('/contatti#preventivo');await expect(page.locator('#f-quote')).toHaveClass(/\bon\b/)
  await page.locator('#qUnits').fill('40');await page.locator('#qUnits').dispatchEvent('input')
  await expect(page.locator('#pvUnits')).toHaveText('40')
  await expect(page.locator('#pvSvg rect').first()).toBeAttached()
})
test('form only shows success after confirmed delivery',async({page})=>{
  await page.goto('/contatti')
  await page.locator('#f-info [name="Nome"]').fill('Mario Rossi')
  await page.locator('#f-info [name="Email"]').fill('mario@example.com')
  await page.locator('#f-info [name="Messaggio"]').fill('Richiesta di informazioni')
  await page.locator('#f-info [name="privacy"]').check()
  await page.route('**/api/contact',r=>r.fulfill({status:502,contentType:'application/json',body:JSON.stringify({error:'Invio non riuscito'})}))
  await page.locator('#f-info [type="submit"]').click();await expect(page.locator('#formStatus')).toContainText('Invio non riuscito')
  await expect(page.locator('#done')).not.toHaveClass(/\bon\b/)
  await page.unroute('**/api/contact');await page.route('**/api/contact',r=>r.fulfill({status:200,contentType:'application/json',body:'{"success":true}'}))
  await page.locator('#f-info [type="submit"]').click();await expect(page.locator('#done')).toHaveClass(/\bon\b/)
})
test('API rejects missing and stringified consent',async({request})=>{
  for(const privacyAccepted of [false,'false','true']){
    const r=await request.post('/api/contact',{data:{fullName:'Mario Rossi',email:'mario@example.com',message:'Test',privacyAccepted}})
    expect(r.status()).toBe(400)
  }
  const newsletter=await request.post('/api/newsletter',{data:{email:'mario@example.com',privacyAccepted:false}})
  expect(newsletter.status()).toBe(410)
})
test('legacy quote URL redirects',async({page})=>{await page.goto('/preventivo');await expect(page).toHaveURL(/\/contatti#preventivo$/)})

test('missing article gets a branded 404',async({page})=>{
  const r=await page.goto('/blog/article-that-does-not-exist')
  expect(r?.status()).toBe(404)
  await expect(page.locator('h1')).toContainText('non è nel cortile')
})
test('social preview image is available',async({request})=>{
  const r=await request.get('/opengraph-image')
  expect(r.status()).toBe(200)
  expect(r.headers()['content-type']).toContain('image/png')
})
