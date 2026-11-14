import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import prisma from './lib/db';
import { compareSync } from 'bcrypt-ts';
 
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

        // check user if exist
        if (!user) return null;

        // check password if match
        const isPasswordValid = compareSync(password, user?.password as string);

        if(!isPasswordValid) return null;

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
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account}) {

      console.log('account: ', account);

      if(account?.provider !== 'google' || !user.email) {
        return true;
      }

      // update existing user with google account
      const existingUser = await prisma.user.upsert({
        where: { email: user.email },
        update: { name: user.name },
        create: {
          email: user.email,
          name: user.name,
          password: null
        }
      });

      // sync google account to the app by using the user id from the database
      user.id = existingUser.id;

      return true;

    },
    async jwt({user, token}) {  


      // add the user id to the token so it can be accessed in the session callback
      if(user?.id) {
        token.id = user.id; 
      }

      return token;
    },
    async session({ session, token}) {

      if (session.user && token.id) {
        session.user.id = token.id as string;
      }

      return session;
    }
  }
})