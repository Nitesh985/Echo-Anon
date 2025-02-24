import {User} from '@/model/user.model'
import {NextResponse} from 'next/server'


export async function GET(){
    // const users = await User.find({})
    // for (const user of users){
    //     await User.findByIdAndUpdate(user._Id, {
    //         username:user.username.toLowerCase()
    //     })
    // }
    return NextResponse.json({message:"Nice"}, {success:true})
}