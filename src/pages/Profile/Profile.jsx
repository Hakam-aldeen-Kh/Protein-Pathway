import { Link, useNavigate } from "react-router";
import profileData from "../../data/profile/profile.json";
import { useState } from "react";
import DeleteAccountModal from "./components/DeleteAccountModal";
import LogoutModal from "./components/LogoutModal";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

const Profile = () => {
  const [modalIsOpen, setModalIsOpen] = useState({
    deleteAccountModal: false,
    logOutModal: false,
  });

  const navigate = useNavigate();

  const handleOpenDeleteModal = () => {
    setModalIsOpen((prev) => ({
      ...prev,
      deleteAccountModal: true,
    }));
  };

  const handleCloseDeleteModal = () => {
    setModalIsOpen((prev) => ({
      ...prev,
      deleteAccountModal: false,
    }));
  };

  const handleOpenLogoutModal = () => {
    setModalIsOpen((prev) => ({
      ...prev,
      logOutModal: true,
    }));
  };

  const handleCloseLogoutModal = () => {
    setModalIsOpen((prev) => ({
      ...prev,
      logOutModal: false,
    }));
  };

  const handleDelete = () => {
    // Add deletion logic here
    localStorage.clear();
    navigate("/login");
    handleCloseDeleteModal();
  };

  const handleLogOut = () => {
    // Add logout logic here
    localStorage.clear();
    navigate("/login");
    handleCloseLogoutModal();
  };

  return (
    <div>
      {/* main wrapper */}
      <div className="w-[85%] mx-auto my-10 p-5 border-[#BBBBBB] border-[1px] rounded-lg space-y-16">
        {/* heading */}
        <div className="flex justify-between items-center">
          <h1 className="text-[#111118] text-[40px] font-bold">My Profile</h1>
          <Link
            to={"/profile/edit"}
            className="py-[12px] px-4 border border-[#57369E] rounded-sm text-[#57369E] font-semibold text-[14px] hover:bg-[#00A7D3] hover:text-white hover:border-transparent transition-colors duration-500"
          >
            Edit My Profile
          </Link>
        </div>
        {/* profile information */}
        <div className="grid grid-cols-3 gap-5">
          <img
            src={profileData?.imageSrc || "/images/default-profile.jpg"}
            className="rounded-lg h-full object-cover"
            alt="Profile"
          />
          <div className="col-start-2 col-end-4 bg-[#F1F5F9] p-5 rounded-lg space-y-5">
            {/* name and description */}
            <div className="space-y-2">
              <h3 className="text-[40px] font-bold">
                {profileData?.name || "N/A"}
              </h3>
              <p className="text-[20px] text-[#626262]">
                {profileData?.description || "No description available"}
              </p>
            </div>
            {/* education */}
            <div className="flex items-center space-x-2 text-[20px] text-[#111118]">
              <img
                src="/images/icons/edu-icon.svg"
                className="w-[32px]"
                alt="Education"
              />
              <p>{profileData?.education || "N/A"}</p>
            </div>
            {/* email */}
            <div className="flex items-center space-x-2 text-[20px] text-[#111118]">
              <img
                src="/images/icons/sms-icon.svg"
                className="w-[32px]"
                alt="Email"
              />
              <p>{profileData?.email || "N/A"}</p>
            </div>
            {/* phone */}
            <div className="flex items-center space-x-2 text-[20px] text-[#111118]">
              <img
                src="/images/icons/call-icon.svg"
                className="w-[32px]"
                alt="Phone"
              />
              <p>{profileData?.phone || "N/A"}</p>
            </div>
            {/* links */}
            <div className="flex items-center space-x-2 text-[20px] text-[#111118]">
              {profileData?.linkedin && (
                <a href={profileData.linkedin}>
                  <img
                    src="/images/icons/linkedin-icon.svg"
                    className="w-[32px]"
                    alt="LinkedIn"
                  />
                </a>
              )}
              {profileData?.x_account && (
                <a href={profileData.x_account}>
                  <img
                    src="/images/icons/x-icon.svg"
                    className="w-[32px]"
                    alt="X"
                  />
                </a>
              )}
            </div>
            {/* external link */}
            {profileData?.website && (
              <div>
                <a
                  href={profileData.website}
                  className="text-[20px] text-[#111118]"
                >
                  {profileData.website}
                </a>
              </div>
            )}
          </div>
        </div>
        {/* options */}
        <div className="text-[#57369E] text-[14px] space-y-5 w-fit">
          <button
            className="flex items-center space-x-1 group"
            onClick={handleOpenLogoutModal}
          >
            <img
              src="/images/icons/logout.svg"
              className="w-[24px]"
              alt="Log Out"
            />
            <p className="group-hover:text-[#00A7D3] group-hover:cursor-pointer transition duration-200">
              Log Out
            </p>
          </button>
          <button className="flex items-center space-x-1 group">
            <img
              src="/images/icons/key-square.svg"
              className="w-[24px]"
              alt="Reset Password"
            />
            <p className="group-hover:text-[#00A7D3] group-hover:cursor-pointer transition duration-200">
              Reset My Password
            </p>
          </button>
          <button
            className="flex items-center space-x-1 group"
            onClick={handleOpenDeleteModal}
          >
            <img
              src="/images/icons/close-square.svg"
              className="w-[24px]"
              alt="Delete Account"
            />
            <p className="group-hover:text-[#00A7D3] group-hover:cursor-pointer transition duration-200">
              Delete My Account
            </p>
          </button>
        </div>
      </div>
      <DeleteAccountModal
        isOpen={modalIsOpen.deleteAccountModal}
        closeModal={handleCloseDeleteModal}
        handleDelete={handleDelete}
      />
      <LogoutModal
        isOpen={modalIsOpen.logOutModal}
        closeModal={handleCloseLogoutModal}
        handleDelete={handleLogOut}
      />
    </div>
  );
};

export default Profile;
