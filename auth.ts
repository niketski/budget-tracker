import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password"}
      },
      async authorize({ email, password }) {
        
        if(email === 'test@gmail.com' && password === '12345') {

          console.log({
            email
          });

          return {
            message: 'Login successful',
            email
          }
        }

        return null;
      }
    })
  ],
})