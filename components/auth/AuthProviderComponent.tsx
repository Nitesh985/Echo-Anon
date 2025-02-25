import React, {useState} from 'react'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react';


export type SignStatusType = "Sign In" | "Sign Up"


function AllAuthProviders({signStatus, id, icon, name}:{signStatus:SignStatusType, id:string, icon:React.ReactElement, name:string}) {
  const [loading, setLoading] = useState(false)
    const handleSignIn = () => {
        setLoading(true)
        signIn(id)
        .finally(()=>setLoading(false))
      } 
    return (
    <Button
             key={id}
             className="bg-slate-100 text-slate-900 hover:bg-transparent hover:border hover:border-slate-100 hover:text-slate-100"
             onClick={handleSignIn}
             >
              <div>
                {icon}
              </div>
              {loading?"...Please Wait":<p>{signStatus} With {name}</p>}
            </Button>
  )
}

export default AllAuthProviders