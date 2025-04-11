const AuthInput = ({
  label,
  type = "text",
  name,
  register,
  error,
  showPassword,
  togglePassword,
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span className="text-red-500 mr-1">*</span>
        <label
          htmlFor={name}
          className="inline-block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      </div>
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          id={name}
          {...register(name)} // Bind to react-hook-form
          className={`w-full px-3 py-2 focus:outline-none border border-1 ${
            error ? "border-red-500" : "border-black"
          }`}
          placeholder={placeholder || `Enter Your ${label}`}
          required
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

export default AuthInput;
