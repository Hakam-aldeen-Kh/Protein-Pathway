import PathwayTabButton from "./PathwayTabButton";

const PathwayTabs = ({ activeTab, onTabChange, loginState }) => {
  return (
    <div className="flex flex-col w-full border-b border-solid border-b-zinc-500">
      <div className="flex gap-2">
        <PathwayTabButton
          isActive={activeTab === "all"}
          label="All Pathways"
          onClick={() => onTabChange("all")}
        />

        {loginState && (
          <PathwayTabButton
            isActive={activeTab === "my"}
            label="My Pathways"
            onClick={() => onTabChange("my")}
          />
        )}
      </div>
    </div>
  );
};

export default PathwayTabs;
