import { Link } from "react-router";

const TableCell = ({
  content,
  link,
  _id,
  title,
  dataType = "pathway",
}) => {
  function capitalize(s) {
    return String(s[0]).toUpperCase() + String(s).slice(1);
  }

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
          {capitalize(content || "-")}
        </Link>
      ) : (
        capitalize(content || "-")
      )}
    </div>
  );
};

export default TableCell;
