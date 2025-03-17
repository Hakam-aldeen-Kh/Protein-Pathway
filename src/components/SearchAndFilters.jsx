import SearchInput from "./SearchInput";
import FilterSelect from "./FilterSelect";
import AddPathwayButton from "./AddPathwayButton";
import { useSearchAndFilter } from "../hooks/useSearchAndFilter";

const SearchAndFilters = ({ onSearch, onFilterSelect, onAddPathway }) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedFilters,
    handleFilterChange,
    isGlycanPage,
  } = useSearchAndFilter(onFilterSelect);

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
