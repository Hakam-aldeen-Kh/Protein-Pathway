const Pagination = ({
  totalItems = 120,
  itemsPerPage = 10,
  onPageChange,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  return (
    <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-center px-3 py-2 mt-2.5 w-full text-xs bg-white rounded-lg">
      {/* 📌 Display current range */}
      <div className="text-neutral-900">
        Showing{" "}
        <span className="font-semibold">
          {startItem}-{endItem}
        </span>{" "}
        of <span className="font-semibold">{totalItems}</span> items
      </div>

      {/* 📌 Pagination Controls */}
      <div className="flex gap-2 justify-center items-center text-zinc-500">
        {/* ◀ Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 flex items-center justify-center rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
          aria-label="Previous Page"
        >
          <img src="/images/icons/pagination-btn.svg" />
        </button>

        {/* 📄 Page Numbers */}
        {[
          1,
          2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          totalPages - 1,
          totalPages,
        ]
          .filter((page) => page > 0 && page <= totalPages)
          .filter((page, index, arr) => arr.indexOf(page) === index)
          .map((page, index, arr) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded ${
                page === currentPage
                  ? "bg-violet-900 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {arr[index - 1] !== page - 1 && index !== 0 ? "..." : page}
            </button>
          ))}

        {/* ▶ Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
          aria-label="Next Page"
        >
          <img src="/images/icons/pagination-btn.svg" className="rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
