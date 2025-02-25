"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import capitalizeWord from "@/utils/capitalizeWord";
import LoadingButton from "@/components/LoadingButton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios'


const FormSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: "The message must be at least 10 characters.",
    })
    .max(180, {
      message: "The message must not be longer than 180 characters.",
    }),
});


export default function MessageForm({message}:{message:string}) {
  const {username} = useParams()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: message || "",
    },
  });
  const [loading, setLoading] = useState(false)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    axios.post("/api/messages/send", {...data, username})
    .then((res)=>{
      if (res.status===200){toast.success("Message sent successfully!")
      form.setValue("content", "")}
    })
    .catch(error=> {
      if (error && error.response && error.response?.data && error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      console.log(error)
    })
    .finally(()=>setLoading(false))
    
  }
  useEffect(()=>{
    form.setValue("content", message)
  },[message])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Send Anonymous Message to @{capitalizeWord(username)}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your anonymous message here..."
                  className="rounded-xl placeholder-opacity-50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          {loading ? (
            <LoadingButton variant="outline" className="rounded-xl" />
          ) : (
            <Button type="submit" variant="outline" className="rounded-xl hover:bg-slate-100 hover:text-black">
              Send It
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
