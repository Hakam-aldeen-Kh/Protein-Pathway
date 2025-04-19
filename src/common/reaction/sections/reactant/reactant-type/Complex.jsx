import FormElement from "../../../components/FormElement";

const Complex = ({ reactantData, handleChange }) => {
  return (
    <>
      <div>
        <span className="font-bold text-xs block py-4">
          When you re complex is in GO ontology complex
        </span>
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isRequired={false}
            type="itemType"
            itemType="GoProteinComplex"
            label={"Symbolic Name"}
            name="complexSymbolicName"
            value={reactantData?.complexSymbolicName}
            handleChange={handleChange}
            placeholder="Symbolic Name (NF-KappaB p50/p65 complex)"
          />

          <FormElement
            isRequired={false}
            type="input"
            label={"Complex Symbol"}
            name="complexSymbolGo"
            value={reactantData?.complexSymbolGo}
            handleChange={handleChange}
            placeholder="Complex Symbol"
          />
        </div>
      </div>

      <div>
        <span className="font-bold text-xs block py-4">
          When you re complex is NOT in GO ontology complex
        </span>
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isRequired={false}
            type="input"
            label={"Complex Name"}
            name="complexName"
            value={reactantData?.complexName}
            handleChange={handleChange}
            placeholder="Type The Complex Name"
          />
          <FormElement
            isRequired={false}
            type="input"
            label={"Complex Symbol"}
            name="complexSymbolNotInGo"
            value={reactantData?.complexSymbolNotInGo}
            handleChange={handleChange}
            placeholder="Complex Symbol"
          />
        </div>
      </div>
    </>
  );
};

export default Complex;
