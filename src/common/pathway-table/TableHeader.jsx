const TableHeader = ({
  title,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  apiFieldName, // Add this new prop
}) => (
  <div className="p-3 font-semibold border-b border-gray-300 flex items-center justify-between mt-[20px]">
    <span>{title}</span>
    <img
      src="/images/icons/arrow-swap.svg"
      alt="Sort Icon"
      className="hover:cursor-pointer"
      onClick={() => {
        if (orderBy === apiFieldName) {
          // If already sorting by this column, toggle direction
          setOrderDirection(orderDirection === "DESC" ? "ASC" : "DESC");
        } else {
          // If switching to this column, set it as the sort column with default DESC
          setOrderBy(apiFieldName);
          setOrderDirection("DESC");
        }
      }}
    />
  </div>
);

export default TableHeader;
