import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { User } from '@/model/user.model'
import { Feedback } from '@/model/feedback.model'
import { getFakeName } from "@/helpers/faker";


export async function POST(req:NextRequest){
    const body = await req.json()
    const { content, username } = body;
    
    if (content.length<3 ||  content.length>160){
        return NextResponse.json({message:"The content can have length of 3 upto 160 letters"}, {status:400})
    }

    const findUser = await User.findOne({
        username
    })
    
    if (!findUser){
        return NextResponse.json({message:"The user by that username doesn't exists"}, {status:400})
    }

    if (!findUser.acceptMessage){
        return NextResponse.json({message:"The user by that username doesn't exists"}, {status:400})
    }



    const feedback = Feedback.create({
        content,
        userId: findUser._id,
        fakeUsername: getFakeName()
    })


    return NextResponse.json(feedback, {status: 200})
}