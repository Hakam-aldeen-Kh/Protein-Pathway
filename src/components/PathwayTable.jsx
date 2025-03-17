import TableCell from "./TableCell";
import TableHeader from "./TableHeader";
import { columns } from "../context/columnsTableData";

const PathwayTable = ({ pathways }) => {
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
              id={row.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PathwayTable;
