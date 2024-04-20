"use server";

import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";

export async function getUserById(params: any) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log("error while fetching user from db ", error);
    throw error;
  }
}
