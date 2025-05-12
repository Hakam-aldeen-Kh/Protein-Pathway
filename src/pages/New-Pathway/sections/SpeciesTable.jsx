import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const SpeciesTable = ({
  isOpen,
  setOpenTablePagination,
  onSpeciesSelect,
  data,
}) => {
  const tableRef = useRef(null);
  const [error, setError] = useState(null);

  // Define table columns with proper formatter to override any HTML in the data
  const columns = JSON.stringify([
    {
      id: "index",
      label: "Toxan Name (Selector)",
      escape: false,
    },
    {
      id: "common_name",
      label: "Common Name",
    },
    {
      id: "taxon_id",
      label: "Taxon ID",
    },
  ]);

  // Prepare the data URL based on search text
  const inputText = data.species ? encodeURIComponent(data.species) : "";
  const dataUrl = `https://gpr-sparqlist.alpha.glycosmos.org/sparqlist/api/ncbiTaxon?input_text=${inputText}`;

  // Close the modal
  const closeModal = () => {
    setOpenTablePagination(false);
  };

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
    }
  }, [isOpen]);

  // Load the togostanza-pagination-table script and handle protein selection
  useEffect(() => {
    if (!isOpen) return;

    window.insert_taxon = function (element) {
      const species = element;
      console.log(element)
      // console.log(element.textContent)
      onSpeciesSelect({ species });
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
      delete window.insert_taxon;
    };
  }, [isOpen, onSpeciesSelect, setOpenTablePagination]);

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
            Species Search Results
          </h2>
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
            id="species"
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
              "--togostanza-table-hover-color": "#f0ebff",
            }}
          ></togostanza-pagination-table>
        </div>
      </div>
    </Modal>
  );
};

export default SpeciesTable;
