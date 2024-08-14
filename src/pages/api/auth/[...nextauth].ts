
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
