import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Error username must be atleast 5 characters or more")
    .max(15, "Error username must be less than 15 characters"),

  email: z.string().email("Error invalid email format"),

  password: z
    .string()
    .min(5, "Erro password must be atleast 5 characters or more"),
});
