function SearchBox() {
  return (
    <div className="flex gap-2 items-center self-stretch my-auto min-h-[40px] w-full lg:w-auto lg:min-w-[240px]">
      <form className="flex flex-col self-stretch my-auto w-full lg:w-[200px]">
        <label htmlFor="searchInput" className="sr-only">Search</label>
        <input
          type="search"
          id="searchInput"
          className="flex-1 shrink gap-2 self-stretch px-2 py-1 w-full min-h-[40px] rounded-sm border border-solid border-zinc-400 text-sm tracking-tight text-zinc-400"
          placeholder="Search"
        />
      </form>
      <button className="flex gap-2 justify-center items-center self-stretch px-2 my-auto w-10 h-10 bg-purple-900 rounded-sm min-h-[40px]" aria-label="Search">
        <img src="/images/icons/btn-search.svg" />
      </button>
    </div>
  );
}

export default SearchBox;