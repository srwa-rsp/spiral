
// import { register, login, logout } from '../../../../controllers/auth_controller';

// export default async function handler(req, res) {
//   const { action } = req.query;

//   switch (action) {
//     case 'register':
//       if (req.method === 'POST') {
//         await register(req, res);
//       } else {
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//       }
//       break;

//     case 'login':
//       if (req.method === 'POST') {
//         await login(req, res);
//       } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//       }
//       break;

//     case 'logout':
//       if (req.method === 'POST') {
//         logout(req, res);
//       } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//       }
//       break;

//     default:
//       res.status(404).json({ message: 'Invalid action' });
//       break;
//   }
// }
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import db from '../../../../lib/db';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await db('users').where('email', credentials?.email).first();

        if (user && await bcrypt.compare(credentials?.password, user.password)) {
          return { id: user.id, email: user.email };
        } else {
          throw new Error('Invalid credentials');
        }
      },
      credentials: undefined
    })
  ],
  pages: {
    signIn: '/auth/login', 
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, 
  },
  jwt: {
    secret: process.env.SECRET_KEY, 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    }
  },
});
