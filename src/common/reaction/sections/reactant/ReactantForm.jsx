import FormElement from "../../components/FormElement";
import Complex from "./reactant-type/Complex";
import Dna from "./reactant-type/Dna";
import Glycan from "./reactant-type/Glycan";
import Lipid from "./reactant-type/Lipid";
import Protein from "./reactant-type/Protein";
import SmallMolecule from "./reactant-type/SmallMolecule";

const ReactantForm = ({
  handleChangeData,
  reaction,
  reactantData,
  reactantId,
  isEdit,
  reactions
}) => {
  const handleChange = (e) => handleChangeData(e, reaction.id, "reactants", reactantId);

  if (reactantData?.connectedData) {
    reactantData = reactions?.find(item => item.id === reactantData?.fromReaction)[reactantData?.connectedData?.type]?.find(item => item.id === reactantData?.connectedData.id)
  }


  return (
    <div className={`space-y-4 p-4 ${!isEdit && "bg-gray-100"}`}>
      <div className="grid grid-cols-2 gap-4">
        {/* <FormElement
          isRequired={false}
          type="select"
          label={"Cell Type"}
          name="cellType"
          value={reactantData?.cellType}
          handleChange={handleChange}
 +4
 ';lk         placeholder="Select Cell Type"
        >
          <option value="embryonic cell">embryonic cell</option>
          <option value="prokaryotic cell">prokaryotic cell</option>
        </FormElement> */}

        <FormElement
          label={"Cell Type"}
          name="cellType"
          value={reactantData?.cellType}
          handleChange={handleChange}
          placeholder="Select Cell Type"
          type="itemType"
          itemType="CellType"
          isEdit={isEdit}
        />

        {/* <FormElement
          isRequired={false}
          type="select"
          label={" Cellular Location"}
          name="cellularLocation"
          value={reactantData?.cellularLocation}
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
          value={reactantData?.cellularLocation}
          handleChange={handleChange}
          placeholder="Select Location"
          itemType="Cellular"
          isEdit={isEdit}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormElement
          isRequired={false}
          type="select"
          label={"Reactant Type"}
          name="pType"
          value={reactantData?.pType === "enzyme" ? "protein" : reactantData?.pType}
          handleChange={handleChange}
          placeholder="Select Reactant Type"
          isEdit={isEdit}
        >
          <option value="complex">Complex</option>
          <option value="protein">Protein</option>
          <option value="glycan">Glycan</option>
          <option value="small_molecule">Small molecule</option>
          <option value="dna">DNA</option>
          <option value="lipid">Lipid</option>

        </FormElement>
      </div>

      {reactantData.pType === "complex" && (
        <Complex reactantData={reactantData} handleChange={handleChange} isEdit={isEdit} />
      )}
      {reactantData.pType === "lipid" && (
        <Lipid reactantData={reactantData} handleChange={handleChange} isEdit={isEdit} />
      )}
      {reactantData.pType === "protein" && (
        <Protein reactantData={reactantData} handleChange={handleChange} isEdit={isEdit} />
      )}
      {reactantData.pType === "glycan" && (
        <Glycan reactantData={reactantData} handleChange={handleChange} isEdit={isEdit} />
      )}
      {reactantData.pType === "small_molecule" && (
        <SmallMolecule
          reactantData={reactantData}
          handleChange={handleChange}
          isEdit={isEdit}
        />
      )}
      {reactantData.pType === "dna" && (
        <Dna reactantData={reactantData} handleChange={handleChange} isEdit={isEdit} />
      )}
      {reactantData.pType === "enzyme" && (
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isEdit={isEdit}
            type="enzyme"
            label={"EC enzyme name"}
            name="controller_ec_enzyme"
            value={reactantData?.controller_ec_enzyme}
            handleChange={handleChange}
          // itemType="Enzyme"
          />
        </div>
      )}
    </div>
  );
};

export default ReactantForm;
