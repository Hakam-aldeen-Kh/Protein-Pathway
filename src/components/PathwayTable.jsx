import { Link } from "react-router";


const TableHeader = ({ title }) => (
  <div className="p-3 font-semibold border-b border-gray-300 flex items-center justify-between mt-[20px]">
    <span>{title}</span>
    <img src="/images/icons/arrow-swap.svg" alt="Sort Icon" />
  </div>
);

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
      <Link to={`/pathway/${id}`} className="text-violet-900 hover:text-violet-600">
        {content}
      </Link>
    ) : (
      content
    )}
  </div>
);

const PathwayTable = ({ pathways }) => {
  const columns = [
    { title: "Pathway ID", key: "id" },
    { title: "Title", key: "title", link: true },
    { title: "Species", key: "species" },
    { title: "Pathway Category", key: "category" },
    { title: "Reactants", key: "reactants", isArray: true },
    { title: "Controller", key: "controller" },
    { title: "Products", key: "products", isArray: true },
    { title: "Record Date", key: "date" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      {/* Table Header */}
      <div className="grid grid-cols-8 text-xs font-semibold">
        {columns.map(({ title }, index) => (
          <TableHeader key={index} title={title} />
        ))}
      </div>

      {/* Table Body */}
      {pathways.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-8 text-xs text-neutral-900"
        >
          {columns.map(({ key, isArray, link }, colIndex) => (
            <TableCell
              key={`${rowIndex}-${colIndex}`}
              content={row[key]}
              isArray={isArray}
              link={link}
              id={row.id} // Pass the pathway id for linking
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PathwayTable;
