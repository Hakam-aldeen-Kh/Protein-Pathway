import FormElement from "../../../components/FormElement";

const Dna = ({ reactantData, handleChange }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormElement isRequired={false} type="input" label={"Gene Name"} name="geneName" value={reactantData?.geneName} handleChange={handleChange} placeholder="Gene Name" />
        <FormElement isRequired={false} type="input" label={"Chromosom Number"} name="chromosomNumber" value={reactantData?.chromosomNumber} handleChange={handleChange} placeholder="Chromosom Number" />
      </div>

      <div>
        <div className="grid grid-cols-2 gap-4">
          <FormElement isRequired={false} type="input" label={"P (long arm) or Q (short arm)"} name="pORq" value={reactantData?.pORq} handleChange={handleChange} placeholder="Name" />
          <FormElement isRequired={false} type="input" label={"Specific band location"} name="specificBandLocation" value={reactantData?.specificBandLocation} handleChange={handleChange} placeholder="Specific band location (number)" />
        </div>
      </div>
    </>
  )
};

export default Dna;
