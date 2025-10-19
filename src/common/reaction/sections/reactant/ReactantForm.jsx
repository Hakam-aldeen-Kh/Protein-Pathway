import axios from "axios";
import { useState } from "react";
import FormElement from "../../components/FormElement";
import Complex from "./reactant-type/Complex";
import Dna from "./reactant-type/Dna";
import Glycan from "./reactant-type/Glycan";
import Lipid from "./reactant-type/Lipid";
import Protein from "./reactant-type/Protein";
import SmallMolecule from "./reactant-type/SmallMolecule";
import Rna from "./reactant-type/Rna";

const ReactantForm = ({
  handleChangeData,
  reaction,
  reactantData,
  reactantId,
  isEdit,
  reactions,
}) => {
  const handleChange = (e) =>
    handleChangeData(e, reaction.id, "reactants", reactantId);

  if (reactantData?.connectedData) {
    reactantData = reactions
      ?.find((item) => item.id === reactantData?.fromReaction)
      ?.[reactantData?.connectedData?.type]?.find(
        (item) => item.id === reactantData?.connectedData.id
      );
  }

  // --- Glycan Multiple Support ---
  const [glycans, setGlycans] = useState(
    Array.isArray(reactantData.glycans) && reactantData.glycans.length > 0
      ? reactantData.glycans
      : [{ glycanTextType: "", glycanText: "" }]
  );

  const addGlycan = () => {
    setGlycans((prev) => {
      const updated = [...prev, { glycanTextType: "", glycanText: "" }];
      handleChange({
        target: { name: "glycans", value: updated },
      });
      return updated;
    });
  };

  const removeGlycan = (idx) => {
    setGlycans((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      handleChange({
        target: { name: "glycans", value: updated },
      });
      return updated;
    });
  };

  const handleGlycanChange = (e, idx) => {
    const { name, value } = e.target;
    setGlycans((prev) => {
      const updated = prev.map((glycan, i) =>
        i === idx ? { ...glycan, [name]: value } : glycan
      );
      handleChange({
        target: { name: "glycans", value: updated },
      });
      return updated;
    });
  };

  // --- START: API Fetching Logic ---

  /**
   * STEP 1: Fetches the definition for a given ChEBI or PR identifier.
   */
  const fetchSymbolDefinition = async (complexId) => {
    if (!complexId || !complexId.includes("_")) {
      return null;
    }
    const [prefix, id] = complexId.split("_");
    let apiUrl = "";
    let definition = null;
    try {
      if (prefix === "CHEBI") {
        apiUrl = `https://www.ebi.ac.uk/chebi/backend/api/public/compound/${id}/?format=json`;
        const response = await axios.get(apiUrl);
        definition = response.data?.definition;
      } else if (prefix === "PR") {
        const curie = `${prefix}:${id}`;
        apiUrl = `https://www.ebi.ac.uk/ols4/api/v2/ontologies/pr/classes?curie=${curie}`;
        const response = await axios.get(apiUrl);
        definition = response.data?.elements?.[0]?.definition?.[0]?.value;
      }
      return definition;
    } catch (error) {
      console.error(
        `Failed to fetch definition for ${complexId}:`,
        error.message
      );
      return null;
    }
  };

  /**
   * STEP 2: Searches UniProt using a definition string.
   */
  const searchUniProtByDefinition = async (definition) => {
    if (!definition) return null;
    try {
      const encodedQuery = encodeURIComponent(definition);
      const uniProtApiUrl = `https://rest.uniprot.org/uniprotkb/search?query=${encodedQuery}&fields=accession,protein_name,gene_primary,organism_id&format=json`;
      const response = await axios.get(uniProtApiUrl);
      return response.data;
    } catch (error) {
      console.error("Failed to search UniProt:", error.message);
      return null;
    }
  };

  /**
   * STEP 3: Fetches the full UniProt entry for a given accession number.
   */
  const fetchUniProtEntryByAccession = async (accession) => {
    if (!accession) return null;
    try {
      const apiUrl = `https://rest.uniprot.org/uniprotkb/${accession}`;
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error(
        `Failed to fetch UniProt entry for ${accession}:`,
        error.message
      );
      return null;
    }
  };

  /**
   * STEP 4: Fetches protein complex data from the IntAct database.
   */
  const fetchIntactComplexData = async (accession) => {
    if (!accession) return null;
    try {
      const apiUrl = `https://www.ebi.ac.uk/intact/complex-ws/search/${accession}`;
      const response = await axios.get(apiUrl);
      // The IntAct API response structure might differ, this is an example
      const elements = response.data?.complexes || response.data?.elements;
      if (elements && elements.length > 0) {
        return elements.map(
          (element) => element.complex_name || element.complexName
        );
      }
      return [];
    } catch (error) {
      console.error(
        `Failed to fetch IntAct data for ${accession}:`,
        error.message
      );
      return [];
    }
  };

  /**
   * Main orchestrator function to fetch all complex data
   */
  const fetchComplexData = async (complexId) => {
    if (!complexId) return null;

    // Step 1: Get definition
    const definition = await fetchSymbolDefinition(complexId);
    if (!definition) return null;

    // Step 2: Get search results
    const searchResults = await searchUniProtByDefinition(definition);
    const firstAccession = searchResults?.results?.[0]?.primaryAccession;
    if (!firstAccession) return null;

    // Step 3 & 4: Run in parallel
    const [detailedProteinData, complexNames] = await Promise.all([
      fetchUniProtEntryByAccession(firstAccession),
      fetchIntactComplexData(firstAccession),
    ]);

    return {
      definition,
      accession: firstAccession,
      proteinData: detailedProteinData,
      complexNames: complexNames || [],
    };
  };

  /**
   * Handles changes for the Complex component and triggers the API fetch chain.
   */
  const handleChangeComplex = async (e) => {
    const { name, value } = e.target;

    // Update the form state with the selected complex symbolic name
    handleChange({ target: { name, value } });

    // If the changed field is 'complexSymbolicName' and it has an ID, fetch the data
    if (name === "complexSymbolicName" && value?.go_complex_id) {
      const result = await fetchComplexData(value.go_complex_id);

      // If we got complex names back, update the 'complexSymbolGo' field
      if (result?.complexNames && result.complexNames.length > 0) {
        handleChange({
          target: { name: "complexSymbolGo", value: result.complexNames },
        });
      } else {
        // Otherwise, clear the 'complexSymbolGo' field
        handleChange({
          target: { name: "complexSymbolGo", value: [] },
        });
      }
    }
  };
  // --- END: API Fetching Logic ---

  return (
    <div className={`space-y-4 p-4 ${!isEdit && "bg-gray-100"}`}>
      <div className="grid grid-cols-2 gap-4">
        <FormElement
          label={"Cell Type"}
          name="cellType"
          value={reactantData?.cellType}
          handleChange={handleChange}
          placeholder="Select Cell Type"
          type="itemType"
          itemType="CellType"
          isEdit={isEdit}
        />
        <FormElement
          isRequired={false}
          type="itemType"
          label={" Cellular Location"}
          name="cellularLocation"
          value={reactantData?.cellularLocation}
          handleChange={handleChange}
          placeholder="Select Location"
          itemType="Cellular"
          isEdit={isEdit}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormElement
          isRequired={false}
          type="select"
          label={"Reactant Type"}
          name="pType"
          value={
            reactantData?.pType === "enzyme" ? "protein" : reactantData?.pType
          }
          handleChange={handleChange}
          placeholder="Select Reactant Type"
          isEdit={isEdit}
        >
          <option value="complex">Complex</option>
          <option value="protein">Protein</option>
          <option value="glycan">Glycan</option>
          <option value="small_molecule">Small molecule</option>
          <option value="dna">DNA</option>
          <option value="rna">RNA</option>  {/* ADD THIS LINE */}
          <option value="lipid">Lipid</option>
        </FormElement>
      </div>

      {reactantData.pType === "complex" && (
        <Complex
          reactantData={reactantData}
          handleChange={handleChangeComplex} // Use the new handler here
          isEdit={isEdit}
        />
      )}
      {reactantData.pType === "lipid" && (
        <Lipid
          reactantData={reactantData}
          handleChange={handleChange}
          isEdit={isEdit}
        />
      )}
      {reactantData.pType === "protein" && (
        <Protein
          reactantData={reactantData}
          handleChange={handleChange}
          isEdit={isEdit}
        />
      )}
      {reactantData.pType === "glycan" && (
        <div className="space-y-4">
          {glycans.map((glycan, idx) => (
            <Glycan
              key={idx}
              index={idx + 1}
              reactantData={glycan}
              handleChange={(e) => handleGlycanChange(e, idx)}
              isEdit={isEdit}
              canDelete={glycans.length > 1 && idx > 0}
              onRemove={() => removeGlycan(idx)}
            />
          ))}
          <button
            type="button"
            className="w-full mt-4 px-4 py-2.5 bg-[#57369E] text-white rounded-lg hover:bg-[#00A7D3] transition-colors duration-200 font-medium flex items-center justify-center gap-2"
            onClick={addGlycan}
          >
            <span className="text-xl">+</span>
            Add Glycan
          </button>
        </div>
      )}
      {reactantData.pType === "small_molecule" && (
        <SmallMolecule
          reactantData={reactantData}
          handleChange={handleChange}
          isEdit={isEdit}
        />
      )}
      {reactantData.pType === "dna" && (
        <Dna
          reactantData={reactantData}
          handleChange={handleChange}
          isEdit={isEdit}
        />
      )}

      {reactantData.pType === "rna" && (
        <Rna
          reactantData={reactantData}
          handleChange={handleChange}
          isEdit={isEdit}
        />
      )}

      {reactantData.pType === "enzyme" && (
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isEdit={isEdit}
            type="enzyme"
            label={"EC enzyme name"}
            name="controller_ec_enzyme"
            value={reactantData?.controller_ec_enzyme}
            handleChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default ReactantForm;
