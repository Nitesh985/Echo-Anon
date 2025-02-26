import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';
import {env} from '@/data/env/server'

export const authOptions = {
  providers: [
      GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET
      }),
      GithubProvider({
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET
      })
    ],
    callbacks:{
      async signIn()
    }    
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }