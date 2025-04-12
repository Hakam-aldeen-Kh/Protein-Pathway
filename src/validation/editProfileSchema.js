import { z } from "zod";

export const editProfileSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must be less than 50 characters")
      .trim(),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name must be less than 50 characters")
      .trim(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    biography: z.string().optional(), // Optional, included in output
    phoneNumber: z
      .string()
      .optional()
      .refine(
        (val) => {
          // Allow empty if optional
          if (!val) return true;
          // Check E.164 format: starts with +, followed by 10–15 digits
          if (!val.startsWith("+")) return false;
          const digits = val.slice(1); // Get part after +
          if (/[^0-9]/.test(digits)) return false; // Non-digits present
          const digitCount = digits.length;
          return digitCount >= 10 && digitCount <= 15;
        },
        (val) => {
          // Dynamic error message based on val
          if (!val.startsWith("+")) {
            return { message: "Phone number must start with a +" };
          }
          const digits = val.slice(1);
          if (/[^0-9]/.test(digits)) {
            return { message: "Phone number must contain only digits after +" };
          }
          const digitCount = digits.length;
          if (digitCount < 10) {
            return { message: "Phone number is too short (minimum 10 digits)" };
          }
          if (digitCount > 15) {
            return { message: "Phone number is too long (maximum 15 digits)" };
          }
          return { message: "Invalid phone number format" };
        }
      ),
    degree: z.string().optional(),
    school: z.string().optional(),
  })
  .passthrough();
