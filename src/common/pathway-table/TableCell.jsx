import { Link } from "react-router";

const TableCell = ({ content, link, _id, title, dataType = "pathway" }) => {
  // Simple capitalize function
  const capitalize = (text) => {
    if (!text || text === "-") return text;
    return Array.isArray(text) ? text[0]?.charAt(0).toUpperCase() + text.slice(1) : text?.charAt(0).toUpperCase() + text.slice(1);
  };

  // Capitalize the content
  const displayText = capitalize(content);

  return (
    <div
      className={`${title === "involvedEnzymes" ? "col-span-2" : ""} p-3 flex ${dataType === "glycan" ? "items-start" : "items-center"
        } justify-start bg-slate-100 border-b-[5px] border-white h-full`}
    >
      {link ? (
        <Link
          to={`/preview/${_id}`}
          className="text-violet-900 hover:text-violet-600"
        >
          {displayText}
        </Link>
      ) : (
        displayText
      )}
    </div>
  );
};

export default TableCell;
