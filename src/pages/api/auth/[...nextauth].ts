import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "../../../../lib/db";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await db("users")
          .where("email", credentials?.email)
          .first();

        if (
          user &&
          (await bcrypt.compare(credentials?.password, user.password))
        ) {
          return { id: user.id, email: user.email };
        } else {
          throw new Error("Invalid credentials");
        }
      },
      credentials: {
        username: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
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
      session.id = token.id;
      session.token = token; 
      return session;
    },
  },
});
