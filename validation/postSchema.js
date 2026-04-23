import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(5, "Error title must be atleast 5 characters or more")
    .max(20, "Error title must be less than 20 characters"),

  content: z
    .string()
    .min(5, "Error title must be atleast 5 characters or more")
    .max(100, "Error title must be atleast 5 characters or more"),
});
