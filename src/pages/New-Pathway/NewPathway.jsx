import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate, useOutletContext } from "react-router";

import BasicInfoForm from "./sections/BasicInfoForm";
import Accordion from "../../common/Accordion";
import DeleteModal from "../../common/DeleteModal";
import Reaction from "../../common/reaction/Reaction";

const NewPathway = () => {
  const { pathwayData, setPathwayData, cancleCreation } = useOutletContext();

  const [isReviewDisabled, setIsReviewDisabled] = useState(true);

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

  const addReaction = (withController, newReactionId) => {
    let reactionId =
      pathwayData.reactions[pathwayData.reactions.length - 1]?.id + 1 || 1;
    let reOrder = false;

    if (newReactionId && newReactionId !== reactionId) {
      reactionId = newReactionId;
      reOrder = true;
    }

    let newReaction = {};

    if (withController === true) {
      newReaction = {
        id: reactionId,
        reactants: [{ id: 1, name: `reactant_${reactionId}.1` }],
        controllers: [{ id: 1, name: `controller_${reactionId}.1` }],
        products: [{ id: 1, name: `product_${reactionId}.1` }],
      };
    } else {
      newReaction = {
        id: reactionId,
        reactants: [{ id: 1, name: `reactant_${reactionId}.1` }],
        controllers: [],
        products: [{ id: 1, name: `product_${reactionId}.1` }],
      };
    }

    if (reOrder) {
      setPathwayData((prevPathwayData) => {
        let newReactions = [...prevPathwayData.reactions];
        newReactions.splice(reactionId - 1, 0, newReaction);

        return {
          ...prevPathwayData,
          reactions: newReactions,
        };
      });
    } else {
      setPathwayData((prevPathwayData) => {
        return {
          ...prevPathwayData,
          reactions: [...prevPathwayData.reactions, newReaction],
        };
      });
    }

    return newReaction;
  };

  const deleteReaction = (id) => {
    setDeleteModalData({
      isModalOpen: true,
      title: "Reaction",
      closeModal: () =>
        setDeleteModalData((prev) => ({ ...prev, isModalOpen: false })),
      handleDelete: () => {
        const targetReactionId = id;

        const targetReaction = pathwayData.reactions.find(
          (r) => r.id === targetReactionId
        );

        // remove linked between targetIndex and targetIndex+1
        if (pathwayData.reactions.find((r) => r.id === targetReactionId + 1)) {
          handleChange(
            { target: { value: "", name: "reference" } },
            targetReactionId + 1,
            "controllers",
            1
          );
          handleChange(
            { target: { value: "", name: "fromReaction" } },
            targetReactionId + 1,
            "controllers",
            1
          );
          handleChange(
            { target: { value: "", name: "productId" } },
            targetReactionId + 1,
            "controllers",
            1
          );
          handleChange(
            { target: { value: "", name: "connectedData" } },
            targetReactionId + 1,
            "controllers",
            1
          );

          // handleChange({ target: { value: "", name: "conectedReactantId" } }, reaction.id, "products", productId)

          for (let i = 0; i < targetReaction.products.length; i += 1) {
            const conectedReactantId =
              targetReaction.products[i].conectedReactantId;
            handleChange(
              { target: { value: false, name: "useNextReaction" } },
              targetReactionId,
              "products",
              targetReaction.products[i].id
            );

            if (conectedReactantId) {
              handleChange(
                { target: { value: "", name: "reference" } },
                targetReactionId + 1,
                "reactants",
                conectedReactantId
              );
              handleChange(
                { target: { value: "", name: "fromReaction" } },
                targetReactionId + 1,
                "reactants",
                conectedReactantId
              );
              handleChange(
                { target: { value: "", name: "connectedData" } },
                targetReactionId + 1,
                "reactants",
                conectedReactantId
              );
            }
          }

          handleChange(
            { target: { value: false, name: "useNextReaction" } },
            targetReactionId,
            "controllers",
            1
          );

          handleChange(
            { target: { value: "", name: "conectedReactantId" } },
            targetReactionId,
            "controllers",
            1
          );
          handleChange(
            { target: { value: "", name: "targetReactionId" } },
            targetReactionId,
            "controllers",
            1
          );

          const conectedReactantId =
            targetReaction?.controllers[0]?.conectedReactantId;

          if (conectedReactantId) {
            handleChange(
              { target: { value: "", name: "reference" } },
              targetReactionId + 1,
              "reactants",
              conectedReactantId
            );
            handleChange(
              { target: { value: "", name: "fromReaction" } },
              targetReactionId + 1,
              "reactants",
              conectedReactantId
            );
            handleChange(
              { target: { value: "", name: "connectedData" } },
              targetReactionId + 1,
              "reactants",
              conectedReactantId
            );
          }
        }

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
                className={`px-4 py-2 text-white rounded transition-all duration-200 ${
                  isReviewDisabled
                    ? "bg-gray-400"
                    : "bg-[#57369E] hover:bg-[#00A7D3]"
                }`}
                onClick={handleSubmit}
                disabled={isReviewDisabled}
              >
                Review
              </button>
            </div>
          </div>

          {/* Pathway Basic Information */}
          <BasicInfoForm
            data={pathwayData}
            handleChange={handleChange}
            setIsReviewDisabled={setIsReviewDisabled}
          />

          {/* Reactions */}
          {pathwayData?.reactions?.map((reaction, index) => (
            <div key={reaction.id}>
              <Accordion
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
              <p className=" text-sm">
                To complete the pathway input, please click the &apos;Save a
                Pathway&apos; button in the upper right corner after reviewing.
              </p>
            </div>
          ))}

          {(pathwayData.regulators ?? []).map((item, index) => (
            <div key={item.id}>
              <Accordion
                title={`Regulator - ${item.id}`}
                className="border bg-[#DDD7EC] rounded-lg mb-4"
                deleteFn={() => deleteReaction(item.id)}
              >
                <Reaction
                  reactions={pathwayData?.reactions}
                  reactionIndex={index}
                  reactionData={item}
                  setPathwayData={setPathwayData}
                  handleChangeData={handleChange}
                  setDeleteModalData={setDeleteModalData}
                  addReaction={addReaction}
                />
              </Accordion>
              <p className=" text-sm">
                To complete the pathway input, please click the &apos;Save a
                Pathway&apos; button in the upper right corner after reviewing.
              </p>
            </div>
          ))}
          {(pathwayData.regulators ?? []).length < 1 && (
            <div className="text-center text-gray-500 py-4">
              No regulators found. You can add a regulator in the reaction
              settings.
            </div>
          )}

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
