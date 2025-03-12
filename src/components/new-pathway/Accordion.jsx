import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/24/outline';

const Accordion = ({ title, children, className = "", deleteReaction = null, variant }) => {
    const [open, setOpen] = useState(true);
    const handleToggle = () => setOpen(prev => !prev);

    return (
        <div className={className}>
            <div className={`rounded-t-lg px-4 py-3 flex justify-between items-center ${variant === "gray" && "bg-gray-100"}`}>
                <h2 className="font-medium">{title}</h2>
                <div className="flex items-center space-x-2">
                    {deleteReaction && <button onClick={deleteReaction} className="p-1 hover:bg-purple-100 rounded">
                        <TrashIcon className="h-5 w-5 text-gray-500" />
                    </button>}
                    <button className="p-1 hover:bg-purple-100 rounded" onClick={handleToggle}>
                        {open ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                    </button>
                </div>
            </div>
            {open && children}
        </div>
    )
};

export default Accordion;
