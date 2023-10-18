import mongoose from "mongoose";

let isConnected = false; // Variable to check if mongoose is connected

// Create and export function to connect to MongoDB
export const connectToDB = async () => {
  // Prevent unknown queries
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
  if (isConnected) return console.log("MongoDB is already connected");

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
