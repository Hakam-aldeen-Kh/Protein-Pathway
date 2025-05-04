import FormElement from "../../../components/FormElement";

const SmallMolecule = ({ reactantData, handleChange, isEdit }) => {
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
            isEdit={isEdit}
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

          {/* <FormElement
            type="itemType"
            label={"Lipid"}
            name="lipid"
            value={reactantData?.lipid}
            handleChange={handleChange}
            placeholder="Select Lipid"
            itemType="Lipid"
          /> */}
        </div>

        <div>
          <span className="font-bold text-xs block py-4">
            Protein Modification
          </span>
          <div className="grid grid-cols-2 gap-4">
            <FormElement
              isRequired={false}
              type="input"
              label="Modifying site"
              name="modifyingSite"
              value={reactantData?.modifyingSite || ""}
              handleChange={handleChange}
              placeholder="Modifying site of amino acid (number)"
              isEdit={isEdit}
            />

            <FormElement
              isRequired={false}
              type="itemType"
              itemType="ProteinModOntology"
              label="Modifying Type"
              name="modifyingType"
              value={reactantData?.modifyingType || ""}
              handleChange={handleChange}
              placeholder="Select Modifying Type"
              isEdit={isEdit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallMolecule;
