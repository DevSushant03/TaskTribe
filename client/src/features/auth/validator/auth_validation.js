import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Must be at least 2 characters")
  .max(30, "Must not exceed 30 characters")
  .regex(/^[a-zA-Z\s]+$/, "Only letters are allowed");

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .max(100, "Email is too long")
  .regex(
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
    "Please enter a valid email address",
  );

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password is too long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

export const registerSchema = z.object({
  name: nameSchema,
  surname: nameSchema,

  email: emailSchema,

  password: passwordSchema,

  agreedRules: z.literal(true, {
    errorMap: () => ({
      message:
        "You must agree to the rules and regulations to use this platform.",
    }),
  }),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});
