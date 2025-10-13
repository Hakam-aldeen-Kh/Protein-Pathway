import FormElement from "../../../components/FormElement";

const Lipid = ({productData, handleChange}) => {
  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-4">

          <FormElement
            type="itemType"
            label={"Lipid"}
            name="lipid"
            value={productData?.lipid}
            handleChange={handleChange}
            placeholder="Select Lipid"
            itemType="Lipid"
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

export default Lipid;