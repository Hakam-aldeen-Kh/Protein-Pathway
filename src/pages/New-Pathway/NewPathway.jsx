import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate, useOutletContext } from "react-router";

import BasicInfoForm from "./sections/BasicInfoForm";
import Accordion from "../../common/Accordion";
import DeleteModal from "../../common/DeleteModal";
import Reaction from "../../common/reaction/Reaction";

const NewPathway = () => {
  const { pathwayData, setPathwayData, cancleCreation } = useOutletContext();

  const navigate = useNavigate();

  const [deleteModalData, setDeleteModalData] = useState({
    isModalOpen: false,
    closeModal: () => console.log("click"),
    title: "",
    handleDelete: () => console.log("click"),
  });

  const handleChange = (
    e,
    reactionId = null,
    type = null,
    id = null,
    v = null
  ) => {
    const { name, value, checked } = e.target;

    setPathwayData((prevPathwayData) => {
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
                item.id === id
                  ? {
                    ...item,
                    [name]: value === "on" ? (v ? v : checked) : value,
                  }
                  : item
              ),
            }
            : reaction
        ),
      };
    });
  };

  const handleSubmit = () => {
    console.log("pathwayData : ", pathwayData);
    navigate("/review");
  };

  const addReaction = (withController) => {
    let reactionId = pathwayData.reactions[pathwayData.reactions.length - 1]?.id + 1 || 1;
    let newReaction = {}

    if (withController === true) {
      newReaction = {
        id: reactionId,
        reactants: [{ id: 1, name: `reactant_${reactionId}.1` }],
        controllers: [{ id: 1, name: `controller_${reactionId}.1` }],
        products: [{ id: 1, name: `product_${reactionId}.1` }],
      };
    }

    else {
      newReaction = {
        id: reactionId,
        reactants: [{ id: 1, name: `reactant_${reactionId}.1` }],
        controllers: [],
        products: [{ id: 1, name: `product_${reactionId}.1` }],
      };
    }


    setPathwayData((prevPathwayData) => {
      return {
        ...prevPathwayData,
        reactions: [...prevPathwayData.reactions, newReaction],
      };
    });

    return newReaction;
  };

  const deleteReaction = (id) => {
    setDeleteModalData({
      isModalOpen: true,
      title: "Reaction",
      closeModal: () =>
        setDeleteModalData((prev) => ({ ...prev, isModalOpen: false })),
      handleDelete: () => {
        setPathwayData((prevPathwayData) => ({
          ...prevPathwayData,
          reactions: prevPathwayData.reactions.filter(
            (reaction) => reaction.id !== id
          ),
        }));
      },
    });
  };

  const handelCancelPathway = () => {
    cancleCreation();
    navigate("/");
  };

  return (
    <div className="min-h-screen px-32 py-10">
      <div className="w-full mx-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center sticky top-0 bg-white px-2 py-5 z-10">
            <h1 className="text-4xl font-black">Add New Pathway</h1>
            <div className="space-x-2">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={handelCancelPathway}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#57369E] text-white rounded"
                onClick={handleSubmit}
              >
                Review
              </button>
            </div>
          </div>

          {/* Pathway Basic Information */}
          <BasicInfoForm data={pathwayData} handleChange={handleChange} />

          {/* Reactions */}
          {pathwayData?.reactions?.map((reaction, index) => (
            <Accordion
              key={reaction.id}
              title={`Reaction - ${reaction.id}`}
              className="border bg-[#DDD7EC] rounded-lg mb-4"
              deleteFn={() => deleteReaction(reaction.id)}
            >
              <Reaction
                reactions={pathwayData?.reactions}
                reactionIndex={index}
                reactionData={reaction}
                setPathwayData={setPathwayData}
                handleChangeData={handleChange}
                setDeleteModalData={setDeleteModalData}
                addReaction={addReaction}
              />
            </Accordion>
          ))}

          <button
            onClick={addReaction}
            className="mt-4 bg-white border border-[#57369E] text-[#57369E] flex items-center justify-center p-3 mx-auto font-bold"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            <span>Add New Reaction</span>
          </button>
        </div>
      </div>

      <DeleteModal data={deleteModalData} />
    </div>
  );
};

export default NewPathway;
