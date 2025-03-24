import FormElement from "../../../../../components/new-pathway/FormElement";

const Glycan = ({ reactantData, handleChange }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormElement isRequired={false} type="select" label={" Glycan Text Type"} name="glycanTextType" value={reactantData?.glycanTextType} handleChange={handleChange} placeholder="Select Glycan Text Type" >
          <option value="Linear code">Linear code</option>
          <option value="IUPAC Extended">IUPAC Extended</option>
          <option value="IUPAC condensed">IUPAC condensed</option>
          <option value="GlyTouCan ID">GlyTouCan ID</option>
        </FormElement>
        <FormElement isRequired={false} type="input" label={" Glycan Text"} name="glycanText" value={reactantData?.glycanText} handleChange={handleChange} placeholder="Type Glycan Text" />
      </div>

      <div>
        <span className="font-bold text-xs block py-4">
          Binding Backbone Information
        </span>
        <div className="grid grid-cols-2 gap-4">
          <FormElement isRequired={false} type="input" label={"Binding Site Code"} name="bindingSiteCode" value={reactantData?.bindingSiteCode} handleChange={handleChange} placeholder="Three letters code of binding site (e.g. ser, tyr...)" />
          <FormElement isRequired={false} type="input" label={"Number of Amino Acid Binding Site"} name="aminoAcidBindingSite" value={reactantData?.aminoAcidBindingSite} handleChange={handleChange} placeholder="Type number of amino acid binding site (e.g. 123)" />
        </div>
      </div>
    </>

  )
};

export default Glycan;
