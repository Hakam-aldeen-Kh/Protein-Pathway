import Modal from "react-modal";

const DeleteAccountModal = ({ isOpen, closeModal, handleOnclick }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="bg-white p-5 rounded-lg shadow-lg w-[640px] mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <h2 className="ont-bold mb-5 text-xl font-bold">Logout</h2>
      <p className="text-base">
        Are you sure you want to logout from your account?
      </p>
      <div className="grid grid-cols-2 gap-x-5 mt-10">
        <button
          onClick={closeModal}
          className="text-[#57369E] hover:text-[#00A7D3] font-semibold transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleOnclick}
          className="px-8 py-[10px] rounded-sm text-white font-semibold transition-all duration-200 bg-[#57369E] hover:bg-[#00A7D3]"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
