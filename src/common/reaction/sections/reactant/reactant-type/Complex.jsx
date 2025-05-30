import FormElement from "../../../components/FormElement";

const Complex = ({ reactantData, handleChange, isEdit }) => {
  return (
    <>
      <div>
        <span className="font-bold text-xs block py-4">
          When your complex is in the GO ontology complex
        </span>
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isEdit={isEdit}
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
            isEdit={isEdit}
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
          When your complex is NOT in the GO ontology complex
        </span>
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isEdit={isEdit}
            isRequired={false}
            type="input"
            label={"Complex Name"}
            name="complexName"
            value={reactantData?.complexName}
            handleChange={handleChange}
            placeholder="Type The Complex Name"
          />
          <FormElement
            isEdit={isEdit}
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
