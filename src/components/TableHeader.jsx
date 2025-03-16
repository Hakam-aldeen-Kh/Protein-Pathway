const TableHeader = ({ title }) => (
  <div className="p-3 font-semibold border-b border-gray-300 flex items-center justify-between mt-[20px]">
    <span>{title}</span>
    <img src="/images/icons/arrow-swap.svg" alt="Sort Icon" />
  </div>
);

export default TableHeader;
