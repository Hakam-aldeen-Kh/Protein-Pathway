const SelectField = ({ label, value, options }) => {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
      <label htmlFor={id} className="text-sm font-medium opacity-80 mb-1">
        {label}
      </label>
      <div className="relative  border border-[#878787] pr-3">
        <select
          id={id}
          value={value}
          className="w-full px-3 py-2 bg-white focus:outline-none max-h-[40px]"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
