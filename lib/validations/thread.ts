import * as z from "zod";

// Thread validation schema
export const ThreadValidationSchema = z.object({
  thread: z
    .string()
    .min(3, { message: "Thread must be at least 3 characters." })
    .max(600, { message: "Thread must be less than 600 characters." }),
  accountId: z.string(),
});

// Comment validation schema
export const CommentValidationSchema = z.object({
  thread: z
    .string()
    .min(3, { message: "Thread must be at least 3 characters." })
    .max(600, { message: "Thread must be less than 600 characters." }),
});
