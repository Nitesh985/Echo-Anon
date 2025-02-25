import { env } from "@/data/env/server";
import { generateOTP } from "@/helpers/generateOTP";
import { sendEmail } from "@/helpers/Resend";
import { User } from "@/model/user.model";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'


export async function POST(req: NextRequest) {
  const token = req.cookies.get("otpToken")?.value
    if (!token){
    return NextResponse.json({error:"OTP Expired!!!"}, {status:403})
  }
      
    const decoded = jwt.verify(token, env.OTP_TOKEN_SECRET)

    if (!decoded){
        return NextResponse.json({error:"OTP Expired"}, {status:403})
    }

  const reqFields = ["email", "username", "password", "otpCode"];
  
  const body = await req.json()
 
  const { username, password, email, otpCode } = body;

  if (decoded.otp!==otpCode){
    return NextResponse.json({error:"Invalid OTP"}, {status:403})
  }

  
  for (const field of reqFields) {
      if (!body[field]) {
          return NextResponse.json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} is a required field` }, { status: 400 });
        }
    }

  const user = await User.create({
    email,
    password,
    username
  });

  const otpToken = jwt.sign({otp}, env.OTP_TOKEN_SECRET, {expiresIn:env.OTP_TOKEN_EXPIRY})

  if (!otpToken){
    return NextResponse.json({ error: "Failed to generate OTP token" }, { status: 500 });
  }

  const userData = await User.findById(user._id).select("-password")

  if (!userData) {
    return NextResponse.json({ error: "Error submitting the data to the database" }, { status: 500 });
  }

  
  const res = new NextResponse(userData, {status:200})
  res.cookies.set("otpToken", otpToken)
  return res

}
