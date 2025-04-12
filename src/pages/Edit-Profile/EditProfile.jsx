import { useState } from "react";
import EditProfileHeader from "./components/EditProfileHeader";
import ProfileImageUploader from "./components/ProfileImageUploader";

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState([]);
  const handleChangeImage = (imageList, addUpdatedIndex) => {
    console.log(imageList, addUpdatedIndex);
    setSelectedImage(imageList);
  };

  return (
    <div className="w-[85%] mx-auto my-10 p-5 border border-[#BBBBBB] rounded-lg space-y-16">
      <EditProfileHeader />
      {/* edit information section */}
      <div className="space-y-5">
        {/* image upload */}
        <ProfileImageUploader
          selectedImage={selectedImage}
          onChangeImage={handleChangeImage}
        />
        {/* first and last name */}
        <div className="grid grid-cols-2 gap-x-4"></div>
      </div>
    </div>
  );
};

export default EditProfile;
