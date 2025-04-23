import { useState } from "react";

export const useGlycaanData = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    status: "",
  });
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const samplePathways = Array.from({ length: 50 }, (_, index) => ({
    id: `GPW-415820FQ-${index + 1}`,
    title: `Pathway Title ${index + 1}`,
    description: "Lorem ipsum dolor sit...",
    species: "Homo Sapiens",
    involvedGlycan: [`G04602LA-${index + 1}`, `G04602LB-${index + 1}`],
    involvedEnzymes: [
      "4-galactosyl-N-acetylglucosaminide 3-a-L-fucosyltransferase",
      "N-acetylglucosaminyl-diphospho-decaprenol L-rhamnosyltransferase",
      "peptidoglycan glycosyltransferase",
    ],
    date: `${(index % 28) + 1}.${(index % 12) + 1}.202${
      index % 2 === 0 ? "4" : "5"
    }`,
    relatedDisease: "Leukemia",
    owner: index % 2 === 0 ? "me" : "other",
    status: index % 3 === 0 ? "Active" : "Inactive",
  }));

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterSelect = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const filteredPathways = samplePathways.filter(
    ({ title, date, status, owner }) => {
      return (
        (!searchQuery ||
          title.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!filters.date || date.includes(filters.date)) &&
        (!filters.status || status === filters.status) &&
        (activeTab === "all" || owner === "me")
      );
    }
  );

  const displayedPathways = filteredPathways.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    filteredPathways,
    activeTab,
    currentPage,
    itemsPerPage,
    displayedPathways,
    handleSearch,
    handleFilterSelect,
    setActiveTab,
    setCurrentPage,
  };
};
