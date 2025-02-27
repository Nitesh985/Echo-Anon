import { User } from "@/model/user.model";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import {connectToDB} from "@/lib/connectToDB";


export async function POST(req: NextRequest) {
  const body = await req.json();

  await connectToDB()
  console.log(body)
  const { username, password, email } = body;
  
  if ((!username && !email)){
       return NextResponse.json({error: "Username or email must be given"}, {status:401})
  }
  
  if (!password){
   return NextResponse.json({error:"Password field is a required field"}, {status:401})
  }

  try{

  const user = await User.findOne({
    $or: [{ email }, { username }]
  });
  
  if (!user) {
    return NextResponse.json({ error: "The user by that email or username was not found!" }, { status: 404 });
  }

  const isPasswordCorrect = await user.verifyPassword(password)
  
  if (!isPasswordCorrect){
    return NextResponse.json({error:"The password provided is wrong"}, {status:401})
  }
  
  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()
  
  const findUser = await User.findById(user._id).select("-password")

  const options = {
    httpOnly:true,
    secure:true
  }


  const res = new NextResponse(findUser, {status:200})
  res.cookies.set("accessToken", accessToken, options)
  res.cookies.set("authToken", refreshToken, options)
  return res
  } catch(error){
    return NextResponse.json(error, {status:500})
  }

}
