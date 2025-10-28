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

  // --- START: (تعديلنا) منطق جلب الـ API الجديد والمباشر ---

  /**
   * يبحث مباشرة في IntAct API باستخدام اسم المركب
   * ويختار الرمز "الأقصر" (الأبسط) كأفضل نتيجة.
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

      let priority1Matches = [];
      let priority2Matches = [];

      // 1. جمع كل الرموز من كل النتائج
      for (const complex of results) {
        if (complex.complexName && complex.complexName.includes(":")) {
          priority1Matches.push(complex.complexName);
        }
        if (complex.systematicName && complex.systematicName.includes(":")) {
          priority2Matches.push(complex.systematicName);
        }
      }

      let bestMatch = null;

      // 2. اختيار الأقصر من القائمة الأولى
      if (priority1Matches.length > 0) {
        priority1Matches.sort((a, b) => a.length - b.length);
        bestMatch = priority1Matches[0];
      } 
      // 3. أو اختيار الأقصر من القائمة الثانية
      else if (priority2Matches.length > 0) {
        priority2Matches.sort((a, b) => a.length - b.length);
        bestMatch = priority2Matches[0];
      } 
      // 4. أو بناء الرمز يدوياً من النتيجة الأولى (Fallback)
      else if (
        results[0].interactors &&
        results[0].interactors.length > 0
      ) {
        bestMatch = results[0].interactors
          .map((i) => i.name || i.shortName)
          .filter(Boolean)
          .join(":");
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

      const symbol = await fetchDirectComplexSymbol(value.go_complex_name);

      setIsLoading(false); // إيقاف التحميل

      // 3. تحديث حقل الرمز (نفترض أن اسمه complexSymbolGo)
      if (symbol) {
        handleChange({
          target: { name: "complexSymbolGo", value: symbol },
        });
      } else {
        // إفراغ الحقل للسماح بالإدخال اليدوي
        handleChange({
          target: { name: "complexSymbolGo", value: "" },
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