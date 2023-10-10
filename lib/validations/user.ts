import * as z from "zod";

// User validation schema
export const UserValidationSchema = z.object({
  profile_photo: z.string().url().min(3),
  name: z.string().min(3).max(30),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(30),
  bio: z.string().min(3).max(1000),
});
