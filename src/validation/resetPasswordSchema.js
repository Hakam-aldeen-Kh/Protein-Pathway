import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least 1 special character"
      )
      .regex(/[0-9]/, "Password must contain at least 1 number"),
    confirmPassword: z.string().trim().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    // More reliable password matching validation
    if (data.password !== data.confirmPassword && data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
