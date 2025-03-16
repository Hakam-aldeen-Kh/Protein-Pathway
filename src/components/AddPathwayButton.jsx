import { Link } from "react-router";

const AddPathwayButton = ({ onAddPathway }) => {
  return (
    <Link
      to="/new-pathway"
      onClick={onAddPathway}
      className="flex gap-2 justify-center items-center px-8 py-1.5 bg-violet-900 text-white rounded-sm min-h-[32px] hover:bg-[#00A7D3] transition-colors duration-500"
    >
      Add New Pathway
    </Link>
  );
};

export default AddPathwayButton;
