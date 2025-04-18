import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validation/registerSchema";
import { useNavigate } from "react-router";

export const useRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formValues = watch();

  // Add useEffect to validate password in real-time
  useEffect(() => {
    const password = formValues.password || "";
    setValidation({
      length: password.length >= 8,
      lowerCase: /[a-z]/.test(password),
      upperCase: /[A-Z]/.test(password),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      oneNumber: /[0-9]/.test(password),
    });
  }, [formValues.password]);

  const isNextButtonEnabled = () => {
    const { email, firstName, lastName } = formValues;
    const allFieldsFilled =
      email.length > 0 && firstName.length > 0 && lastName.length > 0;
    const isStep1Valid = !errors.firstName && !errors.lastName && !errors.email;
    return allFieldsFilled && isStep1Valid && agreePrivacy;
  };

  const isSubmitButtonEnabled = () => {
    const { password, confirmPassword } = formValues;
    const allFieldsFilled = password.length > 0 && confirmPassword.length > 0;
    const isStep2Valid = !errors.password && !errors.confirmPassword;
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

  const handleFinalSubmit = (data) => {
    console.log("Form submitted with:", data);
    navigate("/confirm-email");
  };

  return {
    step,
    agreePrivacy,
    showPassword,
    validation,
    validationCases,
    errors,
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
