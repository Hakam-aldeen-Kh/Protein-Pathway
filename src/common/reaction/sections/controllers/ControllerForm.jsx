import { useState } from "react";
import FormElement from "../../components/FormElement";
import ProteinSearchTable from "../reactant/reactant-type/ProteinSearchTable";

const ControllerForm = ({
  handleChangeData,
  reaction,
  controllerData,
  controllerIndex,
  addReaction,
  reactions
}) => {
  const handleChange = (e) => handleChangeData(e, reaction.id, "controllers", controllerIndex);

  const [isOpen, setOpenTablePagination] = useState(false);

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

  const handleChangeCheckBox = (e) => {
    handleChange(e)

    // if check then create reaction +1 if not created and add this controller in reactants
    const foundNextReaction = reactions.find(item => item.id === reaction.id + 1)
    let targetReactionId = reaction.id + 1

    if (!foundNextReaction) {
      targetReactionId = addReaction()
      handleChangeData({ target: { value: targetReactionId, name: "targetReactionId" } }, reaction.id, "controllers", controllerIndex)

    }

    if (e.target.checked) {
      console.log("checked");
      handleChangeData({ target: { value: `(Controller - ${reaction.id}.${controllerData.id} of Reaction ${reaction.id})`, name: "reference" } }, targetReactionId, "reactants", 0);
      handleChangeData({ target: { value: reaction.id, name: "fromReaction" } }, targetReactionId, "reactants", 0);
    }

    else {
      console.log("use checked");
      handleChangeData({ target: { value: "", name: "reference" } }, targetReactionId, "reactants", 0);
      handleChangeData({ target: { value: "", name: "fromReaction" } }, targetReactionId, "controllers", 0);
    }

  }

  return (
    <div className="space-y-4 p-4">
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
          isRequired={false}
          type="select"
          label={"Controller Type"}
          name="controllerType"
          value={controllerData?.controllerType}
          handleChange={handleChange}
          placeholder="Select Controller Type"
        >
          <option value="protein">Protein</option>
          <option value="enzyme">Enzyme</option>
        </FormElement>

        <FormElement
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

      {controllerData.controllerType == "protein" && (
        <div>
          <span className="font-bold text-xs block py-4">Protein Name</span>
          <div className="grid grid-cols-2 gap-4">
            <FormElement
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

        {controllerData.controllerType == "enzyme" && (
          <FormElement
            type="itemType"
            label={"EC enzyme name"}
            name="controller_ec_enzyme"
            value={controllerData?.controller_ec_enzyme}
            handleChange={handleChange}
            itemType="Enzyme"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormElement
          isRequired={false}
          type="checkbox"
          id={`useNextReactionController-${reaction.id}-${controllerIndex}`}
          placeholder={"Use this Controller as a reactant in the next reaction"}
          name="useNextReaction"
          value={controllerData?.useNextReaction}
          handleChange={handleChangeCheckBox}
        />
      </div>
    </div>
  );
};

export default ControllerForm;
