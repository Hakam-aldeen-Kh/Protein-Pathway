import FormElement from "../../../components/FormElement";
import { useEffect } from "react";

const Complex = ({ reactantData, handleChange, isEdit }) => {
  useEffect(() => {
    if (!reactantData?.complexSymbolicName && reactantData?.complexSymbolGo) {
      handleChange({
        target: { name: "complexSymbolGo", value: "" },
      });
    }
  }, [reactantData?.complexSymbolicName, reactantData?.complexSymbolGo, handleChange]);
  
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
            spanText="The complex symbol will appear after chosen a symbolic name and you can edit it" // add this span
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
