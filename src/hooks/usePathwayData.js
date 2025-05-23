import { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import { useAuth } from "../hooks/useAuth";
import { useSearchParams } from "react-router";

export const usePathwayData = () => {
  const [pathwayData, setPathwayData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [orderBy, setOrderBy] = useState("recordDate");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [allPathways, setAllPathways] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [pathwayState, setPathwayState] = useState("all");
  const { isAuthenticated } = useAuth();
  const hasFetchedAllPathways = useRef(false); // Ref to track if fetch has occurred

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "all");

  function capitalize(s) {
    if (s) return String(s[0]).toUpperCase() + String(s || "").slice(1);
    return null
  }

  // Fetch all pathways once when totalCount becomes greater than 0 for the first time
  useEffect(() => {
    if (totalCount > 0 && !hasFetchedAllPathways.current) {
      async function fetchAllPathways() {
        try {
          const response = await api.get(
            `pathway/protein?pageSize=${totalCount}`
          );
          setAllPathways(response.data.data.pathways);
          hasFetchedAllPathways.current = true; // Mark fetch as complete
        } catch (error) {
          console.error("Error fetching all pathways:", error);
        }
      }
      fetchAllPathways();
    }
  }, [totalCount]); // Runs whenever totalCount changes


  const extractText = (value) => {
    if (value == null) return "-";

    // Handle JSON string case
    if (typeof value === "string") {
      try {
        // Check if it's a JSON string
        if (value.trim().startsWith("{")) {
          const parsed = JSON.parse(value);
          return parsed.text || value;
        }
        return value;
      } catch {
        // If parsing fails, just return the original string
        return value;
      }
    }
  
    // Handle object with text property
    if (typeof value === "object" && value.text) {
      return value.text;
    }
  
    // Default case
    return String(value);
  };

  // Extract unique categories and years from allPathways
  useEffect(() => {
    if (allPathways) {
      // Extract unique categories
      const uniqueCategories = [
        ...new Set(allPathways.map((item) => capitalize(extractText(item.category)))),
      ];
      setCategories(uniqueCategories);

      // Extract unique years from recordDate (format: "DD.MM.YYYY")
      const uniqueYears = [
        ...new Set(
          allPathways.map((item) => {
            const [day, month, year] = item.recordDate.split(".");
            return year;
          })
        ),
      ];
      setYears(uniqueYears);
    }
  }, [allPathways]);

  // Fetch filtered pathway data
  useEffect(() => {
    async function fetchData() {
      const categoryParam = category !== "" ? `&category=${category}` : "";
      const searchParam = searchQuery !== "" ? `&search=${searchQuery}` : "";
      const yearParam = year !== "" ? `&year=${year}` : "";

      try {
        const response = await api.get(
          `${activeTab === "my"
            ? `user/pathway/protein?pageNumber=${pageNumber}&pageSize=${itemsPerPage}${categoryParam}${searchParam}${yearParam}&orderBy=${orderBy}&orderDirection=${orderDirection}`
            : `pathway/protein?pageNumber=${pageNumber}&pageSize=${itemsPerPage}${categoryParam}${searchParam}${yearParam}&orderBy=${orderBy}&orderDirection=${orderDirection}`
          }`
        );
        setPathwayData(response.data.data.pathways);
        setTotalCount(response.data.data.totalCount);
        setItemsPerPage(response.data.data.pageSize);
      } catch (error) {
        console.error("Error fetching pathway data:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [
    pageNumber,
    itemsPerPage,
    orderBy,
    orderDirection,
    category,
    searchQuery,
    year,
    activeTab,
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPageNumber(1);
  };

  const handleChangeTab = (state) => {
    if (state !== activeTab) setActiveTab(state);
    setSearchParams({ tab: state });
    setCategory("")
    setYear("")
    setPageNumber(1)
  };

  return {
    pathwayData,
    activeTab,
    isAuthenticated,
    setActiveTab,
    setPageNumber,
    setOrderDirection,
    orderBy,
    setOrderBy,
    orderDirection,
    totalCount,
    pageNumber,
    itemsPerPage,
    category,
    setCategory,
    handleSearch,
    year,
    setYear,
    years,
    isLoading,
    categories,
    handleChangeTab,
  };
};
