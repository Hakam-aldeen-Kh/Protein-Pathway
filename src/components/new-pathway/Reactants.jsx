import { PlusIcon } from "lucide-react";
import Accordion from "./Accordion";
import ReactantForm from "./ReactantForm";
import { useOutletContext } from "react-router";

const Reactants = ({ reaction, handleChangeData, setModalData }) => {

  const { setPathwayData } = useOutletContext();

  const closeModal = () => setModalData((prev) => ({ ...prev, isModalOpen: false }))

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
    setModalData({
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
        <Accordion key={index} className='border rounded-lg mb-10' variant="gray" deleteFn={() => deleteReactant(reaction.id, item.id)} title={`Reactant - ${reaction.id}.${item.id}`}>
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
