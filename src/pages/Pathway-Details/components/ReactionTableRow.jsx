import { useState } from "react";
import ReactionModal from "./ReactionModal";

const ReactionTableRow = ({ reactions, reactionIndex, reaction, isEdit, handleChangeData, setEditPathwayData, deleteReaction, handleShowDetails }) => {

    const [isEditModalOpen, setEditModalOpen] = useState(false);

    return (
        <>
            <tr className="border-b-[5px] border-white bg-[#F1F5F9] hover:bg-gray-100 rounded" >
                <td className="px-4">{reactionIndex}</td>
                <td className="flex  flex-col items-start justify-center gap-2 pb-1">
                    {reaction.reactants.map((item, index) =>
                        <div key={index} className="px-4 flex items-center gap-2 pt-[5px] " onClick={() => handleShowDetails(item)}>
                            <img
                                src={item.image || "/images/gpr.png"}
                                alt={item.name}
                                className="w-[60px] h-[36px] object-contain"
                            />
                            <span className="text-violet-900 hover:text-violet-600 cursor-pointer">
                                {item.name}
                            </span>
                        </div>
                    )}
                </td>

                <td className="px-4">{reaction.enzyme || "-"}</td>

                <td className="px-4">{reaction.sugarNucleotide || "-"}</td>

                <td className="flex flex-col items-start justify-center gap-2 pt-[5px]">
                    {reaction.products.map((item, index) =>
                        <div key={index} className="px-4 flex items-center gap-2 pt-[5px]" onClick={() => handleShowDetails(item)}>
                            <img
                                src={item.image || "/images/gpr.png"}
                                alt={item.name}
                                className="w-[60px] h-[36px] object-contain"
                            />
                            <span className="text-violet-900 hover:text-violet-600 cursor-pointer">
                                {item.name}
                            </span>
                        </div>
                    )}
                </td>

                <td className="px-4">{reaction.cellularLocation || "-"}</td>

                {isEdit && <td className="px-4 flex items-center h-full gap-2 -translate-y-[10px]">
                    <button>
                        <img src="/images/icons/add-square.svg" alt="add" />
                    </button>
                    <button onClick={() => setEditModalOpen(true)}>
                        <img src="/images/icons/edit-square.svg" alt="Edit" />
                    </button>
                    <button onClick={() => deleteReaction(reaction.id)}>
                        <img src="/images/icons/trash-square.svg" alt="Delete" />
                    </button>
                </td>}
            </tr>

            <ReactionModal
                reactions={reactions}
                title={`Edit Reaction - ${reaction.id}`}
                setEditPathwayData={setEditPathwayData}
                handleChangeData={handleChangeData}
                data={reaction}
                isOpen={isEditModalOpen}
                setIsOpen={setEditModalOpen}
                addReaction={() => console.log("edit reaction")}
            />
        </>
    )
};

export default ReactionTableRow;
