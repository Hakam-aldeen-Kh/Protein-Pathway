import { useState, useCallback, useEffect } from "react";
import {
  fetchDefaultFile,
  processDataInChunks,
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

      const jsonData = await fetchDefaultFile();
      setProcessingStatus({
        status: "processing",
        progress: 20,
        message: "File loaded. Processing data...",
      });

      const processedData = await processDataInChunks(
        jsonData,
        5000,
        (progress) => {
          setProcessingStatus({
            status: "processing",
            progress: 20 + Math.floor(progress * 0.8),
            message: `Processing data... ${progress}%`,
          });
        }
      );

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

      setProcessingStatus({
        status: "error",
        progress: 0,
        message: errorMessage,
      });
    }
  }, []);

  useEffect(() => {
    loadDefaultFile();
  }, [loadDefaultFile]);

  return {
    data,
    processingStatus,
    loadDefaultFile,
  };
};
