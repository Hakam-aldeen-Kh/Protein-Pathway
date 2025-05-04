import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { editProfileSchema } from "../validation/editProfileSchema";
import api from "../utils/api";
import { ShowToast } from "../common/ToastNotification";

// Utility to normalize phone number to E.164 format
const normalizePhoneNumber = (phone) => {
  if (!phone || typeof phone !== "string") return "";
  return phone.replace(/[^+\d]/g, "");
};

export const useEditProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();
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
      firstName: "",
      lastName: "",
      biography: "",
      email: "",
      phoneNumber: "",
      degree: "",
      university: "",
      links: [],
    },
  });

  // Use useFieldArray to manage dynamic links
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("user/me");
        setProfileData(response.data.data.user);
      } catch (error) {
        ShowToast(
          "Error",
          error.response?.data?.message || "Failed to fetch profile data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Reset form with fetched profile data
  useEffect(() => {
    if (profileData) {
      reset({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        biography: profileData.biography || "",
        email: profileData.email || "",
        phoneNumber: normalizePhoneNumber(profileData.phoneNumber) || "",
        degree: profileData.degree || "",
        university: profileData.university || "",
        links: profileData.links || [],
      });
      setSelectedImage(profileData.imageSrc || null);
    }
  }, [profileData, reset]);

  // Available link types
  const linkTypes = ["X", "Linkedin", "Website", "GitHub"];

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

  const handleChangeImage = (dataUrl) => {
    setSelectedImage(dataUrl);
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        //! disable send image
        // image: selectedImage || profileData?.imageSrc || null,
      };
      await api.put("user/me", updatedData); // Adjust endpoint as needed
      ShowToast("Successful", "Profile updated successfully");
      reset();
      setSelectedImage(profileData?.imageSrc || null);
      navigate("/profile");
    } catch (error) {
      ShowToast(
        "Failed update profile",
        error.response?.data?.message || "Failed to update profile"
      );
    }
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
    isLoading,
    getAvailableLinkTypes,
    maxLinksReached,
  };
};
