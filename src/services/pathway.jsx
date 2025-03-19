import { useOutletContext } from "react-router";
import samplePathways from "../data/simpleData";

export const useGetPathwayById = (id) => {

    const { myPathwayData } = useOutletContext();
    const pathway1 = samplePathways.find((p) => p.id === id)
    const pathway2 = myPathwayData?.find((p) => p.id == id);

    if (pathway1) {
        return {
            pathwayData: pathway1,
            isEdit: false
        }
    }

    else if (pathway2) {
        return {
            pathwayData: pathway2,
            isEdit: true
        }
    }

    else {
        return {
            pathwayData: undefined,
            isEdit: undefined
        }
    }

}