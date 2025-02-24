import { env } from "@/data/env/server";
import { User } from "@/model/user.model";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const reqFields = ["email", "username", "password"];
  
  const body = await req.json()
 
  const { username, password, email } = body;

   
  for (const field of reqFields) {
      if (!body[field]) {
          return NextResponse.json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} is a required field` }, { status: 400 });
        }
    }

  const userExists = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (userExists) {
    return NextResponse.json({ error: "The user by that name or email already exists" }, { status: 401 });
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


  return NextResponse.json(userData, {
    status:200})

}
