import { useState } from "react";
import ItemSelect from "../../ItemSelect"; // Adjust path as needed
import EnzymeContainer from "../../EnzymeContainer";
import GlycanText from "./GlycanText";

const FormElement = ({
  isRequired = false,
  type = "input",
  label = "",
  name = "",
  value = "",
  handleChange,
  placeholder = "",
  id = "",
  children,
  itemType,
  customStyle,
  paginationTable,
  speciesPaginationTable,
  setOpenTablePagination,
  reactantData,
  checked,
  isDisabled,
  setIsDisabled,
  className,
  glycanTextType,
  isEdit = true,
}) => {
  const [paginationTableBtn, setPaginationTableBtn] = useState(true);

  const handleInputChange = (e) => {
    handleChange(e);
    setPaginationTableBtn(e.target.value.length <= 2);
  };

  const handleOnBlur = (e) => {
    setPaginationTableBtn(e.target.value.length <= 2);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">
        {isRequired && <span className="text-red-500">*</span>}
        <span>{label}</span>
      </label>
      <div className="flex items-center justify-center gap-2">
        {type === "input" && (
          <input
            disabled={!isEdit}
            type="text"
            value={value || ""}
            name={name}
            required={isRequired}
            onChange={handleInputChange}
            onBlur={handleOnBlur}
            placeholder={placeholder}
            className="mt-1 outline-none block w-full flex-1 rounded-md border p-2 border-gray-300 shadow-sm focus:border-[#57369E] focus:ring-[#57369E]"
          />
        )}

        {type === "select" && (
          <div className={`select-container w-full flex-1`}>
            <select
              disabled={!isEdit}
              required={isRequired}
              name={name}
              value={value || ""}
              onChange={handleChange}
              className="select h-[40px] mt-1 outline-none block w-full flex-1 rounded-md border p-2 border-gray-300 shadow-sm focus:border-[#57369E] focus:ring-[#57369E]"
            >
              <option value="">{placeholder}</option>
              {children}
            </select>
          </div>
        )}

        {type === "paginationTable" && (
          <div
            className={`${
              customStyle ? customStyle : "select-container w-full flex-1"
            }`}
          >
            <input
              disabled={!isEdit}
              type="text"
              value={value || ""}
              name={name}
              required={isRequired}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="mt-1 outline-none block w-full flex-1 rounded-md border p-2 border-gray-300 shadow-sm focus:border-[#57369E] focus:ring-[#57369E]"
            />
            {paginationTable && (
              <>
                <button
                  type="button"
                  disabled={paginationTableBtn}
                  onClick={() => setOpenTablePagination(true)}
                  className={`px-8 w-fit py-[10px] rounded-sm text-white font-semibold transition-all ${
                    paginationTableBtn
                      ? "bg-gray-400 cursor-not-allowed opacity-70"
                      : "bg-[#57369E] hover:bg-[#00A7D3]"
                  }`}
                >
                  Search
                </button>
                <input
                  disabled={!isEdit}
                  id="reactant_protein_uniprot_id"
                  name="reactant_protein_uniprot_id"
                  type="hidden"
                  value={reactantData?.reactant_protein_uniprot_id || ""}
                />
              </>
            )}
          </div>
        )}
        {type === "speciesPaginationTable" && (
          <div
            className={`${
              customStyle ? customStyle : "select-container w-full flex-1"
            }`}
          >
            <input
              type="text"
              value={value || ""}
              name={name}
              required={isRequired}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="mt-1 outline-none block w-full flex-1 rounded-md border p-2 border-gray-300 shadow-sm focus:border-[#57369E] focus:ring-[#57369E]"
            />
            {speciesPaginationTable && (
              <>
                <button
                  type="button"
                  disabled={paginationTableBtn}
                  onClick={() => setOpenTablePagination(true)}
                  className={`px-8 w-fit py-[10px] rounded-sm text-white font-semibold transition-all ${
                    paginationTableBtn
                      ? "bg-gray-400 cursor-not-allowed opacity-70"
                      : "bg-[#57369E] hover:bg-[#00A7D3]"
                  }`}
                >
                  Search
                </button>
                <input
                  id="species"
                  name="species"
                  type="hidden"
                  value={value}
                />
              </>
            )}
          </div>
        )}

        {type === "checkbox" && (
          <div className="space-x-3 flex-1">
            <input
              disabled={!isEdit}
              type="checkbox"
              id={id}
              checked={value || false}
              name={name}
              onChange={handleChange}
            />
            <label
              htmlFor={id}
              className="text-sm cursor-pointer font-medium text-gray-700"
            >
              {placeholder}
            </label>
          </div>
        )}

        {type === "itemType" && (
          <ItemSelect
            isEdit={isEdit}
            name={name}
            value={value}
            onChange={handleChange}
            itemType={itemType}
            placeholder={placeholder}
          />
        )}

        {type == "enzyme" && (
          <EnzymeContainer
            name={name}
            value={value}
            handleChange={handleChange}
          />
        )}

        {type === "Glycan Text" && (
          <GlycanText
            name={name}
            value={value}
            isRequired={isRequired}
            glycanTextType={glycanTextType}
            handleChange={handleChange}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
          />
        )}

        {type === "radio" && (
          <div className="space-x-3 flex-1">
            <input
              disabled={!isEdit}
              type="radio"
              id={id}
              checked={checked === value}
              value={value || ""}
              name={name}
              onChange={handleChange}
            />
            <label
              htmlFor={id}
              className="text-sm cursor-pointer font-medium text-gray-700"
            >
              {placeholder}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormElement;
