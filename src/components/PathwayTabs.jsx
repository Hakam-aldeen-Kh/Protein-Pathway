const PathwayTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col w-full border-b border-solid border-b-zinc-500">
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 text-sm rounded ${
            activeTab === "all"
              ? "bg-[#F1F5F9] text-black rounded-b-none"
              : "bg-[#F3F3F3] text-[#484848] scale-[0.9]"
          }`}
          onClick={() => onTabChange("all")}
        >
          All Pathways
        </button>

        <button
          className={`px-4 py-2 text-sm rounded ${
            activeTab === "my"
              ? "bg-[#F1F5F9] text-black rounded-b-none"
              : "bg-[#F3F3F3] text-[#484848] scale-[0.9]"
          }`}
          onClick={() => onTabChange("my")}
        >
          My Pathways
        </button>
      </div>
    </div>
  );
};

export default PathwayTabs;
