const AddLinksButton = ({ maxLinksReached, append }) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => append({ title: "", url: "" })}
        className="space-x-1 flex items-center"
        disabled={maxLinksReached}
      >
        <img
          src="/images/icons/add.svg"
          alt="add-icon"
          className={maxLinksReached ? "opacity-50" : ""}
        />
        <span
          className={`text-[14px] ${maxLinksReached ? "text-gray-400" : "text-[#57369E]"
            }`}
        >
          Add a Link
        </span>
      </button>
    </div>
  );
};

export default AddLinksButton;
