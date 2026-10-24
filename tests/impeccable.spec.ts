import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/contatti')
  const reject = page.getByRole('button', { name: 'Rifiuta', exact: true })
  await reject.click()
})

test('contact tabs expose selection and keep the quote preview within its task', async ({ page }) => {
  await page.goto('/contatti')
  const info = page.getByRole('tab', { name: 'Informazioni' })
  const quote = page.getByRole('tab', { name: 'Preventivo' })
  await expect(info).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('#preview')).toBeHidden()
  await info.press('ArrowRight')
  await expect(quote).toBeFocused()
  await expect(quote).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('#preview')).toBeVisible()
  await expect(page.getByLabel('Numero di unità abitative', { exact: true })).toHaveValue('')
  await expect(page.getByLabel('Numero di box / posti auto', { exact: true })).toHaveValue('')
  await expect(page.locator('#f-quote input[type=radio]:checked')).toHaveCount(0)
  await expect(page.locator('#pvProg')).toContainText('di 8 campi obbligatori')
  await expect(page.getByRole('group', { name: 'Ascensore *', exact: true })).toBeVisible()
  await quote.press('Home')
  await expect(info).toBeFocused()
  await expect(page.locator('#preview')).toBeHidden()
})

test('invalid contact form announces the error and focuses its first invalid field', async ({ page }) => {
  let requests = 0
  await page.route('**/api/contact', route => { requests++; return route.abort() })
  await page.goto('/contatti')
  await page.locator('#f-info [type=submit]').click()
  const name = page.locator('#f-info [name=Nome]')
  await expect(name).toBeFocused()
  await expect(name).toHaveAttribute('aria-invalid', 'true')
  await expect(name).toHaveAttribute('aria-describedby', /contact-error/)
  await expect(page.locator('#formStatus')).toContainText('non è stata inviata')
  await name.fill('Mario Rossi')
  await expect(name).toHaveAttribute('aria-invalid', 'false')
  expect(requests).toBe(0)
})

test('quote delivery disables both actions and moves focus to confirmed success', async ({ page }) => {
  let deliver: () => void = () => {}
  const pending = new Promise<void>(resolve => { deliver = resolve })
  let requests = 0
  await page.route('**/api/request-quote', async route => {
    requests++
    await pending
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' })
  })
  await page.goto('/contatti#preventivo')
  const form = page.locator('#f-quote')
  await form.locator('[name="Nome e cognome"]').fill('Mario Rossi')
  await form.locator('[name=Email]').fill('mario@example.com')
  await form.locator('[name=Telefono]').fill('3331234567')
  await form.locator('#qComune').fill('Arese')
  await form.locator('label:has(input[name=Ascensore][value=No])').click()
  await form.locator('label:has(input[name="Riscaldamento centralizzato"][value=No])').click()
  await form.locator('label:has(input[name="Situazione attuale"][value="Prima nomina"])').click()
  await form.locator('[name=privacy]').check()
  await form.locator('[type=submit]').click()
  await expect(form).toHaveAttribute('aria-busy', 'true')
  await expect(page.locator('#pvSend')).toBeDisabled()
  await expect(page.locator('#formStatus')).toContainText('in corso')
  deliver()
  await expect(page.locator('#done')).toBeFocused()
  await expect(page.locator('#preview')).toBeHidden()
  expect(requests).toBe(1)
})

test('contact controls meet the touch target floor without horizontal overflow', async ({ page }) => {
  await page.goto('/contatti#preventivo')
  const dimensions = await page.locator('.c-card .mini,.tabs button,.stepper button').evaluateAll(elements =>
    elements.map(element => { const rect = element.getBoundingClientRect(); return { width: rect.width, height: rect.height } }))
  expect(dimensions.length).toBeGreaterThan(0)
  for (const size of dimensions) {
    expect(size.width).toBeGreaterThanOrEqual(44)
    expect(size.height).toBeGreaterThanOrEqual(44)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
