import { useState, useRef, useEffect, useCallback, useTransition } from "react";
import {
  AutoSizer,
  Table,
  Column as VirtualizedColumn,
} from "react-virtualized";
import "react-virtualized/styles.css";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";

const DataTable = ({ data, onRowClick, searchQuery, selectedRow, loading }) => {
  const [sortBy, setSortBy] = useState("enzyme_name");
  const [sortDirection, setSortDirection] = useState("ASC");
  const [filteredData, setFilteredData] = useState([]);
  const tableRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  /* ---------- Column definitions ---------- */
  const formatColumnHeader = (name) =>
    name
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const getColumnWidth = (name) => {
    switch (name) {
      case "enzyme_id":
        return 150;
      case "enzyme_name":
        return 350;
      case "gene_name":
        return 150;
      case "taxon_name":
        return 300;
      default:
        return 300;
    }
  };

  let columns = data?.head?.vars
    ? data.head.vars.map((v) => ({
        id: v,
        header: formatColumnHeader(v),
        accessorFn: (row) => row[v]?.value || "",
        width: getColumnWidth(v),
      }))
    : [];

  // swap enzyme_id ↔ enzyme_name
  const idxId = columns.findIndex((c) => c.id === "enzyme_id");
  const idxName = columns.findIndex((c) => c.id === "enzyme_name");
  if (idxId !== -1 && idxName !== -1) {
    [columns[idxId], columns[idxName]] = [columns[idxName], columns[idxId]];
  }

  /* ---------- Filtering & sorting ---------- */
  useEffect(() => {
    if (!data?.results?.bindings) {
      startTransition(() => setFilteredData([]));
      return;
    }

    let processed = [...data.results.bindings];

    // search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      processed = processed.filter((row) => {
        if (row.enzyme_name?.value?.toLowerCase() === q) return true;
        return data.head.vars.some((v) =>
          (row[v]?.value || "").toLowerCase().includes(q)
        );
      });
    }

    // sort
    if (sortBy) {
      processed.sort((a, b) => {
        const aVal = (a[sortBy]?.value || "").toLowerCase();
        const bVal = (b[sortBy]?.value || "").toLowerCase();
        return sortDirection === "ASC"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    startTransition(() => setFilteredData(processed));
    if (tableRef.current) tableRef.current.scrollToRow(0);
  }, [data, searchQuery, sortBy, sortDirection]);

  /* ---------- Cell & header renderers ---------- */
  const cellRenderer = useCallback(
    ({ columnIndex, rowIndex, key, style }) => {
      const row = filteredData[rowIndex];
      if (!row) return null;

      const colId = columns[columnIndex].id;
      const rawVal = row[colId]?.value || "";
      const isUri = colId !== "enzyme_id" && row[colId]?.type === "uri";

      // value to display
      const displayVal =
        colId === "enzyme_id"
          ? rawVal.split(/[\/#]/).pop() // last segment
          : rawVal.replace(/^https?:\/\//, "");

      const isSelected =
        selectedRow && selectedRow.enzyme_id?.value === row.enzyme_id?.value;

      const highlightText = (text, q) => {
        if (!q) return text;
        const i = text.toLowerCase().indexOf(q.toLowerCase());
        if (i === -1) return text;
        return (
          <>
            {text.slice(0, i)}
            <span className="bg-yellow-200 font-medium">
              {text.slice(i, i + q.length)}
            </span>
            {text.slice(i + q.length)}
          </>
        );
      };

      return (
        <div
          key={key}
          style={{
            ...style,
            whiteSpace: "normal",
            backgroundColor: isSelected ? "rgba(59,130,246,0.1)" : "inherit",
          }}
          className={`px-4 py-2 border-b border-gray-200 text-sm ${
            isSelected ? "bg-blue-50" : ""
          } hover:bg-gray-50 cursor-pointer`}
          title={rawVal}
        >
          {isUri ? (
            <a
              href={rawVal}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block"
              onClick={(e) => e.stopPropagation()}
            >
              {highlightText(displayVal, searchQuery)}
            </a>
          ) : (
            highlightText(displayVal, searchQuery)
          )}
        </div>
      );
    },
    [filteredData, columns, selectedRow, searchQuery]
  );

  const headerRenderer = ({ dataKey, label }) => {
    const isSorted = sortBy === dataKey;

    const toggleSort = () => {
      if (sortBy !== dataKey) {
        setSortBy(dataKey);
        setSortDirection("ASC");
      } else {
        setSortDirection((d) => (d === "ASC" ? "DESC" : "ASC"));
      }
    };

    return (
      <div
        className="flex items-center justify-between px-4 py-3 text-xs font-medium text-gray-700 cursor-pointer select-none"
        onClick={toggleSort}
      >
        {isPending && "Loading.."}
        <span>{label}</span>
        {isSorted ? (
          sortDirection === "ASC" ? (
            <ChevronUp className="h-4 w-4 text-blue-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-blue-500" />
          )
        ) : (
          <ArrowUpDown className="h-4 w-4 opacity-30" />
        )}
      </div>
    );
  };

  /* ---------- Row click ---------- */
  const handleRowClick = ({ rowData }) => onRowClick(rowData);

  /* ---------- Render ---------- */
  if (!data)
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
        No data available.
      </div>
    );

  const rowCount = filteredData.length;

  return (
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm text-gray-600 flex justify-between items-center">
        <span>
          Showing <strong>{rowCount.toLocaleString()}</strong> of{" "}
          <strong>{data.results.bindings.length.toLocaleString()}</strong>{" "}
          enzymes
        </span>
        {searchQuery && (
          <span className="text-blue-600">Filtered by: "{searchQuery}"</span>
        )}
      </div>

      {rowCount === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No enzymes found matching "{searchQuery}".
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <div style={{ height: 400, minWidth: 800 }}>
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  ref={tableRef}
                  height={height}
                  width={width}
                  rowHeight={60}
                  headerHeight={48}
                  rowCount={rowCount}
                  rowGetter={({ index }) => filteredData[index] || {}}
                  onRowClick={handleRowClick}
                  className="font-sans"
                  rowStyle={({ index }) => {
                    const row = filteredData[index];
                    if (!row || !selectedRow) return { cursor: "pointer" };
                    const isSelected =
                      row.enzyme_id?.value === selectedRow.enzyme_id?.value;
                    return {
                      backgroundColor: isSelected
                        ? "rgba(59,130,246,0.1)"
                        : undefined,
                      cursor: "pointer",
                    };
                  }}
                  overscanRowCount={10}
                  sort={({ sortBy, sortDirection }) => {
                    setSortBy(sortBy);
                    setSortDirection(sortDirection);
                  }}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                >
                  {columns.map((col) => (
                    <VirtualizedColumn
                      key={col.id}
                      dataKey={col.id}
                      label={col.header}
                      width={col.width}
                      minWidth={col.width}
                      maxWidth={col.width}
                      flexGrow={1}
                      cellDataGetter={({ rowData, dataKey }) =>
                        rowData ? rowData[dataKey]?.value ?? "" : ""
                      }
                      cellRenderer={({ rowIndex, columnIndex, key, style }) =>
                        cellRenderer({ rowIndex, columnIndex, key, style })
                      }
                      headerRenderer={headerRenderer}
                    />
                  ))}
                </Table>
              )}
            </AutoSizer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
