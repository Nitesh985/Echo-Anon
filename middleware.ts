import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import {env} from '@/data/env/server'
import { User } from "@/model/user.model";
import {connectToDB} from "@/lib/connectToDB"


export async function middleware(req: NextRequest) {
    
    console.log("Middleware running smoothly")
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/users/sign-out'],
}