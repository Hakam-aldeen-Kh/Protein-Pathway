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
  const samplePathways = Array.from({ length: 20 }, (_, index) => ({
    id: `GPW-415820FQ-${index + 1}`,
    recordDate: "27.4.2025",
    reactions: [
      {
        id: 1,
        reactants: [
          {
            id: 1,
            name: "reactant_1.1",
            cellType: {
              cType_id: "CL_0000003",
              cType_name: "native cell",
            },
            cellularLocation: {
              cell_localization_id: "GO_0000139",
              cell_localization_name: "Golgi membrane",
            },
            reactantType: "protein",
            proteinSymbolicName: "L-rhamnose-proton symporter",
            proteinSymbol: "asfasfd",
            reactant_protein_uniprot_id: "A7FN78",
          },
          {
            id: 2,
            name: "reactant_1.2",
            cellType: {
              cType_id: "CL_0000008",
              cType_name: "migratory cranial neural crest cell",
            },
            cellularLocation: {
              cell_localization_id: "GO_0000139",
              cell_localization_name: "Golgi membrane",
            },
            reactantType: "complex",
            complexSymbolicName: {
              go_complex_id: "GO:0005577",
              go_complex_name: "fibrinogen complex",
            },
            complexSymbolGo: "DF52112A",
          },
        ],
        controllers: [
          {
            id: 1,
            name: "controller_1.1",
            cellType: {
              cType_id: "CL_0000006",
              cType_name: "neuronal receptor cell",
            },
            cellularLocation: {
              cell_localization_id: "GO_0000228",
              cell_localization_name: "nuclear chromosome",
            },
            controllerType: "enzyme",
            controller_ec_enzyme: {
              index:
                "<a herf=\"#\" onclick=\"insert_upenz('Probable DNA helicase II homolog','P75437')\">Probable DNA helicase II homolog</a>",
              enz_id: "P75437",
              enz_name: "Probable DNA helicase II homolog",
              dna_name: "uvrD",
              species:
                "Mycoplasma pneumoniae (strain ATCC 29342 / M129 / Subtype 1)",
            },
          },
        ],
        products: [
          {
            id: 1,
            name: "product_1.1",
            cellType: {
              cType_id: "CL_0000020",
              cType_name: "spermatogonium",
            },
            cellularLocation: {
              cell_localization_id: "GO_0005737",
              cell_localization_name: "cytoplasm",
            },
            productType: "complex",
            complexSymbolicName: {
              go_complex_id: "GO:0044815",
              go_complex_name: "DNA packaging complex",
            },
            complexSymbolGo: "DF52112A",
          },
        ],
      },
      {
        id: 2,
        reactants: [
          {
            id: 1,
            name: "reactant_2.1",
            cellType: {
              cType_id: "CL_0000333",
              cType_name: "migratory neural crest cell",
            },
            cellularLocation: {
              cell_localization_id: "GO_0070083",
              cell_localization_name:
                "clathrin-sculpted monoamine transport vesicle membrane",
            },
            reactantType: "glycan",
            glycanTextType: "IUPAC Extended",
            glycanText: "faf3afas",
            bindingSiteCode: "asdfasfas",
            aminoAcidBindingSite: "asfasfsa",
            modifyingSite: "asfdasfdasf",
          },
        ],
        controllers: [
          {
            id: 1,
            name: "controller_2.1",
            cellType: {
              cType_id: "CL_0000050",
              cType_name: "megakaryocyte-erythroid progenitor cell",
            },
            cellularLocation: {
              cell_localization_id: "GO_0019867",
              cell_localization_name: "outer membrane",
            },
            controllerType: "enzyme",
            actionType: "activation",
            controller_ec_enzyme: {
              index:
                "<a herf=\"#\" onclick=\"insert_upenz('S-ribosylhomocysteine lyase','Q0I202')\">S-ribosylhomocysteine lyase</a>",
              enz_id: "Q0I202",
              enz_name: "S-ribosylhomocysteine lyase",
              dna_name: "luxS",
              species: "Haemophilus somnus (strain 129Pt)",
            },
          },
        ],
        products: [
          {
            id: 1,
            name: "product_2.1",
            cellType: {
              cType_id: "CL_0000006",
              cType_name: "neuronal receptor cell",
            },
            cellularLocation: {
              cell_localization_id: "GO_0000228",
              cell_localization_name: "nuclear chromosome",
            },
          },
        ],
      },
    ],
    title: `Pathway-Title-${index + 1}`,
    species: "Homo spaiens",
    category: "signaling pathway",
    description: "asdfasfasf",
    relatedDisease: "Animal",
    diseaseInput: {
      Disease_id: "MONDO:0025149",
      Disease_name: "encephalopathy, bovine spongiform",
    },
    tissue: {
      id: "BTO_0000042",
      parent: "#",
      text: "animal",
    },
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
