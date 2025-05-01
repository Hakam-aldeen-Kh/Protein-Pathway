const FilterSelect = ({ label, options, value, onChange }) => {
  return (
    <select
      className="px-3 py-1 border border-zinc-500 rounded min-h-[32px] w-[200px]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{label}</option>
      {options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;
