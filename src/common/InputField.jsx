const InputField = ({
  label,
  type = "text",
  name,
  register,
  value,
  onChange,
  placeholder,
  error,
  showPassword,
  togglePassword,
  className = "",
  isRequired = false,
}) => {
  const id = name || label?.toLowerCase().replace(/\s+/g, "-") || "input"

  return (
    <div className={`flex flex-col w-full text-sm text-[#111118] ${className}`}>
      {label && (
        <div className="flex items-center mb-1">
          {isRequired && <span className="text-red-500 mr-1">*</span>}
          <label
            htmlFor={id}
            className={`text-sm font-normal opacity-80 ${isRequired ? "text-[#111118]" : "text-[#484848]"}`}
          >
            {label}
          </label>
        </div>
      )}
      <div className="relative">
        <input
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          {...(register ? register(name) : {})}
          defaultValue={register ? undefined : value}
          onChange={register ? undefined : onChange}
          placeholder={placeholder || (label ? `Enter Your ${label}` : "")}
          required={isRequired}
          className={`w-full px-3 py-2 border min-h-[40px] focus:outline-none rounded-sm ${
            error ? "border-red-500" : ""
          } ${isRequired ? "border-[#878787]" : "border-[#BBBBBB]"}`}
        />
        {type === "password" && togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <img
              alt={showPassword ? "Hide password" : "Show password"}
              src={
                showPassword
                  ? "/images/icons/hidde-eye.svg"
                  : "/images/icons/show-eye.svg"
              }
            />
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
