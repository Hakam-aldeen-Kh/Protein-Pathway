import TableHeader from "../../../common/pathway-table/TableHeader";
import TableCell from "../../../common/pathway-table/TableCell";
import { columns } from "../../../data/columnsTableDataGlycan";

const GlycanPathwayTable = ({ pathways }) => {
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
          className="grid grid-cols-9 text-xs text-neutral-900"
        >
          {columns.map(({ key, isArray, link }, colIndex) => (
            <TableCell
              key={`${rowIndex}-${colIndex}`}
              content={row[key]}
              title={key}
              isArray={isArray}
              link={link}
              id={row.id}
              dataType="glycan"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GlycanPathwayTable;
