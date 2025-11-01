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

  // --- (تعديلنا) حالة التحميل لجلب الـ API ---
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

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

  /**
 * Fetches complex symbol with proper filtering and fallback methods
 */
  const fetchDirectComplexSymbol = async (complexName) => {
    if (!complexName) return null;

    try {
      const encodedName = encodeURIComponent(complexName);
      const apiUrl = `https://www.ebi.ac.uk/intact/complex-ws/search/${encodedName}`;
      const response = await axios.get(apiUrl);

      const results = response.data?.elements || response.data?.complexes;

      if (!results || results.length === 0) {
        console.log(`No IntAct complex found for name: ${complexName}`);
        return null;
      }

      // Filter for curated, human, macromolecular complexes only
      const filteredResults = results.filter(complex => {
        // Only curated complexes (filter out predicted)
        const isCurated = complex.complexAC && !complex.predictedComplex;

        // Filter by species (human)
        const isHuman =
          complex.organismName?.toLowerCase().includes('human') ||
          complex.organismName?.toLowerCase().includes('homo sapiens') ||
          complex.taxId === '9606';

        // Filter out class/functional concepts (check if it's an actual complex)
        const isActualComplex = complex.complexAC && complex.complexAC.startsWith('CPX-');

        return isCurated && isHuman && isActualComplex;
      });

      if (filteredResults.length === 0) {
        console.log(`No curated human complexes found for: ${complexName}`);
        return await attemptFallbackMethods(complexName);
      }

      // Try to get complex symbol from filtered results
      let bestMatch = null;
      let priority1Matches = [];
      let priority2Matches = [];

      for (const complex of filteredResults) {
        if (complex.complexName && complex.complexName.includes(":")) {
          priority1Matches.push(complex.complexName);
        }
        if (complex.systematicName && complex.systematicName.includes(":")) {
          priority2Matches.push(complex.systematicName);
        }
      }

      if (priority1Matches.length > 0) {
        priority1Matches.sort((a, b) => a.length - b.length);
        bestMatch = priority1Matches[0];
      } else if (priority2Matches.length > 0) {
        priority2Matches.sort((a, b) => a.length - b.length);
        bestMatch = priority2Matches[0];
      }

      // If no symbol found in filtered results, try fallback methods
      if (!bestMatch) {
        bestMatch = await attemptFallbackMethods(complexName, filteredResults[0]);
      }

      return bestMatch;
    } catch (error) {
      console.error(
        `Failed to fetch complex data from IntAct for "${complexName}":`,
        error.message
      );
      return null;
    }
  };

  /**
   * Fallback Option 1: Query QuickGO for GO term components
   */
  const fetchFromQuickGO = async (complexName) => {
    try {
      // Extract GO ID from complex name (e.g., GO:0045254)
      const goMatch = complexName.match(/GO:\d+/);
      if (!goMatch) return null;

      const goId = goMatch[0];
      const apiUrl = `https://www.ebi.ac.uk/QuickGO/services/ontology/go/terms/${goId}/complete`;
      const response = await axios.get(apiUrl);

      const termData = response.data?.results?.[0];
      if (!termData) return null;

      // Look for has_component relationships
      const components = [];

      if (termData.children) {
        for (const child of termData.children) {
          if (child.relation === 'has_component') {
            // Extract component name/symbol
            const componentName = child.name;
            // Try to extract short symbol (e.g., "E1AR", "LE25T", "B44R")
            const symbolMatch = componentName.match(/\b([A-Z][A-Z0-9]{2,5})\b/);
            if (symbolMatch) {
              components.push(symbolMatch[1]);
            }
          }
        }
      }

      if (components.length > 0) {
        return components.join(':');
      }

      return null;
    } catch (error) {
      console.error(`Failed to fetch from QuickGO for GO term:`, error.message);
      return null;
    }
  };

  /**
   * Fallback Option 2: Use UniProt API to get gene names
   */
  const fetchFromUniProt = async (complexData) => {
    try {
      if (!complexData?.interactors || complexData.interactors.length === 0) {
        return null;
      }

      const geneNames = [];

      // Extract UniProt IDs or protein references
      for (const interactor of complexData.interactors) {
        let uniprotId = null;

        // Try to get UniProt ID from various fields
        if (interactor.uniprotId) {
          uniprotId = interactor.uniprotId;
        } else if (interactor.identifier && interactor.identifier.includes('uniprotkb:')) {
          uniprotId = interactor.identifier.split('uniprotkb:')[1];
        } else if (interactor.identifierLink && interactor.identifierLink.includes('uniprot')) {
          const match = interactor.identifierLink.match(/uniprot\.org\/uniprot\/([A-Z0-9]+)/);
          if (match) uniprotId = match[1];
        }

        if (uniprotId) {
          try {
            const apiUrl = `https://rest.uniprot.org/uniprotkb/${uniprotId}.json`;
            const response = await axios.get(apiUrl);

            // Get primary gene name
            const primaryGene = response.data?.genes?.[0]?.geneName?.value;
            if (primaryGene) {
              geneNames.push(primaryGene);
            }
          } catch (err) {
            console.error(`Failed to fetch UniProt data for ${uniprotId}:`, err.message);
          }
        }
      }

      if (geneNames.length > 0) {
        return geneNames.join(':');
      }

      return null;
    } catch (error) {
      console.error(`Failed to fetch from UniProt:`, error.message);
      return null;
    }
  };

  /**
   * Main fallback attempt function
   * Tries fallback methods in order of priority
   */
  const attemptFallbackMethods = async (complexName, complexData = null) => {
    console.log('Attempting fallback methods for:', complexName);

    // Option 1: Try QuickGO if GO term exists
    if (complexName.includes('GO:')) {
      console.log('Trying QuickGO fallback...');
      const goSymbol = await fetchFromQuickGO(complexName);
      if (goSymbol) {
        console.log('QuickGO fallback successful:', goSymbol);
        return goSymbol;
      }
    }

    // Option 2: Try UniProt if we have complex data with protein references
    if (complexData) {
      console.log('Trying UniProt fallback...');
      const uniprotSymbol = await fetchFromUniProt(complexData);
      if (uniprotSymbol) {
        console.log('UniProt fallback successful:', uniprotSymbol);
        return uniprotSymbol;
      }
    }

    // Option 3: No linked data - return null (user must enter manually)
    console.log('No fallback method succeeded - manual entry required');
    return null;
  };

  // --- START: (تعديلنا) منطق جلب الـ API الجديد والمباشر ---

  /**
   * يبحث مباشرة في IntAct API باستخدام اسم المركب
   * ويختار الرمز "الأقصر" (الأبسط) كأفضل نتيجة.
   */
  // const fetchDirectComplexSymbol = async (complexName) => {
  //   if (!complexName) return null;

  //   try {
  //     const encodedName = encodeURIComponent(complexName);
  //     const apiUrl = `https://www.ebi.ac.uk/intact/complex-ws/search/${encodedName}`;
  //     const response = await axios.get(apiUrl);

  //     const results = response.data?.elements || response.data?.complexes;

  //     if (!results || results.length === 0) {
  //       console.log(`No IntAct complex found for name: ${complexName}`);
  //       return null;
  //     }

  //     let priority1Matches = [];
  //     let priority2Matches = [];

  //     // 1. جمع كل الرموز من كل النتائج
  //     for (const complex of results) {
  //       if (complex.complexName && complex.complexName.includes(":")) {
  //         priority1Matches.push(complex.complexName);
  //       }
  //       if (complex.systematicName && complex.systematicName.includes(":")) {
  //         priority2Matches.push(complex.systematicName);
  //       }
  //     }

  //     let bestMatch = null;

  //     // 2. اختيار الأقصر من القائمة الأولى
  //     if (priority1Matches.length > 0) {
  //       priority1Matches.sort((a, b) => a.length - b.length);
  //       bestMatch = priority1Matches[0];
  //     } 
  //     // 3. أو اختيار الأقصر من القائمة الثانية
  //     else if (priority2Matches.length > 0) {
  //       priority2Matches.sort((a, b) => a.length - b.length);
  //       bestMatch = priority2Matches[0];
  //     } 
  //     // 4. أو بناء الرمز يدوياً من النتيجة الأولى (Fallback)
  //     else if (
  //       results[0].interactors &&
  //       results[0].interactors.length > 0
  //     ) {
  //       bestMatch = results[0].interactors
  //         .map((i) => i.name || i.shortName)
  //         .filter(Boolean)
  //         .join(":");
  //     }

  //     return bestMatch;
  //   } catch (error) {
  //     console.error(
  //       `Failed to fetch complex data from IntAct for "${complexName}":`,
  //       error.message
  //     );
  //     return null;
  //   }
  // };

  /**
   * (تعديلنا) دالة التحكم الجديدة التي تستدعي الـ API المباشر
   * وتدير حالة التحميل.
   */
  const handleChangeComplex = async (e) => {
    const { name, value } = e.target;

    // 1. تحديث الفورم
    handleChange({ target: { name, value } });

    // 2. التحقق إذا كنا بحاجة لجلب البيانات
    if (name === "complexSymbolicName" && value?.go_complex_name) {
      setIsLoading(true); // بدء التحميل
      setNotFound(false); // إعادة تعيين حالة عدم العثور

      const symbol = await fetchDirectComplexSymbol(value.go_complex_name);

      setIsLoading(false); // إيقاف التحميل

      // 3. تحديث حقل الرمز (نفترض أن اسمه complexSymbolGo)
      if (symbol) {
        handleChange({
          target: { name: "complexSymbolGo", value: symbol },
        });
        setNotFound(false);
      } else {
        // إفراغ الحقل والإشارة إلى عدم العثور
        handleChange({
          target: { name: "complexSymbolGo", value: "" },
        });
        setNotFound(true);
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
          <option value="rna">RNA</option> {/* (تعديلك) تم الإبقاء عليه */}
          <option value="lipid">Lipid</option>
        </FormElement>
      </div>

      {reactantData.pType === "complex" && (
        <Complex
          reactantData={reactantData}
          handleChange={handleChangeComplex} // (تعديلنا) استخدام الدالة الجديدة
          isEdit={isEdit}
          isLoading={isLoading} // (تعديلنا) تمرير حالة التحميل
          notFound={notFound} // (تعديلنا) تمرير حالة عدم العثور
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