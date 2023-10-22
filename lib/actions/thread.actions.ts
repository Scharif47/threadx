// Specifiy as server action
"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface ThreadParams {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

// Create and export function to create threads
export async function createThread({
  text,
  author,
  communityId,
  path,
}: ThreadParams) {
  // Connect to the database
  connectToDB();

  // Try to create a thread
  try {
    // Create thread
    const createdThread = await Thread.create({
      text,
      author,
      community: null, // TODO: update with communityId
    });

    // Update user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    // Revalidate path
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

// Create and export function to fetch threads
export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  // Connect to the database;
  connectToDB();

  // Calculate the number of posts to skip
  const skipAmount = (pageNumber - 1) * pageSize;

  // Fetch the threads that have no parents (top-level threads)
  const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  // Get the total number of threads
  const totalThreads = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  // Execute the threads query
  const threads = await threadsQuery.exec();

  // Check if there is a next page
  const isNextPage = totalThreads > skipAmount + threads.length;

  return { threads, isNextPage };
}

// Create and export function to fetch a single thread by id
export async function fetchThreadById(id: string) {
  // Connect to the database
  connectToDB();

  // Try to fetch the thread
  try {
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
        // community: null,     // TODO: update community
      })
      // populate children recursively
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId Image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    throw new Error(`Failed to fetch thread: ${error.message}`);
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  // Connect to the database
  connectToDB();

  // Try to add comment to thread
  try {
    // Find original thread by id
    const originalThread = await Thread.findById(threadId);

    // Check if original thread exists
    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    // Save comment thread to database
    const savedCommentThread = await commentThread.save();

    // Update original thread with comment thread
    originalThread.children.push(savedCommentThread._id);

    // Save original thread to database
    await originalThread.save();

    // Revalidate path
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to add comment: ${error.message}`);
  }
}
