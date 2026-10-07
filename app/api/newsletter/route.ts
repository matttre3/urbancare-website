import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ error: 'Le iscrizioni alla circolare non sono attive.' }, { status: 410 })
}
