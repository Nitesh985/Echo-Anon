import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import { env } from "../data/env/server";
import bcrypt from "bcryptjs"

interface IUser{
  username:string;
  email:string;
  password:string;
  acceptMessage?:boolean;
}


const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim:true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    },
    password: {
      type: String,
      trim: true,
      required: true,
      match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    },
    username: {
      type: String,
      required: true,
      lowercase:true,
      unique: true,
      trim: true,
      match: /^\S*$/
    },
    acceptMessage:{
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next){
  if (!this.isModified("password")) return next()  

  this.password = await bcrypt.hash(this.password, 10)
  return next()
})

userSchema.methods.verifyPassword = async function(password:string){
  return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
     env.ACCESS_TOKEN_SECRET ,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRY,
    }
  );
};



export const User =  mongoose.models.User || model<IUser>("User", userSchema);
