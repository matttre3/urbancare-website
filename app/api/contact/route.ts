import { NextResponse } from 'next/server'
import { z } from 'zod'
import { readForm, sendRequest } from '@/lib/forms'

const schema = z.object({ fullName: z.string().trim().min(2).max(150), email: z.string().email().max(254), phone: z.string().max(40).optional(), message: z.string().trim().min(1).max(10000), privacyAccepted: z.literal(true) })
export async function POST(req: Request) {
  try {
    const body = await readForm(req)
    if (body.website) return NextResponse.json({ success: true })
    const data = schema.parse(body)
    return await sendRequest('Richiesta informazioni dal sito', data.email, { Nome: data.fullName, Email: data.email, Telefono: data.phone, Messaggio: data.message, Consenso: 'Privacy accettata' })
  } catch { return NextResponse.json({ error: 'Controlla i dati e il consenso privacy.' }, { status: 400 }) }
}
