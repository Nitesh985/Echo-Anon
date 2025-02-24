import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { User } from "@/model/user.model";
import jwt from 'jsonwebtoken'
import {env} from '@/data/env/server'
import { Feedback } from "@/model/feedback.model";


export const getUserFromToken = async (req:NextRequest)=>{
    const accessToken = req.cookies.get("accessToken")?.value
       if (!accessToken){
        return NextResponse.json({error:"No token was found"}, {status:403})
      }
    
    
          const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET)
      
          if (!decoded){
              return NextResponse.json({error:"Jwt Expired"}, {status:403})
          }
      
          const user = await User.findById(decoded._id).select("-password")
          
          if (!user){
            return NextResponse.json({error:"User not found"}, {status:404})
          }
          return user
}


export  async function GET(req: NextRequest) {
    try {
        const user = await getUserFromToken(req)
        const messages = await Feedback.find({userId:user?._id}) 
    
        return NextResponse.json(messages, {status:200})
    } catch (error) {
    return NextResponse.json(error, {status:500})
    }
}