import SearchInput from "./SearchInput";
import FilterSelect from "./FilterSelect";
import AddPathwayButton from "../AddPathwayButton";
import { useState } from "react";

const SearchAndFilters = ({
  onSearch,
  onAddPathway,
  categories,
  dates,
  category,
  setCategory,
  year,
  setYear,
  isGlycanPage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

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

        {!isGlycanPage && (
          <FilterSelect
            label="Category"
            options={categories}
            value={category}
            onChange={(value) => setCategory(value.toLowerCase())}
          />
        )}

        <FilterSelect
          label="Date"
          options={dates}
          value={year}
          onChange={(value) => setYear(value)}
        />
      </div>

      {!isGlycanPage && (
        <div>
          <AddPathwayButton onAddPathway={onAddPathway} />
        </div>
      )}
    </div>
  );
};

export default SearchAndFilters;
