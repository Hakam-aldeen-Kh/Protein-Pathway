import { useEffect, useRef, useState } from "react";
import { useFileData } from "../hooks/useFileData";
import {
  AlertCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Loader2Icon,
} from "lucide-react";
import DataTable from "./DataTalbe";
// import DataTable from "./DataTable";

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
        <div className="absolute top-4 left-0 pl-3 flex items-center pointer-events-none">
          {!value && processingStatus.status === "processing" ? (
            <Loader2Icon className="animate-spin" size={16} />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>

        {/* Main input field - used for both search and display */}
        <div className="flex items-center">
          <input
            type="text"
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white"
            placeholder="Search or select an enzyme..."
            value={inputValue}
            onChange={handleInputChange}
            onClick={() => setShowTable(true)}
          />

          {/* Toggle dropdown button */}
          <button
            type="button"
            className="absolute right-0 top-1/12 pr-3 flex items-center"
            onClick={toggleTable}
          >
            {showTable ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
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
