import { useState } from "react";
import { useNavigate } from "react-router";

// Modal types
export const MODAL_TYPES = {
  DELETE_ACCOUNT: "deleteAccount",
  CHANGE_PASSWORD: "changePassword",
  LOGOUT: "logout",
};

export const useProfile = () => {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  // Toggle modal visibility
  const toggleModal = (modalType) => {
    setActiveModal((prev) => (prev === modalType ? null : modalType));
  };

  // Placeholder logout logic
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toggleModal(MODAL_TYPES.LOGOUT);
  };

  // Placeholder account deletion logic
  const handleDeleteAccount = () => {
    localStorage.clear();
    navigate("/login");
    toggleModal(MODAL_TYPES.DELETE_ACCOUNT);
  };

  // Placeholder password change logic
  const handleChangePassword = () => {
    console.log("Password changed");
    toggleModal(MODAL_TYPES.CHANGE_PASSWORD);
    // Example: navigate("/reset-password");
  };

  return {
    activeModal,
    handleLogout,
    handleChangePassword,
    handleDeleteAccount,
    toggleModal,
  };
};
