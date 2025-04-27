import { useState } from "react";
import FormElement from "../../../components/FormElement";
import ProteinSearchTable from "../../reactant/reactant-type/ProteinSearchTable";

const Protein = ({productData,handleChange}) => {
  const [isOpen, setOpenTablePagination] = useState(false);

  // Callback to handle protein selection
  const handleProteinSelect = ({ proteinName, proteinId }) => {
    // Update proteinSymbolicName (text input in Protein Search)
    handleChange({
      target: {
        name: "proteinSymbolicName",
        value: proteinName,
      },
    });

    // Update reactant_protein_uniprot_id (hidden input)
    handleChange({
      target: {
        name: "reactant_protein_uniprot_id",
        value: proteinId,
      },
    });

    setOpenTablePagination(false); // Close the modal after selection
  };
  return (
    <>
      <div>
        <span className=" font-bold text-xs block py-4">Protein Name</span>

        <div className="grid grid-cols-2 gap-4">
          {/* <FormElement
            isRequired={false}
            type="input"
            label={"Binding site Code"}
            name="bindingSiteCode"
            value={productData?.bindingSiteCode}
            handleChange={handleChange}
            placeholder="Three letters code of binding site (e.g. ser, tyr...)"
          /> */}

          <FormElement
            isRequired={false}
            type="paginationTable"
            label="Protein Search"
            name="proteinSymbolicName"
            value={productData?.proteinSymbolicName || ""}
            handleChange={handleChange}
            placeholder="Symbolic Name (NF-kappaB p50/p65 complex)"
            paginationTable
            customStyle="flex items-end gap-x-2 flex-1"
            setOpenTablePagination={setOpenTablePagination}
            reactantData={productData}
          />

          {/* <FormElement
            isRequired={false}
            type="input"
            label={"Protein Symbol"}
            name="proteinSymbol"
            value={productData?.proteinSymbol}
            handleChange={handleChange}
            placeholder="Type protein symbol"
          /> */}

          <FormElement
            isRequired={false}
            type="input"
            label="Protein Symbol"
            name="proteinSymbol"
            value={productData?.proteinSymbol || ""}
            handleChange={handleChange}
            placeholder="Protein Symbol (e.g. RecA)"
          />
        </div>
      </div>

      <ProteinSearchTable
        site="product"
        isOpen={isOpen}
        setOpenTablePagination={setOpenTablePagination}
        onProteinSelect={handleProteinSelect}
        reactantData={productData}
      />
    </>
  );
};

export default Protein;
