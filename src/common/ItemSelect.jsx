import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react";
import {
  CheckIcon,
  SearchIcon,
  XIcon,
  ChevronDownIcon,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";

// Base URL for all SPARQList API endpoints
const SPARQLIST_BASE_URL =
  "https://pathway-sparqlist.alpha.kb-tohsa.org/sparqlist/api";

const API_ENDPOINTS = {
  Human: `${SPARQLIST_BASE_URL}/mondo`,
  /*Animal: `${SPARQLIST_BASE_URL}/Animal_Disease`,*/
  Plant: `${SPARQLIST_BASE_URL}/plantdisease`,
  CellType: `${SPARQLIST_BASE_URL}/cellType`,
  Lipid: `${SPARQLIST_BASE_URL}/chebiLipid`,
  GoProteinComplex: `${SPARQLIST_BASE_URL}/complexGo`,
  ProteinModOntology: `${SPARQLIST_BASE_URL}/proteinModify`,
  Tissue: `${SPARQLIST_BASE_URL}/brendaTissue`,
  Cellular: `${SPARQLIST_BASE_URL}/cellLocationGo`,
  Chibe: `${SPARQLIST_BASE_URL}/chebiSmallMolecule`,
  Enzyme: `${SPARQLIST_BASE_URL}/upEnzyme`,
  Categories: `${SPARQLIST_BASE_URL}/pathwayCategory`,
};

// Define name properties for each endpoint type
const NAME_PROPERTIES = {
  Human: "Disease_name",
  /*Animal: "Disease_name",*/
  Plant: "Disease_name",
  CellType: "cType_name",
  Lipid: "backbone_name",
  GoProteinComplex: "go_complex_name",
  ProteinModOntology: "PMOD_name",
  Tissue: "label",
  Cellular: "cell_localization_name",
  Chibe: "Molecule_name",
  Enzyme: "enz_name",
  Categories: "text",
};

const fetcher = (url) => axios.get(url).then((res) => res.data);

const ItemSelect = ({ itemType, value, onChange, name, placeholder, isEdit }) => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(value || null);
  const [prevItemType, setPrevItemType] = useState(itemType);

  // Get the appropriate name property based on itemType
  const nameProperty = itemType ? NAME_PROPERTIES[itemType] : null;

  // Determine the SWR key based on itemType and query
  const swrKey =
    itemType === "Enzyme"
      ? query.length >= 3
        ? [itemType, query]
        : null
      : itemType;

  const {
    data: items = [],
    isLoading,
    error,
  } = useSWR(
    swrKey,
    (key) => {
      if (Array.isArray(key)) {
        const [type, q] = key;
        return fetcher(`${API_ENDPOINTS[type]}?input_text=${q}`);
      } else {
        return fetcher(API_ENDPOINTS[key]);
      }
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 86400000, // 24h
    }
  );

  // Handle itemType changes and value synchronization
  useEffect(() => {
    if (prevItemType !== itemType) {
      setQuery("");
      setPrevItemType(itemType);
      if (prevItemType && itemType) {
        setSelectedItem(null);
        if (onChange) {
          onChange({
            target: { name, value: null },
          });
        }
      }
    } else {
      if (name === "category" && typeof value === "string") {
        const matchingItem = items.find(
          (item) => item.text.toLowerCase() === value.toLowerCase()
        );
        setSelectedItem(matchingItem || null);
      } else {
        setSelectedItem(value);
      }
    }
  }, [itemType, prevItemType, value, items, name, onChange]);

  // Helper function to get item name
  const getItemName = (item) => {
    if (!item || !nameProperty) return "";
    return item[nameProperty] || "";
  };

  // Filter items based on itemType
  const filteredItems =
    itemType === "Enzyme"
      ? items.slice(0, 200)
      : query === ""
        ? items.slice(0, 200)
        : items
          .filter((item) => {
            const itemName = getItemName(item);
            return itemName.toLowerCase().includes(query.toLowerCase());
          })
          .slice(0, 200);

  const totalMatchCount =
    itemType === "Enzyme"
      ? items.length
      : query === ""
        ? items.length
        : items.filter((item) => {
          const itemName = getItemName(item);
          return itemName.toLowerCase().includes(query.toLowerCase());
        }).length;

  const hasMoreResults = itemType !== "Enzyme" && totalMatchCount > 200;

  const isDisabled = !itemType || error;

  const getPlaceholderText = () => {
    if (!itemType) return "Please select category";
    if (error) return `Error: ${error.message}`;
    return placeholder || `Search for a ${itemType.toLowerCase()}...`;
  };

  const handleClearSearch = (e) => {
    e.stopPropagation();
    setQuery("");
  };

  const handleClearSelection = (e) => {
    e.stopPropagation();
    setSelectedItem(null);
    if (onChange) {
      onChange({
        target: { name, value: null },
      });
    }
  };

  // Process the value before passing to onChange
  const handleValueChange = (val) => {
    setSelectedItem(val);

    if (onChange) {
      let processedValue;
      if (name === "category" && val) {
        processedValue = val.text;
      } else {
        processedValue = val;
      }
      onChange({
        target: { name, value: processedValue },
      });
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {isLoading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <SearchIcon size={16} />
          )}
        </div>

        <Combobox
          value={selectedItem}
          name={name}
          onChange={handleValueChange}
          disabled={isDisabled || !isEdit}
        >
          <div className="flex w-full">
            <ComboboxInput
              aria-label={itemType || "Item"}
              displayValue={(item) =>
                item ? getItemName(item) : ""
              }
              onChange={(e) => setQuery(e.target.value)}
              className={`h-[40px] mt-1 block w-full rounded-md border ${error ? "border-red-300" : "border-gray-300"
                } pl-9 pr-16 shadow-sm transition-all duration-200 focus:border-[#57369E] focus:ring-[#57369E] focus:outline-none focus:ring-opacity-50 hover:border-gray-400 text-gray-900 ${isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
                } ${error ? "text-red-500" : "placeholder-gray-400"}`}
              placeholder={getPlaceholderText()}
              disabled={isDisabled || !isEdit}
            />
          </div>

          {/* Clear and Dropdown Icons */}
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
            {selectedItem && (
              <button
                type="button"
                disabled={!isEdit}
                onClick={handleClearSelection}
                className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Clear selection"
              >
                <XIcon size={16} />
              </button>
            )}

            {query && !selectedItem && (
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
              {filteredItems.length === 0 ? (
                <div className="p-3 text-gray-500">No items found</div>
              ) : (
                filteredItems.map((item, idx) => (
                  <ComboboxOption
                    key={`${getItemName(item)}-${idx}`}
                    value={item}
                    as="div"
                  >
                    {({ selected, active }) => (
                      <div
                        className={`flex items-center gap-3 p-3 cursor-pointer group ${active ? "bg-[#57369E] text-white" : "text-gray-900"
                          } hover:bg-[#57369E] hover:text-white`}
                      >
                        <CheckIcon
                          className={`h-5 w-5 flex-shrink-0 ${selected
                            ? active
                              ? "text-white"
                              : "text-[#57369E] group-hover:text-white"
                            : "opacity-0 group-hover:opacity-100 text-white"
                            }`}
                        />
                        <span className="truncate">
                          {getItemName(item)}
                        </span>
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

export default ItemSelect;
