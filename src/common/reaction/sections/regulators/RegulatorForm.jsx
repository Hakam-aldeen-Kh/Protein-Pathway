import { useState } from "react";
import FormElement from "../../components/FormElement";
import ProteinSearchTable from "../reactant/reactant-type/ProteinSearchTable";

const RegulatorForm = ({
  handleChangeData,
  reaction,
  regulatorData,
  regulatorId,
  addReaction,
  reactions,
  isEdit,
  setPathwayData,
}) => {
  const handleChange = (e) =>
    handleChangeData(e, reaction.id, "regulators", regulatorId);
  let display = true;

  if (regulatorData?.connectedData) {
    display = false;
    regulatorData = reactions
      ?.find((item) => item.id === regulatorData?.fromReaction)[regulatorData?.connectedData?.type]?.find(
        (item) => item.id === regulatorData?.connectedData.id
      );
  }

  const [isOpen, setOpenTablePagination] = useState(false);
  let localReactions = reactions;

  // Callback to handle protein selection
  const handleProteinSelect = ({ proteinName, proteinId }) => {
    handleChange({
      target: {
        name: "proteinSymbolicName",
        value: proteinName,
      },
    });

    handleChange({
      target: {
        name: "reactant_protein_uniprot_id",
        value: proteinId,
      },
    });

    setOpenTablePagination(false);
  };

  const addReactant = (reactionId) => {
    const nextReaction = localReactions.find((item) => item.id === reactionId);

    let reactantId =
      nextReaction.reactants[nextReaction.reactants.length - 1]?.id + 1 || 1;

    const firstUnReferencedReactant = nextReaction.reactants.find(
      (r) => !r.reference || r.reference.trim() === ""
    );
    const unReferencedReactantId = firstUnReferencedReactant
      ? firstUnReferencedReactant.id
      : reactantId;

    if (!firstUnReferencedReactant) {
      setPathwayData((prevPathwayData) => ({
        ...prevPathwayData,
        reactions: prevPathwayData.reactions.map((reaction) =>
          reaction.id === reactionId
            ? {
                ...reaction,
                reactants: [
                  ...reaction.reactants,
                  {
                    id: reactantId,
                    name: `reactant_${reactionId}.${reactantId}`,
                  },
                ],
              }
            : reaction
        ),
      }));
    }

    return unReferencedReactantId;
  };

  const handleChangeCheckBox = (e) => {
    handleChange(e);

    const foundNextReaction = reactions.find(
      (item) => item.id === reaction.id + 1
    );
    let targetReactionId = reaction.id + 1;
    let targetReactantId = reaction?.regulators[0]?.conectedReactantId || 1;
    let targetReaction = null;

    if (!foundNextReaction) {
      targetReaction = addReaction(false, targetReactionId);
      localReactions.push(targetReaction);
      targetReactionId = targetReaction.id;

      handleChangeData(
        { target: { value: targetReactionId, name: "targetReactionId" } },
        reaction.id,
        "regulators",
        regulatorId
      );
    }

    if (e.target.checked) {
      targetReactantId = addReactant(targetReactionId);

      handleChangeData(
        { target: { value: targetReactantId, name: "conectedReactantId" } },
        reaction.id,
        "regulators",
        regulatorId
      );
      handleChangeData(
        { target: { value: targetReactionId, name: "targetReactionId" } },
        reaction.id,
        "regulators",
        regulatorId
      );

      handleChangeData(
        {
          target: {
            value: { type: "regulators", id: regulatorId },
            name: "connectedData",
          },
        },
        targetReactionId,
        "reactants",
        targetReactantId
      );
      handleChangeData(
        {
          target: {
            value: `(Regulator - ${reaction.id}.${regulatorData.id} of Reaction ${reaction.id})`,
            name: "reference",
          },
        },
        targetReactionId,
        "reactants",
        targetReactantId
      );
      handleChangeData(
        { target: { value: reaction.id, name: "fromReaction" } },
        targetReactionId,
        "reactants",
        targetReactantId
      );
    } else {
      handleChangeData(
        { target: { value: "", name: "conectedReactantId" } },
        reaction.id,
        "regulators",
        regulatorId
      );
      handleChangeData(
        { target: { value: "", name: "targetReactionId" } },
        reaction.id,
        "regulators",
        regulatorId
      );

      handleChangeData(
        { target: { value: "", name: "reference" } },
        targetReactionId,
        "reactants",
        targetReactantId
      );
      handleChangeData(
        { target: { value: "", name: "fromReaction" } },
        targetReactionId,
        "reactants",
        targetReactantId
      );
      handleChangeData(
        { target: { value: "", name: "connectedData" } },
        targetReactionId,
        "reactants",
        targetReactantId
      );
    }
  };

  return (
    <div className={`space-y-4 p-4 ${!isEdit && "bg-gray-100"}`}>
      <div className="grid grid-cols-2 gap-4">
        <FormElement
          isEdit={isEdit}
          isRequired={false}
          label={"Cell Type"}
          name="cellType"
          value={regulatorData?.cellType}
          handleChange={handleChange}
          placeholder="Select Cell Type"
          type="itemType"
          itemType="CellType"
        />

        <FormElement
          isEdit={isEdit}
          isRequired={false}
          type="itemType"
          label={" Cellular Location"}
          name="cellularLocation"
          value={regulatorData?.cellularLocation}
          handleChange={handleChange}
          placeholder="Select Location"
          itemType="Cellular"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormElement
          isEdit={isEdit}
          isRequired={false}
          type="select"
          label={"Regulator Type"}
          name="pType"
          value={regulatorData?.pType}
          handleChange={handleChange}
          placeholder="Select Regulator Type"
        >
          <option value="protein">Protein</option>
          <option value="enzyme">Enzyme</option>
        </FormElement>

        <FormElement
          isEdit={isEdit}
          isRequired={false}
          type="select"
          label={"Action Type"}
          name="actionType"
          value={regulatorData?.actionType}
          handleChange={handleChange}
          placeholder="Select Action Type"
        >
          <option value="activation">Activation</option>
          <option value="inhibition">Inhibition</option>
        </FormElement>
      </div>

      {regulatorData.pType == "protein" && (
        <div>
          <span className="font-bold text-xs block py-4">Protein Name</span>
          <div className="grid grid-cols-2 gap-4">
            <FormElement
              isEdit={isEdit}
              isRequired={false}
              type="paginationTable"
              label="Protein Search"
              name="proteinSymbolicName"
              value={regulatorData?.proteinSymbolicName || ""}
              handleChange={handleChange}
              placeholder="Symbolic Name (NF-kappaB p50/p65 complex)"
              paginationTable
              customStyle="flex items-end gap-x-2 flex-1"
              setOpenTablePagination={setOpenTablePagination}
              reactantData={regulatorData}
            />

            <FormElement
              isEdit={isEdit}
              isRequired={false}
              type="input"
              label="Protein Symbol"
              name="proteinSymbol"
              value={regulatorData?.proteinSymbol || ""}
              handleChange={handleChange}
              placeholder="Protein Symbol (e.g. RecA)"
            />
          </div>
        </div>
      )}

      <ProteinSearchTable
        isOpen={isOpen}
        site="regulator"
        setOpenTablePagination={setOpenTablePagination}
        onProteinSelect={handleProteinSelect}
        reactantData={regulatorData}
      />

      <div className="grid grid-cols-2 gap-4">
        {regulatorData.pType == "enzyme" && (
          <FormElement
            isEdit={isEdit}
            type="enzyme"
            label={"EC enzyme name"}
            name="regulator_ec_enzyme"
            value={regulatorData?.regulator_ec_enzyme}
            handleChange={handleChange}
          />
        )}
      </div>

      {display && (
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isEdit={isEdit}
            isRequired={false}
            type="checkbox"
            id={`useNextReactionRegulator-${reaction.id}-${regulatorId}`}
            placeholder={
              "Use this Regulator as a reactant in the next reaction"
            }
            name="useNextReaction"
            value={regulatorData?.useNextReaction}
            handleChange={handleChangeCheckBox}
          />
        </div>
      )}
    </div>
  );
};

export default RegulatorForm;
