import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../utils/api";
import Swal from "sweetalert2";
// import { useAuth } from "../hooks/useAuth";

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
  // const { refreshAuth } = useAuth(); // Get refreshAuth function from auth context

  // Toggle modal visibility
  const toggleModal = (modalType) => {
    setActiveModal((prev) => (prev === modalType ? null : modalType));
  };

  // Logout logic with loading state and auth context refresh
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      toggleModal(null); // Close modal first

      const response = await api.post("auth/logout");

      // Small delay to ensure user sees the loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Refresh auth context to update the authentication state
      // await refreshAuth();

      Toast.fire({
        icon: "success",
        timer: 2000,
        title: response.data.message || "Logout successful",
      });

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

  // Password change logic
  const handleChangePassword = async (passwordData) => {
    setIsLoading(true);
    try {
      const response = await api.post("auth/change-password", passwordData);

      Toast.fire({
        icon: "success",
        title: response.data.message || "Password changed successfully",
      });

      toggleModal(null);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message || "Failed to change password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Account deletion logic
  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const response = await api.delete("auth/delete-account");

      // Refresh auth context to update the authentication state
      // await refreshAuth();

      Toast.fire({
        icon: "success",
        title: response.data.message || "Account deleted successfully",
      });

      navigate("/login");
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message || "Failed to delete account",
      });
    } finally {
      setIsLoading(false);
      toggleModal(null);
    }
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
