import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const usePathwayData = () => {
  const context = useOutletContext();
  const myPathwayData = context?.myPathwayData || []; // Fallback to empty array
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();

  const initialTab = searchParams.get("tab") || "all";

  // Handle unauthorized access to "my" tab
  useEffect(() => {
    if (initialTab === "my" && !isAuthenticated) {
      navigate("/login", { replace: true });
      setActiveTab("all");
    }
  }, [initialTab, isAuthenticated, navigate]);

  // Sample pathways
  const samplePathways = Array.from({ length: 30 }, (_, index) => ({
    id: `GPW-415820FQ-${index + 1}`,
    title: `Pathway Title ${index + 1}`,
    species: "Homo Sapiens",
    category: ["Notch Signaling", "Metabolic", "Cell Cycle"][index % 3],
    reactants: [`G04602LA-${index + 1}`, `G04602LB-${index + 1}`],
    controller: [`G04602LA-${index + 1}`],
    products: [`G04602LC-${index + 1}`, `G04602LD-${index + 1}`],
    date: `${(index % 28) + 1}.${(index % 12) + 1}.202${
      index % 2 === 0 ? "4" : "5"
    }`,
    owner: "other",
    status: index % 3 === 0 ? "Active" : "Inactive",
  }));

  // Process user's pathway data
  const userPathways = myPathwayData.map((item, index) => ({
    id: item.id || `USER-${index}`,
    title: item.title || "No title",
    species: item.species || "No species",
    category: item.category || "No category",
    reactants:
      item.reactions?.flatMap((reaction) =>
        reaction.reactants?.map((reactant) => reactant.name || "No reactant")
      ) || [],
    controller:
      item.reactions?.flatMap((reaction) =>
        reaction.controllers?.map(
          (controller) => controller.name || "No controller"
        )
      ) || [],
    products:
      item.reactions?.flatMap((reaction) =>
        reaction.products?.map((product) => product.name || "No product")
      ) || [],
    date: item.recordDate || "No date",
    owner: "me",
    status: index % 3 === 0 ? "Active" : "Inactive",
  }));

  const allPathways = [...samplePathways, ...userPathways];

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    status: "",
  });
  const [activeTab, setActiveTab] = useState(initialTab);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle tab change
  const handleTabChange = (newTab) => {
    setCurrentPage(1);
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  // Handle Search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Handle Filter Select
  const handleFilterSelect = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Filtering logic
  const filteredPathways = allPathways.filter((pathway) => {
    if (activeTab === "my" && pathway.owner !== "me") return false;
    return [
      searchQuery
        ? pathway.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true,
      filters.category ? pathway.category === filters.category : true,
      filters.date ? pathway.date.includes(filters.date) : true,
      filters.status ? pathway.status === filters.status : true,
    ].every(Boolean);
  });

  // Pagination
  const displayedPathways = filteredPathways.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    handleTabChange,
    handleSearch,
    handleFilterSelect,
    setCurrentPage,
    displayedPathways,
    filteredPathways,
    itemsPerPage,
    activeTab,
    isAuthenticated,
    currentPage,
  };
};
