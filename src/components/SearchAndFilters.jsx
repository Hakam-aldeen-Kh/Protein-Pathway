import { useState } from "react";
import { Link } from "react-router";

const SearchAndFilters = ({ onSearch, onFilterSelect, onAddPathway }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    date: "",
    status: "",
  });

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(updatedFilters);
    onFilterSelect?.(updatedFilters);
  };

  return (
    <div className="flex flex-wrap gap-10 items-center w-full text-sm">
      {/* 🔍 Search Input */}
      <div className="flex flex-wrap flex-1 gap-4 items-center min-w-[240px] text-neutral-900">
        <div className="flex items-center gap-[4px] px-2 py-1 text-xs rounded border border-solid border-zinc-500 min-h-[32px] text-zinc-500 w-full max-w-[240px]">
          <img src="/images/icons/search-normal.svg" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch?.(e.target.value);
            }}
            className="w-full bg-transparent border-none outline-none"
          />
        </div>

        {/* 🎛️ Select Dropdowns for Filters */}
        <select
          className="px-3 py-1 border border-zinc-500 rounded min-h-[32px] w-[200px]"
          value={selectedFilters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="">Category</option>
          <option value="Notch Signaling">Notch Signaling</option>
          <option value="Metabolic">Metabolic</option>
          <option value="Cell Cycle">Cell Cycle</option>
        </select>

        <select
          className="px-3 py-1 border border-zinc-500 rounded min-h-[32px] w-[200px]"
          value={selectedFilters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
        >
          <option value="">Date</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <select
          className="px-3 py-1 border border-zinc-500 rounded min-h-[32px] w-[200px]"
          value={selectedFilters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      {/* ➕ Add New Pathway Button */}
      <Link
        to="/new-pathway"
        onClick={onAddPathway}
        className="flex gap-2 justify-center items-center px-8 py-1.5 bg-violet-900 text-white rounded-sm min-h-[32px] hover:bg-[#00A7D3] transition-colors duration-500"
      >
        Add New Pathway
      </Link>
    </div>
  );
};

export default SearchAndFilters;
