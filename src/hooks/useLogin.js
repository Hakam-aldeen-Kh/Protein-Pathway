import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import api from "../utils/api";
import { useAuth } from "../hooks/useAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refreshAuth } = useAuth();

  // init Toast from sweet alert
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

  // handle click on login button
  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    const submissionData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await api.post("auth/login", submissionData);

      Toast.fire({
        icon: "success",
        timer: 3000,
        title: response.data.message || "Login successful",
      });

      // Refresh authentication state after successful login
      await refreshAuth();

      // Navigate to the dashboard or home page
      navigate("/");
      return response;
    } catch (error) {
      // Check if it's the email verification error
      if (
        error.response?.status === 400 &&
        error.response?.data?.message?.includes("verify your email")
      ) {
        Toast.fire({
          icon: "warning",
          timer: 4000,
          title: "Please verify your email before logging in",
        });

        // Navigate to confirm email page with the email
        navigate("/confirm-email", { state: { email: data.email } });
        // Send verify Email
        try {
          const response = await api.post("auth/resend-verification", {
            email: submissionData.email,
          });

          Toast.fire({
            icon: "success",
            timer: 6000,
            title: response.data.message || "Registration successful",
          });

          return response;
        } catch (error) {
          console.error("Registration error:", error);

          Toast.fire({
            icon: "error",
            title:
              error.response?.data?.message ||
              "Registration failed. Please try again.",
          });
        }
      } else {
        // Handle other errors
        Toast.fire({
          icon: "error",
          title:
            error.response?.data?.message || "Login failed. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
};
