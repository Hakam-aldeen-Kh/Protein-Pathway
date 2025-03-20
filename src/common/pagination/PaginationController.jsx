const PaginationButton = ({
  direction,
  currentPage,
  totalPages,
  handlePageChange,
  imageSrc,
}) => {
  const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
  const isDisabled =
    direction === "next" ? currentPage === totalPages : currentPage === 1;
  const alternative =
    direction === "next" ? "Next Page Arrow" : "Previous Page Arrow";

  return (
    <button
      onClick={() => handlePageChange(newPage)}
      disabled={isDisabled}
      className={`w-8 h-8 flex items-center justify-center rounded ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
      }`}
      aria-label={alternative}
    >
      <img
        src={imageSrc}
        className={direction === "next" ? "rotate-180" : ""}
        alt={alternative}
      />
    </button>
  );
};

export default PaginationButton;
