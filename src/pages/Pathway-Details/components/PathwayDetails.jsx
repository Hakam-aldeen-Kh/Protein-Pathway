import { capitalize } from "../../../hooks/useCapitalize";
import PathwayInfo from "../sections/PathwayInfo";
import ReactionTable from "../sections/ReactionTable";
import ReviewHeader from "../sections/ReviewHeader";

const PathwayDetails = ({
  pathway,
  handleSave,
  id,
  isEdit = null,
  setPathwayClone,
  handleChangeClone,
  pageState,
  isLoading,
  handleExport,
  exportLoading
}) => {

  return (
    <div className="flex overflow-hidden space-y-16 flex-col p-5 w-full bg-white rounded-lg border border-solid border-zinc-400 max-md:max-w-full">
      <ReviewHeader pathwayId={id} title={capitalize(pathway.title)} description={capitalize(pathway.description)} pageState={pageState} handleSave={handleSave} isEdit={isEdit} editLoading={isLoading} exportLoading={exportLoading} handleExport={handleExport} />
      <PathwayInfo pathway={pathway} id={id} />
      <ReactionTable reactions={pathway.reactions} isEdit={isEdit} setEditPathwayData={setPathwayClone} handleChangeData={handleChangeClone} />
    </div>
  )
};

export default PathwayDetails;
