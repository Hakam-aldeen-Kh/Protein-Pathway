const PathwayTabButton = ({ isActive, label, onClick }) => {
  return (
    <button
      className={`px-4 py-2 text-sm rounded ${
        isActive
          ? "bg-[#F1F5F9] text-black rounded-b-none"
          : "bg-[#F3F3F3] text-[#484848] scale-[0.9]"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PathwayTabButton;
