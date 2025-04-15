import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";

const API_ENDPOINTS = {
  Human:
    "https://gpr-sparqlist.alpha.glycosmos.org/sparqlist/api/Human_disease",
  Animal:
    "https://gpr-sparqlist.alpha.glycosmos.org/sparqlist/api/Animal_Disease",
  Plant:
    "https://gpr-sparqlist.alpha.glycosmos.org/sparqlist/api/Plant_Disease",
};

const fetcher = (url) => axios.get(url).then((res) => res.data);

const DiseaseSelect = ({ diseaseType, value, onChange, name }) => {
  const [query, setQuery] = useState("");
  const [selectedDisease, setSelectedDisease] = useState(value || null);
  const [prevDiseaseType, setPrevDiseaseType] = useState(diseaseType);

  const {
    data: diseases = [],
    isLoading,
    error,
  } = useSWR(diseaseType ? API_ENDPOINTS[diseaseType] : null, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 86400000, // 24h
  });

  // Sync selectedDisease with external value and handle diseaseType changes
  useEffect(() => {
    if (diseaseType === "") {
      // Clear selection when diseaseType is empty
      setSelectedDisease(null);
      // Notify parent component about the change if we had a previous value
      if (value && onChange) {
        onChange({
          target: {
            name,
            value: null,
          },
        });
      }
    } else if (value) {
      setSelectedDisease(value);
    } else {
      setSelectedDisease(null);
    }
  }, [value, diseaseType, onChange, name]);

  // Handle disease type changes
  useEffect(() => {
    if (prevDiseaseType !== diseaseType) {
      setQuery("");
      setPrevDiseaseType(diseaseType);

      // If the diseaseType changed (not just initial load)
      if (prevDiseaseType !== "" || diseaseType === "") {
        // Clear selection and notify parent
        setSelectedDisease(null);
        if (onChange) {
          onChange({
            target: {
              name,
              value: null,
            },
          });
        }
      }
    }
  }, [diseaseType, prevDiseaseType, onChange, name]);

  // Filter the entire dataset first, then slice for display
  const filteredDiseases =
    query === ""
      ? diseases.slice(0, 200) // Just show first 200 when no search query
      : diseases
          .filter((item) =>
            item.Disease_name?.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 200); // Limit displayed results to first 200 matches

  const totalMatchCount =
    query === ""
      ? diseases.length
      : diseases.filter((item) =>
          item.Disease_name?.toLowerCase().includes(query.toLowerCase())
        ).length;

  const hasMoreResults = totalMatchCount > 200;

  const isDisabled = !diseaseType || isLoading || error;

  const getPlaceholderText = () => {
    if (!diseaseType) return "Please select category";
    if (isLoading) return "Loading...";
    if (error) return `Error: ${error.message}`;
    return "Search for a disease...";
  };

  return (
    <Combobox
      value={selectedDisease}
      name={name}
      onChange={(val) => {
        setSelectedDisease(val);
        if (onChange) {
          onChange({
            target: {
              name,
              value: val,
            },
          });
        }
      }}
      onClose={() => setQuery("")}
      disabled={isDisabled}
    >
      <div className="relative w-full">
        <ComboboxInput
          aria-label="Disease"
          displayValue={(item) => item?.Disease_name || ""}
          onChange={(e) => setQuery(e.target.value)}
          className={`h-[40px] mt-1 block w-full rounded-md border ${
            error ? "border-red-300" : "border-gray-300"
          } p-3 shadow-sm transition-all duration-200 focus:border-[#57369E] focus:ring-[#57369E] focus:outline-none focus:ring-opacity-50 hover:border-gray-400 text-gray-900 ${
            isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
          } ${error ? "text-red-500" : "placeholder-gray-400"}`}
          placeholder={getPlaceholderText()}
          disabled={isDisabled}
        />
        {filteredDiseases.length > 0 && !isDisabled && (
          <ComboboxOptions
            anchor="bottom"
            className="w-full md:w-[20%] absolute z-10 mt-1 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg empty:hidden"
          >
            {filteredDiseases.map((item, idx) => (
              <ComboboxOption
                key={`${item.Disease_name}-${idx}`}
                value={item}
                className="group flex cursor-pointer items-center gap-3 p-3 text-gray-900 transition-colors duration-150 data-[focus]:bg-[#57369E] data-[focus]:text-white"
              >
                <CheckIcon className="h-5 w-5 flex-shrink-0 text-gray-400 group-data-[selected]:text-[#57369E] group-data-[focus]:text-white group-data-[selected]:group-data-[focus]:text-white" />
                <span className="truncate">{item.Disease_name}</span>
              </ComboboxOption>
            ))}
            {hasMoreResults && (
              <div className="p-2 text-sm text-gray-500 text-center border-t border-gray-200">
                Showing 200 of {totalMatchCount} results. Keep typing to narrow
                down.
              </div>
            )}
          </ComboboxOptions>
        )}
        {query && filteredDiseases.length === 0 && !isDisabled && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white p-3 shadow-lg">
            No diseases found
          </div>
        )}
      </div>
    </Combobox>
  );
};

export default DiseaseSelect;
