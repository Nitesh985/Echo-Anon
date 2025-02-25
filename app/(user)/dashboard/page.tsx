"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HiOutlineRefresh } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import AllFeedbacks, { FeedbackType } from "@/components/user/AllFeedbacks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// const authStatus = true;
// const user = {
//   username: "james",
//   email: "james@gmail.com",
//   acceptFeedback: true,
// };

const messages = [
  {
    title: "Mystery Guest",
    content:
      "Welcome to the mystery guest chat! We'll be discussing various topics and seeking anonymous feedback. Enjoy your stay!",
    time: "20 seconds ago",
  },
  {
    title: "Tailwind walker",
    content: "Welcome to this amazing chating system",
    time: "3 hours ago",
  },
  {
    title: "Magic Terrifier",
    content: "Are you a ghost?",
    time: "1 day ago",
  },
  {
    title: "Jerermy Ghost",
    content: "I know who is the ghost",
    time: "3 day ago",
  },
];

type FetchUser = {
  _id: string;
  username: string;
  email: string;
  acceptMessage: boolean;
};

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<FetchUser | null>(null);
  const [authStatus, setAuthStatus] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  
  const fetchFeedbacks = async () => {
    const res = await axios.get("/api/messages");
    if (res.status===200){
      setFeedbacks(res.data);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/users/user");
      if (res.status===200){
        setUser(res.data);
        setAuthStatus(!!res.data);
        setIsAccepted(res.data.acceptMessage)}
    };
    fetchUser();
  }, []);

  useEffect(()=>{
    fetchFeedbacks()
  }, [updateFlag])

  useEffect(()=>{
    if (user && user?.username){
      setUrl(window.location.href.split("/dashboard")[0] +`/u/${user?.username?.toLowerCase()}`)}
  }, [user])

  const handleCopyLink = () => {
    if (url) {
      navigator.clipboard.writeText(url);
      toast.success("The link is copied!");
    }
  };

  const toggleAcceptMessage = () => {
    axios.put("/api/users/user", {acceptMessage:!isAccepted})
    .then((res)=>{
      if (res.status!==200){
        setIsAccepted((prevState) => !prevState)
        toast("User is updated successfully!:", {
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(res.data, null, 2)}
              </code>
            </pre>
          ),
        });
      } 
    })
    setIsAccepted((prevState)=>!prevState)
    
  }

  return (
    <main className="flex-grow px-10">
      <section>
        <h2 className="text-2xl mt-2 font-semibold text-slate-300">
          User Dashboard
        </h2>
        <p className="text-md mt-2">Copy your unique link here</p>
        <div className="flex justify-between mr-3">
          <p className="text-slate-100">{url}</p>
          <Button
            variant="outline"
            className="rounded-full hover:bg-white hover:text-black"
            onClick={handleCopyLink}
          >
            Copy
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="accept-message"
            checked={isAccepted}
            className="bg-slate-500"
            onCheckedChange={toggleAcceptMessage}
          />
          <Label htmlFor="accept-message">
            Accept Message: {isAccepted ? "on" : "off"}
          </Label>
        </div>
      </section>
      <aside className="mt-3">
        <Button
          className="hover:text-slate-500 transition-color duration-300"
          onClick={() =>fetchFeedbacks()}
        >
          <HiOutlineRefresh />
        </Button>
        <AllFeedbacks setUpdateFlag={setUpdateFlag} feedbacks={feedbacks} setIsOpen={setIsOpen} />
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                message.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </aside>
    </main>
  );
}
