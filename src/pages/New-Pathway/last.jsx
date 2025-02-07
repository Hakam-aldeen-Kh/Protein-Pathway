import { useState } from 'react'
import { ChevronUpIcon, ChevronDownIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'

function NewPathway() {
    const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(true)
    const [isReactionOpen, setIsReactionOpen] = useState(true)

    return (
        <div className="min-h-screen px-32 py-10">
            <div className="w-full mx-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6 sticky top-0 bg-white px-2 py-5">
                        <h1 className="text-2xl font-bold">Add New Pathway</h1>
                        <div className="space-x-2">
                            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Review
                            </button>
                        </div>
                    </div>

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
                                            className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="Add Title"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Description <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="Add Description"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Species</label>
                                        <select className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                            <option>Select Species</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Pathway Category</label>
                                        <select className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                            <option>Select Category</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tissue</label>
                                        <select className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                            <option>Select Tissue</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Related Disease</label>
                                        <select className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                            <option>Type or Select Disease</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Citation</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Reaction 1 */}
                    <div className="border rounded-lg">
                        <div className="bg-purple-50 rounded-t-lg">
                            <div className="px-4 py-3 flex justify-between items-center">
                                <h2 className="font-medium">Reaction 1</h2>
                                <div className="flex items-center space-x-2">
                                    <button className="p-1 hover:bg-purple-100 rounded">
                                        <TrashIcon className="h-5 w-5 text-gray-500" />
                                    </button>
                                    <button
                                        className="p-1 hover:bg-purple-100 rounded"
                                        onClick={() => setIsReactionOpen(!isReactionOpen)}
                                    >
                                        {isReactionOpen ? (
                                            <ChevronUpIcon className="h-5 w-5" />
                                        ) : (
                                            <ChevronDownIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {isReactionOpen && (
                                <div className="border-t">
                                    <div className="flex border-b">
                                        <button className="px-4 py-2 border-b-2 border-purple-500 font-medium">
                                            Reactants
                                        </button>
                                        <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                                            Conditions
                                        </button>
                                        <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                                            Products
                                        </button>
                                    </div>

                                    <div className="p-4">
                                        <div className="border rounded-lg mb-4">
                                            <div className="p-4">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="font-medium">Reactant - 01</h3>
                                                    <button className="p-1 hover:bg-purple-100 rounded">
                                                        <TrashIcon className="h-5 w-5 text-gray-500" />
                                                    </button>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Cell Type
                                                            </label>
                                                            <select className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                                                <option>Select Cell Type</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Cellular Location
                                                            </label>
                                                            <select className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                                                <option>Select Location</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Reactant Type
                                                        </label>
                                                        <select className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                                            <option>Glycan</option>
                                                        </select>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Glycan Text Type
                                                            </label>
                                                            <select className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                                                                <option>GlyTouCan ID</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Glycan Text
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                                placeholder="Type Glycan Text"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Binding Site Code
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                                placeholder="Three letters code of binding site (e.g. ser, tyr...)"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700">
                                                                Number of Amino Acid Binding Site
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                                placeholder="Type number of amino acid binding site (e.g. 123)"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="flex items-center text-blue-600 hover:text-blue-700">
                                            <PlusIcon className="h-5 w-5 mr-1" />
                                            Add New Reactant
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button className="mt-4 flex items-center text-blue-600 hover:text-blue-700">
                        <PlusIcon className="h-5 w-5 mr-1" />
                        Add New Reaction
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewPathway
