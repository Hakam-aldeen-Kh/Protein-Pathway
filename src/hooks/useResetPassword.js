import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import api from "../utils/api";
import { useSearchParams } from "react-router";
import Swal from "sweetalert2";

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
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleResetPasswordSubmit = async (data) => {
    if (passwordsMatch) {
      setIsSubmitting(true); // Set loading state to true before API call
      try {
        const response = await api.post("auth/reset-password", {
          resetPasswordToken: token,
          newPassword: data.password,
        });
        Toast.fire({
          icon: "success",
          timer: 2000,
          title: response.data.message || "Password reset successful",
        });
        navigate("/login");
      } catch (error) {
        Toast.fire({
          icon: "error",
          title:
            error.response?.data?.message ||
            "Password reset failed. Please try again.",
        });
      } finally {
        setIsSubmitting(false); // Set loading state to false after API call
      }
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
    isSubmitting,
    validation,
    validationCases,
    passwordsMatch,
    handleResetPasswordSubmit,
    togglePasswordVisibility,
  };
};
