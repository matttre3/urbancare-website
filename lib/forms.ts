import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { escapeHTML } from './design/render'
import { siteConfig } from './site'

export async function readForm(req: Request) {
  const origin = req.headers.get('origin')
  if (origin && origin !== new URL(req.url).origin) throw new Error('Origin non consentita')
  const text = await req.text()
  if (text.length > 20000) throw new Error('Richiesta troppo grande')
  return JSON.parse(text) as Record<string, unknown>
}
export async function sendRequest(subject: string, replyTo: string, fields: Record<string, unknown>) {
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: 'Servizio email non configurato. Contattaci per telefono o email.' }, { status: 503 })
  try {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const result = await resend.emails.send({
    from: process.env.RESEND_FROM || 'UrbanCare <preventivi@urbancare-amministrazioni.com>',
    to: [process.env.QUOTE_REQUEST_TO || siteConfig.email], replyTo, subject,
    html: `<h2>${escapeHTML(subject)}</h2>` + Object.entries(fields).map(([name,value]) => `<p><strong>${escapeHTML(name)}:</strong> ${escapeHTML(value).replaceAll('\n','<br>')}</p>`).join(''),
  })
  if (result.error) {
    console.error('Email provider rejected request:', result.error.name)
    return NextResponse.json({ error: 'Invio non riuscito. Riprova o contattaci per email.' }, { status: 502 })
  }
  return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email delivery failed:', error instanceof Error ? error.name : 'unknown')
    return NextResponse.json({ error: 'Invio non riuscito. Riprova o contattaci per email.' }, { status: 502 })
  }
}
