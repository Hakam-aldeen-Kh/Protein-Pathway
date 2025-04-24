import SocialLinks from "./SocialLinks";
import { DEFAULT_PROFILE_IMAGE } from "../../../constants/assets";

const ProfileInfo = ({ profileData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="h-64 md:h-auto">
        <img
          src={profileData?.imageSrc || DEFAULT_PROFILE_IMAGE}
          className="rounded-lg w-full h-full object-cover"
          alt={`${profileData?.firstName || "User"}'s profile picture`}
        />
      </div>
      <div className="col-span-1 md:col-span-2 bg-[#F1F5F9] p-5 rounded-lg space-y-5">
        {/* Name and Description */}
        <div className="space-y-2">
          <h3 className="text-2xl md:text-4xl font-bold">
            {profileData?.firstName && profileData?.lastName
              ? `${profileData?.firstName} ${profileData?.lastName}`
              : profileData?.firstName || profileData?.lastName || "N/A"}
          </h3>
          {profileData?.biography && (
            <p className="text-lg md:text-xl text-[#626262]">
              {profileData.biography}
            </p>
          )}
        </div>

        {/* Education */}
        {(profileData?.degree || profileData?.school) && (
          <div className="flex items-center space-x-2 text-lg md:text-xl text-[#111118]">
            <img
              src="/images/icons/edu-icon.svg"
              className="w-6 md:w-8"
              alt="Education icon"
            />
            <div>
              {profileData.degree && <span>{profileData.degree}</span>}
              {profileData.degree && profileData.school && <span> - </span>}
              {profileData.school && <span>{profileData.school}</span>}
            </div>
          </div>
        )}

        {/* Email */}
        {profileData?.email && (
          <div className="flex items-center space-x-2 text-lg md:text-xl text-[#111118]">
            <img
              src="/images/icons/sms-icon.svg"
              className="w-6 md:w-8"
              alt="Email icon"
            />
            <p>{profileData.email}</p>
          </div>
        )}

        {/* Phone */}
        {profileData?.phoneNumber && (
          <div className="flex items-center space-x-2 text-lg md:text-xl text-[#111118]">
            <img
              src="/images/icons/call-icon.svg"
              className="w-6 md:w-8"
              alt="Phone icon"
            />
            <p>{profileData.phoneNumber}</p>
          </div>
        )}

        {/* Social Links */}
        {profileData?.links && profileData.links.length > 0 && (
          <SocialLinks links={profileData.links} />
        )}

        {/* Website */}
        {profileData?.website && (
          <div className="flex items-center space-x-2 text-lg md:text-xl">
            <img
              src="/images/icons/globe-icon.svg"
              className="w-6 md:w-8"
              alt="Website icon"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <a
              href={profileData.website}
              className="text-[#111118] hover:underline"
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
};

export default ProfileInfo;
