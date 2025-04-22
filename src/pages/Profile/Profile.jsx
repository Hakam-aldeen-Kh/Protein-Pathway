import Modal from "react-modal";
import profileData from "../../data/profile/profile.json";
import ProfileInfo from "./components/ProfileInfo";
import ProfileActions from "./components/ProfileActions";
// import DeleteAccountModal from "./components/DeleteAccountModal";
import LogoutModal from "./components/LogoutModal";
import ProfileHeader from "./components/ProfileHeader";
import { MODAL_TYPES, useProfile } from "../../hooks/useProfile";
import ChangePasswordModal from "./components/ChangePasswordModal";

// Set app element for accessibility (should ideally be in index.js)
Modal.setAppElement("#root");

const Profile = () => {
  const {
    activeModal,
    isLoading,
    handleLogout,
    handleChangePassword,
    // handleDeleteAccount,
    toggleModal,
  } = useProfile();

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-[#57369E]"></div>
            <p className="mt-4 text-gray-700 font-medium">
              Processing your request...
            </p>
          </div>
        </div>
      )}

      <div className="w-[85%] mx-auto my-10 p-5 border border-[#BBBBBB] rounded-lg space-y-16">
        <ProfileHeader />
        <ProfileInfo profileData={profileData} />
        <ProfileActions
          onLogout={() => toggleModal(MODAL_TYPES.LOGOUT)}
          onResetPassword={() => toggleModal(MODAL_TYPES.CHANGE_PASSWORD)}
          onDeleteAccount={() => toggleModal(MODAL_TYPES.DELETE_ACCOUNT)}
        />
        <LogoutModal
          isOpen={activeModal === MODAL_TYPES.LOGOUT}
          closeModal={() => toggleModal(MODAL_TYPES.LOGOUT)}
          handleOnclick={handleLogout}
        />
        <ChangePasswordModal
          isOpen={activeModal === MODAL_TYPES.CHANGE_PASSWORD}
          closeModal={() => toggleModal(MODAL_TYPES.CHANGE_PASSWORD)}
          handleChange={handleChangePassword}
        />
        {/* <DeleteAccountModal
          isOpen={activeModal === MODAL_TYPES.DELETE_ACCOUNT}
          closeModal={() => toggleModal(MODAL_TYPES.DELETE_ACCOUNT)}
          handleOnclick={handleDeleteAccount}
        /> */}
      </div>
    </>
  );
};

export default Profile;
