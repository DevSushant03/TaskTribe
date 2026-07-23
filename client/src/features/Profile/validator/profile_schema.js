import { z } from "zod";

const urlOrEmpty = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((val) => !val || /^https?:\/\/.+/.test(val), {
    message: "Enter a valid URL starting with http:// or https://",
  });

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50, "Name is too long"),
  surname: z.string().trim().min(1, "Surname is required").max(50, "Surname is too long"),
  bio: z
    .string()
    .trim()
    .max(300, "Bio can't exceed 300 characters")
    .optional()
    .or(z.literal("")),
  skills: z.array(z.string().trim().min(1)).min(1, "Add at least one skill"),
  socialLinks: z.object({
    instagram: urlOrEmpty,
    facebook: urlOrEmpty,
    github: urlOrEmpty,
    linkedin: urlOrEmpty,
    portfolio: urlOrEmpty,
  }),
});