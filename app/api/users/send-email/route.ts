import { env } from "@/data/env/server";
import { generateOTP } from "@/helpers/generateOTP";
import { sendEmail } from "@/helpers/Resend";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { User } from "@/model/user.model";

export async function POST(req: NextRequest) {
  const reqFields = ["email", "username"];
  
  const body = await req.json()
 
  const { username, email } = body;

  const userExists = await User.findOne({
        $or: [{ email }, { username }]
      });
      
      if (userExists){
        return NextResponse.json({ error: "The user by that name or email already exists" }, { status: 401 });
      }

  for (const field of reqFields) {
      if (!body[field]) {
          return NextResponse.json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} is a required field` }, { status: 400 });
        }
    }
    
    const otp = generateOTP()
    const emailSent = await sendEmail(email, username, otp)
  
    if (!emailSent) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }


  const otpToken = jwt.sign({otp}, env.OTP_TOKEN_SECRET, {expiresIn:env.OTP_TOKEN_EXPIRY})

  if (!otpToken){
    return NextResponse.json({ error: "Failed to generate OTP token" }, { status: 500 });
  }

  
  const res = new NextResponse(null, {status:200})
  res.cookies.set("otpToken", otpToken)
  return res

}
