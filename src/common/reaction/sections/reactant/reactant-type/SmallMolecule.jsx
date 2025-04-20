import FormElement from "../../../components/FormElement";

const SmallMolecule = ({ reactantData, handleChange }) => {
  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-4">
          {/* <FormElement
            isRequired={false}
            type="select"
            label={"Small Molecule"}
            name="smallMolecule"
            value={reactantData?.smallMolecule}
            handleChange={handleChange}
            placeholder="Select Small Molecule"
          >
            <option value="ATP">ATP</option>
          </FormElement> */}

          <FormElement
            isRequired={false}
            type="itemType"
            label={"Small Molecule"}
            name="smallMolecule"
            value={reactantData?.smallMolecule}
            handleChange={handleChange}
            placeholder="Select Small Molecule"
            itemType="Chibe"
          />

          {/* <FormElement
            isRequired={false}
            type="select"
            label={"Lipid"}
            name="lipid"
            value={reactantData?.lipid}
            handleChange={handleChange}
            placeholder="Select Lipid name or LIPIDMAPS"
          >
            <option value="Sphinganin-1-phosphocholine">
              Sphinganin-1-phosphocholine
            </option>
          </FormElement> */}

          <FormElement
            type="itemType"
            label={"Lipid"}
            name="lipid"
            value={reactantData?.lipid}
            handleChange={handleChange}
            placeholder="Select Lipid"
            itemType="Lipid"
          />
        </div>
      </div>
    </>
  );
};

export default SmallMolecule;
