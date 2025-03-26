import PathwayInfo from "../sections/PathwayInfo";
import ReactionTable from "../sections/ReactionTable";
import ReviewHeader from "../sections/ReviewHeader";

const PathwayDetails = ({
  pathway,
  handleSave,
  id = null,
  isEdit = null,
  setPathwayClone,
  handleChangeClone,
  pageState
}) => {
  return (
    <div className="flex overflow-hidden space-y-16 flex-col p-5 w-full bg-white rounded-lg border border-solid border-zinc-400 max-md:max-w-full">
      <ReviewHeader title={pathway.title} description={pathway.description} pageState={pageState} handleSave={handleSave} isEdit={isEdit} />
      <PathwayInfo pathway={pathway} id={id} />
      <ReactionTable reactions={pathway.reactions} isEdit={isEdit} setEditPathwayData={setPathwayClone} handleChangeData={handleChangeClone} />
    </div>
  )
};

export default PathwayDetails;
