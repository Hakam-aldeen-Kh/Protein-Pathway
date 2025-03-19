import { useState } from "react";
import EditModal from "./EditModal";
import AddReactionModal from "./AddReactionModal";
import DeleteModal from "../common/DeleteModal";
import DetailsModal from "./DetailsModal";

function ReactionTable({ reactions, isEdit }) {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const [modalData, setModalData] = useState({
    isModalOpen: false,
    closeModal: () => console.log("click"),
    title: "",
    handleDelete: () => console.log("click")
  });

  const closeModal = () => setModalData((prev) => ({ ...prev, isModalOpen: false }))


  const [reactionData, setReactions] = useState(reactions.map(item => (
    {
      id: item.id,
      reactants: item.reactants.map(reactant => ({ code: reactant.name, image: "/images/gpr.png" })),
      enzyme: "-",
      sugarNucleotide: "D-Glucose",
      products: item.products.map(reactant => ({ code: reactant.name, image: "/images/gpr.png" })),
      cellularLocation: item.reactants[0].cellularLocation || "Cytosol",
    }
  )))

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

    setReactions((prev) => [...prev,
    {
      id: prev[prev.length - 1]?.id + 1 || 0,
      reactants: [{ code: "G04602LA", image: "/images/gpr.png" }],
      enzyme: "-",
      sugarNucleotide: "L-Fucose",
      products: [{ code: "G04602LA", image: "/images/gpr.png" }],
      cellularLocation: "Cytosol",
    }
    ])

  };

  const deleteReaction = (id) => {
    setModalData({
      isModalOpen: true,
      closeModal,
      title: "Reaction",
      handleDelete: () => {
        setReactions((prev) => prev.filter((reaction) => reaction.id !== id));
      }
    })
  };


  const handleEditClick = (reaction) => {
    setSelectedReaction(reaction);
    console.log(reaction)
    setEditModalOpen(true);
  };

  const handleAddReaction = () => {
    setAddModalOpen(true);
  };

  return (
    <div className="w-full mt-10">
      <EditModal
        isOpen={isEditModalOpen}
        setIsOpen={setEditModalOpen}
        data={selectedReaction}
        addReaction={() => console.log("edit reaction")}
        title={"Edit Reaction"}
      />
      <AddReactionModal
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
            {reactionData.map((reaction, index) => (
              <tr
                key={index}
                className="border-b-[5px] border-white bg-[#F1F5F9] hover:bg-gray-100 rounded"
              >
                <td className="px-4">{index}</td>

                <td className="flex  flex-col items-center gap-2 pb-1">
                  {reaction.reactants.map((item, index) =>
                    <div key={index} className="px-4 flex items-center gap-2 pt-[5px] " onClick={() => handleShowDetails(item)}>
                      <img
                        src={item.image}
                        alt={item.code}
                        className="w-[60px] h-[36px] object-contain"
                      />
                      <span className="text-violet-900 hover:text-violet-600 cursor-pointer">
                        {item.code}
                      </span>
                    </div>
                  )}
                </td>

                <td className="px-4">{reaction.enzyme}</td>

                <td className="px-4">{reaction.sugarNucleotide}</td>

                <td className="flex flex-col items-start gap-2 pt-[5px]">
                  {reaction.products.map((item, index) =>
                    <div key={index} className="px-4 flex items-center gap-2 pt-[5px]" onClick={() => handleShowDetails(item)}>
                      <img
                        src={item.image}
                        alt={item.code}
                        className="w-[60px] h-[36px] object-contain"
                      />
                      <span className="text-violet-900 hover:text-violet-600 cursor-pointer">
                        {item.code}
                      </span>
                    </div>
                  )}
                </td>

                <td className="px-4">{reaction.cellularLocation}</td>

                {isEdit && <td className="px-4 flex items-center h-full gap-2 -translate-y-[10px]">
                  <button>
                    <img src="/images/icons/add-square.svg" alt="add" />
                  </button>
                  <button onClick={() => handleEditClick(reaction)}>
                    <img src="/images/icons/edit-square.svg" alt="Edit" />
                  </button>
                  <button onClick={() => deleteReaction(reaction.id)}>
                    <img src="/images/icons/trash-square.svg" alt="Delete" />
                  </button>
                </td>}
              </tr>
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
