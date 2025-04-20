import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(1, "Current password is required")
      .min(8, "Current password must be at least 8 characters"),
    newPassword: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least 1 special character"
      )
      .regex(/[0-9]/, "Password must contain at least 1 number"),
    confirmNewPassword: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    // More reliable password matching validation
    if (
      data.newPassword !== data.confirmNewPassword &&
      data.confirmNewPassword
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
      });
    }
  });
