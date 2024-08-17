import db from '../../../lib/db';  
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });

  if (req.method === 'GET') {
    if(token){
    try {
      const questions = await db('test').select('*'); 
      
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ error: 'Failed to fetch questions' });
    }}else {
      res.status(401).json({ message: "Unauthorized access - please log in." });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
