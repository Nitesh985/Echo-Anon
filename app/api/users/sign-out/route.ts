import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { User } from "@/model/user.model";
import jwt from 'jsonwebtoken'
import {env} from '@/data/env/server'
import {connectToDB} from "@/lib/connectToDB"
import { getUserFromToken } from "../../messages/route";



export async function DELETE(req: NextRequest) { 
       await getUserFromToken(req)
      
  
      const sendMessage = {
        message:"The user logged out successfully!"
      }

  const res = NextResponse.json(sendMessage, {status:200})
  res.cookies.delete("accessToken")
  res.cookies.delete("refreshToken")
  return res

}
