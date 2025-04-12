import { useState } from "react";
import EditProfileHeader from "./components/EditProfileHeader";
import ProfileImageUploader from "./components/ProfileImageUploader";
import { useForm, Controller } from "react-hook-form";
import profileData from "../../data/profile/profile.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "../../validation/editProfileSchema";
import InputField from "../../common/InputField";
import TextareaField from "../../common/TextareaField";
import { useNavigate } from "react-router";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Utility to normalize phone number to E.164 format
const normalizePhoneNumber = (phone) => {
  if (!phone || typeof phone !== "string") return "";
  return phone.replace(/[^+\d]/g, "");
};

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState(
    profileData.imageSrc ? [{ data_url: profileData.imageSrc }] : []
  );

  const navigate = useNavigate();

  const handleChangeImage = (imageList) => {
    setSelectedImage(imageList);
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: profileData.firstName || "",
      lastName: profileData.lastName || "",
      biography: profileData.biography || "",
      email: profileData.email || "",
      phoneNumber: normalizePhoneNumber(profileData.phoneNumber) || "",
      degree: profileData.degree || "",
      school: profileData.school || "",
    },
  });

  const onSubmit = (data) => {
    console.log("Profile updated:", {
      ...data,
      image: selectedImage[0]?.data_url || profileData.imageSrc,
    });
    reset();
    setSelectedImage(
      profileData.imageSrc ? [{ data_url: profileData.imageSrc }] : []
    );
    navigate("/profile");
  };

  return (
    <div className="w-[85%] mx-auto my-10 p-5 border border-[#BBBBBB] rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
        <EditProfileHeader />
        <div className="space-y-5">
          {/* image upload */}
          <ProfileImageUploader
            selectedImage={selectedImage}
            onChangeImage={handleChangeImage}
          />
          {/* first and last name */}
          <div className="grid grid-cols-2 gap-x-4">
            <InputField
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName?.message}
              isRequired
            />
            <InputField
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
              isRequired
            />
          </div>
          {/* biography */}
          <TextareaField
            label="Biography"
            name="biography"
            register={register}
            error={errors.biography?.message}
          />
          {/* email & number */}
          <div className="grid grid-cols-2 gap-x-4">
            <InputField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email?.message}
              isRequired
            />
            <div className="flex flex-col items-start">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-normal text-[#484848] opacity-80 mb-1"
              >
                Phone Number
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <PhoneInput
                    {...field}
                    value={value || ""}
                    onChange={(val) => {
                      onChange(val || "");
                    }}
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    className={`w-full px-3 border-[#BBBBBB] border rounded-sm min-h-[40px] focus:outline-none ${
                      errors.phoneNumber ? "border-red-500" : "border-[#878787]"
                    }`}
                    international
                    defaultCountry="JP"
                  />
                )}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
          {/* degree and university/school */}
          <div className="grid grid-cols-2 gap-x-4">
            <InputField
              label="Degree"
              name="degree"
              register={register}
              error={errors.degree?.message}
            />
            <InputField
              label="School/University"
              name="school"
              register={register}
              error={errors.school?.message}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
