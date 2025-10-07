import { useState } from "react";
import { ShowToast } from "../common/ToastNotification";
import api from "../utils/api";
import { useNavigate } from "react-router";

export const usePathway = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const navigate = useNavigate()
  // the function handle submit add new pathway
  const handleSubmitAddPathway = async (data) => {
    // const submissionData = {
    //   title:data.title,
    //   description,
    //   species,
    //   category,
    //   tissue,
    //   relatedDisease,
    //   diseaseInput,
    //   reactions,
    //   recordDate,
    //   pubMeds,
    // };

    try {
      setIsLoading(true)
      const response = await api.post("user/pathway/protein", data);
      navigate("/protein-pathway-data?tab=my");

      ShowToast("Pathway Added", response.data.message);
    } catch (error) {
      setIsLoading(false);
      ShowToast("Add Pathway Fail", error.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // the function handle submit edit pathway (id)
  const handleSubmitEditPathway = async (data, id) => {

    // const submissionData = {
    //   title,
    //   description,
    //   species,
    //   category,
    //   tissue,
    //   relatedDisease,
    //   diseaseInput,
    //   reactions,
    //   recordDate,
    //   pubMeds,
    // };

    try {
      console.log(data)
      setIsLoading(true)

      const response = await api.put(
        `user/pathway/protein/${id}`,
        data
      );
      navigate("/protein-pathway-data?tab=my");
      return ShowToast("Pathway Edited", response.data.message);
    } catch (error) {
      setIsLoading(false);
      return ShowToast("Edit Pathway Fail", error.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // the function handle delete pathway (id)
  const handleDeletePathway = async (id) => {

    try {
      setIsLoading(true)

      const response = await api.delete(`user/pathway/protein/${id}`);
      navigate("/protein-pathway-data?tab=my");
      return ShowToast("Pathway Deleted", response.data.message);

    } catch (error) {
      setIsLoading(false);
      return ShowToast("Delete Pathway Fail", error.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (id) => {

    try {
      setExportLoading(true)

      const response = await api.get(`pathway/protein/${id}/export-to-json`);
      const blob = new Blob([JSON.stringify(response.data.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pathway_${id}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExportLoading(false)
      return ShowToast("Pathway Exported", "Your pathway was exported successfully");
    } catch (error) {
      setExportLoading(false);
      return ShowToast("Export Pathway Fail", error.data?.message || "An error occurred while exporting the pathway");
    } finally {
      setExportLoading(false);
    }
  };

  return {
    isLoading,
    handleSubmitAddPathway,
    handleSubmitEditPathway,
    handleDeletePathway,
    exportLoading,
    handleExport
  }
};
