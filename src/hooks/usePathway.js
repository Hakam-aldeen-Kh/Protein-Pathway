import { useState } from "react";
import { ShowToast } from "../common/ToastNotification";
import api from "../utils/api";
import { useParams } from "react-router";

export const usePathway = () => {
  const [isLoading, setIsLoading] = useState(true);

  // the function handle submit add new pathway
  const handleSubmitAddPathway = async () => {
    const submissionData = {
      title,
      description,
      species,
      category,
      tissue,
      relatedDisease,
      diseaseInput,
      reactions,
      recordDate,
      pubMeds,
    };

    try {
      const response = await api.post("user/pathway/protein", submissionData);
      return <ShowToast title="Pathway Added" message={response.message} />;
    } catch (error) {
      setIsLoading(false);
      return <ShowToast title="Add Pathway Fail" message={error.message} />;
    } finally {
      setIsLoading(false);
    }
  };

  // the function handle submit edit pathway (id)
  const handleSubmitEditPathway = async () => {
    const { id } = useParams;

    const submissionData = {
      title,
      description,
      species,
      category,
      tissue,
      relatedDisease,
      diseaseInput,
      reactions,
      recordDate,
      pubMeds,
    };

    try {
      const response = await api.put(
        `user/pathway/protein/${id}`,
        submissionData
      );
      return <ShowToast title="Pathway Edited" message={response.message} />;
    } catch (error) {
      setIsLoading(false);
      return <ShowToast title="Edit Pathway Fail" message={error.message} />;
    } finally {
      setIsLoading(false);
    }
  };

  // the function handle delete pathway (id)
  const handleDeletePathway = async () => {
    const { id } = useParams;

    try {
      const response = await api.delete(`user/pathway/protein/${id}`);
      return <ShowToast title="Pathway Deleted" message={response.message} />;
    } catch (error) {
      setIsLoading(false);
      return <ShowToast title="Delete Pathway Fail" message={error.message} />;
    } finally {
      setIsLoading(false);
    }
  };
};
