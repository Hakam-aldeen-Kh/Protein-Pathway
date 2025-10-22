import { useState } from "react";
import FormElement from "../../../components/FormElement";
import GlycanImageDisplay from "../../../components/GlycanImageDisplay";

const Glycan = ({
  productData,
  handleChange,
  index,
  onRemove,
  canDelete = false,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleGlycanTextTypeChange = (e) => {
    handleChange(e);
    setIsDisabled(false);
    handleChange({ target: { name: "glycanText", value: "" } });
  };

  return (
    <div className="mb-4 border rounded-lg p-4 bg-white shadow-sm relative">
      {/* Header with Title and Delete Button */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <h3 className="font-semibold text-lg text-[#57369E]">
          Glycan #{index}
        </h3>
        {canDelete && (
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 text-white bg-red-600 rounded transition-colors duration-200 border border-red-600"
            onClick={onRemove}
            title={`Remove Glycan #${index}`}
          >
            <img
              src="/images/icons/trash.svg"
              alt="Remove"
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Remove</span>
          </button>
        )}
      </div>

      {/* Glycan Text Type and Text */}
      <div className="space-y-4">
        <div className="flex gap-4 items-start">
          <div className="grid grid-cols-2 gap-4 flex-1">
            <FormElement
              isRequired={false}
              type="select"
              label="Glycan Text Type"
              name="glycanTextType"
              value={productData?.glycanTextType}
              handleChange={handleGlycanTextTypeChange}
              placeholder="Select Glycan Text Type"
            >
              <option value="Linear code">Linear code</option>
              <option value="IUPAC Extended">IUPAC Extended</option>
              <option value="IUPAC condensed">IUPAC condensed</option>
              <option value="GlyTouCan ID">GlyTouCan ID</option>
            </FormElement>

            <FormElement
              isRequired={false}
              glycanTextType={productData?.glycanTextType}
              type="Glycan Text"
              label="Glycan Text"
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
              name="glycanText"
              value={productData?.glycanText}
              handleChange={handleChange}
              placeholder="Type Glycan Text"
            />
          </div>
          <div className="flex-shrink-0">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Structure
            </label>
            <GlycanImageDisplay
              imageUrl={productData?.glycanImage}
              glycanText={productData?.glycanText}
            />
          </div>
        </div>


        {/* Binding Backbone Information */}
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-3 mt-4">
            Binding Backbone Information
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <FormElement
              isRequired={false}
              type="input"
              label="Binding Site Code"
              name="bindingSiteCode"
              value={productData?.bindingSiteCode}
              handleChange={handleChange}
              placeholder="Three letters code (e.g., ser, tyr...)"
            />
            <FormElement
              isRequired={false}
              type="input"
              label="Number of Amino Acid Binding Site"
              name="aminoAcidBindingSite"
              value={productData?.aminoAcidBindingSite}
              handleChange={handleChange}
              placeholder="Type number (e.g., 123)"
            />
          </div>
        </div>

        {/* Protein Modification */}
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-3 mt-4">
            Protein Modification
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <FormElement
              isRequired={false}
              type="input"
              label="Modifying Site"
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
    </div>
  );
};

export default Glycan;


