import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password"}
      },
      async authorize({ email, password }) {
      

        // TODO: Look up the user from your database
        if (email !== "test@gmail.com") {
          return null;
        }

        // TODO: Compare hashed password
        if (password !== "12345") {
          return null;
        }

        return {
          id: "1",
          name: "Test User",
          email,
        };
      }
    }),
    Google
  ],
})