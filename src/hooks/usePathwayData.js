import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router";

export const usePathwayData = () => {
  const { myPathwayData } = useOutletContext();

  const samplePathways = [
    ...Array(30)
      .fill()
      .map((_, index) => ({
        id: `GPW-415820FQ-${index + 1}`,
        title: `Pathway Title ${index + 1}`,
        species: "Homo Sapiens",
        category:
          index % 3 === 0
            ? "Notch Signaling"
            : index % 3 === 1
            ? "Metabolic"
            : "Cell Cycle",
        reactants: [`G04602LA-${index + 1}`, `G04602LB-${index + 1}`],
        controller: [`G04602LA-${index + 1}`],
        products: [`G04602LC-${index + 1}`, `G04602LD-${index + 1}`],
        date: `${(index % 28) + 1}.${(index % 12) + 1}.202${
          index % 2 === 0 ? "4" : "5"
        }`,
        owner: "other",
        status: index % 3 === 0 ? "Active" : "Inactive",
      })),
    ...myPathwayData.map((item, index) => ({
      id: `${item.id}`,
      title: item.title || "no value",
      species: item.species || "no value",
      category: item.category || "no value",
      reactants: item.reactions.map((reaction) =>
        reaction.reactants.map((reactant) => reactant.name)
      ),
      controller: item.reactions.map((reaction) =>
        reaction.controllers.map((controller) => controller.name)
      ),
      products: item.reactions.map((reaction) =>
        reaction.products.map((product) => product.name)
      ),
      date: item.recordDate,
      owner: "me",
      status: index % 3 === 0 ? "Active" : "Inactive",
    })),
  ];

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    status: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "all";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (initialTab === "my" && !isLoggedIn) {
      navigate("/login", { replace: true });
      setActiveTab("all");
    }
  }, [initialTab, isLoggedIn, navigate]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterSelect = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  const filteredPathways = samplePathways.filter((pathway) => {
    const matchesSearch = searchQuery
      ? pathway.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = filters.category
      ? pathway.category === filters.category
      : true;
    const matchesDate = filters.date
      ? pathway.date.includes(filters.date)
      : true;
    const matchesStatus = filters.status
      ? pathway.status === filters.status
      : true;
    const matchesTab = activeTab === "all" || pathway.owner === "me";

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDate &&
      matchesStatus &&
      matchesTab
    );
  });

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
    isLoggedIn,
  };
};
