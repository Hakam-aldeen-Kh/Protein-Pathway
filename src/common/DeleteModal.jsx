import Modal from "react-modal";

function DeleteModal({ data }) {
    return (
        <Modal
            isOpen={data.isModalOpen}
            onRequestClose={data.closeModal}
            className="bg-white p-5 rounded shadow-lg w-[500px] mx-auto mt-40"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "
            shouldCloseOnOverlayClick={data.closeModal}
        >
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this {data.title}?</p>
            <div className="flex justify-end mt-4 space-x-2">
                <button onClick={data.closeModal} className="px-4 w-full py-2 bg-gray-300 rounded">Cancel</button>
                <button
                    onClick={() => {
                        data.handleDelete()
                        data.closeModal()
                    }}
                    className="px-4 w-full py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
        </Modal>
    )
}

export default DeleteModal
