import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import prisma from './prisma/db';
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password"}
      },
      // match the expected authorize signature: (credentials, req)
      async authorize(credentials, req) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email) return null;

        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) return null;

        // NextAuth's User id is expected to be a string
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      }
    }),
    Google
  ],
})