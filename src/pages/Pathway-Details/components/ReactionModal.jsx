import { useState } from "react";
import Modal from "react-modal";
// import Button from "./Button";
import DeleteModal from "../../../common/DeleteModal";
import Reaction from "../../../common/reaction/Reaction";


const ReactionModal = ({ isOpen, setIsOpen, addReaction, reactions, data, reactionIndex, title, handleChangeData, setEditPathwayData }) => {

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.50)",
    },
    content: {
      top: "20px",
      left: "50%",
      right: "auto",
      bottom: "20px",
      marginRight: "-50%",
      transform: "translate(-50%)",
      padding: "20px",
      borderRadius: "8px",
      width: "920px",
      background: "white",
      height: "auto",
      position: "relative"
    },
  };

  const closeMainModal = () => {
    setIsOpen(false)
  }

  const [deleteModalData, setDeleteModalData] = useState({
    isModalOpen: false,
    closeModal: () => console.log("click"),
    title: "",
    handleDelete: () => console.log("click")
  });


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeMainModal}
      style={customStyles}
      bodyOpenClassName="ReactModal__Body--open"
      htmlOpenClassName={
        "ReactModal__Html--open"}
      contentLabel="Edit Reaction Modal"
      ariaHideApp={false}
    >
      <div className="flex justify-between items-center pb-5">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={closeMainModal}>
          <img src="/images/icons/close.svg" alt="Close" />
        </button>
      </div>

      <Reaction
        reactions={reactions}
        reactionIndex={reactionIndex}
        reactionData={data}
        setPathwayData={setEditPathwayData}
        handleChangeData={handleChangeData}
        setDeleteModalData={setDeleteModalData}
        addReaction={addReaction}
      />

      {/* Buttons */}
      {/* <div className="flex gap-5 justify-center mt-10">
        <Button variant="secondary" onClick={closeMainModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {
          setIsOpen(false)
          addReaction()
        }}>
          Save
        </Button>
      </div> */}

      <DeleteModal data={deleteModalData} />
    </Modal>
  );
};

export default ReactionModal;
