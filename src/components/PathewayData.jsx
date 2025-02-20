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

    const [reactionsState, setReactionsState] = useState(() => {
        const saved = localStorage.getItem('reactionsState');
        return saved ? JSON.parse(saved) : [
            {
                id: 0,
                state: true,
                reactants: [{ id: 0, state: true }],
                controllers: [{ id: 0, state: true }],
                products: [{ id: 0, state: true }]
            }
        ]
    });

    // Save to localStorage whenever pathwayData changes
    useEffect(() => {
        localStorage.setItem('pathwayData', JSON.stringify(pathwayData));
    }, [pathwayData]);

    useEffect(() => {
        localStorage.setItem('reactionsState', JSON.stringify(reactionsState));
    }, [reactionsState]);

    const clearPathwayData = () => {
        localStorage.removeItem('pathwayData');
        localStorage.removeItem('reactionsState');

        setMyPathwayData([...myPathwayData, pathwayData])
        localStorage.setItem('myPathwayData', JSON.stringify([...myPathwayData, pathwayData]));


    }

    const cancle = () => {
        localStorage.removeItem('pathwayData');
        localStorage.removeItem('reactionsState');


    }

    return (
        <Outlet context={{ pathwayData, setPathwayData, reactionsState, cancle, setReactionsState, clearPathwayData, myPathwayData, setMyPathwayData }} />
    );
};

export default PathewayData;