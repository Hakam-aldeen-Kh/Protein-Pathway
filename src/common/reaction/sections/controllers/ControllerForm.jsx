import FormElement from "../../components/FormElement";

const ControllerForm = ({
  handleChangeData,
  reaction,
  controllerData,
  controllerIndex,
}) => {
  const handleChange = (e) =>
    handleChangeData(e, reaction.id, "controllers", controllerIndex);

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

        <FormElement
          type="itemType"
          label={"EC enzyme name"}
          name="controller_ec_enzyme"
          value={controllerData?.controller_ec_enzyme}
          handleChange={handleChange}
          itemType="Enzyme"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormElement
          isRequired={false}
          type="checkbox"
          id={`useNextReactionController-${reaction.id}-${controllerIndex}`}
          placeholder={"Use this Controller as a reactant in the next reaction"}
          name="useNextReaction"
          value={controllerData?.useNextReaction}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ControllerForm;
