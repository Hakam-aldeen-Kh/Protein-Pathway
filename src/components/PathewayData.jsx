import { useState, useEffect } from "react";
import { Outlet } from "react-router";

const PathewayData = () => {
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
                    id: 0,
                    reactants: [{ id: 0, name: `reactant_0.0` }],
                    controllers: [{ id: 0, name: `controller_0.0` }],
                    products: [{ id: 0, name: `product_0.0` }],
                }
            ]
        };
    });

    // Save to localStorage whenever pathwayData changes
    useEffect(() => {
        localStorage.setItem('pathwayData', JSON.stringify(pathwayData));
    }, [pathwayData]);

    const save = () => {
        setMyPathwayData([...myPathwayData, pathwayData])
        localStorage.setItem('myPathwayData', JSON.stringify([...myPathwayData, pathwayData]));
        cancle()
    }

    const cancle = () => {
        const keysToKeep = ["isLoggedIn", "myPathwayData"];

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
                    id: 0,
                    reactants: [{ id: 0, name: `reactant_0.0` }],
                    controllers: [{ id: 0, name: `controller_0.0` }],
                    products: [{ id: 0, name: `product_0.0` }],
                }
            ]
        })

    }

    return (
        <Outlet context={{ pathwayData, setPathwayData, cancle, save, myPathwayData, setMyPathwayData }} />
    );
};

export default PathewayData;