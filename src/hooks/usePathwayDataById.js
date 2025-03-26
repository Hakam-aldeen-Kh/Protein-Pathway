import { useOutletContext } from "react-router";

import samplePathways from "../data/simpleData";

export const usePathwayDataById = (id) => {

    const { myPathwayData, saveAfterEdit } = useOutletContext();

    const publicPathways = samplePathways.find((p) => p.id === id)
    const myPathways = myPathwayData?.find((p) => p.id == id);

    const saveEditingPathway = (newData, id) => {
        const newPathways = myPathwayData.map(pathway =>
            Number(pathway.id) === Number(id) ? newData : pathway
        )
        saveAfterEdit(newPathways)
    }

    if (publicPathways) {
        return {
            pathwayData: publicPathways,
            isEdit: false
        }
    }

    else if (myPathways) {
        return {
            pathwayData: myPathways,
            isEdit: true,
            saveEditingPathway
        }
    }

    else {
        return {
            pathwayData: undefined,
            isEdit: undefined
        }
    }

}