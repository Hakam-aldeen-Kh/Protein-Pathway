const SearchInput = ({ searchTerm, onSearch }) => {
  return (
    <div className="flex items-center gap-[4px] px-2 py-1 text-xs rounded border border-solid border-zinc-500 min-h-[32px] text-zinc-500 w-full max-w-[240px]">
      <img src="/images/icons/search-normal.svg" alt="Search Icon" />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full bg-transparent border-none outline-none"
      />
    </div>
  );
};

export default SearchInput;
