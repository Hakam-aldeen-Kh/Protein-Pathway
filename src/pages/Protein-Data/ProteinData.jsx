import HeroSection from "../../common/HeroSection";
import NotFoundData from "../../common/NotFoundData";
import PathwayTable from "./components/PathwayTable";
import Pagination from "../../common/pagination/Pagination";
import AddPathwayButton from "../../common/AddPathwayButton";
import PathwayTabs from "../../common/pathway-table/PathwayTabs";
import SearchAndFilters from "../../common/search-and-filter/SearchAndFilters";
import LoadingProcess from "../../common/LoadingProcess";
import { usePathwayData } from "../../hooks/usePathwayData";

const ProteinData = () => {
  const {
    handleSearch,
    pathwayData,
    activeTab,
    isAuthenticated,
    setPageNumber,
    setOrderDirection,
    orderBy,
    setOrderBy,
    orderDirection,
    totalCount,
    pageNumber,
    itemsPerPage,
    categories,
    setCategory,
    years,
    setYear,
  } = usePathwayData();

  if (!pathwayData) return <LoadingProcess />;

  return (
    <div className="flex overflow-hidden flex-col justify-center bg-white">
      <div className="flex flex-col w-full max-md:max-w-full">
        <HeroSection title="Protein Pathway Data" />
        <div className="flex flex-col px-32 mt-10 w-full max-md:px-5 max-md:max-w-full">
          <PathwayTabs activeTab={activeTab} loginState={isAuthenticated} />
          <div className="flex flex-col mt-2.5 w-full rounded-lg max-md:max-w-full">
            <SearchAndFilters
              onSearch={handleSearch}
              onAddPathway={() => console.log("Adding new pathway")}
              categories={categories}
              dates={years}
              setCategory={setCategory}
              setYear={setYear}
            />
            {pathwayData.length > 0 ? (
              <>
                <PathwayTable
                  pathways={pathwayData}
                  orderBy={orderBy}
                  orderDirection={orderDirection}
                  setOrderBy={setOrderBy}
                  setOrderDirection={setOrderDirection}
                />
                <Pagination
                  itemsPerPage={itemsPerPage}
                  onPageChange={setPageNumber}
                  currentPage={pageNumber}
                  setCurrentPage={setPageNumber}
                  totalItems={totalCount}
                  filteredPathways={pathwayData.length}
                />
              </>
            ) : (
              <div className="flex flex-col justify-center items-center my-16 max-w-[400px] mx-auto space-y-5">
                <NotFoundData />
                <AddPathwayButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProteinData;
