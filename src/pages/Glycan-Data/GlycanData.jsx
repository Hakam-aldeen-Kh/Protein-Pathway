import HeroSection from "../../components/HeroSection";
import Pagination from "../../components/Pagination";
import PathwayTabs from "../../components/PathwayTabs";
import SearchAndFilters from "../../components/SearchAndFilters";
import GlycanPathwayTable from "../../components/GlycanPathwayTable";
import { useGlycaanData } from "../../hooks/useGlycanData";

const GlycanData = () => {
  const {
    isLoggedIn,
    filteredPathways,
    activeTab,
    currentPage,
    itemsPerPage,
    displayedPathways,
    handleSearch,
    handleFilterSelect,
    setActiveTab,
    setCurrentPage,
  } = useGlycaanData();

  return (
    <div className="flex overflow-hidden flex-col justify-center bg-white">
      <div className="flex flex-col w-full max-md:max-w-full">
        <HeroSection title="Glycan Synthetic Patway Data" />
        <div className="flex flex-col px-32 mt-10 w-full max-md:px-5 max-md:max-w-full">
          {isLoggedIn && (
            <PathwayTabs activeTab={activeTab} onTabChange={setActiveTab} />
          )}
          <div className="flex flex-col mt-2.5 w-full rounded-lg max-md:max-w-full">
            <SearchAndFilters
              onSearch={handleSearch}
              onFilterSelect={handleFilterSelect}
              onAddPathway={() => console.log("Adding new pathway")}
            />
            <GlycanPathwayTable pathways={displayedPathways} />
            <Pagination
              totalItems={filteredPathways.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              filteredPathways={filteredPathways.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlycanData;
