import { z } from "zod";

export const bankDetails = z
  .object({
    accountNumber: z
      .string()
      .trim()
      .regex(/^\d{9,18}$/, "Account number must be 9–18 digits."),

    confirmAccountNumber: z
      .string()
      .trim()
      .regex(/^\d{9,18}$/, "Account number must be 9–18 digits."),

    ifsc: z
      .string()
      .trim()
      .toUpperCase()
      .regex(
        /^[A-Z]{4}0[A-Z0-9]{6}$/,
        "Enter a valid 11-character IFSC code (e.g. HDFC0001234)."
      ),
  })
  .refine((data) => data.accountNumber === data.confirmAccountNumber, {
    path: ["confirmAccountNumber"],
    message: "Account numbers do not match.",
  });
