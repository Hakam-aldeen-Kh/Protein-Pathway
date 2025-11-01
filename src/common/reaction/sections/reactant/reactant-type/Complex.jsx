import FormElement from "../../../components/FormElement";
import { useEffect } from "react";

const Complex = ({ reactantData, handleChange, isEdit, isLoading, notFound }) => {
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
            placeholder="Symbolic Names (NF-KappaB p50/p65 complex)"
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
            isLoading={isLoading}
          />
          {notFound && (
            <div className="col-span-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">Complex not found</span> in the database. Please enter the complex symbol manually.
              </p>
            </div>
          )}
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
