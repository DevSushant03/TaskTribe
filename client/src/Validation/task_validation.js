import { z } from "zod";

export const TaskValidationSchema = z
  .object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters.")
      .max(100, "Title cannot exceed 100 characters."),

    description: z
      .string()
      .min(20, "Description must be at least 20 characters.")
      .max(2000, "Description cannot exceed 2000 characters."),

    tags: z
      .array(z.string().min(1, "Tag cannot be empty."))
      .max(5, "Maximum 5 tags allowed.")
      .default([]),

    budgetMin: z
      .string()
      .min(1, "Minimum budget is required.")
      .refine(
        (val) => !val || (!isNaN(Number(val)) && Number(val) > 0),
        "Minimum budget must be a greater then 0."
      ),

    budgetMax: z
      .string()
      .min(1, "Minimum budget is required.")
      .refine(
        (val) => !val || (!isNaN(Number(val)) && Number(val) > 0),
        "Maximum budget must be a positive number."
      ),

    deadline: z
      .string()
      .min(1, "Deadline is required.")
      .refine(
        (val) => !val || new Date(val) > new Date(),
        "Deadline must be a future date."
      ),

    agreedRules: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the rules and regulations to post a task."
      ),
  })
  .refine(
    (data) => {
      if (data.budgetMin && data.budgetMax) {
        const min = Number(data.budgetMin);
        const max = Number(data.budgetMax);
        return min <= max;
      }
      return true;
    },
    {
      message: "Minimum budget cannot be greater than maximum budget.",
      path: ["budgetMax"],
    }
  );
