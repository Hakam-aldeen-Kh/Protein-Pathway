import { useState } from "react";
import { useParams } from "react-router";

import PathwayDetails from "./components/PathwayDetails";
import { useGetPathwayById } from "../../services/pathway";
import NotFound from "../404/NotFound";


const PreviewPathway = () => {

    const { id } = useParams();

    const { pathwayData, isEdit, saveEditingPathway } = useGetPathwayById(id)

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


    return (
        <div className="flex flex-col px-32 py-[40px] max-md:px-5">
            <PathwayDetails
                pathway={pathwayClone}
                isEdit={isEdit}
                id={id}
                setPathwayClone={setPathwayClone}
                saveEditingPathway={saveEditingPathway}
                handleChangeData={handleChangeClone}
            />
        </div>
    )
};

export default PreviewPathway;
