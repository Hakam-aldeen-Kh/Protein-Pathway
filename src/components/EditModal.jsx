
import AddReactionModal from "./AddReactionModal";


const EditModal = ({ title, data, isOpen, setIsOpen, addReaction }) => {
  if (!data) return null;

  return (
    <>
      <AddReactionModal title={`${title} - ${data.id}`} data={data} isOpen={isOpen} setIsOpen={setIsOpen} addReaction={addReaction} />
    </>
  );
};

export default EditModal;
