import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]/route"
import type {NextRequest} from 'next/server'
import { NextResponse } from "next/server"


const restricted =  async (req:NextRequest) => {
  
  const session = await getServerSession(authOptions)
    console.log(session)

  if (session) {
    return NextResponse.json({
      content:
        "This is protected content. You can access this content because you are signed in.",
    }, {status:200})
  } else {
    return NextResponse.json({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}

export default restricted