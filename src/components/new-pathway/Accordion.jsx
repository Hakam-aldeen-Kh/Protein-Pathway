import { useEffect, useState } from "react";
import { ChevronUpIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/24/outline';

const Accordion = ({ title, children, className = "", deleteFn = null, variant }) => {

    const storageKey = `${title} Accordion`;
    const storedState = localStorage.getItem(storageKey);

    const [open, setOpen] = useState(storedState ? parseInt(storedState) : 1);

    const handleToggle = () => setOpen(prev => (prev === 0 ? 1 : 0));

    useEffect(() => {
        localStorage.setItem(storageKey, open);
    }, [open, storageKey]);

    return (
        <div className={className}>
            <div className={`rounded-t-lg px-4 py-3 flex justify-between items-center ${variant === "gray" && "bg-gray-100"}`}>
                <h2 className="font-medium">{title}</h2>
                <div className="flex items-center space-x-2">
                    {deleteFn && <button onClick={deleteFn} className="p-1 hover:bg-purple-100 rounded">
                        <TrashIcon className="h-5 w-5 text-gray-500" />
                    </button>}
                    <button className="p-1 hover:bg-purple-100 rounded" onClick={handleToggle}>
                        {open ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                    </button>
                </div>
            </div>
            {open === 1 && children}
        </div>
    )
};

export default Accordion;
