import { useState } from "react";
import ReactionModal from "./ReactionModal";
import DeleteModal from "../common/DeleteModal";
import DetailsModal from "./DetailsModal";
import ReactionTableRow from "./ReactionTableRow";

function ReactionTable({ reactions, isEdit, handleChangeData, setEditPathwayData }) {

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const [modalData, setModalData] = useState({
    isModalOpen: false,
    closeModal: () => console.log("click"),
    title: "",
    handleDelete: () => console.log("click")
  });

  const closeModal = () => setModalData((prev) => ({ ...prev, isModalOpen: false }))

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

  // reactions
  const addReaction = () => {
    console.log("add reaction");
    // setReactions((prev) => [...prev,
    // {
    //   id: prev[prev.length - 1]?.id + 1 || 0,
    //   reactants: [{ code: "G04602LA", image: "/images/gpr.png" }],
    //   enzyme: "-",
    //   sugarNucleotide: "L-Fucose",
    //   products: [{ code: "G04602LA", image: "/images/gpr.png" }],
    //   cellularLocation: "Cytosol",
    // }
    // ])

  };

  const deleteReaction = (id) => {
    setModalData({
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


  const handleAddReaction = () => {
    setAddModalOpen(true);
  };

  return (
    <div className="w-full mt-10">
      <ReactionModal
        addReaction={addReaction}
        isOpen={isAddModalOpen}
        setIsOpen={setAddModalOpen}
        title="Add New Reaction"
      />

      <div className="flex flex-wrap gap-2.5 justify-center items-center w-full max-md:max-w-full mb-5">
        <h2 className="flex-1 shrink self-stretch my-auto text-2xl font-bold basis-0 text-neutral-900 max-md:max-w-full">
          Reaction Table
        </h2>
        {isEdit && <div className="flex gap-4 items-center self-stretch my-auto text-sm font-semibold text-center text-white">
          <button
            onClick={() => handleAddReaction()}
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
              <th className="p-3">Enzyme</th>
              <th className="p-3">Sugar Nucleotide</th>
              <th className="p-3">Product</th>
              <th className="p-3">Cell Location</th>
              {isEdit && <th className="p-3">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {reactions.map((reaction, reactionIndex) => (
              <ReactionTableRow
                key={reactionIndex}
                reactionIndex={reactionIndex}
                reaction={reaction}
                isEdit={isEdit}
                handleChangeData={handleChangeData}
                setEditPathwayData={setEditPathwayData}
                deleteReaction={deleteReaction}
                handleShowDetails={handleShowDetails}
              />
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModal data={modalData} />
      <DetailsModal data={detailsModal} />
    </div>
  );
}

export default ReactionTable;
