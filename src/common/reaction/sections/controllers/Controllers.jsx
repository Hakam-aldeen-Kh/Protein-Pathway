import { PlusIcon } from "lucide-react";
import Accordion from "../../../Accordion";
import ControllerForm from "./ControllerForm";

const Controllers = ({
  reactions,
  reaction,
  handleChangeData,
  setDeleteModalData,
  setPathwayData,
  addReaction
}) => {

  // const isFindReference = (fromReaction, fromProduct) => {
  //   // Find the reaction with id 0
  //   const reaction = reactions.find((r) => r.id === fromReaction);
  //   if (!reaction) return false;

  //   // Check if the reaction has a product with id 0
  //   return reaction.products.some((p) => p.id === fromProduct);
  // };

  const closeModal = () => setDeleteModalData((prev) => ({ ...prev, isModalOpen: false }));

  const addController = (reactionId) => {
    setPathwayData((prevPathwayData) => ({
      ...prevPathwayData,
      reactions: prevPathwayData.reactions.map((reaction) =>
        reaction.id === reactionId
          ? {
            ...reaction,
            controllers: [
              ...reaction.controllers,
              {
                id:
                  reaction.controllers[reaction.controllers.length - 1]?.id +
                  1 || 1,
                name: `controller_${reactionId}.${reaction.controllers[reaction.controllers.length - 1]?.id +
                  1 || 1
                  }`,
              },
            ],
          }
          : reaction
      ),
    }));
  };

  const deleteController = (reactionId, controllerId) => {
    setDeleteModalData({
      isModalOpen: true,
      closeModal,
      title: "Contoller",
      handleDelete: () => {
        setPathwayData((prevPathwayData) => ({
          ...prevPathwayData,
          reactions: prevPathwayData.reactions.map((reaction) =>
            reaction.id === reactionId
              ? {
                ...reaction,
                controllers: reaction.controllers.filter(
                  (controller) => controller.id !== controllerId
                ),
              }
              : reaction
          ),
        }));
      },
    });
  };

  return (
    <div className="bg-white rounded-lg pb-2 rounded-tl-none p-5">
      {reaction.controllers?.map((item, index) => (
        <Accordion
          key={index}
          className="border rounded-lg mb-10"
          reference={item.reference || ""}
          variant="gray"
          deleteFn={() => deleteController(reaction.id, item.id)}
          title={`Controller - ${reaction.id}.${item.id}`}
          useInNextReaction={item.useNextReaction}
        >
          <ControllerForm
            isEdit={!item.reference || false}
            setPathwayData={setPathwayData}
            handleChangeData={handleChangeData}
            reaction={reaction}
            controllerData={item}
            controllerId={item.id}
            addReaction={addReaction}
            reactions={reactions}
          />
        </Accordion>
      ))}
      {reaction.controllers.length < 1 && (
        <button
          onClick={() => addController(reaction.id)}
          className="flex items-center text-blue-600 hover:text-blue-700 mt-5"
        >
          <PlusIcon className="h-5 w-5 mr-1" /> Add New controller
        </button>
      )}
    </div>
  );
};

export default Controllers;
