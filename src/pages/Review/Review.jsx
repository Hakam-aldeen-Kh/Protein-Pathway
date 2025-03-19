import { useOutletContext } from "react-router";

import PathwayInfo from "../../components/PathwayInfo";
import { ShowToast } from "../../common/ToastNotification";
import ReactionReviewTable from "../../components/ReactionReviewTable";
import ReviewHeader from "../../common/ReviewHeader";


const Review = () => {

  const { pathwayData, save } = useOutletContext();

  const handleSave = () => {
    ShowToast("Pathway Added", "Your new pathway was added successfully")
    save()
  }


  return (
    <div className="flex flex-col px-32 py-[40px] max-md:px-5">
      <div className="flex overflow-hidden space-y-16 flex-col p-5 w-full bg-white rounded-lg border border-solid border-zinc-400 max-md:max-w-full">
        <ReviewHeader title={pathwayData.title} description={pathwayData.description} state="creation" handleSave={handleSave} />
        <PathwayInfo pathway={pathwayData} />
        <ReactionReviewTable reactions={pathwayData?.reactions} />
      </div>
    </div>
  );
};

export default Review;
