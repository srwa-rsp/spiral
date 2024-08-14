import db from '../../../lib/db';  

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const questions = await db('test').select('*'); 
      
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
