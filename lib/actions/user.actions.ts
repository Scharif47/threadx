// Specifiy as server action
"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface UpdateUserParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

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
