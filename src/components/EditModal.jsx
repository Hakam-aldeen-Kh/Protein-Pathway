
import ReactionModal from "./ReactionModal";


const EditModal = ({ title, data, isOpen, setIsOpen, addReaction, handleChangeData, setEditPathwayData }) => {
  if (!data) return null;

  return (
    <>
      <ReactionModal title={`${title} - ${data.id}`} setEditPathwayData={setEditPathwayData} handleChangeData={handleChangeData} data={data} isOpen={isOpen} setIsOpen={setIsOpen} addReaction={addReaction} />
    </>
  );
};

export default EditModal;
