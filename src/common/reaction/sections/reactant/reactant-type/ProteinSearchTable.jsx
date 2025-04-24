import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProteinSearchTable = ({
  isOpen,
  setOpenTablePagination,
  onProteinSelect,
  reactantData,
}) => {
  const tableRef = useRef(null);
  const [error, setError] = useState(null);

  // Define table columns as a JSON string
  const columns = JSON.stringify([
    { id: "index", label: "Protein", escape: false },
    { id: "protein_name", label: "Protein Name" },
    { id: "protein_id", label: "UniProt ID", link: "protein_uri", target: "_blank" },
    { id: "taxon_name", label: "Organism", type: "category", rowspan: true },
    { id: "DNA_name", label: "Gene Name" },
  ]);

  // Prepare the data URL based on reactantData
  const inputText = reactantData?.proteinSymbolicName
    ? encodeURIComponent(reactantData.proteinSymbolicName)
    : "";
  const dataUrl = `https://gpr-sparqlist.alpha.glycosmos.org/sparqlist/api/uniprot_keyword_search?input_text=${inputText}&input_site=reactant`;

  // Close the modal
  const closeModal = () => {
    setOpenTablePagination(false);
  };

  // Reset error state when modal opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

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
          <h2 className="text-xl font-bold text-gray-800">Protein Search Results</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div ref={tableRef} className="relative h-[calc(100%-60px)]">
          {error && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}
          <togostanza-pagination-table
            id="reactant_name_text"
            data-url={dataUrl}
            data-type="json"
            custom-css-url=""
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
            }}
          ></togostanza-pagination-table>
        </div>
      </div>
    </Modal>
  );
};

export default ProteinSearchTable;