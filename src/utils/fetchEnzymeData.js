let defaultFilePromise = null;

/**
 * Fetches the default enzymes.json.gz file (cached on first fetch)
 * @returns Promise resolving to the processed SparqlJsonResult
 */
export const fetchDefaultFile = async () => {
  if (defaultFilePromise) {
    console.log("Returning cached defaultFilePromise");
    return defaultFilePromise;
  }

  defaultFilePromise = (async () => {
    console.log("Starting default file fetch process");
    const fetchOptions = {
      headers: {
        "Accept-Encoding": "identity",
        Accept: "*/*",
      },
      cache: "no-store",
    };

    console.log("Attempting to fetch from /enzymes.json.gz");
    const response = await fetch("/enzymes.json.gz", fetchOptions);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch default file: ${response.status} ${response.statusText}`
      );
    }

    console.log("Successfully fetched default file");
    const arrayBuffer = await response.arrayBuffer();
    console.log(
      `Received array buffer of size: ${arrayBuffer.byteLength} bytes`
    );

    return processArrayBuffer(arrayBuffer);
  })();

  return defaultFilePromise;
};

/**
 * Process an ArrayBuffer containing plain JSON data
 * @param arrayBuffer The ArrayBuffer containing data
 * @returns Promise resolving to the parsed SparqlJsonResult
 */
export const processArrayBuffer = async (arrayBuffer) => {
  try {
    const decoder = new TextDecoder("utf-8");
    const jsonString = decoder.decode(arrayBuffer);
    const jsonData = JSON.parse(jsonString);

    if (!jsonData.head || !jsonData.results || !jsonData.results.bindings) {
      throw new Error("Invalid SPARQL JSON format in plain text");
    }

    console.log("Successfully parsed as plain JSON");
    return jsonData;
  } catch (error) {
    console.error("Failed to parse array buffer as plain JSON:", error);
    throw new Error("Failed to process plain JSON data");
  }
};

/**
 * Chunk processing for large datasets - process data in small batches
 * to avoid blocking the main thread
 */
export const processDataInChunks = async (
  data,
  chunkSize = 1000,
  onProgress
) => {
  return new Promise((resolve) => {
    const { head, results } = data;
    const { bindings } = results;
    const totalItems = bindings.length;

    if (totalItems <= chunkSize) {
      resolve(data);
      return;
    }

    let processedItems = 0;
    const processedData = {
      head: { ...head },
      results: {
        distinct: results.distinct,
        ordered: results.ordered,
        bindings: [],
      },
    };

    const processChunk = () => {
      const end = Math.min(processedItems + chunkSize, totalItems);
      for (let i = processedItems; i < end; i++) {
        processedData.results.bindings.push(bindings[i]);
      }
      processedItems = end;
      const progress = Math.min(
        Math.round((processedItems / totalItems) * 100),
        100
      );
      onProgress(progress);

      if (processedItems < totalItems) {
        setTimeout(processChunk, 0);
      } else {
        resolve(processedData);
      }
    };

    processChunk();
  });
};
