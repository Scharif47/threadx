// Specifiy as server action
"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";

interface UpdateUserParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

// Create and export the function to update the user
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: UpdateUserParams): Promise<void> {
  connectToDB();

  // Create or update user
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true } // Update if exists, insert if not
    );

    // Revalidate the path to update the cache
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

// Create and export the function to fetch the user
export async function fetchUser(userId: string) {
  try {
    // Connect to the database
    connectToDB();

    return await User.findOne({ id: userId });
    // .populate({
    //   path: 'communities',
    //   model: 'Community',
    // })
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    // Connect to the database
    connectToDB();

    // Find all threads authored by user with the given userId
    // TODO: populate community
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name iamge id",
        },
      },
    });

    return threads;
  } catch (error: any) {
    throw new Error(`Failed to fetch user posts: ${error.message}`);
  }
}
