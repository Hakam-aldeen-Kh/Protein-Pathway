import { useState } from "react";

import DeleteModal from "../../../common/DeleteModal";

// import ReactionModal from "../components/ReactionModal";
import DetailsModal from "../components/DetailsModal";
import ReactionTableRow from "../components/ReactionTableRow";
// import { isReactionHaveReference } from "../../../utils/isReactionHaveReference";

function ReactionTable({
  reactions,
  isEdit,
  handleChangeData,
  setEditPathwayData,
}) {
  // const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [reactionState, setReactionState] = useState(
    reactions.map((r) => ({
      id: r.id,
      state: "old",
    }))
  );

  const [deleteModalData, setDeleteModalData] = useState({
    isModalOpen: false,
    closeModal: () => console.log("click"),
    title: "",
    handleDelete: () => console.log("click"),
  });

  const closeModal = () =>
    setDeleteModalData((prev) => ({ ...prev, isModalOpen: false }));

  const [detailsModal, setDetailsModal] = useState({
    isModalOpen: false,
    closeModal: () => console.log("click"),
    imagesSrc: "",
    code: "",
  });

  const closeDetailsModal = () =>
    setDetailsModal((prev) => ({ ...prev, isModalOpen: false }));

  const handleShowDetails = (item) => {
    setDetailsModal({
      isModalOpen: true,
      closeModal: closeDetailsModal,
      imagesSrc: item.image,
      code: item.name,
    });
  };

  const addReaction = () => {
    let reactionId = reactions[reactions.length - 1]?.id + 1 || 1;

    const newReaction = {
      id: reactionId,
      reactants: [{ id: 1, name: `reactant_${reactionId}.1` }],
      regulators: [{ id: 1, name: `regulator_${reactionId}.1` }],
      products: [{ id: 1, name: `product_${reactionId}.1` }],
    };

    setReactionState((prevState) => [
      ...prevState,
      { id: reactionId, state: "new" },
    ]);

    setReactionState((prevState) => {
      const updatedState = prevState.map((item) =>
        item.id === reactionId - 1
          ? { ...item, state: "warning" } // change state as needed
          : item
      );

      return [...updatedState];
    });

    setEditPathwayData((prevPathwayData) => {
      return {
        ...prevPathwayData,
        reactions: [...prevPathwayData.reactions, newReaction],
      };
    });

    return newReaction;
  };

  const addReactionAfterReaction = (targetReactionId) => {
    const targetIndex = reactions.findIndex((r) => r.id === targetReactionId);
    const targetReaction = reactions.find((r) => r.id === targetReactionId);

    let targetIndexNew = targetIndex;

    // remove linked between targetIndex and targetIndex+1
    if (reactions.find((r) => r.id === targetReactionId + 1)) {
      handleChangeData(
        { target: { value: "", name: "reference" } },
        targetReactionId + 1,
        "regulators",
        1
      );
      handleChangeData(
        { target: { value: "", name: "fromReaction" } },
        targetReactionId + 1,
        "regulators",
        1
      );
      handleChangeData(
        { target: { value: "", name: "productId" } },
        targetReactionId + 1,
        "regulators",
        1
      );
      handleChangeData(
        { target: { value: "", name: "connectedData" } },
        targetReactionId + 1,
        "regulators",
        1
      );

      for (let i = 0; i < targetReaction.products.length; i += 1) {
        const conectedReactantId =
          targetReaction.products[i].conectedReactantId;
        handleChangeData(
          { target: { value: false, name: "useNextReaction" } },
          targetReactionId,
          "products",
          targetReaction.products[i].id
        );

        if (conectedReactantId) {
          handleChangeData(
            { target: { value: "", name: "reference" } },
            targetReactionId + 1,
            "reactants",
            conectedReactantId
          );
          handleChangeData(
            { target: { value: "", name: "fromReaction" } },
            targetReactionId + 1,
            "reactants",
            conectedReactantId
          );
          handleChangeData(
            { target: { value: "", name: "connectedData" } },
            targetReactionId + 1,
            "reactants",
            conectedReactantId
          );
        }
      }

      handleChangeData(
        { target: { value: false, name: "useNextReaction" } },
        targetReactionId,
        "regulators",
        1
      );

      handleChangeData(
        { target: { value: "", name: "conectedReactantId" } },
        targetReactionId,
        "regulators",
        1
      );
      handleChangeData(
        { target: { value: "", name: "targetReactionId" } },
        targetReactionId,
        "regulators",
        1
      );

      const conectedReactantId =
        targetReaction?.regulators[0]?.conectedReactantId;

      if (conectedReactantId) {
        handleChangeData(
          { target: { value: "", name: "reference" } },
          targetReactionId + 1,
          "reactants",
          conectedReactantId
        );
        handleChangeData(
          { target: { value: "", name: "fromReaction" } },
          targetReactionId + 1,
          "reactants",
          conectedReactantId
        );
        handleChangeData(
          { target: { value: "", name: "connectedData" } },
          targetReactionId + 1,
          "reactants",
          conectedReactantId
        );
      }
    }

    setEditPathwayData((prevPathwayData) => {
      const reactions = [...prevPathwayData.reactions];

      // Find the index of the target reaction
      if (targetIndex === -1) {
        console.error("Target reaction not found");
        return prevPathwayData;
      }

      // Insert new reaction after target
      const newReaction = {
        id: targetReactionId + 1, // New ID is targetId + 1
        reactants: [{ id: 1, name: `reactant_${targetReactionId + 1}.1` }],
        regulators: [{ id: 1, name: `regulator_${targetReactionId + 1}.1` }],
        products: [{ id: 1, name: `product_${targetReactionId + 1}.1` }],
      };

      // Insert the new reaction after the target index
      reactions.splice(targetIndex + 1, 0, newReaction);

      // Shift and update IDs and names of all reactions after the inserted one
      for (let i = targetIndex + 2; i < reactions.length; i++) {
        const oldReaction = reactions[i];
        const newId = i + 1;

        reactions[i] = {
          ...oldReaction,
          id: newId,
          reactants: oldReaction.reactants.map((r) => ({
            ...r,
            name: `reactant_${newId}.1`,
          })),
          regulators: oldReaction.regulators.map((c) => ({
            ...c,
            name: `regulator_${newId}.1`,
          })),
          products: oldReaction.products.map((p) => ({
            ...p,
            name: `product_${newId}.1`,
          })),
        };
      }

      return {
        ...prevPathwayData,
        reactions,
      };
    });

    setReactionState((prevStates) => {
      let newStates = [...prevStates];

      // Insert new state
      newStates.splice(targetIndexNew + 1, 0, {
        id: targetReactionId + 1,
        state: "new",
      });

      // Update previous (if exists)
      if (targetIndexNew >= 0) {
        newStates[targetIndexNew] = {
          ...newStates[targetIndexNew],
          state: "warning",
        };
      }

      // Update next (if exists)
      if (targetIndexNew + 2 < newStates.length) {
        newStates[targetIndexNew + 2] = {
          ...newStates[targetIndexNew + 2],
          state: "warning",
        };
      }

      const updatedReactions = newStates.map((reaction, index) => {
        const newId = index + 1; // Start from

        return {
          id: newId,
          state: reaction.state,
        };
      });

      return updatedReactions;
    });

    return targetReactionId + 1;
  };

  const deleteReaction = (id) => {
    setDeleteModalData({
      isModalOpen: true,
      closeModal,
      title: "Reaction",
      handleDelete: () => {
        const targetIndex = reactions.findIndex((r) => r.id === id);
        const targetReactionId = id;

        const targetReaction = reactions.find((r) => r.id === targetReactionId);

        // remove linked between targetIndex and targetIndex+1
        if (reactions.find((r) => r.id === targetReactionId + 1)) {
          handleChangeData(
            { target: { value: "", name: "reference" } },
            targetReactionId + 1,
            "regulators",
            1
          );
          handleChangeData(
            { target: { value: "", name: "fromReaction" } },
            targetReactionId + 1,
            "regulators",
            1
          );
          handleChangeData(
            { target: { value: "", name: "productId" } },
            targetReactionId + 1,
            "regulators",
            1
          );
          handleChangeData(
            { target: { value: "", name: "connectedData" } },
            targetReactionId + 1,
            "regulators",
            1
          );

          for (let i = 0; i < targetReaction.products.length; i += 1) {
            const conectedReactantId =
              targetReaction.products[i].conectedReactantId;
            handleChangeData(
              { target: { value: false, name: "useNextReaction" } },
              targetReactionId,
              "products",
              targetReaction.products[i].id
            );

            if (conectedReactantId) {
              handleChangeData(
                { target: { value: "", name: "reference" } },
                targetReactionId + 1,
                "reactants",
                conectedReactantId
              );
              handleChangeData(
                { target: { value: "", name: "fromReaction" } },
                targetReactionId + 1,
                "reactants",
                conectedReactantId
              );
              handleChangeData(
                { target: { value: "", name: "connectedData" } },
                targetReactionId + 1,
                "reactants",
                conectedReactantId
              );
            }
          }

          handleChangeData(
            { target: { value: false, name: "useNextReaction" } },
            targetReactionId,
            "regulators",
            1
          );

          handleChangeData(
            { target: { value: "", name: "conectedReactantId" } },
            targetReactionId,
            "regulators",
            1
          );
          handleChangeData(
            { target: { value: "", name: "targetReactionId" } },
            targetReactionId,
            "regulators",
            1
          );

          const conectedReactantId =
            targetReaction.regulators[0].conectedReactantId;

          if (conectedReactantId) {
            handleChangeData(
              { target: { value: "", name: "reference" } },
              targetReactionId + 1,
              "reactants",
              conectedReactantId
            );
            handleChangeData(
              { target: { value: "", name: "fromReaction" } },
              targetReactionId + 1,
              "reactants",
              conectedReactantId
            );
            handleChangeData(
              { target: { value: "", name: "connectedData" } },
              targetReactionId + 1,
              "reactants",
              conectedReactantId
            );
          }
        }

        setReactionState((prevState) => {
          // Filter out the deleted ID
          let remainingStates = prevState.filter((state) => state.id !== id);

          if (targetIndex - 1 >= 0) {
            remainingStates[targetIndex - 1] = {
              ...remainingStates[targetIndex - 1],
              state: "warning",
            };
          }

          // Update next (if exists)
          if (targetIndex < remainingStates.length) {
            remainingStates[targetIndex] = {
              ...remainingStates[targetIndex],
              state: "warning",
            };
          }

          // Reindex state to match new reaction IDs
          return remainingStates.map((reaction, index) => {
            return {
              id: index + 1,
              state: reaction?.state || "old", // default to 'old' if not found
            };
          });
        });

        setEditPathwayData((prevPathwayData) => {
          // Step 1: Remove the selected reaction
          const filteredReactions = prevPathwayData.reactions.filter(
            (reaction) => reaction.id !== id
          );

          // Step 2: Re-index the remaining reactions and update names
          const updatedReactions = filteredReactions.map((reaction, index) => {
            const newId = index + 1; // Start from 1

            const updateNames = (items, type) =>
              items.map((item) => ({
                ...item,
                name: `${type}_${newId}.${item.id}`,
              }));

            return {
              ...reaction,
              id: newId,
              reactants: updateNames(reaction.reactants, "reactant"),
              regulators: updateNames(reaction.regulators, "regulator"),
              products: updateNames(reaction.products, "product"),
            };
          });

          return {
            ...prevPathwayData,
            reactions: updatedReactions,
          };
        });
      },
    });
  };

  return (
    <div className="w-full mt-10">
      <div className="flex flex-wrap gap-2.5 justify-center items-center w-full max-md:max-w-full mb-5">
        <h2 className="flex-1 shrink self-stretch my-auto text-2xl font-bold basis-0 text-neutral-900 max-md:max-w-full">
          Reaction Table
        </h2>
        {isEdit && (
          <div className="flex gap-4 items-center self-stretch my-auto text-sm font-semibold text-center text-white">
            <button
              onClick={addReaction}
              className="flex gap-2 justify-center items-center self-stretch px-8 my-auto bg-[#57369E] hover:bg-[#00A7D3] transition-colors duration-500 rounded-sm min-h-[32px] max-md:px-5"
            >
              <img src="/images/icons/pluse.svg" />
              <span className="self-stretch my-auto">Add New Reaction</span>
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm font-semibold">
              <th className="p-3">RXN ID</th>
              <th className="p-3">Reactant</th>
              <th className="p-3">Regulator</th>
              <th className="p-3">Product</th>
              <th className="p-3">Cell Type</th>
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
                handleChangeData={handleChangeData}
                setEditPathwayData={setEditPathwayData}
                deleteReaction={deleteReaction}
                handleShowDetails={handleShowDetails}
                addReactionAfterReaction={addReactionAfterReaction}
                addReaction={addReaction}
                reactionState={reactionState.find(
                  (item) => item.id === reaction.id
                )}
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
