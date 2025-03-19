import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import { TabItem, Tabs } from "../common/Tabs";
import Reactants from "./new-pathway/Reactants";
import Controllers from "./new-pathway/Controllers";
import Products from "./new-pathway/Products";
import DeleteModal from "../common/DeleteModal";


const AddReactionModal = ({ isOpen, setIsOpen, addReaction, title }) => {

  const [pathwayData, setPathwayData] = useState({
    reactions: [
      {
        id: 0,
        reactants: [{ id: 0, name: `reactant_0.0` }],
        controllers: [{ id: 0, name: `controller_0.0` }],
        products: [{ id: 0, name: `product_0.0` }],
      }
    ]
  });

  const handleChangeData = (reactionId, type, index, e, v) => {
    const { name, value, checked } = e.target;

    setPathwayData((prevPathwayData) => ({
      ...prevPathwayData,
      reactions: prevPathwayData.reactions.map((reaction) =>
        reaction.id === reactionId
          ? {
            ...reaction,
            [type]: reaction[type].map((item, i) =>
              i === index ? { ...item, [name]: value === "on" ? v ? v : checked : value } : item
            ),
          }
          : reaction
      ),
    }));
  }

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

  const [modalData, setModalData] = useState({
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

      <Tabs>
        <TabItem label="Reactants">
          <Reactants reaction={pathwayData.reactions[0]} setPathwayData={setPathwayData} handleChangeData={handleChangeData} setModalData={setModalData} />
        </TabItem>
        <TabItem label="Controllers">
          <Controllers reaction={pathwayData.reactions[0]} setPathwayData={setPathwayData} handleChangeData={handleChangeData} setModalData={setModalData} />
        </TabItem>
        <TabItem label="Products">
          <Products reaction={pathwayData.reactions[0]} setPathwayData={setPathwayData} handleChangeData={handleChangeData} setModalData={setModalData} addReaction={addReaction} />
        </TabItem>
      </Tabs>

      {/* Buttons */}
      <div className="flex gap-5 justify-center mt-10">
        <Button variant="secondary" onClick={closeMainModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {
          setIsOpen(false)
          addReaction()
        }}>
          Save
        </Button>
      </div>

      <DeleteModal data={modalData} />
    </Modal>
  );
};

export default AddReactionModal;
