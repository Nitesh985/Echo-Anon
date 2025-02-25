"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AllAuthProviders from "../AllAuthProviders";
import Counter from '@/components/Counter'


const FormSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must be between 2 and 30 characters.",
      })
      .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim, {
        message:
          "The username cannot start with a period nor end with a period nor more than one period sequentially.",
      }),
    email: z
      .string()
      .email({
        message: "Please enter a valid email address.",
      })
      .regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
      ),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
          message:
              "The password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
        message:
          "The password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [page, setPage] = useState(2)
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [counter, setCounter] = useState(120);


    async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (page===1){
        setPage(2)
        return
      }
      if (page===1){
      setIsLoading(true);
      const emailSendRes = await axios.post("/api/users/send-email")
      if (emailSendRes.status === 200) {
        toast.success("Email sent successfully!", {
          description:<div>
            <h1>Hello {data.username}</h1>
            <p>Please check your email for a verification code.</p>
          </div>
        })
        setPage(2)
        return
      } else {
        toast.error("Failed to send email. Please try again.")
        return
      }}

      const response = await axios.post("/api/users/sign-up", data);

      if (response.status === 200) {
        const res = await axios.post("/api/users/sign-in", data);

        if (res.status === 200) {
          data["password"] = "********";
          data["confirmPassword"] = "********";
          toast("User is registered successfully!:", {
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(data, null, 2)}
                </code>
              </pre>
            ),
          });
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }




  switch(page){
  case 1: return (
      <div className='flex flex-col justify-center items-center' >
          <h1 className="text-center font-bold border border-b-black p-2 px-10" >Sign Up</h1>
          <div className="flex justify-center items-center w-1/2 border py-5" >
                <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    className="placeholder-opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Please enter your email"
                    className="placeholder-opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="placeholder-opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="placeholder-opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button
              type="submit"
              variant="outline"
              className="hover:bg-slate-100 hover:text-black"
            >
              Submit
            </Button>
          )}
          <p className="text-sm" >
            Already a user?&nbsp;
            <Link
              href="sign-in"
              className="hover:text-orange-400 transition-colors duration-300"
            >
              Sign In
            </Link>

          </p>
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <AllAuthProviders />
        </form>
      </Form>
    </>
          </div>
      </div>
  )
  break;

  case 2: return(
    <>
      <div className="flex justify-center items-center h-screen flex-col gap-3" >
      <h1 className="text-3xl font-bold text-center mt-5" >Submit your OTP Code here!</h1>
      <InputOTP
          value={otpCode}
          onChange={value=> setOtpCode(value)}
          maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
          {counter!==0?<Counter counter={counter} setCounter={setCounter}/>:<div className="text-red-600 font-bold text-sm" >TimeOut</div>}
          <div className="text-center text-sm">
              {otpCode === "" ? (
                  <>Enter your one-time password.</>
              ) : (
                  <>You entered: {otpCode}</>
              )}
          </div>
          <button className="hover:underline text-sm hover:text-purple-400 transition-colors duration-300 ease-in" >Resend Code?
          </button>
      <Button variant="outline" className="rounded-xl hover:text-slate-900 hover:bg-slate-100" onClick={() =>{}}>Submit</Button>
    </div>
    </>
  )
}
}
