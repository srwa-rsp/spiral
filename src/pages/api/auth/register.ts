import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../../lib/db'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      await db('users').insert({ email, password: hashedPassword })
      res.status(201).json({ success: true })
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong.' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
