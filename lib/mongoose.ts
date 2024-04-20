import mongoose from "mongoose";
let isConnected: boolean = false;
export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_DB_URL) {
    return console.log("No Mongo DB url in env file");
  }

  if (isConnected) {
    return console.log("you are already connected to the server");
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "devflow",
    });

    isConnected = true;
    console.log("connection successful to mongodb");
  } catch (error) {
    console.log("Failed to connect to Mongo DB", error);
  }
};
