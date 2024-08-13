import db from '../../../lib/db';  

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const stages = await db('stages').select('*'); 
      
      res.status(200).json(stages);
    } catch (error) {
      console.error('Error fetching stages:', error);
      res.status(500).json({ error: 'Failed to fetch stages' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
