const PaginationNumbers = ({ currentPage, totalPages, handlePageChange }) => {
  const pages = [
    1,
    2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    totalPages - 1,
    totalPages,
  ]
    .filter((page) => page > 0 && page <= totalPages)
    .filter((page, index, arr) => arr.indexOf(page) === index);

  return (
    <>
      {pages.map((page, index, arr) => (
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
    </>
  );
};

export default PaginationNumbers;
