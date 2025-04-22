import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../utils/api";
import Swal from "sweetalert2";

// Modal types
export const MODAL_TYPES = {
  DELETE_ACCOUNT: "deleteAccount",
  CHANGE_PASSWORD: "changePassword",
  LOGOUT: "logout",
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

export const useProfile = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Toggle modal visibility
  const toggleModal = (modalType) => {
    setActiveModal((prev) => (prev === modalType ? null : modalType));
  };

  // Logout logic with loading state
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      toggleModal(null); // Close modal first

      const response = await api.post("auth/logout");

      // Small delay to ensure user sees the loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      Toast.fire({
        icon: "success",
        timer: 2000,
        title: response.data.message || "Logout successful",
      });

      localStorage.clear();
      navigate("/login");
    } catch (error) {
      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message || "Logout failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder account deletion logic
  const handleDeleteAccount = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.clear();
      navigate("/login");
      toggleModal(MODAL_TYPES.DELETE_ACCOUNT);
      setIsLoading(false);
    }, 1000);
  };

  // Placeholder password change logic
  const handleChangePassword = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Password changed");
      toggleModal(MODAL_TYPES.CHANGE_PASSWORD);
      setIsLoading(false);
    }, 1000);
  };

  return {
    activeModal,
    isLoading,
    handleLogout,
    handleChangePassword,
    handleDeleteAccount,
    toggleModal,
  };
};
