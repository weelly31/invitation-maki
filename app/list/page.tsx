import { getClient } from '@/lib/mongodb'

export const dynamic = 'force-dynamic'

type Row = { _id: string; name: string; acceptedAt: Date }

async function getResponses(): Promise<{ rows: Row[]; error?: string }> {
  try {
    const client = await getClient()
    const docs = await client
      .db('invitation')
      .collection('responses')
      .find({ response: 'yes' })
      .sort({ acceptedAt: -1 })
      .toArray()
    return {
      rows: docs.map((d) => ({
        _id: String(d._id),
        name: String(d.name),
        acceptedAt: new Date(d.acceptedAt),
      })),
    }
  } catch (err) {
    console.error('List load failed', err)
    return { rows: [], error: 'Could not load responses.' }
  }
}

export default async function ListPage() {
  const { rows, error } = await getResponses()
  const fmt = new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  })

  return (
    <main className="min-h-screen bg-[#182824] px-4 py-12 text-[#fffaf3]">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-[#e2c48f] bg-gradient-to-b from-[#fffdf9] to-[#f6f1e9] p-8 text-[#263936] shadow-2xl">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-[#ad7658]">Baby Maki’s Guest Book</p>
        <h1 className="mt-2 text-center font-serif text-3xl">Who Said Yes 🤍</h1>
        <p className="mt-1 text-center text-sm text-[#65716c]">
          {rows.length} {rows.length === 1 ? 'person' : 'people'} so far
        </p>

        {error && <p className="mt-6 text-center text-[#ad7658]">{error}</p>}
        {!error && rows.length === 0 && (
          <p className="mt-6 text-center text-[#65716c]">No responses yet.</p>
        )}

        <ul className="mt-6 divide-y divide-[#d8d8ca]">
          {rows.map((r) => (
            <li key={r._id} className="flex items-center justify-between gap-4 py-3">
              <span className="font-serif text-lg">{r.name}</span>
              <span className="text-xs text-[#65716c]">{fmt.format(r.acceptedAt)}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
