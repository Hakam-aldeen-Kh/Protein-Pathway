import { Loader2, X } from "lucide-react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const PubMedID = ({
  setPubMeds,
  handleChange,
  item,
  index,
  handleChangePubMed,
  removePubMed,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (item?.title && item.title !== "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [item?.title]);

  const handleOnBlur = async () => {
    // if no id or already converted/disabled, skip
    if (!item?.id || item.id === "" || isDisabled) return;

    setIsLoading(true);
    setError(null);

    const apiUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${encodeURIComponent(
      item.id
    )}&retmode=json`;

    try {
      const response = await axios.get(apiUrl);
      const result = response?.data?.result;

      if (result && result[item.id]) {
        const title = result[item.id].title || "";
        // Use parent's robust handler (it does functional updates)
        handleChangePubMed({ target: { value: title } }, index, "title");
        setError(null);
        setIsDisabled(true);
      } else {
        // clear title if not found
        handleChangePubMed("", index, "title");
        setError("No data found for the given PubMed ID.");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.message ||
        "An error occurred while fetching data.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Atomic clear: clear both id and title in a single functional update,
   * sync parent once, reset local flags, and focus the input.
   */
  const handleClearTitleAndId = () => {
    setPubMeds((prev) => {
      const next = prev.map((p, i) =>
        i === index ? { ...p, id: "", title: "" } : p
      );
      // sync parent once
      handleChange({ target: { name: "pubMeds", value: next } });
      return next;
    });

    setIsDisabled(false);
    setError(null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-x-4">
        <div className="flex items-end gap-x-1 relative w-full flex-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add PubMed ID"
            className={`outline-none block w-full h-[40px] self-end flex-1 rounded-md border p-2 shadow-sm transition-colors ${
              isDisabled
                ? "bg-gray-100 border-gray-300"
                : error
                ? "border-red-500"
                : "border-gray-300 focus:border-[#57369E] focus:ring-[#57369E]"
            }`}
            value={item?.id || ""}
            onChange={(e) => handleChangePubMed(e, index, "id")}
            onBlur={handleOnBlur}
            disabled={isDisabled}
            aria-label="PubMed ID"
          />

          {isLoading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-[#57369E]" />
            </div>
          )}
          {/* Clear button: appears when a title exists and not loading */}
          {item?.title && !isLoading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <X
                className="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-800"
                onClick={handleClearTitleAndId}
                title="Clear PubMed ID and title"
              />
            </div>
          )}
        </div>

        <div
          className="flex items-center h-[40px] justify-center py-2 px-3 border bg-[#57369E] cursor-pointer rounded-lg hover:bg-[#00A7D3] transition-all duration-200"
          onClick={() => removePubMed(index)}
          role="button"
          aria-label="Remove PubMed entry"
        >
          <img
            src="/images/icons/trash.svg"
            className="w-[24px] h-[24px]"
            alt="Remove"
          />
        </div>

        <div className="col-span-2 mt-2 relative w-full">
          <input
            disabled={true}
            type="text"
            value={item?.title || ""}
            placeholder="Title will appear here"
            className={`outline-none h-[40px] w-full block rounded-md border p-2 shadow-sm ${
              isDisabled
                ? "bg-gray-100 border-gray-300"
                : error
                ? "border-red-500"
                : "border-gray-300 focus:border-[#57369E] focus:ring-[#57369E]"
            }`}
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {isDisabled && (
        <p className="text-[#C59442] text-sm mt-1">
          The PubMed title has been retrieved. Click the X icon to clear and
          edit the PubMed ID, or use the trash icon to remove this entry.
        </p>
      )}
    </div>
  );
};

export default PubMedID;
