import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../validation/changePasswordSchema";
import api from "../utils/api";
import Swal from "sweetalert2";

export const useChangePassword = (closeModal) => {
  const [showPassword, setShowPassword] = useState(false);
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
    reset,
    formState: { errors },
    clearErrors,
    trigger,
  } = useForm({
    mode: "all",
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    reValidateMode: "onChange",
  });

  const formValues = watch();

  // Validate newPassword in real-time
  useEffect(() => {
    const confirmNewPassword = formValues.confirmNewPassword || "";
    setValidation({
      length: confirmNewPassword.length >= 8,
      lowerCase: /[a-z]/.test(confirmNewPassword),
      upperCase: /[A-Z]/.test(confirmNewPassword),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(confirmNewPassword),
      oneNumber: /[0-9]/.test(confirmNewPassword),
    });
  }, [formValues.confirmNewPassword]);

  // Reset validation errors when either password field changes
  useEffect(() => {
    // Clear password-related errors any time either field changes
    if (formValues.newPassword || formValues.confirmNewPassword) {
      clearErrors(["newPassword", "confirmNewPassword"]);

      // Re-trigger validation with a small delay to ensure state is updated
      setTimeout(() => {
        trigger(["newPassword", "confirmNewPassword"]);
      }, 10);
    }
  }, [
    formValues.newPassword,
    formValues.confirmNewPassword,
    clearErrors,
    trigger,
  ]);

  // Enable submit button only if form is valid
  const isSubmitButtonEnabled = () => {
    const { currentPassword, newPassword, confirmNewPassword } = formValues;
    const allFieldsFilled =
      currentPassword?.length > 0 &&
      newPassword?.length > 0 &&
      confirmNewPassword?.length > 0;
    const passwordsMatch = newPassword === confirmNewPassword;
    const isFormValid =
      !errors.currentPassword &&
      !errors.newPassword &&
      !errors.confirmNewPassword &&
      passwordsMatch;
    return allFieldsFilled && isFormValid;
  };

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

  // Handle form submission
  const handleFinalSubmit = async (data) => {
    setIsSubmitting(true);
    const submissionData = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    try {
      const response = await api.patch("auth/update-password", submissionData);

      Toast.fire({
        icon: "success",
        timer: 3000,
        title: response.data.message || "Change password successful",
      });
      resetForm();
      closeModal();
    } catch (error) {
      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "Change password failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
    isSubmitting,
    isSubmitButtonEnabled,
    register,
    handleSubmit,
    handleFinalSubmit,
    resetForm,
  };
};
