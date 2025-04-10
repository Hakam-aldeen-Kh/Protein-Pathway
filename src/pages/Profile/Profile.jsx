import { Link } from "react-router";
import profileData from "../../data/profile/profile.json";

const Profile = () => {
  return (
    <div>
      {/* main wrapper */}
      <div className="w-[85%] mx-auto my-10 p-5 border-[#BBBBBB] border-[1px] rounded-lg space-y-16">
        {/* heading */}
        <div className="flex justify-between items-center">
          <h1 className="text-[#111118] text-[40px] font-bold">My Profile</h1>
          <Link
            to={"/profile/edit"}
            className="py-[12px] px-4 border border-[#57369E] rounded-sm text-[#57369E] font-semibold text-[14px] hover:bg-[#00A7D3] hover:text-white hover:border-transparent transition-colors duration-500"
          >
            Edit My Profile
          </Link>
        </div>
        {/* profile information */}
        <div className="grid grid-cols-3 gap-5">
          <img
            src={profileData.imageSrc}
            className="rounded-lg h-full object-cover"
          />
          <div className="col-start-2 col-end-4 bg-[#F1F5F9] p-5 rounded-lg space-y-5">
            {/* name and description */}
            <div className="space-y-2">
              <h3 className="text-[40px] font-bold">{profileData.name}</h3>
              <p className="text-[20px] text-[#626262]">
                {profileData.description}
              </p>
            </div>
            {/* education */}
            <div className="flex items-center space-x-2 text-[20px] text-[#111118]">
              <img src="/images/icons/edu-icon.svg" className="w-[32px]" />
              <p>{profileData.education}</p>
            </div>
            {/* email */}
            <div className="flex items-center space-x-2 text-[20px] text-[#111118]">
              <img src="/images/icons/sms-icon.svg" className="w-[32px]" />
              <p>{profileData.email}</p>
            </div>
            {/* phone */}
            <div className="flex items-center space-x-2 text-[20px] text-[#111118]">
              <img src="/images/icons/call-icon.svg" className="w-[32px]" />
              <p>{profileData.phone}</p>
            </div>
            {/* links */}
            <div className="flex items-center space-x-2 text-[20px] text-[#111118]">
              <a href={profileData.linkedin}>
                <img
                  src="/images/icons/linkedin-icon.svg"
                  className="w-[32px]"
                />
              </a>
              <a href={profileData.x_account}>
                <img src="/images/icons/x-icon.svg" className="w-[32px]" />
              </a>
            </div>
            {/* external link */}
            <div>
              <a
                href={profileData.website}
                className="text-[20px] text-[#111118]"
              >
                {profileData.website}
              </a>
            </div>
          </div>
        </div>
        {/* options */}
        <div className="text-[#57369E] text-[14px] space-y-5 w-fit">
          <div className="flex items-center space-x-1 group">
            <img src="/images/icons/logout.svg" className="w-[24px]" />
            <p className="group-hover:text-[#00A7D3] group-hover:cursor-pointer transition duration-200">
              Log Out
            </p>
          </div>
          <div className="flex items-center space-x-1 group">
            <img src="/images/icons/key-square.svg" className="w-[24px]" />
            <p className="group-hover:text-[#00A7D3] group-hover:cursor-pointer transition duration-200">
              Reset My Password
            </p>
          </div>
          <div className="flex items-center space-x-1 group">
            <img src="/images/icons/close-square.svg" className="w-[24px]" />
            <p className="group-hover:text-[#00A7D3] group-hover:cursor-pointer transition duration-200">
              Delete My Account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
