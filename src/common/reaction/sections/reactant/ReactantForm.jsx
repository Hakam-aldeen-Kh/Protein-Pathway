import FormElement from "../../components/FormElement";
import Complex from "./reactant-type/Complex";
import Dna from "./reactant-type/Dna";
import Glycan from "./reactant-type/Glycan";
import Lipid from "./reactant-type/Lipid";
import Protein from "./reactant-type/Protein";
import SmallMolecule from "./reactant-type/SmallMolecule";
import { useState } from "react";

const ReactantForm = ({
  handleChangeData,
  reaction,
  reactantData,
  reactantId,
  isEdit,
  reactions,
}) => {
  const handleChange = (e) =>
    handleChangeData(e, reaction.id, "reactants", reactantId);

  if (reactantData?.connectedData) {
    reactantData = reactions
      ?.find((item) => item.id === reactantData?.fromReaction)[reactantData?.connectedData?.type]?.find(
        (item) => item.id === reactantData?.connectedData.id
      );
  }

  // --- Glycan Multiple Support ---
  const [glycans, setGlycans] = useState(
    Array.isArray(reactantData.glycans) && reactantData.glycans.length > 0
      ? reactantData.glycans
      : [{ glycanTextType: "", glycanText: "" }]
  );

  // Clean up incomplete glycans (except the first one)

  const addGlycan = () => {
    // Clean up incomplete glycans before adding a new one
          
    setGlycans((prev) => {
      const updated = [...prev, { glycanTextType: "", glycanText: "" }];
      handleChange({
        target: { name: "glycans", value: updated },
      });
      return updated;
    });
  };

  const removeGlycan = (idx) => {
    setGlycans((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      handleChange({
        target: { name: "glycans", value: updated },
      });
      return updated;
    });
  };

  const handleGlycanChange = (e, idx) => {
    const { name, value } = e.target;
    setGlycans((prev) => {
      const updated = prev.map((glycan, i) =>
        i === idx ? { ...glycan, [name]: value } : glycan
      );
      handleChange({
        target: { name: "glycans", value: updated },
      });
      return updated;
    });
  };

  return (
    <div className={`space-y-4 p-4 ${!isEdit && "bg-gray-100"}`}>
      <div className="grid grid-cols-2 gap-4">
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
          value={
            reactantData?.pType === "enzyme" ? "protein" : reactantData?.pType
          }
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
        <Complex
          reactantData={reactantData}
          handleChange={handleChange}
          isEdit={isEdit}
        />
      )}
      {reactantData.pType === "lipid" && (
        <Lipid
          reactantData={reactantData}
          handleChange={handleChange}
          isEdit={isEdit}
        />
      )}
      {reactantData.pType === "protein" && (
        <Protein
          reactantData={reactantData}
          handleChange={handleChange}
          isEdit={isEdit}
        />
      )}
      {reactantData.pType === "glycan" && (
        <div className="space-y-4">
          {glycans.map((glycan, idx) => (
            <Glycan
              key={idx}
              index={idx + 1}
              reactantData={glycan}
              handleChange={(e) => handleGlycanChange(e, idx)}
              isEdit={isEdit}
              canDelete={glycans.length > 1 && idx > 0}
              onRemove={() => removeGlycan(idx)}
            />
          ))}
          
          <button
            type="button"
            className="w-full mt-4 px-4 py-2.5 bg-[#57369E] text-white rounded-lg hover:bg-[#00A7D3] transition-colors duration-200 font-medium flex items-center justify-center gap-2"
            onClick={addGlycan}
          >
            <span className="text-xl">+</span>
            Add Glycan
          </button>
        </div>
      )}
      {reactantData.pType === "small_molecule" && (
        <SmallMolecule
          reactantData={reactantData}
          handleChange={handleChange}
          isEdit={isEdit}
        />
      )}
      {reactantData.pType === "dna" && (
        <Dna
          reactantData={reactantData}
          handleChange={handleChange}
          isEdit={isEdit}
        />
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
          />
        </div>
      )}
    </div>
  );
};

export default ReactantForm;