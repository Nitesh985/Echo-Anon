import { env } from "@/data/env/server";
import { generateOTP } from "@/helpers/generateOTP";
import { sendEmail } from "@/helpers/Resend";
import { User } from "@/model/user.model";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import {connectToDB} from "@/lib/connectToDB";


export async function POST(req: NextRequest) {
  const reqFields = ["email", "username", "password"];

  const body = await req.json()
  console.log(body)

  const { username, password, email} = body;

  console.log(username)
  console.log(body)

  for (const field of reqFields) {
      if (!body[field]) {
          return NextResponse.json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} is a required field` }, { status: 400 });
        }
    }

  const userExists = await User.find({
    $or:[{username}, {email}]
  })

  if (userExists){
    return NextResponse.json({error:"The user by that email or username already exists"}, {status:401})
  }

  const user = await User.create({
    email,
    password,
    username
  });

  const userData = await User.findById(user._id).select("-password")

  if (!userData) {
    return NextResponse.json({ error: "Error submitting the data to the database" }, { status: 500 });
  }

  
  const res = new NextResponse(userData, {status:200})
  return res

}
