import { useState } from "react";
import { useLocation } from "react-router";

export const useSearchAndFilter = (onFilterSelect) => {
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

  return {
    searchTerm,
    setSearchTerm,
    selectedFilters,
    handleFilterChange,
    isGlycanPage,
  };
};
