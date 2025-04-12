import SocialLinks from "./SocialLinks";
import { DEFAULT_PROFILE_IMAGE } from "../../../constants/assets";

const ProfileInfo = ({ profileData }) => (
  <div className="grid grid-cols-3 gap-5">
    <img
      src={profileData?.imageSrc || DEFAULT_PROFILE_IMAGE}
      className="rounded-lg h-full object-cover"
      alt={`${profileData?.name || "User"}'s profile picture`}
    />
    <div className="col-span-2 bg-[#F1F5F9] p-5 rounded-lg space-y-5">
      {/* Name and Description */}
      <div className="space-y-2">
        <h3 className="text-4xl font-bold">
          {profileData?.firstName + " " + profileData?.lastName || "N/A"}
        </h3>
        <p className="text-xl text-[#626262]">
          {profileData?.biography || "No biography available"}
        </p>
      </div>
      {/* Education */}
      <div className="flex items-center space-x-2 text-xl text-[#111118]">
        <img
          src="/images/icons/edu-icon.svg"
          className="w-8"
          alt="Education icon"
        />
        <p>{profileData?.degree + " " + profileData?.school || "N/A"}</p>
      </div>
      {/* Email */}
      <div className="flex items-center space-x-2 text-xl text-[#111118]">
        <img
          src="/images/icons/sms-icon.svg"
          className="w-8"
          alt="Email icon"
        />
        <p>{profileData?.email || "N/A"}</p>
      </div>
      {/* Phone */}
      <div className="flex items-center space-x-2 text-xl text-[#111118]">
        <img
          src="/images/icons/call-icon.svg"
          className="w-8"
          alt="Phone icon"
        />
        <p>{profileData?.phoneNumber || "N/A"}</p>
      </div>
      {/* Social Links */}
      <SocialLinks links={profileData?.links} />
      {/* Website */}
      {profileData?.website && (
        <div>
          <a
            href={profileData.website}
            className="text-xl text-[#111118] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {profileData.website}
          </a>
        </div>
      )}
    </div>
  </div>
);

export default ProfileInfo;
