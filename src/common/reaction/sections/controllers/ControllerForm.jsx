import { useEffect, useState } from "react";
import FormElement from "../../components/FormElement";
import ProteinSearchTable from "../reactant/reactant-type/ProteinSearchTable";
import { fetchDefaultFile } from "../../../../utils/fetchEnzymeData";

const ControllerForm = ({
  handleChangeData,
  reaction,
  controllerData,
  controllerId,
  addReaction,
  reactions,
  isEdit,
  setPathwayData,
}) => {
  const handleChange = (e) =>
    handleChangeData(e, reaction.id, "controllers", controllerId);
  let display = true;

  if (controllerData?.connectedData) {
    display = false
    console.log(reactions?.find(item => item.id === controllerData?.fromReaction), controllerData?.fromReaction);
    controllerData = reactions?.find(item => item.id === controllerData?.fromReaction)[controllerData?.connectedData?.type]?.find(item => item.id === controllerData?.connectedData.id)
  }

  const [isOpen, setOpenTablePagination] = useState(false);
  let localReactions = reactions;

  // Callback to handle protein selection
  const handleProteinSelect = ({ proteinName, proteinId }) => {
    // Update proteinSymbolicName (text input in Protein Search)
    handleChange({
      target: {
        name: "proteinSymbolicName",
        value: proteinName,
      },
    });

    // Update reactant_protein_uniprot_id (hidden input)
    handleChange({
      target: {
        name: "reactant_protein_uniprot_id",
        value: proteinId,
      },
    });

    setOpenTablePagination(false); // Close the modal after selection
  };

  const addReactant = (reactionId) => {
    const nextReaction = localReactions.find((item) => item.id === reactionId);

    // console.log("nextReaction", nextReaction);
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

    // if check then create reaction +1 if not created and add this controller in reactants
    const foundNextReaction = reactions.find(
      (item) => item.id === reaction.id + 1
    );
    let targetReactionId = reaction.id + 1;
    let targetReactantId = reaction?.controllers[0]?.conectedReactantId || 1;
    let targetReaction = null;

    if (!foundNextReaction) {
      targetReaction = addReaction();
      localReactions.push(targetReaction);
      targetReactionId = targetReaction.id;

      handleChangeData(
        { target: { value: targetReactionId, name: "targetReactionId" } },
        reaction.id,
        "controllers",
        controllerId
      );
    }

    if (e.target.checked) {
      targetReactantId = addReactant(targetReactionId);
      console.log("checked", targetReactantId);

      handleChangeData(
        { target: { value: targetReactantId, name: "conectedReactantId" } },
        reaction.id,
        "controllers",
        controllerId
      );
      handleChangeData(
        { target: { value: targetReactionId, name: "targetReactionId" } },
        reaction.id,
        "controllers",
        controllerId
      );

      handleChangeData(
        {
          target: {
            value: { type: "controllers", id: controllerId },
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
            value: `(Controller - ${reaction.id}.${controllerData.id} of Reaction ${reaction.id})`,
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
      console.log(" un checked", targetReactantId);
      // change only conected reactant
      handleChangeData(
        { target: { value: "", name: "conectedReactantId" } },
        reaction.id,
        "controllers",
        controllerId
      );
      handleChangeData(
        { target: { value: "", name: "targetReactionId" } },
        reaction.id,
        "controllers",
        controllerId
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
        {/* <FormElement
          isRequired={false}
          type="select"
          label={"Cell Type"}
          name="cellType"
          value={controllerData?.cellType}
          handleChange={handleChange}
          placeholder="Select Cell Type"
          >
          <option value="embryonic cell">embryonic cell</option>
          <option value="prokaryotic cell">prokaryotic cell</option>
        </FormElement> */}

        <FormElement
          isEdit={isEdit}
          isRequired={false}
          label={"Cell Type"}
          name="cellType"
          value={controllerData?.cellType}
          handleChange={handleChange}
          placeholder="Select Cell Type"
          type="itemType"
          itemType="CellType"
        />

        {/* <FormElement
          isRequired={false}
          type="select"
          label={"Cellular Location"}
          name="cellularLocation"
          value={controllerData?.cellularLocation?.cell_localization_name}
          handleChange={handleChange}
          placeholder="Select Location"
        >
          <option value="cytocol">Cytosol</option>
          <option value="golgi">Golgi</option>
        </FormElement> */}

        <FormElement
          isEdit={isEdit}
          isRequired={false}
          type="itemType"
          label={" Cellular Location"}
          name="cellularLocation"
          value={controllerData?.cellularLocation}
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
          label={"Controller Type"}
          name="pType"
          value={controllerData?.pType}
          handleChange={handleChange}
          placeholder="Select Controller Type"
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
          value={controllerData?.actionType}
          handleChange={handleChange}
          placeholder="Select Action Type"
        >
          <option value="activation">Activation</option>
          <option value="inhibition">Inhibition</option>
        </FormElement>
      </div>

      {controllerData.pType == "protein" && (
        <div>
          <span className="font-bold text-xs block py-4">Protein Name</span>
          <div className="grid grid-cols-2 gap-4">
            <FormElement
              isEdit={isEdit}
              isRequired={false}
              type="paginationTable"
              label="Protein Search"
              name="proteinSymbolicName"
              value={controllerData?.proteinSymbolicName || ""}
              handleChange={handleChange}
              placeholder="Symbolic Name (NF-kappaB p50/p65 complex)"
              paginationTable
              customStyle="flex items-end gap-x-2 flex-1"
              setOpenTablePagination={setOpenTablePagination}
              reactantData={controllerData}
            />

            <FormElement
              isEdit={isEdit}
              isRequired={false}
              type="input"
              label="Protein Symbol"
              name="proteinSymbol"
              value={controllerData?.proteinSymbol || ""}
              handleChange={handleChange}
              placeholder="Protein Symbol (e.g. RecA)"
            />
          </div>
        </div>
      )}

      <ProteinSearchTable
        isOpen={isOpen}
        site="controller"
        setOpenTablePagination={setOpenTablePagination}
        onProteinSelect={handleProteinSelect}
        reactantData={controllerData} // Pass reactantData
      />

      <div className="grid grid-cols-2 gap-4">
        {/* <FormElement
          isRequired={false}
          type="input"
          label={"When your complex is in GO ontology complex."}
          name="goOntology"
          value={controllerData?.goOntology}
          handleChange={handleChange}
          placeholder=""
          relatedInput={{
            name: "goOntologyValue",
            value: controllerData?.goOntologyValue,
          }}
        />
        <FormElement
          isRequired={false}
          type="input"
          label={"When your complex is not in GO ontology complex."}
          name="notGoOntology"
          value={controllerData?.notGoOntology}
          handleChange={handleChange}
          placeholder=""
        /> */}

        {controllerData.pType == "enzyme" && (
          <FormElement
            isEdit={isEdit}
            type="enzyme"
            label={"EC enzyme name"}
            name="controller_ec_enzyme"
            value={controllerData?.controller_ec_enzyme}
            handleChange={handleChange}
            // itemType="Enzyme"
          />
        )}
      </div>

      {display && (
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isEdit={isEdit}
            isRequired={false}
            type="checkbox"
            id={`useNextReactionController-${reaction.id}-${controllerId}`}
            placeholder={
              "Use this Controller as a reactant in the next reaction"
            }
            name="useNextReaction"
            value={controllerData?.useNextReaction}
            handleChange={handleChangeCheckBox}
          />
        </div>
      )}
    </div>
  );
};

export default ControllerForm;
