"use client"
import React, {useState} from 'react'
import { Button } from '@/components/ui/button'
import LoadingButton from '../LoadingButton'
import Link from 'next/link'
import { FcFeedback } from "react-icons/fc";
import capitalizeWord from '@/utils/capitalizeWord';
import { useSession, signIn, signOut } from 'next-auth/react';


function Header() {
  const {data:session} = useSession()
  const [loading, setLoading] = useState(false)

  const handleLogIn = async () => {
    setLoading(true)
    await signIn()
    setLoading(false)
  }

  const handleLogOut = async () => {
    setLoading(true)
    await signOut()
    setLoading(false)
  }



  return (
    <header className="flex justify-between px-10 py-8 items-center bg-slate-800" >
        <h1 className="text-3xl font-bold flex items-center gap-2" >
        <FcFeedback />
        <span>Echo Anon</span>
        </h1>
        {session && session?.user?.name && (
          <h3 className="flex items-center gap-2 text-lg" >Welcome {capitalizeWord(session?.user?.name)}</h3>)}
      <nav>
        {/* <Button asChild variant="outline" className="rounded-xl bg-white hover:bg-transparent hover:text-white text-black mr-1" >
            {session?<Button >Logout</Button>:<Link href="/login" >Login</Link>}
        </Button> */}
        {loading?<LoadingButton />:<Button variant="outline" className="rounded-xl bg-white hover:bg-transparent hover:text-white text-black mr-1" onClick={()=>session?handleLogOut():handleLogIn()} >
            {session?"Logout":"Login"}
        </Button>}
      </nav>
    </header>
  )
}

export default Header