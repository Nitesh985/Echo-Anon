import mongoose from 'mongoose';
import { env } from '@/data/env/server'

let isConnected = false; // track the connection


export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {

    await mongoose.connect(env.MONGODB_URI)

    isConnected = true;

    console.log('MongoDB connection successful!')
  } catch (error) {
    console.log(error);
  }
}