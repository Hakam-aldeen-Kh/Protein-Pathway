import { useState } from "react";
import { useParams } from "react-router";

import PathwayDetails from "./components/PathwayDetails";
import { usePathwayDataById } from "../../hooks/usePathwayDataById";
import NotFound from "../404/NotFound";
import { ShowToast } from "../../common/ToastNotification";


const PreviewPathway = () => {

    const { id } = useParams();

    const { pathwayData, isEdit, saveEditingPathway } = usePathwayDataById(id)

    const [pathwayClone, setPathwayClone] = useState(pathwayData)

    if (!pathwayData) {
        return (
            <NotFound />
        );
    }

    const handleChangeClone = (e, reactionId = null, type = null, index = null, check = null) => {
        const { name, value, checked } = e.target;

        setPathwayClone((prevPathwayData) => {
            if (reactionId === null) {
                return { ...prevPathwayData, [name]: value };
            }

            return {
                ...prevPathwayData,
                reactions: prevPathwayData.reactions.map((reaction) =>
                    reaction.id === reactionId
                        ? {
                            ...reaction,
                            [type]: reaction[type].map((item, i) =>
                                i === index ? { ...item, [name]: value === "on" ? check ? check : checked : value } : item
                            ),
                        }
                        : reaction
                ),
            };


        });
    };

    const handleSaveAfterEdit = () => {
        ShowToast("Pathway Updated", "Your pathway was updated successfully")
        saveEditingPathway(pathwayClone, id)
    }


    return (
        <div className="flex flex-col px-32 py-[40px] max-md:px-5">
            <PathwayDetails
                pathway={pathwayClone}
                isEdit={isEdit}
                id={id}
                pageState={"preview"}
                setPathwayClone={setPathwayClone}
                handleSave={handleSaveAfterEdit}
                handleChangeClone={handleChangeClone}
            />
        </div>
    )
};

export default PreviewPathway;
