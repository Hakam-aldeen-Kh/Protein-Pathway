
import { useParams } from "react-router";

import "../../styles/global.css";

import ReactionTable from "../../components/ReactionTable";
import { ShowToast } from "../../common/ToastNotification";
import ReviewHeader from "../../common/ReviewHeader";
import { useGetPathwayById } from "../../services/pathway";
import PathwayInfo from "../../components/PathwayInfo";
import NotFound from "../404/NotFound";


const Preview = () => {
  const { id } = useParams();

  const { pathwayData, isEdit } = useGetPathwayById(id)

  if (!pathwayData) {
    return (
      <NotFound />
    );
  }

  const handleSave = () => {
    ShowToast("Pathway Updated", "Your pathway was updated successfully")
  }

  return (
    <div className="flex flex-col px-32 py-[40px] max-md:px-5">
      <div className="flex overflow-hidden space-y-16 flex-col p-5 w-full bg-white rounded-lg border border-solid border-zinc-400 max-md:max-w-full">
        <ReviewHeader title={pathwayData.title} description={pathwayData.description} state="review" handleSave={handleSave} isEdit={isEdit} />
        <PathwayInfo pathway={pathwayData} id={id} />
        <ReactionTable reactions={pathwayData.reactions} isEdit={isEdit} />
      </div>
    </div>
  );
};

export default Preview;
