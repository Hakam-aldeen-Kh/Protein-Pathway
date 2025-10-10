import FormElement from "../../../components/FormElement";

const SmallMolecule = ({productData, handleChange}) => {
  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isRequired={false}
            type="itemType"
            label={"Small Molecule"}
            name="smallMolecule"
            value={productData?.smallMolecule}
            handleChange={handleChange}
            placeholder="Select Small Molecule"
            itemType="Chibe"
          />
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
              value={productData?.modifyingSite || ""}
              handleChange={handleChange}
              placeholder="Modifying site of amino acid (number)"
            />

            <FormElement
              isRequired={false}
              type="itemType"
              itemType="ProteinModOntology"
              label="Modifying Type"
              name="modifyingType"
              value={productData?.modifyingType || ""}
              handleChange={handleChange}
              placeholder="Select Modifying Type"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallMolecule;
