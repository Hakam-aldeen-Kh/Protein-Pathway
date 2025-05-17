import { useState } from "react";
import { useFileData } from "../hooks/useFileData";
import {
  AlertCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Loader2Icon,
  X,
} from "lucide-react";
import DataTable from "./DataTalbe";

const EnzymeContainer = ({ name, value, handleChange }) => {
  const { data, processingStatus } = useFileData();

  const initialValue = value
    ? typeof value === "string"
      ? JSON.parse(value)
      : value
    : null;

  const [selected, setSelected] = useState(initialValue);
  const [inputValue, setInputValue] = useState(
    initialValue?.enzyme_name?.value || ""
  );
  const [showTable, setShowTable] = useState(false);

  const handleInputChange = (e) => {
    const v = e.target.value;
    setInputValue(v);
    if (!v.trim()) {
      setSelected(null);
      handleChange({ target: { name, value: null } });
    }
    setShowTable(true);
  };

  const onRowClick = (row) => {
    setSelected(row);
    setInputValue(row.enzyme_name.value);
    setShowTable(false);
    handleChange({ target: { name, value: row } });
  };

  const handleClear = () => {
    setInputValue("");
    setSelected(null);
    handleChange({ target: { name, value: null } });
    setShowTable(true);
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
        <div className="absolute top-4 left-0 pl-3 flex items-center z-10 pointer-events-none">
          {processingStatus.status === "processing" ? (
            <Loader2Icon className="animate-spin" size={16} />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          className="w-full pl-10 pr-16 py-3 border focus:ring-[#57369E] rounded-lg outline-none"
          placeholder="Search or select an enzyme..."
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setShowTable(true)}
        />
        <div className="absolute top-0 right-0 h-full flex items-center space-x-1 pr-3">
          {inputValue && (
            <button onClick={handleClear} className="p-1 text-gray-400">
              <X className="h-5 w-5" />
            </button>
          )}
          <button onClick={() => setShowTable((s) => !s)} className="p-1">
            {showTable ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {showTable && data && (
        <div className="mt-2 absolute z-10 w-[1100px] shadow-lg bg-white">
          <DataTable
            data={data}
            onRowClick={onRowClick}
            searchQuery={inputValue}
            selectedRow={selected}
          />
        </div>
      )}

      <input
        type="hidden"
        name={name}
        value={selected ? JSON.stringify(selected) : ""}
      />
    </div>
  );
};

export default EnzymeContainer;
