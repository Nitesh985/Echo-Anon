import React, {useState} from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "@/components/ui/card";
import { Button } from '../ui/button';
import { FeedbackType } from './AllFeedbacks';
import capitalizeWord from '@/utils/capitalizeWord';
import axios from 'axios'
import {toast} from 'sonner'
import Loading from "@/components/Loading"


interface FeedbackProps extends FeedbackType{
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
    setUpdateFlag:React.Dispatch<React.SetStateAction<boolean>>;
}


function Feedback({setIsOpen, _id, content, fakeUsername, setUpdateFlag}:FeedbackProps) {
    const [loading, setLoading] = useState(false)

    const handleDelete = () => {
        setLoading(true)
        axios.delete(`/api/messages/remove/${_id}`).then(
            (res)=>{
                if (res.status===200){setIsOpen(false)
                setUpdateFlag(prevState=>!prevState)
                    toast.success(`Feedback from ${fakeUsername} deleted successfully!`)}
            }
        ).finally(()=>setLoading(false))
    }
  
    return (
    <Card className="flex justify-between w-5/12 bg-yellow-600">
              <div>
                <CardHeader>
                  <CardTitle>Message from {capitalizeWord(fakeUsername)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{content}</p>
                </CardContent>
              </div>
        <Button
            className="mt-3 mr-3 text-lg text-slate-200 hover:text-white bg-red-600 rounded-xl hover:bg-red-500 "
            onClick={handleDelete}
        > {loading?<Loading />:"✕"}
        </Button>
            </Card>
  )
}

export default Feedback