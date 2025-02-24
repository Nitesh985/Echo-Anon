import type {NextRequest} from 'next/server'
import { NextResponse } from "next/server";
import { getUserFromToken } from "../../messages/route";
import {User} from '@/model/user.model'


export async function GET(req:NextRequest){
    try{
        const user = await getUserFromToken(req)
        return NextResponse.json(user, {status:200})}
    catch(error){
        return NextResponse.json(error, {status:500})
    }
}

export async function PUT(req:NextRequest){
    const user = await getUserFromToken(req)
    const body = await req.json()

    const findUser = await User.findByIdAndUpdate(user._id, {...body}, {
        new:true
    }).select("-password")

    if (!findUser){
        return NextResponse.json({error:"User not found"}, {status:404})
    }

    return NextResponse.json(findUser, {status:200})
}