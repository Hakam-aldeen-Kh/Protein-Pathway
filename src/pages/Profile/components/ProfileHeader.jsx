import { Link } from "react-router";

const ProfileHeader = () => (
  <div className="flex justify-between items-center">
    <h1 className="text-[#111118] text-4xl font-bold">My Profile</h1>
    <Link
      to="/profile/edit"
      className="py-3 px-4 border border-[#57369E] rounded-sm text-[#57369E] font-semibold text-sm hover:bg-[#00A7D3] hover:text-white hover:border-transparent transition-colors duration-500"
    >
      Edit My Profile
    </Link>
  </div>
);

export default ProfileHeader;
