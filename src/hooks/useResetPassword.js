import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import api from "../utils/api";
import { useSearchParams } from "react-router";
import { resetPasswordSchema } from "../validation/resetPasswordSchema";
import { ShowToast } from "../common/ToastNotification";

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
    match: false,
  });

  const validationCases = [
    "At least 8 characters",
    "At least 1 lowercase letter",
    "At least 1 uppercase letter",
    "At least 1 special character",
    "At least 1 number",
    "The password and confirm password match",
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
    const confirmPassword = formValues.confirmPassword || "";
    const password = formValues.password || "";
    setValidation({
      length: confirmPassword.length >= 8,
      lowerCase: /[a-z]/.test(confirmPassword),
      upperCase: /[A-Z]/.test(confirmPassword),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(confirmPassword),
      oneNumber: /[0-9]/.test(confirmPassword),
      match: confirmPassword === password,
    });

    // Re-validate confirmPassword field whenever password changes
    if (formValues.confirmPassword) {
      trigger("confirmPassword");
    }
    if (formValues.password) {
      trigger("password");
    }
  }, [formValues.password, formValues.confirmPassword, trigger]);

  // Check if passwords match
  const passwordsMatch =
    formValues.password &&
    formValues.confirmPassword &&
    formValues.password.trim() === formValues.confirmPassword.trim();

  const handleResetPasswordSubmit = async (data) => {
    if (passwordsMatch) {
      setIsSubmitting(true); // Set loading state to true before API call
      try {
        const response = await api.post("auth/reset-password", {
          resetPasswordToken: token,
          newPassword: data.password,
        });
        ShowToast(
          "Success",
          response.data.message || "Password reset successful"
        );
        navigate("/login");
      } catch (error) {
        ShowToast(
          "Error",
          error.response?.data?.message ||
            "Password reset failed. Please try again."
        );
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
