import PathwayInfo from "./PathwayInfo";
import ReactionTable from "./ReactionTable";
import ReviewHeader from "./ReviewHeader";

const PathwayDetails = ({
  pathway,
  handleSave,
  id = null,
  isEdit = null,
  setPathwayClone,
  handleChangeClone
}) => {
  return (
    <div className="flex overflow-hidden space-y-16 flex-col p-5 w-full bg-white rounded-lg border border-solid border-zinc-400 max-md:max-w-full">
      <ReviewHeader title={pathway.title} description={pathway.description} state="review" handleSave={handleSave} isEdit={isEdit} />
      <PathwayInfo pathway={pathway} id={id} />
      <ReactionTable reactions={pathway.reactions} isEdit={isEdit} setEditPathwayData={setPathwayClone} handleChangeData={handleChangeClone} />
    </div>
  )
};

export default PathwayDetails;
