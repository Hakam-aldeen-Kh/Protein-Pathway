import { useState, useCallback, useEffect } from "react";
import {
  processDataInChunks,
  fetchDefaultFile,
} from "../utils/fetchEnzymeData";

export const useFileData = () => {
  const [data, setData] = useState(null);
  const [processingStatus, setProcessingStatus] = useState({
    status: "idle",
    progress: 0,
    message: "",
  });

  const loadDefaultFile = useCallback(async () => {
    try {
      setProcessingStatus({
        status: "uploading",
        progress: 0,
        message: "Loading enzymes data...",
      });

      // Fetch and process the default file
      const jsonData = await fetchDefaultFile();

      setProcessingStatus({
        status: "processing",
        progress: 20,
        message: "File loaded. Processing data...",
      });

      // Process the data in chunks to avoid blocking the UI
      const processedData = await processDataInChunks(
        jsonData,
        5000,
        (progress) => {
          setProcessingStatus({
            status: "processing",
            progress: 20 + Math.floor(progress * 0.8), // Scale progress from 20-100%
            message: `Processing data... ${progress}%`,
          });
        }
      );

      // Set the processed data
      setData(processedData);

      setProcessingStatus({
        status: "success",
        progress: 100,
        message: `Successfully loaded ${processedData.results.bindings.length} rows of enzyme data.`,
      });
    } catch (error) {
      console.error("Error loading data:", error);
      const errorMessage =
        error instanceof Error
          ? `Error loading data: ${error.message}`
          : "Unknown error occurred while loading data";

      // Log additional details to help debug
      console.error("Error details:", {
        errorType: error instanceof Error ? error.name : typeof error,
        errorStack:
          error instanceof Error ? error.stack : "No stack trace available",
      });

      setProcessingStatus({
        status: "error",
        progress: 0,
        message: errorMessage,
      });
    }
  }, []);

  // Load default data on component mount
  useEffect(() => {
    loadDefaultFile();
  }, [loadDefaultFile]);

  return {
    data,
    processingStatus,
    loadDefaultFile,
  };
};
