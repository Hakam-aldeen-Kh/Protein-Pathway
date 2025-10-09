import { Loader2, X, ExternalLink, Copy, Check } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

const PubMedID = ({
  setPubMeds,
  handleChange,
  item,
  index,
  handleChangePubMed,
  removePubMed,
  onStatusChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const statusRef = useRef(null);
  const expandedDivRef = useRef(null);
  const fetchTimeoutRef = useRef(null);

  // Notify parent on changes (memoized)
  useEffect(() => {
    if (typeof onStatusChange === "function") {
      onStatusChange(index, {
        loading: isLoading,
        error: !!error,
        valid: !isLoading && !error && !!item?.title,
      });
    }
  }, [isLoading, error, item?.title, index, onStatusChange]);

  useEffect(() => {
    setIsLocked(!!(item?.title && item.title !== ""));
  }, [item?.title]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, []);

  const announce = useCallback((msg) => {
    if (statusRef.current) statusRef.current.textContent = msg;
  }, []);

  const fetchTitleForId = useCallback(async () => {
    if (!item?.id || item.id.trim() === "" || isLocked) return;

    // Validate PubMed ID format (should be numeric)
    if (!/^\d+$/.test(item.id.trim())) {
      setError("PubMed ID must contain only numbers.");
      announce("Invalid PubMed ID format.");
      return;
    }

    setIsLoading(true);
    setError(null);
    announce("Fetching PubMed title...");

    const apiUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${encodeURIComponent(
      item.id.trim()
    )}&retmode=json`;

    try {
      const response = await fetch(apiUrl, { 
        signal: AbortSignal.timeout(10000)
      });
      
      if (!response.ok) {
        throw new Error(response.status === 404 ? "PubMed ID not found." : "Failed to fetch data.");
      }
      
      const data = await response.json();
      const result = data?.result;

      if (result && result[item.id.trim()]) {
        const title = result[item.id.trim()].title || "";
        handleChangePubMed({ target: { value: title } }, index, "title");
        setError(null);
        setIsLocked(true);
        announce("Title retrieved successfully.");
      } else {
        handleChangePubMed({ target: { value: "" } }, index, "title");
        setError("No data found for this PubMed ID.");
        announce("No data found.");
      }
    } catch (err) {
      let msg = "An error occurred while fetching data.";
      if (err.name === "TimeoutError" || err.name === "AbortError") {
        msg = "Request timed out. Please try again.";
      } else if (err.message.includes("404")) {
        msg = "PubMed ID not found.";
      } else if (err?.message) {
        msg = err.message;
      }
      setError(msg);
      announce("Error fetching title.");
    } finally {
      setIsLoading(false);
    }
  }, [item?.id, isLocked, handleChangePubMed, index, announce]);

  const handleClearTitleAndId = useCallback(() => {
    setPubMeds((prev) => {
      const next = prev.map((p, i) =>
        i === index ? { ...p, id: "", title: "" } : p
      );
      handleChange({ target: { name: "pubMeds", value: next } });
      return next;
    });
    setIsLocked(false);
    setError(null);
    setIsExpanded(false);
    
    // Focus input after clearing
    fetchTimeoutRef.current = setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  }, [setPubMeds, handleChange, index]);

  const handleRemove = useCallback(() => {
    removePubMed(index);
  }, [removePubMed, index]);

  const handleCopyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      announce("Copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      announce("Copy failed.");
    }
  }, [announce]);

  const handleInputChange = useCallback((e) => {
    // Only allow numeric input
    const value = e.target.value.replace(/\D/g, '');
    handleChangePubMed({ target: { value } }, index, "id");
    
    // Clear error when user starts typing
    if (error) setError(null);
  }, [handleChangePubMed, index, error]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchTitleForId();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleClearTitleAndId();
    }
  }, [fetchTitleForId, handleClearTitleAndId]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((s) => !s);
  }, []);

  const pubmedLink = item?.id
    ? `https://pubmed.ncbi.nlm.nih.gov/${item.id}/`
    : null;

  return (
    <div className="space-y-2">
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        ref={statusRef}
      />

      <div className="flex gap-x-3 items-start">
        {/* PubMed ID Input */}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            inputMode="numeric"
            pattern="\d*"
            type="text"
            placeholder="Add PubMed ID"
            aria-label="PubMed ID"
            aria-invalid={!!error}
            aria-describedby={error ? `error-${index}` : undefined}
            className={`block w-full h-[40px] rounded-md border px-3 py-2 shadow-sm outline-none transition-colors ${
              isLocked
                ? "bg-gray-50 border-gray-300 text-gray-700"
                : error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-[#57369E] focus:ring-[#57369E]"
            }`}
            value={item?.id || ""}
            onChange={handleInputChange}
            onBlur={fetchTitleForId}
            onKeyDown={handleKeyDown}
            disabled={isLocked || isLoading}
          />

          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Loader2 className="h-4 w-4 animate-spin text-[#57369E]" aria-label="Loading" />
            </div>
          )}

          {!isLoading && item?.title && (
            <button
              type="button"
              onClick={handleClearTitleAndId}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#57369E] focus:ring-offset-1 transition-colors"
              aria-label="Clear PubMed ID and title"
              title="Clear PubMed ID and title"
            >
              <X className="h-4 w-4 text-gray-600 hover:text-gray-800" />
            </button>
          )}
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={handleRemove}
          className="flex items-center h-[40px] justify-center py-2 px-3 border bg-[#57369E] cursor-pointer rounded-lg hover:bg-[#00A7D3] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#57369E] focus:ring-offset-2"
          aria-label="Remove PubMed entry"
          title="Remove PubMed entry"
        >
          <img
            src="/images/icons/trash.svg"
            className="w-[24px] h-[24px]"
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Title display with expand/collapse */}
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center gap-2">
          {!isExpanded ? (
            <div
              className={`relative flex-1 min-w-0 h-[40px] flex items-center rounded-md border p-2 shadow-sm outline-none ${
                isLocked
                  ? "bg-gray-100 border-gray-300"
                  : error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              title={item?.title || ""}
            >
              <div className="truncate text-sm leading-tight min-w-0 text-gray-700">
                {item?.title || "Title will appear here"}
              </div>
            </div>
          ) : (
            <div
              ref={expandedDivRef}
              className="flex-1 w-full block rounded-md border p-2 shadow-sm border-gray-300 bg-gray-50 text-gray-700 text-sm leading-relaxed select-none cursor-default"
              style={{ 
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
              aria-label="Full PubMed title"
            >
              {item?.title || ""}
            </div>
          )}

          {/* Expand/Collapse toggle */}
          {item?.title && (
            <button
              type="button"
              onClick={toggleExpanded}
              className="inline-flex h-10 items-center px-2 rounded-md border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#57369E] transition-colors"
              aria-pressed={isExpanded}
              aria-label={isExpanded ? "Collapse title" : "Expand title"}
              title={isExpanded ? "Collapse title" : "View full title"}
            >
              {isExpanded ? (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M6 15l6-6 6 6" />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              )}
            </button>
          )}

          {/* PubMed link */}
          {item?.title && pubmedLink && (
            <a
              href={pubmedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center px-2 rounded-md border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#57369E] transition-colors"
              aria-label="Open in PubMed (opens in new tab)"
              title="Open in PubMed"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}

          {/* Copy button with feedback */}
          {item?.title && (
            <button
              type="button"
              onClick={() => handleCopyToClipboard(item.title)}
              className="inline-flex h-10 items-center px-2 rounded-md border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#57369E] transition-colors"
              aria-label={copied ? "Copied" : "Copy title to clipboard"}
              title={copied ? "Copied!" : "Copy title"}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}
        </div>

        {/* Messages */}
        {error && (
          <p className="text-red-500 text-sm mt-1" id={`error-${index}`} role="alert">
            {error}{" "}
            <button
              type="button"
              onClick={fetchTitleForId}
              className="underline ml-1 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              disabled={isLoading}
            >
              Retry
            </button>
          </p>
        )}
        {isLocked && !error && (
          <p className="text-[#C59442] text-sm mt-1">
            The PubMed title has been retrieved. Click the X icon to clear and
            edit the PubMed ID, or use the trash icon to remove this entry.
          </p>
        )}
        {!isLocked && !error && !isLoading && (
          <div className="text-sm text-gray-500">
            Enter PubMed ID and press Enter or click away to fetch the title.
          </div>
        )}
      </div>
    </div>
  );
};

export default PubMedID;