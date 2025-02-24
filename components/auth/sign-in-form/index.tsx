"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/LoadingButton";
import AuthProviderComponent from "@/components/auth/AllAuthProviders";

const FormSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
});

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      email:""
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    if (regexExp.test(data.username)){
      data.email = data.username
      data.username = ""
    } else {
      data.email = ""
    }
    
    axios
      .post("/api/users/sign-in", data)
      .then(() => {

        data.password = "********"
        toast("You submitted the following values:", {
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
        router.push("/dashboard");
      })
      .finally(() => setLoading(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username/Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username/email"
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
        {loading ? (
          <LoadingButton />
        ) : (
          <Button
            variant="outline"
            className="hover:bg-slate-100 hover:text-black"
            type="submit"
          >
            Submit
          </Button>
        )}
        <p className="text-sm" >
          Not registered yet?&nbsp;
          <Link
            href="sign-up"
            className="hover:text-orange-400 transition-colors duration-300"
          >
            Sign Up
          </Link>
        </p>
        <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <AuthProviderComponent signStatus="Sign In" />
      </form>
    </Form>
  );
}
