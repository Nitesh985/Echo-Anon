import mongoose, { Schema, model } from "mongoose";


interface IFeedback{
    content:string;
    userId:mongoose.Types.ObjectId;
    fakeUsername:string;
}

const feedbackSchema = new Schema<IFeedback>(
  {
    content:{
        type: String,
        required:true,
        minLength:3,
        maxlength:160,
        trim:true
    },
    fakeUsername:{
      type:String,
      required:true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    }
},
  { timestamps: true }
);




export const Feedback =  mongoose.models.Feedback || model<IFeedback>("Feedback", feedbackSchema);
