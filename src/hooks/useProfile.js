import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../utils/api";
import { ShowToast } from "../common/ToastNotification";
// import { useAuth } from "../hooks/useAuth";

// Modal types
export const MODAL_TYPES = {
  DELETE_ACCOUNT: "deleteAccount",
  CHANGE_PASSWORD: "changePassword",
  LOGOUT: "logout",
};

export const useProfile = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  // get a Profile data from API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("user/me");
        setProfileData(response.data.data.user);
      } catch (error) {
        ShowToast(
          "Error",
          error.response?.data?.message || "Failed to fetch profile data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

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

      ShowToast("Success", response.data.message || "Logout successful");
      navigate("/login");
    } catch (error) {
      ShowToast(
        "Error",
        error.response?.data?.message || "Logout failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Password change logic
  const handleChangePassword = async (passwordData) => {
    setIsLoading(true);
    try {
      const response = await api.post("auth/change-password", passwordData);
      ShowToast(
        "Success",
        response.data.message || "Password changed successfully"
      );
      toggleModal(null);
    } catch (error) {
      ShowToast(
        "Error",
        error.response?.data?.message || "Failed to change password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Account deletion logic
  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const response = await api.delete("user/me");

      ShowToast(
        "Success",
        response.data.message || "Account deleted successfully"
      );

      navigate("/login");
    } catch (error) {
      ShowToast(
        "Error",
        error.response?.data?.message || "Failed to delete account"
      );
    } finally {
      setIsLoading(false);
      toggleModal(null);
    }
  };

  return {
    activeModal,
    isLoading,
    profileData,
    handleLogout,
    handleChangePassword,
    handleDeleteAccount,
    toggleModal,
  };
};
