"use server"

import axios from "axios";
import {NextResponse} from "next/server";
import {env} from '@/data/env/server'

const getMessageFromData = (data:any) => {
    const formattedData1 = data.replaceAll(/}/gi, '}, ')
    const formattedData2 = JSON.parse("[" + formattedData1.slice(0, formattedData1.length-3) + "]")
    let accString = ""
    for (const data of formattedData2){
        accString += data.response
    }
    return accString
}



export default async function generateMessages(){
    const messages = []
    for (let i = 0; i < 3; i++) {
        const response = await axios.post(`${env.OLLAMA_URL}/api/generate`, {
            "model":"tinyllama",
            "prompt":"In english language, Creates a concise question in 50 letters. The question is for a user and it can be about anything, his/her lifestyle, profession, etc.",
        });

        if (response.status!==200){
            return NextResponse.json({error:"Something went wrong generating the message"}, {status:200})
        }

        const message:string = getMessageFromData(response.data)
        messages.push(message.slice(0, 180))
    }
    return messages
}