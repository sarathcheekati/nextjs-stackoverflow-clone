import mongoose from "mongoose";
import { MongoClient } from "mongodb";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_DB_URL) {
    return console.log(
      "There is no Mongo DB URL in env file to connect to database"
    );
  }

  if (isConnected) {
    return console.log(
      "You have already connected to the Mongo DB Database. Please proceed with further operations"
    );
  }
  const client = new MongoClient(process.env.MONGO_DB_URL);

  try {
    await client.connect();
    isConnected = true;
    console.log("Successfully connected to the Mongo DB Database");
  } catch (error: any) {
    console.log("Failed to connect Mongo DB Database", error.stack);
  }
};
