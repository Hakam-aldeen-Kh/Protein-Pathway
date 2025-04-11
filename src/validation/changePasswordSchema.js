import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .min(8, "Current password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least 1 special character"
      )
      .regex(/[0-9]/, "Password must contain at least 1 number"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
