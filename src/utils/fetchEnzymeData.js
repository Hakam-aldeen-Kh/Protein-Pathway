/**
 * Fetches the default enzymes.json.gz file
 * @returns Promise resolving to the processed SparqlJsonResult
 */
export const fetchDefaultFile = async () => {
  try {
    console.log('Starting default file fetch process');
    
    // Preventing browser from auto-processing gzip by using a specific request
    // with headers that tell the server we want the raw file
    const fetchOptions = {
      headers: {
        // Disable content encoding to get the raw file
        'Accept-Encoding': 'identity',
        // Ensure we get the raw binary data
        'Accept': '*/*'
      },
      // Ensure we don't use cache that might have processed the content
      cache: 'no-store'
    };
    
    // Try using the Fetch API with the public directory path
    console.log('Attempting to fetch from /enzymes.json.gz');
    const response = await fetch('/enzymes.json.gz', fetchOptions);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch default file: ${response.status} ${response.statusText}`);
    }
    
    console.log('Successfully fetched default file');
    
    // Get the array buffer directly to ensure we handle the raw binary data
    const arrayBuffer = await response.arrayBuffer();
    console.log(`Received array buffer of size: ${arrayBuffer.byteLength} bytes`);
    
    // Use our enhanced processor that can handle both gzipped and plain JSON
    return processArrayBuffer(arrayBuffer);
  } catch (error) {
    console.error('Error fetching default file:', error);
    throw error;
  }
};

/**
 * Process an ArrayBuffer containing plain JSON data
 * @param arrayBuffer The ArrayBuffer containing data
 * @returns Promise resolving to the parsed SparqlJsonResult
 */
export const processArrayBuffer = async (arrayBuffer) => {
  try {
    // Convert ArrayBuffer to string
    const decoder = new TextDecoder('utf-8');
    const jsonString = decoder.decode(arrayBuffer);

    // Parse as plain JSON
    const jsonData = JSON.parse(jsonString);

    // Validate the JSON structure
    if (!jsonData.head || !jsonData.results || !jsonData.results.bindings) {
      throw new Error('Invalid SPARQL JSON format in plain text');
    }

    console.log('Successfully parsed as plain JSON');
    return jsonData;
  } catch (error) {
    console.error('Failed to parse array buffer as plain JSON:', error);
    throw new Error('Failed to process plain JSON data');
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
    
    // If the dataset is small, return immediately
    if (totalItems <= chunkSize) {
      resolve(data);
      return;
    }
    
    // Process the data in chunks
    let processedItems = 0;
    
    // Clone the data to avoid mutating the original
    const processedData = {
      head: { ...head },
      results: {
        distinct: results.distinct,
        ordered: results.ordered,
        bindings: []
      }
    };
    
    // Function to process a chunk
    const processChunk = () => {
      const end = Math.min(processedItems + chunkSize, totalItems);
      
      // Process the current chunk
      for (let i = processedItems; i < end; i++) {
        processedData.results.bindings.push(bindings[i]);
      }
      
      // Update progress
      processedItems = end;
      const progress = Math.min(Math.round((processedItems / totalItems) * 100), 100);
      onProgress(progress);
      
      // If there are more items to process, schedule the next chunk
      if (processedItems < totalItems) {
        setTimeout(processChunk, 0);
      } else {
        // All done
        resolve(processedData);
      }
    };
    
    // Start processing
    processChunk();
  });
};