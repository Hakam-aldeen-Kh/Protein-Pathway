import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDefaultFile,
  processDataInChunks,
} from "../utils/fetchEnzymeData";

export const useFileData = (chunkSize = 5000) => {
  const [progress, setProgress] = useState(0);

  const query = useQuery({
    queryKey: ["enzymes-data"],
    queryFn: async () => {
      const jsonData = await fetchDefaultFile();
      setProgress(20);

      const processedData = await processDataInChunks(
        jsonData,
        chunkSize,
        (p) => setProgress(20 + Math.floor(p * 0.8))
      );

      return processedData;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const processingStatus = {
    status: query.isLoading ? "loading" : query.isError ? "error" : "success",
    progress,
    message: query.isLoading
      ? `Processing data... ${progress}%`
      : query.isError
      ? query.error.message || "Failed to load file"
      : `Loaded ${query.data?.results?.bindings?.length ?? 0} enzymes`,
  };

  return {
    data: query.data,
    processingStatus,
    refetch: query.refetch,
  };
};
