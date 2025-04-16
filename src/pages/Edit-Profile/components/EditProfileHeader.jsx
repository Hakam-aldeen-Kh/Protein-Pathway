import { Link } from "react-router";

const EditProfileHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-[#111118] text-4xl font-bold">Edit My Profile</h1>
      <div className="space-x-4">
        <Link
          to="/profile"
          className="py-3 px-4 text-[#57369E] hover:text-[#00A7D3] font-semibold transition-all duration-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="py-3 px-4 rounded-sm text-white font-semibold transition-all duration-200 bg-[#57369E] hover:bg-[#00A7D3]"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfileHeader;
