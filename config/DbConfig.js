import mongoose from 'mongoose';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const { MONGODB_URI } = process.env;

export function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Successfully connected to MongoDB");
  }).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  });
}
