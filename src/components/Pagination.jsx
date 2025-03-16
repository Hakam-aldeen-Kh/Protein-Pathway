import CurrentRangeDisplay from "./CurrentRangeDisplay";
import PaginationButton from "./PaginationController";
import PaginationNumbers from "./PaginationNumbers";

const Pagination = ({
  totalItems = 120,
  itemsPerPage = 10,
  onPageChange,
  currentPage,
  setCurrentPage,
  filteredPathways,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const startItem =
    (filteredPathways ?? 0) > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem =
    (filteredPathways ?? 0) > 0
      ? Math.min(startItem + itemsPerPage - 1, totalItems)
      : 0;

  return (
    <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-center px-3 py-2 mt-2.5 w-full text-xs bg-white rounded-lg">
      <CurrentRangeDisplay
        startItem={startItem}
        endItem={endItem}
        totalItems={totalItems}
      />

      {/* 📌 Pagination Controls */}
      <div className="flex gap-2 justify-center items-center text-zinc-500">
        {/* ◀ Previous Button */}
        <PaginationButton
          direction="prev"
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          imageSrc="/images/icons/pagination-btn.svg"
        />

        {/* 📄 Page Numbers */}
        <div className="flex gap-2 justify-center items-center text-zinc-500">
          <PaginationNumbers
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>

        {/* ▶ Next Button */}
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          imageSrc="/images/icons/pagination-btn.svg"
        />
      </div>
    </div>
  );
};

export default Pagination;
