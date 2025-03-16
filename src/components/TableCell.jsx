import { Link } from "react-router";

const TableCell = ({ content, isArray = false, link, id }) => (
  <div className="p-3 flex items-center justify-start bg-slate-100 border-b-[5px] border-white h-full">
    {isArray && Array.isArray(content) ? (
      <div className="flex flex-wrap gap-2">
        {content.map((item, index) => (
          <div key={index} className="block w-full text-violet-900">
            {item}
          </div>
        ))}
      </div>
    ) : link ? (
      <Link
        to={`/preview/${id}`}
        className="text-violet-900 hover:text-violet-600"
      >
        {content}
      </Link>
    ) : (
      content
    )}
  </div>
);

export default TableCell;
