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

  const getGlycanInfo = (glycans) => {
    if (!Array.isArray(glycans) || glycans.length === 0) return [];

    return glycans.filter((g) => g.glycanText && g.glycanText.trim() !== "");
  };

  const formatReactantDisplay = (reactantData) => {
    const glycanInfo = getGlycanInfo(reactantData.glycans);

    let baseName;
    if (reactantData.connectedData) {
      baseName =
        reactantData.connectedData.type === "regulators"
          ? regulatorNodeName(
              reactions
                ?.find((item) => item.id === reactantData?.fromReaction)
                ?.[reactantData?.connectedData?.type]?.find(
                  (item) => item.id === reactantData?.connectedData.id
                )
            )
          : productNodeName(
              reactions
                ?.find((item) => item.id === reactantData?.fromReaction)
                ?.[reactantData?.connectedData?.type]?.find(
                  (item) => item.id === reactantData?.connectedData.id
                )
            );
    } else {
      baseName = reactantNodeName(reactantData);
    }

    return { baseName, glycanInfo };
  };

  return (
    <>
      <tr
        className={`border-b-[5px] border-white rounded ${
          reactionState?.state === "new" ? "bg-green-100" : "bg-[#F1F5F9]"
        }`}
      >
        <td className="px-4 py-2 font-medium align-top">{reactionIndex + 1}</td>

        <td className="py-2 align-top">
          <div className="px-4 space-y-3">
            {(reaction.reactants ?? []).map((reactantData, index) => {
              const { baseName, glycanInfo } =
                formatReactantDisplay(reactantData);

              return (
                <div
                  key={reactantData.id ?? index}
                  className="flex items-start gap-2"
                >
                  <div className="flex-1 space-y-1">
                    {glycanInfo.length === 0 && (
                      <div className="text-violet-900 hover:text-violet-600 font-medium">
                        {baseName}
                      </div>
                    )}

                    {glycanInfo.map((glycan, gIdx) => (
                      <div key={gIdx} className="text-violet-900">
                        {glycan.glycanText}
                      </div>
                    ))}
                  </div>

                  {reaction.reactants.length !== index + 1 && (
                    <span className="text-gray-400 font-light mt-1">•</span>
                  )}
                </div>
              );
            })}
          </div>
        </td>

        <td className="px-4 py-2 align-top">
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

        <td className="py-2 align-top">
          <div className="px-4 space-y-1">
            {(reaction.products ?? []).map((item, index) => (
              <div key={item.id ?? index} className="flex items-center">
                <span className="text-violet-900 hover:text-violet-600 cursor-pointer font-medium">
                  {productNodeName(item)}
                </span>
                {reaction.products.length !== index + 1 && (
                  <span className="text-gray-400 font-light mx-2">•</span>
                )}
              </div>
            ))}
          </div>
        </td>

        <td className="py-2 align-top">
          {cellTypes.length > 0 ? (
            <div className="px-4 space-y-1">
              {cellTypes.map((cell, index) => (
                <div key={index} className="text-gray-700">
                  {cell}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 text-gray-400">-</div>
          )}
        </td>

        <td className="py-2 align-top">
          {cellLocation.length > 0 ? (
            <div className="px-4 space-y-1">
              {cellLocation.map((cell, index) => (
                <div key={index} className="text-gray-700">
                  {cell}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 text-gray-400">-</div>
          )}
        </td>

        {isEdit && (
          <td className="px-4 py-2 align-top">
            <div className="flex items-center gap-2">
              <button
                onClick={() => addReactionAfterReaction(reaction.id)}
                className="hover:scale-110 transition-transform"
                title="Add Reaction After"
              >
                <img
                  src="/images/icons/add-square.svg"
                  alt="add"
                  className="w-5 h-5"
                />
              </button>
              <button
                onClick={() => setEditModalOpen(true)}
                className="hover:scale-110 transition-transform"
                title="Edit Reaction"
              >
                <img
                  src="/images/icons/edit-square.svg"
                  alt="Edit"
                  className="w-5 h-5"
                />
              </button>
              <button
                onClick={() => deleteReaction(reaction.id)}
                className="hover:scale-110 transition-transform"
                title="Delete Reaction"
              >
                <img
                  src="/images/icons/trash-square.svg"
                  alt="Delete"
                  className="w-5 h-5"
                />
              </button>

              {reactionState?.state === "warning" && (
                <span className="text-yellow-500" title="Warning">
                  ⚠️
                </span>
              )}
            </div>
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
