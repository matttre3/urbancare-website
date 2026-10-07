import { NextResponse } from 'next/server'
import { preventivoSchema } from '@/lib/preventivoSchema'
import { readForm, sendRequest } from '@/lib/forms'

export async function POST(req: Request) {
  try {
    const body = await readForm(req)
    if (body.website) return NextResponse.json({ success: true })
    const data = preventivoSchema.parse(body)
    return await sendRequest('Nuova richiesta preventivo', data.email, {
      Nome: data.fullName, Email: data.email, Telefono: data.phone, Zona: data.area,
      Unità: data.units, Box: data.parking, Ascensore: data.elevator ? 'Sì' : 'No',
      Riscaldamento: data.centralHeating ? 'Sì' : 'No', Situazione: data.situation,
      Messaggio: data.message, Consenso: 'Privacy accettata',
    })
  } catch { return NextResponse.json({ error: 'Controlla i dati e il consenso privacy.' }, { status: 400 }) }
}
