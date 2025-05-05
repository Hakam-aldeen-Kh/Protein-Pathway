import { useState } from "react";
import FormElement from "../../../components/FormElement";
import ProteinSearchTable from "./ProteinSearchTable";

const Protein = ({ reactantData, handleChange, isEdit }) => {
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
        <span className="font-bold text-xs block py-4">Protein Name</span>
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isEdit={isEdit}
            isRequired={false}
            type="paginationTable"
            label="Protein Search"
            name="proteinSymbolicName"
            value={reactantData?.proteinSymbolicName || ""}
            handleChange={handleChange}
            placeholder="Symbolic Name (NF-kappaB p50/p65 complex)"
            paginationTable
            customStyle="flex items-end gap-x-2 flex-1"
            setOpenTablePagination={setOpenTablePagination}
            reactantData={reactantData}
          />

          <FormElement
            isEdit={isEdit}
            isRequired={false}
            type="input"
            label="Protein Symbol"
            name="proteinSymbol"
            value={reactantData?.proteinSymbol || ""}
            handleChange={handleChange}
            placeholder="Protein Symbol (e.g. RecA)"
          />
        </div>
      </div>

      {/* <div>
        <span className="font-bold text-xs block py-4">
          Protein Modification
        </span>
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isRequired={false}
            type="input"
            label="Modifying site"
            name="modifyingSite"
            value={reactantData?.modifyingSite || ""}
            handleChange={handleChange}
            placeholder="Modifying site of amino acid (number)"
          />

          <FormElement
            isRequired={false}
            type="itemType"
            itemType="ProteinModOntology"
            label="Modifying Type"
            name="modifyingType"
            value={reactantData?.modifyingType || ""}
            handleChange={handleChange}
            placeholder="Select Modifying Type"
          />
        </div>
      </div> */}

      <ProteinSearchTable
        site="reactant"
        isOpen={isOpen}
        setOpenTablePagination={setOpenTablePagination}
        onProteinSelect={handleProteinSelect}
        reactantData={reactantData} // Pass reactantData
      />
    </>
  );
};

export default Protein;
