import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"


export const env = createEnv({
  client: {
    NEXT_PUBLIC_NEXTAUTH_URL: z.string().min(1).url(),
    NEXT_PUBLIC_NEXTAUTH_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
})