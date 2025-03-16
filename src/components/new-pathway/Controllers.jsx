import { PlusIcon } from "lucide-react";
import Accordion from "./Accordion";
import { useOutletContext } from "react-router";
import ControllerForm from "./ControllerForm";

const Controllers = ({ reaction, handleChangeData, setModalData }) => {
    const { setPathwayData } = useOutletContext();

    const closeModal = () => setModalData((prev) => ({ ...prev, isModalOpen: false }))

    const addController = (reactionId) => {
        setPathwayData((prevPathwayData) =>
        (
            {
                ...prevPathwayData,
                reactions: prevPathwayData.reactions.map((reaction) =>
                    reaction.id === reactionId
                        ? {
                            ...reaction,
                            controllers: [
                                ...reaction.controllers,
                                {
                                    id: reaction.controllers[reaction.controllers.length - 1]?.id + 1 || 0,
                                    name: `controller_${reactionId}.${reaction.controllers[reaction.controllers.length - 1]?.id + 1 || 0}`
                                }
                            ]
                        }
                        : reaction
                )
            }))
    };

    const deleteController = (reactionId, controllerId) => {
        setModalData({
            isModalOpen: true,
            closeModal,
            title: "Contoller",
            handleDelete: () => {
                setPathwayData((prevPathwayData) =>
                (
                    {
                        ...prevPathwayData,
                        reactions: prevPathwayData.reactions.map((reaction) =>
                            reaction.id === reactionId
                                ? {
                                    ...reaction,
                                    controllers: reaction.controllers.filter((controller) => controller.id !== controllerId)
                                }
                                : reaction
                        )
                    }))
            }
        })
    };

    return (
        <div className='bg-white rounded-lg pb-2 rounded-tl-none p-5' >
            {reaction.controllers.map((item, index) => (
                <Accordion key={index} className='border rounded-lg mb-10' variant="gray" deleteFn={() => deleteController(reaction.id, item.id)} title={`Controller - ${reaction.id}.${item.id}`}>
                    <ControllerForm handleChangeData={handleChangeData} reaction={reaction} controllerData={item} controllerIndex={index} />
                </Accordion>
            ))}
            {reaction.controllers.length < 1 && <button onClick={() => addController(reaction.id)} className="flex items-center text-blue-600 hover:text-blue-700 mt-5">
                <PlusIcon className="h-5 w-5 mr-1" /> Add New controller
            </button>}
        </div>

    )
};

export default Controllers;
