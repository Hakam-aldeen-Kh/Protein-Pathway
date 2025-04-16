const IconButton = ({ icon, text, onClick, alt }) => (
  <button className="flex items-center space-x-1 group" onClick={onClick}>
    <img src={icon} className="w-6" alt={alt} />
    <p className="group-hover:text-[#00A7D3] transition-colors duration-200">
      {text}
    </p>
  </button>
);

export default IconButton;
