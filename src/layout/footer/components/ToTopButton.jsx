const ToTopButton = () => {
  const handleGoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={handleGoTop}
      className=" rounded-sm text-white px-8 py-4 bg-[#57369E] hover:bg-[#00A7D3] transition-colors duration-500 flex items-center justify-center gap-1 w-full sm:max-w-[187px] sm:max-h-[48px]"
    >
      <span className="font-semibold"> Back to Top</span>
      <img
        className="text-white w-[24px] h-[24px]"
        src="/images/icons/arrow-up.svg"
        alt="Back to Top"
      />
    </button>
  );
};

export default ToTopButton;
