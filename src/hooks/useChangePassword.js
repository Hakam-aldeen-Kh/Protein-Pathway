import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../validation/changePasswordSchema";

export const useChangePassword = (closeModal) => {
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
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const formValues = watch();

  // Validate newPassword in real-time
  useEffect(() => {
    const newPassword = formValues.newPassword || "";
    setValidation({
      length: newPassword.length >= 8,
      lowerCase: /[a-z]/.test(newPassword),
      upperCase: /[A-Z]/.test(newPassword),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      oneNumber: /[0-9]/.test(newPassword),
    });
  }, [formValues.newPassword]);

  // Enable submit button only if form is valid
  const isSubmitButtonEnabled = () => {
    const { currentPassword, newPassword, confirmNewPassword } = formValues;
    const allFieldsFilled =
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmNewPassword.length > 0;
    const isFormValid =
      !errors.currentPassword &&
      !errors.newPassword &&
      !errors.confirmNewPassword;
    return allFieldsFilled && isFormValid;
  };

  // Handle form submission
  const handleFinalSubmit = (data) => {
    // TODO: Replace with API call to update password
    console.log("Password change submitted:", {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    resetForm(); // Reset form on successful submit
    closeModal();
  };

  // Reset form data, errors, and validation
  const resetForm = () => {
    reset({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setValidation({
      length: false,
      lowerCase: false,
      upperCase: false,
      specialCharacter: false,
      oneNumber: false,
    });
    setShowPassword(false);
  };

  return {
    showPassword,
    setShowPassword,
    validation,
    validationCases,
    errors,
    isSubmitButtonEnabled,
    register,
    handleSubmit,
    handleFinalSubmit,
    resetForm,
  };
};
