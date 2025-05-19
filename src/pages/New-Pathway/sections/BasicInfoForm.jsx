import { useState } from "react";
import Accordion from "../../../common/Accordion";
import FormElement from "../../../common/reaction/components/FormElement";
import SpeciesTable from "./SpeciesTable";

const BasicInfoForm = ({ data, handleChange }) => {
  const [pubMeds, setPubMeds] = useState(
    data.pubMeds?.length > 0
      ? data.pubMeds.map((item) => ({
          id: item.id || "",
          title: item.title || "",
        }))
      : []
  );
  const [relatedDiseases, setRelatedDiseases] = useState(
    data.diseaseInput && data.diseaseInput.length > 0
      ? data.diseaseInput
      : [{ type: "", value: "" }]
  );
  const [isOpen, setOpenTablePagination] = useState(false);

  // Callback to handle species selection
  const handleSpeciesSelect = ({ species }) => {
    handleChange({
      target: {
        name: "species",
        value: species,
      },
    });
    setOpenTablePagination(false);
  };

  const addPubMed = () => {
    const newPubMeds = [...pubMeds, { id: "", title: "" }];
    setPubMeds(newPubMeds);
    handleChange({ target: { name: "pubMeds", value: newPubMeds } });
  };

  const removePubMed = (pubMedIndex) => {
    const newPubMeds = pubMeds.filter((_, index) => index !== pubMedIndex);
    setPubMeds(newPubMeds);
    handleChange({ target: { name: "pubMeds", value: newPubMeds } });
  };

  const handleChangePubMed = (e, pubMedIndex, field) => {
    const newPubMeds = pubMeds.map((pubMed, index) => {
      if (index === pubMedIndex) {
        return { ...pubMed, [field]: e.target.value };
      }
      return pubMed;
    });
    setPubMeds(newPubMeds);
    handleChange({ target: { name: "pubMeds", value: newPubMeds } });
  };

  const addRelatedDisease = () => {
    const newRelatedDiseases = [...relatedDiseases, { type: "", value: "" }];
    setRelatedDiseases(newRelatedDiseases);
    handleChange({
      target: { name: "diseaseInput", value: newRelatedDiseases },
    });
  };

  const removeRelatedDisease = (index) => {
    const newRelatedDiseases = relatedDiseases.filter((_, i) => i !== index);
    setRelatedDiseases(newRelatedDiseases);
    handleChange({
      target: { name: "diseaseInput", value: newRelatedDiseases },
    });
  };

  const handleRelatedDiseaseChange = (index, field, value) => {
    const newRelatedDiseases = relatedDiseases.map((rd, i) => {
      if (i === index) {
        return { ...rd, [field]: value };
      }
      return rd;
    });
    setRelatedDiseases(newRelatedDiseases);
    handleChange({
      target: { name: "diseaseInput", value: newRelatedDiseases },
    });
  };

  return (
    <Accordion
      variant="gray"
      title={"Pathway Basic Information"}
      className="border rounded-lg"
    >
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isRequired
            type="input"
            label="Title"
            name="title"
            value={data?.title}
            handleChange={handleChange}
            placeholder="Add Title"
          />
          <FormElement
            isRequired
            type="input"
            label="Description"
            name="description"
            value={data?.description}
            handleChange={handleChange}
            placeholder="Add Description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isRequired={false}
            type="speciesPaginationTable"
            label="Species"
            name="species"
            placeholder="Select Species"
            value={data?.species}
            handleChange={handleChange}
            speciesPaginationTable
            customStyle="flex items-end gap-x-2 flex-1"
            setOpenTablePagination={setOpenTablePagination}
          />

          <SpeciesTable
            isOpen={isOpen}
            setOpenTablePagination={setOpenTablePagination}
            onSpeciesSelect={handleSpeciesSelect}
            data={data}
          />

          <FormElement
            type="itemType"
            label="Pathway Category"
            name="category"
            value={data?.category}
            handleChange={handleChange}
            itemType="Categories"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormElement
              type="itemType"
              label="Tissue"
              name="tissue"
              itemType="Tissue"
              value={data?.tissue}
              handleChange={handleChange}
            />
            <button
              className="text-[14px] text-start text-[#57369E] mt-4 mb-2"
              onClick={addPubMed}
              type="button"
            >
              + Add PubMed
            </button>
            <div className="space-y-2">
              {pubMeds?.map((item, index) => (
                <div key={index} className="grid grid-cols-2 gap-x-4">
                  <div className="flex items-end gap-x-1">
                    <FormElement
                      label="PubMed"
                      placeholder="Add PubMed Title"
                      value={item?.title}
                      handleChange={(e) =>
                        handleChangePubMed(e, index, "title")
                      }
                      className="w-[90%]"
                    />
                    <div
                      className="flex items-center h-[40px] justify-center py-2 px-3 border bg-[#57369E] cursor-pointer rounded-lg hover:bg-[#00A7D3] transition-all duration-200"
                      onClick={() => removePubMed(index)}
                    >
                      <img
                        src="/images/icons/trash.svg"
                        className="w-[24px] h-[24px]"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Add PubMed ID"
                    className="outline-none block w-full h-[40px] self-end flex-1 rounded-md border p-2 border-gray-300 shadow-sm focus:border-[#57369E] focus:ring-[#57369E]"
                    value={item?.id}
                    onChange={(e) => handleChangePubMed(e, index, "id")}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Related Diseases */}
          <div className="space-y-2">
            {relatedDiseases?.map((relatedDisease, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div className="flex items-end gap-x-1">
                  <FormElement
                    type="select"
                    label="Related Disease"
                    name={`relatedDiseaseType`}
                    value={relatedDisease?.type}
                    handleChange={(e) =>
                      handleRelatedDiseaseChange(index, "type", e.target.value)
                    }
                    placeholder="Select a Type"
                    className={`${index > 0 ? "w-[90%]" : "w-full"}`}
                  >
                    <option value="Human">Human</option>
                    <option value="Animal">Animal</option>
                    <option value="Plant">Plant</option>
                  </FormElement>
                  {index > 0 && (
                    <div
                      className="flex items-center h-[40px] justify-center py-2 px-3 border bg-[#57369E] cursor-pointer rounded-lg hover:bg-[#00A7D3] transition-all duration-200"
                      onClick={() => removeRelatedDisease(index)}
                    >
                      <img
                        src="/images/icons/trash.svg"
                        className="w-[24px] h-[24px]"
                      />
                    </div>
                  )}
                </div>

                <FormElement
                  label=""
                  type="itemType"
                  name={`diseaseInput`}
                  value={relatedDisease?.value}
                  handleChange={(e) =>
                    handleRelatedDiseaseChange(index, "value", e.target.value)
                  }
                  itemType={relatedDisease.type}
                  placeholder="Enter disease value"
                  className="self-end"
                />

                {index === 0 && (
                  <button
                    className="text-[14px] text-end text-[#57369E] col-span-2"
                    onClick={addRelatedDisease}
                    type="button"
                  >
                    + Add Related Disease
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default BasicInfoForm;
