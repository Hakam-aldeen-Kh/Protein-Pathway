import HeroSection from "../../common/HeroSection";
import PathwayTabs from "../../common/pathway-table/PathwayTabs";
import GlycanPathwayTable from "./components/GlycanPathwayTable";
import { useGlycaanData } from "../../hooks/useGlycanData";
import NotFoundData from "../../common/NotFoundData";
import Pagination from "../../common/pagination/Pagination";
import SearchAndFilters from "../../common/search-and-filter/SearchAndFilters";

const GlycanData = () => {
  const {
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
          <PathwayTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex flex-col mt-2.5 w-full rounded-lg max-md:max-w-full">
            <SearchAndFilters
              onSearch={handleSearch}
              onFilterSelect={handleFilterSelect}
              onAddPathway={() => console.log("Adding new pathway")}
            />
            {filteredPathways.length > 0 ? (
              <>
                <GlycanPathwayTable pathways={displayedPathways} />
                <Pagination
                  totalItems={filteredPathways.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  filteredPathways={filteredPathways.length}
                />
              </>
            ) : (
              <div className="flex flex-col justify-center items-center my-16 max-w-[400px] mx-auto space-y-5">
                <NotFoundData />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlycanData;
