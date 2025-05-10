import { useState } from "react";

import DeleteModal from "../../../common/DeleteModal";

import ReactionModal from "../components/ReactionModal";
import DetailsModal from "../components/DetailsModal";
import ReactionTableRow from "../components/ReactionTableRow";


function ReactionTable({ reactions, isEdit, handleChangeData, setEditPathwayData }) {

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  let reactionId = reactions[reactions.length - 1]?.id + 1 || 1;

  const newReaction = {
    id: reactionId,
    reactants: [{ id: 1, name: `reactant_${reactionId}.1` }],
    controllers: [{ id: 1, name: `controller_${reactionId}.1` }],
    products: [{ id: 1, name: `product_${reactionId}.1` }],
  };

  const [pathwayCloneForAddReaction, setPathwayCloneForAddReaction] = useState({ reactions: [newReaction] });

  const [pathwayCloneForEditReaction, setPathwayCloneForEditReaction] = useState({});


  const [deleteModalData, setDeleteModalData] = useState({
    isModalOpen: false,
    closeModal: () => console.log("click"),
    title: "",
    handleDelete: () => console.log("click")
  });

  const closeModal = () => setDeleteModalData((prev) => ({ ...prev, isModalOpen: false }))

  const [detailsModal, setDetailsModal] = useState({
    isModalOpen: false,
    closeModal: () => console.log("click"),
    imagesSrc: "",
    code: "",
  });

  const closeDetailsModal = () => setDetailsModal((prev) => ({ ...prev, isModalOpen: false }))

  const handleShowDetails = (item) => {
    setDetailsModal({
      isModalOpen: true,
      closeModal: closeDetailsModal,
      imagesSrc: item.image,
      code: item.name,
    })
  }

  const addReaction = () => {
    setEditPathwayData((prevPathwayData) => {
      return {
        ...prevPathwayData,
        reactions: [...prevPathwayData.reactions, pathwayCloneForAddReaction.reactions[0]],
      };
    });

  };

  const deleteReaction = (id) => {
    setDeleteModalData({
      isModalOpen: true,
      closeModal,
      title: "Reaction",
      handleDelete: () => {
        setEditPathwayData((prevPathwayData) => ({
          ...prevPathwayData,
          reactions: prevPathwayData.reactions.filter((reaction) => reaction.id !== id)
        }));
      }
    })
  };

  const editReaction = () => {
    setEditPathwayData((prevPathwayData) => {
      return {
        ...prevPathwayData,
        reactions: [...prevPathwayData.reactions, pathwayCloneForEditReaction.reactions[0]],
      };
    });

  };
  const handleChangeDataCloneForAddReaction = (e, reactionId = null, type = null, id = null, check = null) => {
    const { name, value, checked } = e.target;

    setPathwayCloneForAddReaction((prevPathwayData) => {
      if (reactionId === null) {
        return { ...prevPathwayData, [name]: value };
      }

      return {
        ...prevPathwayData,
        reactions: prevPathwayData.reactions.map((reaction) =>
          reaction?.id === reactionId
            ? {
              ...reaction,
              [type]: reaction[type].map((item) =>
                item.id === id ? { ...item, [name]: value === "on" ? check ? check : checked : value } : item
              ),
            }
            : reaction
        ),
      };

    });
  };

  const handleChangeDataCloneForEditReaction = (e, reactionId = null, type = null, id = null, check = null) => {
    const { name, value, checked } = e.target;

    setPathwayCloneForEditReaction((prevPathwayData) => {
      if (reactionId === null) {
        return { ...prevPathwayData, [name]: value };
      }

      return {
        ...prevPathwayData,
        reactions: prevPathwayData.reactions.map((reaction) =>
          reaction.id === reactionId
            ? {
              ...reaction,
              [type]: reaction[type].map((item) =>
                item.id === id ? { ...item, [name]: value === "on" ? check ? check : checked : value } : item
              ),
            }
            : reaction
        ),
      };

    });
  };


  return (
    <div className="w-full mt-10">
      <ReactionModal
        reactions={pathwayCloneForAddReaction.reactions}
        addReaction={addReaction}
        isOpen={isAddModalOpen}
        setIsOpen={setAddModalOpen}
        title="Add New Reaction"
        data={pathwayCloneForAddReaction.reactions[0]}
        handleChangeData={handleChangeDataCloneForAddReaction}
        setEditPathwayData={setPathwayCloneForAddReaction}
      />

      <div className="flex flex-wrap gap-2.5 justify-center items-center w-full max-md:max-w-full mb-5">
        <h2 className="flex-1 shrink self-stretch my-auto text-2xl font-bold basis-0 text-neutral-900 max-md:max-w-full">
          Reaction Table
        </h2>
        {isEdit && <div className="flex gap-4 items-center self-stretch my-auto text-sm font-semibold text-center text-white">
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex gap-2 justify-center items-center self-stretch px-8 my-auto bg-[#57369E] hover:bg-[#00A7D3] transition-colors duration-500 rounded-sm min-h-[32px] max-md:px-5"
          >
            <img src="/images/icons/pluse.svg" />
            <span className="self-stretch my-auto">Add New Reaction</span>
          </button>
        </div>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm font-semibold">
              <th className="p-3">RXN ID</th>
              <th className="p-3">Reactant</th>
              <th className="p-3">Controller</th>
              <th className="p-3">Product</th>
              <th className="p-3">Cell Location</th>
              {isEdit && <th className="p-3">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {reactions.map((reaction, reactionIndex) => (
              <ReactionTableRow
                reactions={reactions}
                key={reactionIndex}
                reactionIndex={reactionIndex}
                reaction={reaction}
                isEdit={isEdit}
                handleChangeData={handleChangeDataCloneForEditReaction}
                setEditPathwayData={setPathwayCloneForEditReaction}
                deleteReaction={deleteReaction}
                editReaction={editReaction}
                addReaction={addReaction}
                handleShowDetails={handleShowDetails}
              />
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModal data={deleteModalData} />
      <DetailsModal data={detailsModal} />
    </div>
  );
}

export default ReactionTable;
