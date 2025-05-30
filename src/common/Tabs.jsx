import { useEffect, useState } from 'react';

export function Tabs({ children, index = 0 }) {

    const storageKey = `activeTab-${index}`;

    const storedTab = localStorage.getItem(storageKey);
    const [activeTab, setActiveTab] = useState(storedTab ? parseInt(storedTab) : 0);

    useEffect(() => {
        localStorage.setItem(storageKey, activeTab);
    }, [activeTab, storageKey]);


    return (
        <div className="border-t p-4">
            <div className="flex space-x-1 ">
                {children.map((tab, index) =>
                    <button key={index} onClick={() => setActiveTab(index)} className={`px-4  py-2 bg-white rounded-t-lg text-gray-500 hover:text-gray-700 ${activeTab === index && "border-b-2 border-purple-500 font-medium"}`}>
                        {tab.props.label}
                    </button>
                )}
            </div>

            {children[activeTab]}
        </div>
    );
}

export function TabItem({ children }) {
    return children;
}