import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../utils/api";
import { ShowToast } from "../common/ToastNotification";
// import { useAuth } from "../hooks/useAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { refreshAuth } = useAuth();

  // handle click on login button
  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    const submissionData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await api.post("auth/login", submissionData);
      ShowToast("Success", response.data.message || "Login successful");
      // Refresh authentication state after successful login
      // await refreshAuth();

      // Navigate to the dashboard or home page
      navigate("/");
      return response;
    } catch (error) {
      // Check if it's the email verification error
      if (
        error.response?.status === 400 &&
        error.response?.data?.message?.includes("verify your email")
      ) {
        ShowToast("Warning", "Please verify your email before logging in");
        // Navigate to confirm email page with the email
        navigate("/confirm-email", { state: { email: data.email } });
      } else {
        ShowToast(
          "Error",
          error.response?.data?.message || "Login failed. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
};
