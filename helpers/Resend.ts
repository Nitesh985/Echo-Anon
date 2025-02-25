import {env} from '@/data/env/server'

import { Resend } from 'resend';
const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async (email:string, username:string, otp:number) => {
  const { data } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: "Echo Anon Sign Up",
    html: `<div>
    <strong>Thank you ${username} for signing up on our website, we're excited to have you</strong>
    <p>Here is your OTP Code: ${otp}</p>
    </div>`})
    
  return data

}

