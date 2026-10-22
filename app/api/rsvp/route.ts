import { NextResponse } from 'next/server'
import { getClient } from '@/lib/mongodb'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  let body: { name?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  if (!name || name.length > 100) {
    return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 })
  }

  try {
    const client = await getClient()
    await client.db('invitation').collection('responses').insertOne({
      name,
      response: 'yes',
      acceptedAt: new Date(),
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('RSVP save failed', err)
    return NextResponse.json({ error: 'Could not save your response. Please try again.' }, { status: 500 })
  }
}
