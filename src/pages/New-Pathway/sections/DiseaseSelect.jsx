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

const DiseaseSelect = ({ diseaseType = "" }) => {
  const [query, setQuery] = useState("");
  const [selectedDisease, setSelectedDisease] = useState(null);
  
  const {
    data: diseasesRaw = [],
    isLoading,
    error,
  } = useSWR(diseaseType ? API_ENDPOINTS[diseaseType] : null, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 86400000, // 24h
  });

  // Slice data after fetch
  const diseases = diseasesRaw.slice(0, 200);

  // Reset selected on diseaseType change
  useEffect(() => {
    setSelectedDisease(null);
    setQuery("");
  }, [diseaseType]);

  const filteredDiseases =
    query === ""
      ? diseases
      : diseases.filter((item) =>
          item.Disease_name?.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox
      value={selectedDisease}
      onChange={setSelectedDisease}
      onClose={() => setQuery("")}
    >
      <div className="relative">
        <ComboboxInput
          aria-label="Disease"
          displayValue={(item) => item?.Disease_name || ""}
          onChange={(e) => setQuery(e.target.value)}
          className={`h-[40px] mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm transition-all duration-200 focus:border-[#57369E] focus:ring-[#57369E] focus:outline-none focus:ring-opacity-50 hover:border-gray-400 text-gray-900 ${
            error ? "placeholder-red-500" : "placeholder-gray-400"
          }`}
          placeholder={
            diseaseType == null || diseaseType === ""
              ? "Please select category"
              : isLoading
              ? "Loading..."
              : error
              ? `${error.message}`
              : "Search for a disease..."
          }
          disabled={error || !diseaseType}
        />
        <ComboboxOptions
          anchor="bottom"
          className="w-[20%] absolute z-10 mt-1 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg empty:invisible"
        >
          {filteredDiseases.map((item, idx) => (
            <ComboboxOption
              key={idx}
              value={item}
              className="group flex cursor-pointer items-center gap-3 p-3 text-gray-900 transition-colors duration-150 data-[focus]:bg-[#57369E] data-[focus]:text-white"
            >
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-gray-400 group-data-[selected]:text-[#57369E] group-data-[focus]:text-white group-data-[selected]:group-data-[focus]:text-white" />
              <span className="truncate">{item.Disease_name}</span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};

export default DiseaseSelect;
