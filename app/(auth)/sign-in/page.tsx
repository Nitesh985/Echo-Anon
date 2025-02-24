import React from "react";
import SignInForm from "@/components/auth/sign-in-form";

function SignInPage() {
  return (
    <>
      <div className="flex flex-col justify-center h-screen items-center">
        <h1 className="text-center font-bold border border-b-black p-2 px-10">
          Sign In
        </h1>
        <div className="flex justify-center items-center w-1/2 border p-5 py-10">
          <SignInForm />
        </div>
      </div>
    </>
  );
}

export default SignInPage;
