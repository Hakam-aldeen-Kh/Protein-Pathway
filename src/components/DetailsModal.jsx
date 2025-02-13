import Modal from "react-modal";

const DetailsModal = ({ data }) => {

    const handleDownloadImge = () => {
        const link = document.createElement("a");
        link.href = data.imagesSrc;
        link.download = "downloaded-image.jpg";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Modal
            isOpen={data.isModalOpen}
            onRequestClose={data.closeModal}
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <div className="flex justify-end items-center pb-5 gap-4">
                <button onClick={handleDownloadImge} className="bg-slate-400">
                    <img className="w-6 h-6" src="/images/icons/document-download-light.svg" alt="download" />
                </button>
                <button onClick={data.closeModal} className="bg-slate-400">
                    <img className="w-6 h-6" src="/images/icons/close.svg" alt="Close" />
                </button>
            </div>
            <img src={data.imagesSrc} className="w-[400px] h-[300px]" alt="" />
            <h2 className="text-purple-500 text-3xl text-center">{data.code}</h2>
        </Modal>
    )
};

export default DetailsModal;
