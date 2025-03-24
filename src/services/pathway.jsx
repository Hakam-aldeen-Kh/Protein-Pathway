import { useOutletContext } from "react-router";
import samplePathways from "../data/simpleData";

export const useGetPathwayById = (id) => {

    const { myPathwayData, edit } = useOutletContext();
    const pathway1 = samplePathways.find((p) => p.id === id)
    const pathway2 = myPathwayData?.find((p) => p.id == id);

    const saveEditingPathway = (newData, id) => {
        const newPathways = myPathwayData.map(pathway =>
            pathway.id == id ? newData : pathway
        )
        edit(newPathways)
    }

    if (pathway1) {
        return {
            pathwayData: pathway1,
            isEdit: false
        }
    }

    else if (pathway2) {
        return {
            pathwayData: pathway2,
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