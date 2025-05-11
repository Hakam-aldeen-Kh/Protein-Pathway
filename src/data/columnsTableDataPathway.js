// Helper function to extract the display text from any value type
const extractText = (value) => {
  if (value == null) return "-";

  // Handle JSON string case
  if (typeof value === "string") {
    try {
      // Check if it's a JSON string
      if (value.trim().startsWith("{")) {
        const parsed = JSON.parse(value);
        return parsed.text || value;
      }
      return value;
    } catch {
      // If parsing fails, just return the original string
      return value;
    }
  }

  // Handle object with text property
  if (typeof value === "object" && value.text) {
    return value.text;
  }

  // Default case
  return String(value);
};

export const columns = [
  {
    title: "Pathway ID",
    key: "_id",
    link: true,
    transform: (value) => value,
  },
  {
    title: "Title",
    key: "title",
    // link: true,
    transform: (value) => extractText(value),
  },
  {
    title: "Species",
    key: "species",
    transform: (value) => extractText(value),
  },
  {
    title: "Pathway Category",
    key: "category",
    transform: (value) => extractText(value),
  },
  {
    title: "Record Date",
    key: "recordDate",
    transform: (value) => value,
  },
];
