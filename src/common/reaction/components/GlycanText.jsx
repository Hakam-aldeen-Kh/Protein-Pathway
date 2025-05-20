import { Loader2, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const GlycanText = ({
  name,
  value,
  isRequired,
  glycanTextType,
  handleChange,
  isDisabled,
  setIsDisabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (
      value &&
      value !== "" &&
      glycanTextType &&
      glycanTextType !== "GlyTouCan ID"
    ) {
      setIsDisabled(true);
    }
  }, []);

  const handlePlaceHolder = () => {
    if (glycanTextType && glycanTextType !== "") {
      return `Please Enter the ${glycanTextType}`;
    }
    return "Please Select the Glycan Text Type";
  };

  const glycanAPI = (glycanTextType) => {
    switch (glycanTextType) {
      case "Linear code":
        return "https://api.glycosmos.org/glycanformatconverter/2.10.4/linearcode2wurcs/";
      case "IUPAC Extended":
        return "https://api.glycosmos.org/glycanformatconverter/2.10.4/iupacextended2wurcs/";
      case "IUPAC condensed":
        return "https://api.glycosmos.org/glycanformatconverter/2.10.4/iupaccondensed2wurcs/";
      default:
        return null;
    }
  };

  const matchErrorMessage = (rawMessage) => {
    const normalizedMessage = rawMessage.toLowerCase();

    if (normalizedMessage.includes("glycoimporterexception")) {
      return "Monosaccharide size could not be defined.";
    }

    if (normalizedMessage.includes("nullpointerexception")) {
      return "Invalid glycan format. Please check your input.";
    }

    if (normalizedMessage.includes("glycanparseexception")) {
      return "Failed to parse glycan structure. Please verify the syntax.";
    }

    if (normalizedMessage.includes("ioexception")) {
      return "Server communication error. Please try again later.";
    }

    return `API Error: ${rawMessage}`;
  };

  const handleOnBlur = async () => {
    if (!glycanTextType || !value) return;

    const apiUrl = glycanAPI(glycanTextType);
    if (!apiUrl) return;

    setIsLoading(true);
    setError(null);

    try {
      // This is the key to solving the problem:
      // 1. First normalize all newlines to actual newlines (in case they are escaped)
      // 2. Then encode them properly for the API

      // Step 1: Convert all escaped newlines to actual newlines
      let normalizedValue = value
        .replace(/\\r\\n/g, "\n") // Replace escaped \r\n with actual newline
        .replace(/\\n/g, "\n") // Replace escaped \n with actual newline
        .replace(/\\r/g, "\n") // Replace escaped \r with actual newline
        .replace(/ /g, "\n"); // Replace escaped " " with actual newline

      // Step 2: For this specific API, convert newlines to plain newline characters
      // This is critical based on what you showed - the API expects actual newlines
      // that get encoded as %0D%0A in the URL

      // Use directly with proper URL encoding
      const response = await axios.get(
        apiUrl + encodeURIComponent(normalizedValue)
      );

      // Check if response has a message indicating an internal error
      if (response.data?.message) {
        const userFriendlyMessage = matchErrorMessage(response.data.message);
        setError(userFriendlyMessage);
        return;
      }

      const convertedValue = response?.data.id || response?.data;
      handleChange({ target: { name, value: convertedValue } });
      setIsDisabled(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const userFriendlyMessage = matchErrorMessage(
          error.response.data.message
        );
        setError(userFriendlyMessage);
      } else {
        setError("Failed to convert glycan text. Please check your input.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleContainerClick = () => {
    if (inputRef.current && !isDisabled && glycanTextType) {
      inputRef.current.focus();
    }
  };

  const handleRemoveValue = () => {
    setIsDisabled(false);
    setError(null);
    handleChange({ target: { name: "glycanText", value: "" } });
  };

  return (
    <div className="relative mt-1 w-full" onClick={handleContainerClick}>
      <div
        className={`flex items-center border rounded-md shadow-sm transition-colors ${
          isDisabled
            ? "bg-gray-100"
            : error
            ? "border-red-500"
            : "border-gray-300 focus-within:border-[#57369E] focus-within:ring-[#57369E]"
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={value || ""}
          name={name}
          disabled={
            !glycanTextType || glycanTextType === "" || isLoading || isDisabled
          }
          required={isRequired}
          onBlur={handleOnBlur}
          onChange={handleChange}
          placeholder={handlePlaceHolder()}
          className="outline-none w-[95%] p-2 bg-transparent"
        />
        {isLoading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-[#57369E]" />
          </div>
        )}
        {value && !isLoading && (
          <div className="absolute right-2 top-[20px] transform -translate-y-1/2">
            <X className="h-4 w-4 cursor-pointer" onClick={handleRemoveValue} />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {isDisabled && (
        <p className="text-[#C59442] text-sm mt-1">
          The {glycanTextType} has been converted. Please click X icon to remove
          or change the Glycan Text Type to enable editing.
        </p>
      )}
    </div>
  );
};

export default GlycanText;
