import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';
import {env as clientEnv} from '@/data/env/client'
import {env} from '@/data/env/server'
import axios from 'axios'

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
      async signIn({ user, account, profile, email, credentials }){
          const response = await axios.post(clientEnv.NEXT_PUBLIC_NEXTAUTH_URL + "/api/users/sign-in", {email, profile, user, account})
          if (response.status===200){
              return true
          }
          const res = await axios.post(clientEnv.NEXT_PUBLIC_NEXTAUTH_URL + "/api/users/sign-up", credentials)

          if (res.status===200){
              return true
          }
          return false
      }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }