import { useOutletContext } from "react-router";

import { ShowToast } from "../../common/ToastNotification";
import PathwayDetails from "./components/PathwayDetails";


const ReviewPathway = () => {
    const { pathwayData, saveAfterCreation } = useOutletContext();

    const handleSave = () => {
        ShowToast("Pathway Added", "Your new pathway was added successfully")
        saveAfterCreation()
    }

    return (
        <div className="flex flex-col px-32 py-[40px] max-md:px-5">
            <PathwayDetails
                pathway={pathwayData}
                handleSave={handleSave}
                pageState={"review"} />
        </div>
    )
};

export default ReviewPathway;
