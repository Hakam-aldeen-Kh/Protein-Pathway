const TextareaField = ({
  label,
  name,
  value,
  onChange,
  register,
  placeholder,
}) => {
  const id = name || label?.toLowerCase().replace(/\s+/g, "-") || "textarea";

  return (
    <div className={`flex flex-col w-full text-sm text-[#111118]`}>
      {label && (
        <div className="flex items-center mb-1">
          <label
            htmlFor={id}
            className="text-sm font-normal text-[#111118] opacity-80"
          >
            {label}
          </label>
        </div>
      )}
      <div className="relative">
        <textarea
          id={id}
          {...(register ? register(name) : {})}
          defaultValue={register ? undefined : value}
          onChange={register ? undefined : onChange}
          placeholder={placeholder || (label ? `Enter Your ${label}` : "")}
          className={`w-full px-3 py-2 border-[1px] border-[#878787] min-h-[100px] focus:outline-none resize-y rounded-sm`}
        />
      </div>
    </div>
  );
};

export default TextareaField;
