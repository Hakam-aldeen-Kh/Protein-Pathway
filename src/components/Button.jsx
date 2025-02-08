const Button = ({ children, variant, className, onClick }) => {
  const baseStyles = "px-4 py-2 w-[48%] font-medium transition";
  const variants = {
    primary:
      "bg-[#57369E] text-white hover:bg-[#00A7D3] transition-colors duration-500 ",
    secondary: "text-[#57369E] hover:text-[#00A7D3] transition-colors duration",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
