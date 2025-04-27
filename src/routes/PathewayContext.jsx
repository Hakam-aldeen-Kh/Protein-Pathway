import { useState, useEffect } from "react";
import { Outlet } from "react-router";

const PathewayContext = () => {
    const today = new Date();

    const [myPathwayData, setMyPathwayData] = useState(() => {
        const saved = localStorage.getItem('myPathwayData');
        return saved ? JSON.parse(saved) : []
    });

    // Initialize state from localStorage if available, otherwise use current date
    const [pathwayData, setPathwayData] = useState(() => {
        const saved = localStorage.getItem('pathwayData');
        return saved ? JSON.parse(saved) : {
            id: Date.now(),
            recordDate: `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`,
            reactions: [
                {
                    id: 1,
                    reactants: [{ id: 1, name: `reactant_1.1` }],
                    controllers: [{ id: 1, name: `controller_1.1` }],
                    products: [{ id: 1, name: `product_1.1` }],
                }
            ]
        };
    });

    // Save to localStorage whenever pathwayData changes
    useEffect(() => {
        localStorage.setItem('pathwayData', JSON.stringify(pathwayData));
    }, [pathwayData]);

    const saveAfterCreation = () => {
        setMyPathwayData([...myPathwayData, pathwayData])
        localStorage.setItem('myPathwayData', JSON.stringify([...myPathwayData, pathwayData]));
        cancleCreation()
    }

    const saveAfterEdit = (data) => {
        setMyPathwayData(data)
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
            recordDate: `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`,
            reactions: [
                {
                    id: 1,
                    reactants: [{ id: 1, name: `reactant_1.1` }],
                    controllers: [{ id: 1, name: `controller_1.1` }],
                    products: [{ id: 1, name: `product_1.1` }],
                }
            ]
        })

    }

    return (
        <Outlet context={{ pathwayData, setPathwayData, cancleCreation, saveAfterCreation, saveAfterEdit, myPathwayData, setMyPathwayData }} />
    );
};

export default PathewayContext;