import { useState } from "react";
import { useLocation } from "react-router";
import SearchInput from "./SearchInput";
import FilterSelect from "./FilterSelect";
import AddPathwayButton from "./AddPathwayButton";

const SearchAndFilters = ({ onSearch, onFilterSelect, onAddPathway }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    date: "",
    status: "",
  });

  const location = useLocation();
  const isGlycanPage = location.pathname === "/glycan-pathway-data";

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(updatedFilters);
    onFilterSelect?.(updatedFilters);
  };

  return (
    <div className="flex flex-wrap gap-10 items-center w-full text-sm">
      <div className="flex flex-wrap flex-1 gap-4 items-center min-w-[240px] text-neutral-900">
        <SearchInput
          searchTerm={searchTerm}
          onSearch={(value) => {
            setSearchTerm(value);
            onSearch?.(value);
          }}
        />

        <FilterSelect
          label="Category"
          options={["Notch Signaling", "Metabolic", "Cell Cycle"]}
          value={selectedFilters.category}
          onChange={(value) => handleFilterChange("category", value)}
        />

        <FilterSelect
          label="Date"
          options={["2024", "2025"]}
          value={selectedFilters.date}
          onChange={(value) => handleFilterChange("date", value)}
        />

        <FilterSelect
          label="Status"
          options={["Active", "Inactive"]}
          value={selectedFilters.status}
          onChange={(value) => handleFilterChange("status", value)}
        />
      </div>

      {!isGlycanPage && <AddPathwayButton onAddPathway={onAddPathway} />}
    </div>
  );
};

export default SearchAndFilters;
