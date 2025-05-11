import { useEffect, useRef, useState } from "react";
import { useFileData } from "../hooks/useFileData";
import {
  AlertCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Loader2Icon,
  X, // Added X icon
} from "lucide-react";
import DataTable from "./DataTalbe"; // Corrected from "DataTalbe" to "DataTable"

const EnzymeContainer = ({ name, value, handleChange }) => {
  const { data, processingStatus, loadDefaultFile } = useFileData();
  const didLoadRef = useRef(false);

  // Parse initial value if provided
  const initialValue = value
    ? typeof value === "string"
      ? JSON.parse(value)
      : value
    : null;

  // Store the full selected enzyme object
  const [selectedEnzyme, setSelectedEnzyme] = useState(initialValue);

  // Handle input state
  const [inputValue, setInputValue] = useState(
    initialValue?.enzyme_name?.value || ""
  );

  // Control table visibility
  const [showTable, setShowTable] = useState(false);

  // Load default data on mount
  useEffect(() => {
    if (!didLoadRef.current) {
      loadDefaultFile();
      didLoadRef.current = true;
    }
  }, [loadDefaultFile]);

  // Handle input changes for searching
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // If we clear the input, also clear the selection
    if (!value.trim()) {
      setSelectedEnzyme(null);
      handleChange({ target: { name, value: null } });
    }

    // Show table when typing in the input
    setShowTable(true);
  };

  // Handle when a row is clicked in the table
  const onRowClick = (row) => {
    const enzymeObj = { ...row };

    // Update the selected enzyme
    setSelectedEnzyme(enzymeObj);

    // Set the input value to the enzyme name
    setInputValue(enzymeObj.enzyme_name?.value || "");

    // Hide the table after selection
    setShowTable(false);

    // Pass the full enzyme object to the form handler
    handleChange({ target: { name, value: enzymeObj } });
  };

  // Toggle showing/hiding the table
  const toggleTable = () => {
    setShowTable(!showTable);
  };

  // Handle clearing the input and selection
  const handleClear = () => {
    setInputValue(""); // Clear the input field
    setSelectedEnzyme(null); // Deselect the enzyme
    handleChange({ target: { name, value: null } }); // Update form state
    setShowTable(true); // Show the table for new selection
  };

  return (
    <div className="w-full relative">
      {processingStatus.status === "error" && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-md">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <p className="text-sm text-red-700">{processingStatus.message}</p>
          </div>
        </div>
      )}

      <div className="relative">
        {/* Search icon */}
        <div className="absolute top-4 left-0 pl-3 flex items-center pointer-events-none z-10">
          {!value && processingStatus.status === "processing" ? (
            <Loader2Icon className="animate-spin" size={16} />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>

        {/* Main input field with buttons */}
        <div className="relative">
          <input
            type="text"
            className="w-full pl-10 pr-16 py-3 border border-gray-300 rounded-lg bg-white" // Increased pr-10 to pr-16
            placeholder="Search or select an enzyme..."
            value={inputValue}
            onChange={handleInputChange}
            onClick={() => setShowTable(true)}
          />

          {/* Buttons container */}
          <div className="absolute right-0 top-0 h-full flex items-center space-x-1 pr-3">
            {/* "X" button to clear input/selection */}
            {inputValue && (
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-600"
                onClick={handleClear}
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {/* Toggle dropdown button */}
            <button
              type="button"
              className="p-1 text-gray-400 hover:text-gray-600"
              onClick={toggleTable}
            >
              {showTable ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Data table for selection */}
      {showTable && (
        <div className="mt-2 absolute z-10 w-[100%] shadow-lg">
          <DataTable
            data={data}
            onRowClick={onRowClick}
            searchQuery={inputValue}
            selectedRow={selectedEnzyme}
          />
        </div>
      )}

      {/* Hidden input for form submission with the full enzyme object */}
      <input
        type="hidden"
        name={name}
        value={selectedEnzyme ? JSON.stringify(selectedEnzyme) : ""}
      />
    </div>
  );
};

export default EnzymeContainer;