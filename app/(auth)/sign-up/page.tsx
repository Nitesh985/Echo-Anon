import React from 'react'
import SignUpForm from '@/components/auth/sign-up-form'


function SignUpPage() {
  return (
    <>
        <div className='flex flex-col justify-center items-center' >
            <h1 className="text-center font-bold border border-b-black p-2 px-10" >Sign Up</h1>   
            <div className="flex justify-center items-center w-1/2 border py-5" >
                <SignUpForm />
            </div>
        </div>
    </>
  )
}

export default SignUpPage