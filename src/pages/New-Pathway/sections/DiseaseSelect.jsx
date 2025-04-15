import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react";
import { CheckIcon, SearchIcon, XIcon, ChevronDownIcon } from "lucide-react";
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

  // Consolidated effect to handle both diseaseType changes and value synchronization
  useEffect(() => {
    // When diseaseType changes (including initial load)
    if (prevDiseaseType !== diseaseType) {
      setQuery("");
      setPrevDiseaseType(diseaseType);

      // Only clear selection when changing from one valid type to another
      // or when explicitly setting to empty
      if ((prevDiseaseType && diseaseType) || diseaseType === "") {
        setSelectedDisease(null);

        // Notify parent only when we're changing from a valid selection
        if (value && onChange) {
          onChange({
            target: {
              name,
              value: null,
            },
          });
        }
      }
    }
    // Handle external value changes
    else if (JSON.stringify(value) !== JSON.stringify(selectedDisease)) {
      setSelectedDisease(value);
    }
  }, [diseaseType, prevDiseaseType, value, selectedDisease, onChange, name]);

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

  const handleClearSearch = (e) => {
    e.stopPropagation(); // Prevent triggering other click handlers
    setQuery("");
  };

  const handleClearSelection = (e) => {
    e.stopPropagation(); // Prevent triggering other click handlers
    setSelectedDisease(null);
    if (onChange) {
      onChange({
        target: {
          name,
          value: null,
        },
      });
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <SearchIcon size={16} />
        </div>

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
          disabled={isDisabled}
        >
          <div className="flex w-full">
            <ComboboxInput
              aria-label="Disease"
              displayValue={(item) => item?.Disease_name || ""}
              onChange={(e) => setQuery(e.target.value)}
              className={`h-[40px] mt-1 block w-full rounded-md border ${
                error ? "border-red-300" : "border-gray-300"
              } pl-9 pr-16 shadow-sm transition-all duration-200 focus:border-[#57369E] focus:ring-[#57369E] focus:outline-none focus:ring-opacity-50 hover:border-gray-400 text-gray-900 ${
                isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
              } ${error ? "text-red-500" : "placeholder-gray-400"}`}
              placeholder={getPlaceholderText()}
              disabled={isDisabled}
            />
          </div>

          {/* Clear and Dropdown Icons */}
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
            {/* Clear selection button - show when there's a selection */}
            {selectedDisease && (
              <button
                type="button"
                onClick={handleClearSelection}
                className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Clear selection"
              >
                <XIcon size={16} />
              </button>
            )}

            {/* Clear search button - show when there's a search query but no selection */}
            {query && !selectedDisease && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Clear search"
              >
                <XIcon size={16} />
              </button>
            )}

            <ComboboxButton className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none ml-1">
              <ChevronDownIcon size={16} />
            </ComboboxButton>
          </div>

          <ComboboxOptions className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
            <div className="py-1">
              {filteredDiseases.length === 0 ? (
                <div className="p-3 text-gray-500">No diseases found</div>
              ) : (
                filteredDiseases.map((item, idx) => (
                  <ComboboxOption
                    key={`${item.Disease_name}-${idx}`}
                    value={item}
                    as="div" // Explicitly use div instead of default button
                  >
                    {({ selected, active }) => (
                      <div
                        className={`flex items-center gap-3 p-3 cursor-pointer group ${
                          active ? "bg-[#57369E] text-white" : "text-gray-900"
                        } hover:bg-[#57369E] hover:text-white`}
                      >
                        <CheckIcon
                          className={`h-5 w-5 flex-shrink-0 ${
                            selected
                              ? active
                                ? "text-white"
                                : "text-[#57369E] group-hover:text-white"
                              : "opacity-0 group-hover:opacity-100 text-white"
                          }`}
                        />
                        <span className="truncate">{item.Disease_name}</span>
                      </div>
                    )}
                  </ComboboxOption>
                ))
              )}

              {hasMoreResults && (
                <div className="p-2 text-sm text-gray-500 text-center border-t border-gray-200">
                  Showing 200 of {totalMatchCount} results. Keep typing to
                  narrow down.
                </div>
              )}
            </div>
          </ComboboxOptions>
        </Combobox>
      </div>
    </div>
  );
};

export default DiseaseSelect;
