import { PlusIcon } from "lucide-react";
import Accordion from "../../../Accordion";
import RegulatorForm from "../regulators/RegulatorForm";

const Regulators = ({
  reactions,
  reaction,
  handleChangeData,
  setDeleteModalData,
  setPathwayData,
  addReaction,
}) => {
  const closeModal = () =>
    setDeleteModalData((prev) => ({ ...prev, isModalOpen: false }));

  const addRegulator = (reactionId) => {
    setPathwayData((prevPathwayData) => ({
      ...prevPathwayData,
      reactions: prevPathwayData.reactions.map((reaction) =>
        reaction.id === reactionId
          ? {
              ...reaction,
              regulators: [
                ...(reaction.regulators ?? []),
                {
                  id:
                    ((reaction.regulators ?? [])[
                      reaction.regulators?.length - 1
                    ]?.id ?? 0) + 1,
                  name: `regulator_${reactionId}.${
                    ((reaction.regulators ?? [])[
                      reaction.regulators?.length - 1
                    ]?.id ?? 0) + 1
                  }`,
                },
              ],
            }
          : reaction
      ),
    }));
  };

  const deleteRegulator = (reactionId, regulatorId) => {
    setDeleteModalData({
      isModalOpen: true,
      closeModal,
      title: "Regulator",
      handleDelete: () => {
        setPathwayData((prevPathwayData) => ({
          ...prevPathwayData,
          reactions: prevPathwayData.reactions.map((reaction) =>
            reaction.id === reactionId
              ? {
                  ...reaction,
                  regulators: (reaction.regulators ?? []).filter(
                    (regulator) => regulator.id !== regulatorId
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
      {(reaction.regulators ?? []).map((item, index) => (
        <Accordion
          key={index}
          className="border rounded-lg mb-10"
          reference={item.reference || ""}
          variant="gray"
          deleteFn={() => deleteRegulator(reaction.id, item.id)}
          title={`Regulator - ${reaction.id}.${item.id}`}
          useInNextReaction={item.useNextReaction}
        >
          <RegulatorForm
            isEdit={!item.reference || false}
            setPathwayData={setPathwayData}
            handleChangeData={handleChangeData}
            reaction={reaction}
            regulatorData={item}
            regulatorId={item.id}
            addReaction={addReaction}
            reactions={reactions}
          />
        </Accordion>
      ))}
      {(reaction.regulators ?? []).length < 1 && (
        <button
          onClick={() => addRegulator(reaction.id)}
          className="flex items-center text-blue-600 hover:text-blue-700 mt-5"
        >
          <PlusIcon className="h-5 w-5 mr-1" /> Add New regulator
        </button>
      )}
    </div>
  );
};

export default Regulators;
