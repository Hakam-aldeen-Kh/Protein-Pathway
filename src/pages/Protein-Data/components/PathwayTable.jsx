import TableCell from "../../../common/pathway-table/TableCell";
import TableHeader from "../../../common/pathway-table/TableHeader";

import { columns } from "../../../data/columnsTableDataPathway";

const PathwayTable = ({
  pathways,
  setOrderBy,
  orderDirection,
  orderBy,
  setOrderDirection,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      {/* Table Header */}
      <div className="grid grid-cols-5 text-xs font-semibold">
        {columns.map(({ title, key }, index) => (
          <TableHeader
            key={index}
            title={title}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            apiFieldName={key}
            orderDirection={orderDirection}
            setOrderDirection={setOrderDirection}
          />
        ))}
      </div>

      {/* Table Body */}
      {pathways.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-5 text-xs text-neutral-900"
        >
          {columns.map(({ key, link, transform }, colIndex) => {
            // Get the raw value from the row
            const rawValue = row[key];

            // Transform the value if a transform function exists
            const displayValue = transform ? transform(rawValue) : rawValue;

            return (
              <TableCell
                key={`${rowIndex}-${colIndex}`}
                content={displayValue}
                link={link}
                _id={row._id}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PathwayTable;
