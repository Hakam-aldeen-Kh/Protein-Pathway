import HeroSection from "../../components/HeroSection";
import Pagination from "../../components/Pagination";
import PathwayTable from "../../components/PathwayTable";
import PathwayTabs from "../../components/PathwayTabs";
import SearchAndFilters from "../../components/SearchAndFilters";
import { usePathwayData } from "../../hooks/usePathwayData";

const PathwayData = () => {
  const {
    handleTabChange,
    handleSearch,
    handleFilterSelect,
    setCurrentPage,
    currentPage,
    displayedPathways,
    filteredPathways,
    itemsPerPage,
    activeTab,
    isLoggedIn,
  } = usePathwayData();

  return (
    <div className="flex overflow-hidden flex-col justify-center bg-white">
      <div className="flex flex-col w-full max-md:max-w-full">
        <HeroSection title="Protein Pathway Data" />
        <div className="flex flex-col px-32 mt-10 w-full max-md:px-5 max-md:max-w-full">
          <PathwayTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            loginState={isLoggedIn}
          />
          <div className="flex flex-col mt-2.5 w-full rounded-lg max-md:max-w-full">
            <SearchAndFilters
              onSearch={handleSearch}
              onFilterSelect={handleFilterSelect}
              onAddPathway={() => console.log("Adding new pathway")}
            />
            <PathwayTable pathways={displayedPathways} />
            <Pagination
              totalItems={filteredPathways.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathwayData;
