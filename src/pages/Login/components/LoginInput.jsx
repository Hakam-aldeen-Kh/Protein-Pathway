const LoginInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  showPassword,
  togglePassword,
}) => {
  return (
    <div>
      <span className="text-red-500 mr-1">*</span>
      <label className="inline-block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === "password" ? (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 focus:outline-none border border-black border-1"
            placeholder={`Enter Your ${label}`}
            required
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <img
              alt="show/hide password"
              src={
                showPassword
                  ? "/images/icons/hidde-eye.svg"
                  : "/images/icons/show-eye.svg"
              }
            />
          </button>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 focus:outline-none border border-black border-1"
          placeholder={`Enter Your ${label}`}
          required
        />
      )}
    </div>
  );
};

export default LoginInput;
