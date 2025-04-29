import FormElement from "../../../components/FormElement";

const Complex = ({ productData, handleChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormElement
        isRequired={false}
        type="itemType"
        itemType="GoProteinComplex"
        label={"Symbolic Name"}
        name="complexSymbolicName"
        value={productData?.complexSymbolicName}
        handleChange={handleChange}
        placeholder="Symbolic Name (NF-KappaB p50/p65 complex)"
      />

      <FormElement
        isRequired={false}
        type="input"
        label={"Complex Symbol"}
        name="complexSymbolGo"
        value={productData?.complexSymbolGo}
        handleChange={handleChange}
        placeholder="Complex Symbol"
      />
    </div>
  );
};

export default Complex;
