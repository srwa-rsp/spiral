
import { register, login, logout } from '../../../authController';

export default async function handler(req, res) {
  const { action } = req.query;

  switch (action) {
    case 'register':
      if (req.method === 'POST') {
        await register(req, res);
      } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
      break;

    case 'login':
      if (req.method === 'POST') {
        await login(req, res);
      } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
      break;

    case 'logout':
      if (req.method === 'POST') {
        logout(req, res);
      } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
      break;

    default:
      res.status(404).json({ message: 'Invalid action' });
      break;
  }
}
