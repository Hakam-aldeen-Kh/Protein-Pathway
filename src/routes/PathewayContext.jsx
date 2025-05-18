import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { usePathway } from "../hooks/usePathway";

const PathewayContext = () => {
    const today = new Date();
    const recordDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

    const { isLoading, handleSubmitAddPathway, handleSubmitEditPathway, handleDeletePathway } = usePathway()

    const [myPathwayData, setMyPathwayData] = useState(() => {
        const saved = localStorage.getItem('myPathwayData');
        return saved ? JSON.parse(saved) : []
    });

    // Initialize state from localStorage if available, otherwise use current date
    const [pathwayData, setPathwayData] = useState(() => {
        const saved = localStorage.getItem('pathwayData');
        return saved ? JSON.parse(saved) : {
            id: Date.now(),
            reactions: [
                {
                    id: 1,
                    reactants: [{ id: 1, name: `reactant_1.1` }],
                    controllers: [],
                    products: [{ id: 1, name: `product_1.1` }],
                }
            ]
        };
    });

    // Save to localStorage whenever pathwayData changes
    useEffect(() => {
        localStorage.setItem('pathwayData', JSON.stringify(pathwayData));
    }, [pathwayData]);

    const saveAfterCreation = async () => {
        const updatedPathwayData = {
            ...pathwayData,
            recordDate
        };

        setMyPathwayData([...myPathwayData, updatedPathwayData])
        localStorage.setItem('myPathwayData', JSON.stringify([...myPathwayData, updatedPathwayData]));
        await handleSubmitAddPathway(updatedPathwayData)
        cancleCreation()
    }

    const saveAfterEdit = async (data) => {
        setMyPathwayData(data)
        await handleSubmitEditPathway(data)
        localStorage.setItem('myPathwayData', JSON.stringify(data));
        cancleCreation()
    }

    const cancleCreation = () => {
        const keysToKeep = ["isAuthenticated", "myPathwayData"];

        const allKeys = Object.keys(localStorage);

        allKeys.forEach(key => {
            if (!keysToKeep.includes(key)) {
                localStorage.removeItem(key);
            }
        });
        setPathwayData({
            id: Date.now(),
            reactions: [
                {
                    id: 1,
                    reactants: [{ id: 1, name: `reactant_1.1` }],
                    controllers: [],
                    products: [{ id: 1, name: `product_1.1` }],
                }
            ]
        })

    }

    return (
        <Outlet context={{ pathwayData, setPathwayData, cancleCreation, saveAfterCreation, saveAfterEdit, myPathwayData, setMyPathwayData, isLoading, handleDeletePathway }} />
    );
};

export default PathewayContext;