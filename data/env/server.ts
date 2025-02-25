import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"


export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string().min(1),
    ACCESS_TOKEN_SECRET: z.string().min(1),
    REFRESH_TOKEN_SECRET: z.string().min(1),
    ACCESS_TOKEN_EXPIRY: z.string().min(1),
    REFRESH_TOKEN_EXPIRY: z.string().min(1),
    MONGODB_URI: z.string().min(1).url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    OTP_TOKEN_SECRET: z.string().min(1),
    OTP_TOKEN_EXPIRY: z.string().min(1)

  },
  experimental__runtimeEnv: process.env,
})