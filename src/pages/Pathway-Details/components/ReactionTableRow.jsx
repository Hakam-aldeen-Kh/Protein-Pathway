import { useMemo, useState } from "react";
import ReactionModal from "./ReactionModal";
import {
  regulatorNodeName,
  productNodeName,
  reactantNodeName,
} from "../../../utils/nameNode";

const ReactionTableRow = ({
  reactions,
  reactionIndex,
  reaction,
  isEdit,
  handleChangeData,
  setEditPathwayData,
  deleteReaction,
  addReaction,
  addReactionAfterReaction,
  reactionState,
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  function capitalize(s) {
    return String(s?.[0]).toUpperCase() + String(s).slice(1);
  }

  const cellTypes = useMemo(() => {
    return reactions.flatMap((reac) =>
      (reac.reactants ?? [])
        .map((r) =>
          r.cellType?.cType_name ? capitalize(r.cellType.cType_name) : null
        )
        .filter(Boolean)
    );
  }, [reactions]);

  const cellLocation = useMemo(() => {
    return reactions.flatMap((reac) =>
      (reac.reactants ?? [])
        .map((r) =>
          r.cellularLocation?.cell_localization_name
            ? capitalize(r.cellularLocation.cell_localization_name)
            : null
        )
        .filter(Boolean)
    );
  }, [reactions]);

  return (
    <>
      <tr
        className={`border-b-[5px] border-white rounded ${
          reactionState?.state === "new" ? "bg-green-100" : "bg-[#F1F5F9]"
        }`}
      >
        <td className="px-4 py-2">{reactionIndex + 1}</td>
        <td className="h-full py-2">
          {(reaction.reactants ?? []).map((reactantData, index) => (
            <div
              key={reactantData.id ?? index}
              className="px-4 flex items-center h-full"
            >
              <span className="text-violet-900 hover:text-violet-600">
                {reactantData.connectedData
                  ? reactantData.connectedData.type === "regulators"
                    ? regulatorNodeName(
                        reactions
                          ?.find(
                            (item) => item.id === reactantData?.fromReaction
                          )
                          ?.[reactantData?.connectedData?.type]?.find(
                            (item) => item.id === reactantData?.connectedData.id
                          )
                      )
                    : productNodeName(
                        reactions
                          ?.find(
                            (item) => item.id === reactantData?.fromReaction
                          )
                          ?.[reactantData?.connectedData?.type]?.find(
                            (item) => item.id === reactantData?.connectedData.id
                          )
                      )
                  : reactantNodeName(reactantData)}
                {reaction.reactants.length !== index + 1 && "-"}
              </span>
            </div>
          ))}
        </td>
        <td className="px-4 py-2">
          {reaction?.regulators?.length > 0 && reaction.regulators[0]?.name
            ? reaction.regulators[0]?.connectedData
              ? productNodeName(
                  reactions
                    ?.find(
                      (item) => item.id === reaction.regulators[0]?.fromReaction
                    )
                    ?.[reaction.regulators[0]?.connectedData?.type]?.find(
                      (item) =>
                        item.id === reaction.regulators[0]?.connectedData.id
                    )
                )
              : regulatorNodeName(reaction.regulators[0])
            : "-"}
        </td>
        <td className="h-full py-2">
          {(reaction.products ?? []).map((item, index) => (
            <div
              key={item.id ?? index}
              className="px-4 flex items-center h-full"
            >
              <span className="text-violet-900 hover:text-violet-600 cursor-pointer">
                {productNodeName(item)}
                {reaction.products.length !== index + 1 && " - "}
              </span>
            </div>
          ))}
        </td>

        <td className="py-2">
          {cellTypes.length > 0
            ? cellTypes.map((cell, index) => (
                <div key={index} className="px-4 flex items-center gap-2">
                  {cell}
                </div>
              ))
            : "-"}
        </td>

        <td className="py-2">
          {cellLocation.length > 0
            ? cellLocation.map((cell, index) => (
                <div key={index} className="px-4 flex items-center gap-2">
                  {cell}
                </div>
              ))
            : "-"}
        </td>

        {isEdit && (
          <td className="px-4 flex items-center h-full gap-x-2 py-2">
            <button onClick={() => addReactionAfterReaction(reaction.id)}>
              <img src="/images/icons/add-square.svg" alt="add" />
            </button>
            <button onClick={() => setEditModalOpen(true)}>
              <img src="/images/icons/edit-square.svg" alt="Edit" />
            </button>
            <button onClick={() => deleteReaction(reaction.id)}>
              <img src="/images/icons/trash-square.svg" alt="Delete" />
            </button>

            {reactionState?.state === "warning" && <span>⚠️</span>}
          </td>
        )}
      </tr>

      <ReactionModal
        reactions={reactions}
        title={`Edit Reaction - ${reaction.id}`}
        setEditPathwayData={setEditPathwayData}
        handleChangeData={handleChangeData}
        data={reaction}
        isOpen={isEditModalOpen}
        setIsOpen={setEditModalOpen}
        addReaction={addReaction}
      />
    </>
  );
};

export default ReactionTableRow;
