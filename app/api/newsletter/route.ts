import { NextResponse } from 'next/server'
import { z } from 'zod'
import { cms } from '@/lib/cms'
import { readForm } from '@/lib/forms'

const schema = z.object({ email: z.string().email().max(254).transform(v => v.toLowerCase()), privacyAccepted: z.literal(true) })
export async function POST(req: Request) {
  let data: z.infer<typeof schema>
  try {
    const body = await readForm(req)
    if (body.website) return NextResponse.json({ success: true })
    data = schema.parse(body)
  } catch { return NextResponse.json({ error: 'Inserisci una email valida e accetta il consenso.' }, { status: 400 }) }
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: 'La circolare non è ancora attiva.' }, { status: 503 })
  try {
    const payload = await cms()
    const existing = await payload.find({ collection: 'subscribers', where: { email: { equals: data.email } }, limit: 1 })
    if (!existing.totalDocs) await payload.create({ collection: 'subscribers', data: { email: data.email, consentedAt: new Date().toISOString(), consentVersion: 'privacy-policy-2026-10' } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter storage failed', error instanceof Error ? error.name : 'unknown')
    return NextResponse.json({ error: 'Iscrizione non riuscita. Riprova tra poco.' }, { status: 503 })
  }
}
