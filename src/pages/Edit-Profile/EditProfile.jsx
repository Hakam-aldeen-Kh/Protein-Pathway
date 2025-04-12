import { useState } from "react";
import EditProfileHeader from "./components/EditProfileHeader";
import ProfileImageUploader from "./components/ProfileImageUploader";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
    watch,
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
      links: profileData.links || [],
    },
  });

  // Use useFieldArray to manage dynamic links
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
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

  // Available link types
  const linkTypes = ["X", "Linkedin", "Website", "GitHub"];

  // Watch the links field to get current values
  const currentLinks = watch("links") || [];

  // Filter available link types for each dropdown
  const getAvailableLinkTypes = (currentIndex) => {
    const otherLinks = currentLinks.filter(
      (_, index) => index !== currentIndex
    );
    const otherUsedTypes = otherLinks
      .map((link) => link.title)
      .filter((title) => title);
    return linkTypes.filter((type) => !otherUsedTypes.includes(type));
  };

  // Check if the maximum number of links is reached
  const maxLinksReached = fields.length >= linkTypes.length;

  return (
    <div className="w-[85%] mx-auto my-10 p-5 border border-[#878787] rounded-lg">
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
                className="text-sm font-normal text-[#111118] opacity-80 mb-1"
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
                    className={`w-full px-3 border-[#878787] border rounded-sm min-h-[40px] focus:outline-none ${
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
          {/* Links */}
          <div className="space-y-5">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-2 gap-x-5">
                {/* Link Type */}
                <div className="flex flex-col">
                  <label
                    htmlFor={`links.${index}.title`}
                    className="text-sm font-normal text-[#111118] opacity-80 mb-1"
                  >
                    Link Type
                  </label>
                  <div className="flex flex-row gap-x-1">
                    <select
                      {...register(`links.${index}.title`)}
                      id={`links.${index}.title`}
                      className={`w-[95%] px-3 py-2 border min-h-[40px] focus:outline-none rounded-sm ${
                        errors.links?.[index]?.title
                          ? "border-red-500"
                          : "border-[#878787]"
                      }`}
                    >
                      <option value="">Select a link type</option>
                      {getAvailableLinkTypes(index).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {/* Remove button */}
                    <div
                      className="px-3 py-2 border min-h-[40px] bg-[#57369E] cursor-pointer rounded-sm hover:bg-[#00A7D3] transition-all duration-200"
                      onClick={() => remove(index)}
                    >
                      <img
                        src="/images/icons/trash.svg"
                        className="w-[24px] h-[24px]"
                      />
                    </div>
                  </div>

                  {errors.links?.[index]?.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.links[index].title.message}
                    </p>
                  )}
                </div>
                {/* Link URL */}
                <div className="flex flex-col">
                  <label
                    htmlFor={`links.${index}.url`}
                    className="text-sm font-normal text-[#111118] opacity-80 mb-1"
                  >
                    Link URL
                  </label>
                  <input
                    {...register(`links.${index}.url`)}
                    id={`links.${index}.url`}
                    placeholder="Enter URL"
                    className={`w-full px-3 py-2 border min-h-[40px] focus:outline-none rounded-sm ${
                      errors.links?.[index]?.url
                        ? "border-red-500"
                        : "border-[#878787]"
                    }`}
                  />
                  {errors.links?.[index]?.url && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.links[index].url.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {/* Add a Link Button */}
            {!maxLinksReached && (
              <div>
                <button
                  type="button"
                  onClick={() => append({ title: "", url: "" })}
                  className="space-x-1 flex items-center"
                  disabled={maxLinksReached}
                >
                  <img
                    src="/images/icons/add.svg"
                    alt="add-icon"
                    className={maxLinksReached ? "opacity-50" : ""}
                  />
                  <span
                    className={`text-[14px] ${
                      maxLinksReached ? "text-gray-400" : "text-[#57369E]"
                    }`}
                  >
                    Add a Link
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
