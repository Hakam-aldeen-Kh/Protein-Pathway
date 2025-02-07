import { useState } from 'react'
import { PlusIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

const NewPathway = () => {
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(true)

    const [reactions, setReactions] = useState([
        {
            id: 1,
            isOpen: true,
            activeTab: 'reactants',
            reactants: [{ id: 1 }],
            controllers: [],
            products: []
        }
    ])

    const addReaction = () => {
        setReactions(prev => [...prev, {
            id: prev.length + 1,
            isOpen: true,
            activeTab: 'reactants',
            reactants: [{ id: 1 }],
            controllers: [],
            products: []
        }])
    }

    const deleteReaction = (reactionId) => {
        setReactions(prev => prev.filter(r => r.id !== reactionId))
    }

    const toggleReaction = (reactionId) => {
        setReactions(prev => prev.map(r =>
            r.id === reactionId ? { ...r, isOpen: !r.isOpen } : r
        ))
    }

    const changeTab = (reactionId, tab) => {
        setReactions(prev => prev.map(r =>
            r.id === reactionId ? { ...r, activeTab: tab } : r
        ))
    }

    const addItem = (reactionId, type) => {
        setReactions(prev => prev.map(r => {
            if (r.id === reactionId) {
                const items = r[type]
                return {
                    ...r,
                    [type]: [...items, { id: items.length + 1 }]
                }
            }
            return r
        }))
    }

    const deleteItem = (reactionId, type, itemId) => {
        setReactions(prev => prev.map(r => {
            if (r.id === reactionId) {
                return {
                    ...r,
                    [type]: r[type].filter(item => item.id !== itemId)
                }
            }
            return r
        }))
    }

    return (
        <div className="min-h-screen px-32 py-10">
            <div className="w-full mx-auto">
                <div className="bg-white">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Add New Pathway</h1>
                        <div className="space-x-2">
                            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                                Review
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">

                        {/* Pathway Basic Information */}
                        <div className="mb-6 border rounded-lg">
                            <button
                                className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 rounded-t-lg"
                                onClick={() => setIsBasicInfoOpen(!isBasicInfoOpen)}
                            >
                                <span className="font-medium">Pathway Basic Information</span>
                                {isBasicInfoOpen ? (
                                    <ChevronUpIcon className="h-5 w-5" />
                                ) : (
                                    <ChevronDownIcon className="h-5 w-5" />
                                )}
                            </button>

                            {isBasicInfoOpen && (
                                <div className="p-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Title <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="mt-1 p-2 block w-full rounded-md border border-gray-300  focus:border-blue-500 focus:ring-blue-500"
                                                placeholder="Add Title"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Description <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="mt-1 p-2 block w-full rounded-md border border-gray-300  focus:border-blue-500 focus:ring-blue-500"
                                                placeholder="Add Description"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Species</label>
                                            <select className="mt-1 p-2 block w-full rounded-md border border-gray-300  focus:border-blue-500 focus:ring-blue-500">
                                                <option>Select Species</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Pathway Category</label>
                                            <select className="mt-1 p-2 block w-full rounded-md border border-gray-300  focus:border-blue-500 focus:ring-blue-500">
                                                <option>Select Category</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Tissue</label>
                                            <select className="mt-1 p-2 block w-full rounded-md border border-gray-300  focus:border-blue-500 focus:ring-blue-500">
                                                <option>Select Tissue</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Related Disease</label>
                                            <select className="mt-1 p-2 block w-full rounded-md border border-gray-300  focus:border-blue-500 focus:ring-blue-500">
                                                <option>Type or Select Disease</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Citation</label>
                                            <input
                                                type="text"
                                                className="mt-1 p-2 block w-full rounded-md border border-gray-300  focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {reactions.map(reaction => (
                            <div key={reaction.id} className="bg-purple-50 rounded-lg">
                                <div className="flex items-center justify-between p-4">
                                    <h3 className="text-lg font-semibold">Reaction {reaction.id}</h3>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => deleteReaction(reaction.id)}
                                            className="p-1 text-gray-500 hover:text-gray-700"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => toggleReaction(reaction.id)}
                                            className="p-1 text-gray-500 hover:text-gray-700"
                                        >
                                            <ChevronUpIcon
                                                className={`w-5 h-5 transform ${reaction.isOpen ? '' : 'rotate-180'}`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {reaction.isOpen && (
                                    <div className="p-4">
                                        <div className="mb-4 border-b">
                                            <div className="flex space-x-4">
                                                {['reactants', 'controllers', 'products'].map(tab => (
                                                    <button
                                                        key={tab}
                                                        onClick={() => changeTab(reaction.id, tab)}
                                                        className={`px-4 py-2 -mb-px ${reaction.activeTab === tab
                                                            ? 'border-b-2 border-purple-600 text-purple-600'
                                                            : 'text-gray-500'
                                                            }`}
                                                    >
                                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {reaction[reaction.activeTab].map(item => (
                                                <div key={item.id} className="bg-white rounded-lg border p-4">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <h4 className="font-medium">
                                                            {reaction.activeTab.slice(0, -1)} - {String(item.id).padStart(2, '0')}
                                                        </h4>
                                                        <button
                                                            onClick={() => deleteItem(reaction.id, reaction.activeTab, item.id)}
                                                            className="p-1 text-gray-500 hover:text-gray-700"
                                                        >
                                                            <TrashIcon className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                    {/* Form fields would go here */}
                                                </div>
                                            ))}

                                            <button
                                                onClick={() => addItem(reaction.id, reaction.activeTab)}
                                                className="flex items-center justify-center w-full py-2 border-2 border-dashed border-gray-600 rounded-lg text-gray-500 hover:text-gray-700"
                                            >
                                                <PlusIcon className="w-5 h-5 mr-2" />
                                                Add New {reaction.activeTab.slice(0, -1)}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={addReaction}
                            className="flex items-center justify-center w-full py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:text-purple-700 bg-red-600"
                        >
                            <PlusIcon className="w-5 h-5 mr-2" />
                            Add New Reaction
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPathway
