import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (session) {
    res.status(200).json({ content: 'This is protected content.' })
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
