import { z } from "zod";

export const bankDetails = z
  .object({
    accountNumber: z
      .string()
      .regex(/^\d{9,18}$/, "Account number must be 9–18 digits."),

    confirmAccountNumber: z
      .string()
      .regex(/^\d{9,18}$/, "Account number must be 9–18 digits."),

    ifsc: z
      .string()
      .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC code."),

    bankName: z
      .string()
      .min(2, "Bank name must be at least 2 characters.")
      .max(40, "Bank name cannot exceed 40 characters.")
      .regex(/^[A-Za-z ]+$/, "Bank name must contain only letters."),

    branch: z
      .string()
      .min(2, "Branch name must be at least 2 characters.")
      .max(50, "Branch name cannot exceed 50 characters.")
      .regex(/^[A-Za-z0-9 ]+$/, "Branch name contains invalid characters."),

    accountHolder: z
      .string()
      .min(3, "Account holder name must be at least 3 characters.")
      .max(40, "Account holder name cannot exceed 40 characters.")
      .regex(/^[A-Za-z ]+$/, "Account holder name must contain only letters."),

    upi: z
      .union([
        z
          .string()
          .regex(
            /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/,
            "Enter a valid UPI ID (example: name@upi)"
          ),
        z.literal(""), // allow empty
      ])
      .optional(),
  })
  .refine((data) => data.accountNumber === data.confirmAccountNumber, {
    path: ["confirmAccountNumber"],
    message: "Account numbers do not match.",
  });
