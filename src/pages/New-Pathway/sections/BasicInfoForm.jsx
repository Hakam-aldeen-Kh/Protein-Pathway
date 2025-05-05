import { useState } from "react";
import Accordion from "../../../common/Accordion";
import FormElement from "../../../common/reaction/components/FormElement";
import SpeciesTable from "./SpeciesTable";

const BasicInfoForm = ({ data, handleChange }) => {
  const [diseaseType, setDiseaseType] = useState(data.relatedDisease);
  const [pubMeds, setPubMeds] = useState(data.pubMeds || []);
  const [isOpen, setOpenTablePagination] = useState(false);

  // Callback to handle species selection
  const handleSpeciesSelect = ({ species }) => {
    // Update the species name
    handleChange({
      target: {
        name: "species",
        value: species,
      },
    });

    setOpenTablePagination(false); // Close the modal after selection
  };

  const handleDiseaseTypeChange = (e) => {
    const { value } = e.target;
    setDiseaseType(value);
    handleChange(e);
  };

  const addPubMed = () => {
    const newPubMeds = [...pubMeds, { id: "" }];
    setPubMeds(newPubMeds);
    handleChange({ target: { name: "pubMeds", value: newPubMeds } });
  };

  const removePubMed = (pubMedIndex) => {
    const newPubMeds = pubMeds.filter((_, index) => index !== pubMedIndex);
    setPubMeds(newPubMeds);
    handleChange({ target: { name: "pubMeds", value: newPubMeds } });
  };

  const handleChangePubMed = (e, pubMedIndex) => {
    const newPubMeds = pubMeds.map((field, index) => {
      if (index === pubMedIndex) {
        return { id: e.target.value };
      }
      return field;
    });
    setPubMeds(newPubMeds);
    handleChange({ target: { name: "pubMeds", value: newPubMeds } });
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
          <FormElement
            type="itemType"
            label="Tissue"
            name="tissue"
            itemType="Tissue"
            value={data?.tissue}
            handleChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-2 items-end">
            <FormElement
              type="select"
              label="Related Disease"
              name="relatedDisease"
              value={data?.relatedDisease}
              handleChange={handleDiseaseTypeChange}
              placeholder="Select a Type"
            >
              <option value="Human">Human</option>
              <option value="Animal">Animal</option>
              <option value="Plant">Plant</option>
            </FormElement>

            <FormElement
              label=""
              type="itemType"
              name="diseaseInput"
              value={data?.diseaseInput}
              handleChange={handleChange}
              itemType={diseaseType}
            />
          </div>
        </div>

        <div>
          <button
            className="mb-5 flex items-center text-[14px] text-[#57369E]"
            onClick={addPubMed}
            type="button"
          >
            + Add pubMeds
          </button>
          <div className="grid grid-cols-2 gap-4">
            {data?.pubMeds?.map((item, index) => (
              <div className="flex gap-2" key={index}>
                <input
                  type="text"
                  placeholder="Add pubMeds Id"
                  className="outline-none block w-full flex-1 rounded-md border p-2 border-gray-300 shadow-sm focus:border-[#57369E] focus:ring-[#57369E]"
                  value={item?.id}
                  onChange={(e) => handleChangePubMed(e, index)}
                />
                <div
                  className="flex items-center justify-center py-2 px-3 border bg-[#57369E] cursor-pointer rounded-lg hover:bg-[#00A7D3] transition-all duration-200"
                  onClick={() => removePubMed(index)}
                >
                  <img
                    src="/images/icons/trash.svg"
                    className="w-[24px] h-[24px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default BasicInfoForm;
