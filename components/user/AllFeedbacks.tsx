import React from 'react'
import Feedback from './Feedback';

export type FeedbackType = {
    _id:string;
  content: string;
  userId: string;
  fakeUsername: string;
  createdAt: Date;
}


function AllFeedbacks({feedbacks, setIsOpen}:{
    feedbacks:FeedbackType[], setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
  <div className="p-6 px-24 flex flex-wrap justify-between gap-7 ">
          {feedbacks.map((feedback) => (
            <Feedback key={feedback._id} {...feedback} setIsOpen={setIsOpen}  />
          ))}
        </div>
  )
}

export default AllFeedbacks