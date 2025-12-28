import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(20, "Name cannot exceed 20 characters."),
  surname: z
    .string()
    .min(3, "surname must be at least 3 characters.")
    .max(30, "surname cannot exceed 30 characters."),

  email: z
    .string()
    .email("Please enter a valid email."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password too long."),
  agreedRules: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the rules and regulations to post a task."
      ),  

})

export const loginSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});
