// api/subscribe.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { MongoClient, ServerApiVersion } from 'mongodb'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  const { email } = req.body as { email?: string }
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid email' })
  }

  // build your connection string from env vars
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}` +
    `@cluster0.ewizuey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  })

  try {
    await client.connect()
    const db = client.db('email_waitlist')
    const coll = db.collection('emails')
    await coll.insertOne({ email, subscribedAt: new Date() })
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('DB error:', err)
    return res.status(500).json({ error: 'Database error' })
  } finally {
    await client.close()
  }
}
