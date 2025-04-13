import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import profileData from "../data/profile/profile.json";
import { editProfileSchema } from "../validation/editProfileSchema";

// Utility to normalize phone number to E.164 format
const normalizePhoneNumber = (phone) => {
  if (!phone || typeof phone !== "string") return "";
  return phone.replace(/[^+\d]/g, "");
};

export const useEditProfile = () => {
  // Available link types
  const linkTypes = ["X", "Linkedin", "Website", "GitHub"];
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(
    profileData.imageSrc ? [{ data_url: profileData.imageSrc }] : []
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
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

  // Watch the links field to get current values
  const currentLinks = watch("links") || [];

  // Filter available link types for each dropdown
  const getAvailableLinkTypes = (currentIndex) => {
    const otherUsedTypes = currentLinks
      .filter((_, index) => index !== currentIndex)
      .map((link) => link.title)
      .filter(Boolean);
    return linkTypes.filter((type) => !otherUsedTypes.includes(type));
  };

  // Check if the maximum number of links is reached
  const maxLinksReached = fields.length >= linkTypes.length;

  const handleChangeImage = (imageList) => {
    setSelectedImage(imageList);
  };

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

  return {
    selectedImage,
    handleChangeImage,
    register,
    handleSubmit,
    control,
    errors,
    fields,
    append,
    remove,
    onSubmit,
    linkTypes,
    getAvailableLinkTypes,
    maxLinksReached,
  };
};
