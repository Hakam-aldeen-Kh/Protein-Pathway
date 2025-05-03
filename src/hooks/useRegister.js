import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validation/registerSchema";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import api from "../utils/api";

export const useRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
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
    formState: { errors },
    clearErrors,
    trigger,
  } = useForm({
    mode: "all",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    reValidateMode: "onChange",
  });

  const formValues = watch();

  // Add useEffect to validate password in real-time
  useEffect(() => {
    const confirmPassword = formValues.confirmPassword || "";
    setValidation({
      length: confirmPassword.length >= 8,
      lowerCase: /[a-z]/.test(confirmPassword),
      upperCase: /[A-Z]/.test(confirmPassword),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(confirmPassword),
      oneNumber: /[0-9]/.test(confirmPassword),
    });
  }, [formValues.confirmPassword]);

  // Reset validation errors when either password field changes
  useEffect(() => {
    // Clear password-related errors any time either field changes
    if (formValues.password || formValues.confirmPassword) {
      clearErrors(["password", "confirmPassword"]);

      // Re-trigger validation with a small delay to ensure state is updated
      setTimeout(() => {
        trigger(["password", "confirmPassword"]);
      }, 10);
    }
  }, [formValues.password, formValues.confirmPassword, clearErrors, trigger]);

  const isNextButtonEnabled = () => {
    const { email, firstName, lastName } = formValues;
    const allFieldsFilled =
      email.length > 0 && firstName.length > 0 && lastName.length > 0;
    const isStep1Valid = !errors.firstName && !errors.lastName && !errors.email;
    return allFieldsFilled && isStep1Valid && agreePrivacy;
  };

  const isSubmitButtonEnabled = () => {
    const { password, confirmPassword } = formValues;
    const allFieldsFilled = password?.length > 0 && confirmPassword?.length > 0;
    const passwordsMatch = password === confirmPassword;
    const isStep2Valid =
      !errors.password && !errors.confirmPassword && passwordsMatch;
    return allFieldsFilled && isStep2Valid;
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (isNextButtonEnabled()) {
      setStep(2);
      setShowPassword(true);
    }
  };

  const handleBackClick = () => {
    setStep(1);
    setShowPassword(false);
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

  // In your form submission handler
  const handleFinalSubmit = async (data) => {
    setIsSubmitting(true);

    const submissionData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };

    try {
      const response = await api.post("/auth/register", submissionData);

      Toast.fire({
        icon: "success",
        timer: 6000,
        title: response.data.message || "Registration successful",
      });

      // Pass the email to ConfirmRegister
      navigate("/confirm-email", { state: { email: data.email } });
      return response;
    } catch (error) {
      console.error("Registration error:", error);

      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    agreePrivacy,
    showPassword,
    validation,
    validationCases,
    errors,
    isSubmitting,
    isNextButtonEnabled,
    setAgreePrivacy,
    setShowPassword,
    isSubmitButtonEnabled,
    handleNextClick,
    handleBackClick,
    handleFinalSubmit,
    register,
    handleSubmit,
  };
};
