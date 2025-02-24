import {connectToDB} from '@/lib/connectToDB'

export async function register() {
    await connectToDB()
}