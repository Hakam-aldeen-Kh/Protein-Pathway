import { PlusIcon } from "lucide-react";
import Accordion from "../../../Accordion";
import ReactantForm from "./ReactantForm";

const Reactants = ({ reactions, reaction, handleChangeData, setDeleteModalData, setPathwayData }) => {

  const isFindReference = (fromReaction, fromProduct) => {
    // Find the reaction with id 0
    const reaction = reactions.find(r => r.id === fromReaction);
    if (!reaction) return false;

    // Check if the reaction has a product with id 0
    return reaction.products.some(p => p.id === fromProduct);
  }

  const closeModal = () => setDeleteModalData((prev) => ({ ...prev, isModalOpen: false }))

  const addReactant = (reactionId) => {
    setPathwayData((prevPathwayData) => ({
      ...prevPathwayData,
      reactions: prevPathwayData.reactions.map((reaction) =>
        reaction.id === reactionId
          ? {
            ...reaction,
            reactants: [
              ...reaction.reactants,
              {
                id: reaction.reactants[reaction.reactants.length - 1]?.id + 1 || 0,
                name: `reactant_${reactionId}.${reaction.reactants[reaction.reactants.length - 1]?.id + 1 || 0}`
              }
            ]
          }
          : reaction
      )
    }));
  };

  const deleteReactant = (reactionId, reactantId) => {
    setDeleteModalData({
      isModalOpen: true,
      closeModal,
      title: "Reactant",
      handleDelete: () => {
        setPathwayData((prevPathwayData) => (
          {
            ...prevPathwayData,
            reactions: prevPathwayData.reactions.map((reaction) =>
              reaction.id === reactionId
                ? {
                  ...reaction,
                  reactants: reaction.reactants.filter((reactant) => reactant.id !== reactantId)
                }
                : reaction
            )
          }
        ))
      }
    })
  };

  return (
    <div className='bg-white rounded-lg pb-2 rounded-tl-none p-5'>
      {reaction.reactants.map((item, index) => (
        <Accordion key={index} className='border rounded-lg mb-10' reference={isFindReference(item.fromReaction, item.fromProduct) && item.reference} variant="gray" deleteFn={() => deleteReactant(reaction.id, item.id)} title={`Reactant - ${reaction.id}.${item.id}`}>
          <ReactantForm handleChangeData={handleChangeData} reaction={reaction} reactantData={item} reactantIndex={index} />
        </Accordion>
      ))}
      <button onClick={() => addReactant(reaction.id)} className="flex items-center text-blue-600 hover:text-blue-700 mt-5">
        <PlusIcon className="h-5 w-5 mr-1" /> Add New Reactant
      </button>
    </div>
  )
};

export default Reactants;
