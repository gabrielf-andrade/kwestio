import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").trim(),
  email: z.email("Please enter a valid email address").trim(),
  password: z.string().min(8, "Password must be at least 8 characters").trim(),
});

export const signInFormSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),
  password: z.string().min(8, "Password must be at least 8 characters").trim(),
});
