"use client";
import { useParams } from "next/navigation";
import MessageForm from "@/components/u/message-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import capitalizeWord from "@/utils/capitalizeWord";
import Link from "next/link";

const messages = [
  "What's your favorite movie?",
  "Do you have any favorite sports?",
  "Which book do you like to read most of the time",
];

export default function UserPage() {
  const [content, setContent] = useState("");


  return (
    <main>
      <section className="px-6 py-3">
        <h2 className="mt-2 text-center text-2xl font-bold text-slate-100">
          Public Profile Link
        </h2>
        <div className="mt-3">
          <MessageForm message={content} />
        </div>
        <Button variant="outline" className="mt-7 hover:bg-slate-100 hover:text-black">
          Suggest Messages
        </Button>
        <p className="mt-5">Click on any message below to select it</p>
        <h4 className="text-lg font-semibold">Messages</h4>
        <div className="flex flex-col gap-4 py-5">
          {messages.map((message, index) => (
            <Button
              variant="outline"
              key={index}
              className="py-6 z-40 hover:bg-slate-800"
              onClick={() => {
                setContent(message);
              }}
            >
              {capitalizeWord(message)}
            </Button>
          ))}
        </div>
      </section>
      <div className="border-t border-white mt-3 mb-6 border-opacity-15"></div>
      <aside className="flex justify-center flex-col mb-10">
        <h4 className="text-center" >Get Your Message Board</h4>
        <div className="flex justify-center mt-3" >
            <Button variant="outline" className="hover:bg-slate-100 hover:text-black" asChild>
                <Link href="/sign-up">Create Your Account</Link>
            </Button>
        </div>
      </aside>
    </main>
  );
}
