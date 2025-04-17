import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";

// Define the reset password schema as you requested originally
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least 1 special character"
      )
      .regex(/[0-9]/, "Password must contain at least 1 number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password.trim() === data.confirmPassword.trim(), {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const useResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState({
    length: false,
    lowerCase: false,
    upperCase: false,
    specialCharacter: false,
    oneNumber: false,
  });

  const validationCases = [
    "At least 8 characters",
    "At least 1 lowercase letter",
    "At least 1 uppercase letter",
    "At least 1 special character",
    "At least 1 number",
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const formValues = watch();

  // Validate password in real-time
  useEffect(() => {
    const password = formValues.password || "";
    setValidation({
      length: password.length >= 8,
      lowerCase: /[a-z]/.test(password),
      upperCase: /[A-Z]/.test(password),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      oneNumber: /[0-9]/.test(password),
    });

    // Re-validate confirmPassword field whenever password changes
    if (formValues.confirmPassword) {
      trigger("confirmPassword");
    }
  }, [formValues.password, formValues.confirmPassword, trigger]);

  // Check if passwords match
  const passwordsMatch =
    formValues.password &&
    formValues.confirmPassword &&
    formValues.password.trim() === formValues.confirmPassword.trim();

  const handleResetPasswordSubmit = (data) => {
    if (passwordsMatch) {
      console.log(data);
      navigate("/login");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    showPassword,
    validation,
    validationCases,
    passwordsMatch,
    handleResetPasswordSubmit,
    togglePasswordVisibility,
  };
};
