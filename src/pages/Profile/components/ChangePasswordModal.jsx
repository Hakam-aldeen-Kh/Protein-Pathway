import Modal from "react-modal";
import InputField from "../../../common/InputField";
import { useChangePassword } from "../../../hooks/useChangePassword";

const ChangePasswordModal = ({ isOpen, closeModal }) => {
  const {
    showPassword,
    setShowPassword,
    validation,
    validationCases,
    errors,
    isSubmitButtonEnabled,
    register,
    handleSubmit,
    handleFinalSubmit,
    resetForm,
    isSubmitting,
  } = useChangePassword(closeModal);

  // Wrap closeModal to reset form
  const handleClose = () => {
    resetForm();
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose} // Reset on overlay click
      ariaHideApp={false}
      className="bg-white rounded-lg border border-[#BBBBBB] min-w-[35%] max-w-md mx-auto my-10"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <h2 className="text-xl font-bold px-6 py-4 border-b-2">
        Change Password
      </h2>
      <form
        onSubmit={handleSubmit(handleFinalSubmit)}
        className="space-y-5 px-6 py-10"
      >
        <InputField
          label="Current Password"
          type="password"
          name="currentPassword"
          placeholder="Enter Your Current Password"
          register={register}
          error={errors.currentPassword?.message}
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
        />
        <InputField
          label="New Password"
          type="password"
          name="newPassword"
          placeholder="Enter Your New Password"
          register={register}
          error={errors.newPassword?.message}
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
        />
        <ul className="pl-5 text-sm">
          {validationCases.map((oneCase, index) => {
            const validationKeys = Object.keys(validation);
            const isValid = validation[validationKeys[index]];
            return (
              <li
                key={index}
                className={`flex items-center gap-2 ${
                  isValid ? "text-[#409C43]" : "text-gray-600"
                }`}
              >
                {isValid ? (
                  <img src="/images/icons/check-password.svg" alt="check" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-gray-600 mt-1" />
                )}
                {oneCase}
              </li>
            );
          })}
        </ul>
        <InputField
          label="Confirm New Password"
          type="password"
          name="confirmNewPassword"
          placeholder="Re-enter Your New Password"
          register={register}
          error={errors.confirmNewPassword?.message}
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
        />
        <div className="grid grid-cols-2 gap-x-5 mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="text-[#57369E] hover:text-[#00A7D3] font-semibold transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isSubmitButtonEnabled() || isSubmitting}
            className={`px-8 py-[10px] rounded-sm text-white font-semibold transition-all duration-200 ${
              isSubmitButtonEnabled()
                ? isSubmitting
                  ? "bg-[#BBBBBB]"
                  : "bg-[#57369E] hover:bg-[#00A7D3]"
                : "bg-[#BBBBBB]"
            }`}
          >
            {isSubmitting ? "Processing..." : "Confirm"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
