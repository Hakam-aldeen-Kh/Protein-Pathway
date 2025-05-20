import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProteinSearchTable = ({
  isOpen,
  setOpenTablePagination,
  onProteinSelect,
  reactantData,
  site,
}) => {
  const tableRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [localDataUrl, setLocalDataUrl] = useState(null);

  // Track whether the table has been initialized
  const tableInitialized = useRef(false);

  // Define table columns as a JSON string
  const columns = JSON.stringify([
    { id: "index", label: "Protein Name (Selector)", escape: false },
    {
      id: "protein_id",
      label: "UniProt ID",
      link: "protein_uri",
      target: "_blank",
    },
    { id: "taxon_name", label: "Species", type: "category" },
    { id: "DNA_name", label: "Gene Name" },
  ]);

  // Prepare search parameters based on reactantData
  const inputText = reactantData?.proteinSymbolicName
    ? encodeURIComponent(reactantData.proteinSymbolicName)
    : "";

  const apiUrl = `https://gpr-sparqlist.alpha.glycosmos.org/sparqlist/api/uniprot_keyword_search?input_text=${inputText}&input_site=${site}`;

  // Close the modal
  const closeModal = () => {
    setOpenTablePagination(false);
  };

  // Save data to a local file
  const saveDataToLocalFile = async (data) => {
    try {
      // In a real app, you'd use an API endpoint to save this
      // For now, we'll create a Blob URL as a temporary solution
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      // Set the local URL for the table to use
      setLocalDataUrl(url);

      return url;
    } catch (err) {
      console.error("Error saving data to local file:", err);
      throw err;
    }
  };

  // Load the togostanza-pagination-table script and handle protein selection
  useEffect(() => {
    if (!isOpen) return;

    window.insert = function (element, site, proteinId) {
      const proteinName = element.textContent.trim();
      onProteinSelect({ proteinName, proteinId });
      setOpenTablePagination(false);
    };

    const script = document.createElement("script");
    script.src = "https://togostanza.github.io/metastanza/pagination-table.js";
    script.type = "module";
    script.async = true;

    const handleScriptError = () => {
      setError("Failed to load table script");
      setIsLoading(false);
    };

    script.addEventListener("error", handleScriptError);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      script.removeEventListener("error", handleScriptError);
      delete window.insert;
    };
  }, [isOpen, onProteinSelect, setOpenTablePagination]);

  // Fetch data when the modal opens
  useEffect(() => {
    if (!isOpen || !inputText) return;

    // Reset state when modal opens with new search
    setError(null);
    setIsLoading(true);
    tableInitialized.current = false;

    const fetchData = async () => {
      try {
        console.log("Fetching protein data...");
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error(`No protein data found for "${reactantData?.proteinSymbolicName}"`);
        }

        console.log("Protein data fetched successfully:", data.length, "items");

        // Save the data to a local file and get the URL
        await saveDataToLocalFile(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching protein data:", err);
        setError(`Failed to load protein data: ${err.message}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isOpen, apiUrl, inputText]);

  // Initialize or refresh the table when data is ready
  useEffect(() => {
    if (!isOpen || !localDataUrl || isLoading || error) return;

    // Wait for the script to load and elements to be available
    const initializeTable = () => {
      const tableElement = tableRef.current?.querySelector(
        "togostanza-pagination-table"
      );

      if (tableElement) {
        // For first initialization or if table needs refresh
        if (!tableInitialized.current) {
          console.log("Initializing table with local data URL", localDataUrl);
          tableElement.setAttribute("data-url", localDataUrl);

          // Force the table to refresh by triggering an attribute change
          tableElement.setAttribute("page-size", "10");

          // Mark table as initialized
          tableInitialized.current = true;
        }
      } else {
        console.log("Table element not found, retrying...");
        setTimeout(initializeTable, 100);
      }
    };

    initializeTable();
  }, [isOpen, localDataUrl, isLoading, error]);

  // Clean up the Blob URL when component unmounts or modal closes
  useEffect(() => {
    return () => {
      if (localDataUrl) {
        URL.revokeObjectURL(localDataUrl);
      }
    };
  }, [localDataUrl]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="bg-white rounded-lg border border-gray-300 min-w-[35%] max-w-4xl mx-auto my-10 p-4 relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="w-full max-w-[700px] h-[500px] max-h-[500px] min-h-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Protein Search Results
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div ref={tableRef} className="relative h-[calc(100%-60px)] bg-white">
          {/* LOADING INDICATOR */}
          {isLoading && (
            <div
              className="absolute inset-0 flex items-center justify-center z-50 bg-white bg-opacity-80"
              style={{ pointerEvents: "all" }}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mb-3"></div>
                <p className="text-purple-600 font-medium">
                  Loading protein data...
                </p>
              </div>
            </div>
          )}

          {/* ERROR DISPLAY */}
          {error && (
            <div
              className="absolute inset-0 flex items-center justify-center z-50 bg-white"
              style={{ pointerEvents: "all" }}
            >
              <div className="text-center p-4">
                <p className="text-red-600 font-medium mb-2">{error}</p>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* TABLE COMPONENT */}
          <togostanza-pagination-table
            id="reactant_name_text"
            data-type="json"
            custom-css-url=""
            data-unavailable_message="No data found."
            width=""
            fixed-columns="1"
            padding="0px"
            page-size-option="10,20,50,100"
            page-slider="false"
            columns={columns}
            style={{
              "--togostanza-thead-background-color": "#583d8d",
              "--togostanza-pagination-current-background-color": "#583d8d",
              "--togostanza-pagination-arrow-color": "#583d8d",
              visibility: isLoading || error ? "hidden" : "visible",
            }}
          ></togostanza-pagination-table>
        </div>
      </div>
    </Modal>
  );
};

export default ProteinSearchTable;
