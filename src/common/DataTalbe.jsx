import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useTransition,
} from "react";
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

  // Extract column definitions from data
  let columns = data?.head?.vars
    ? data.head.vars.map((varName) => ({
        id: varName,
        header: formatColumnHeader(varName),
        accessorFn: (row) => row[varName]?.value || "",
        width: getColumnWidth(varName),
      }))
    : [];

  // Swap enzyme_id and enzyme_name if both exist
  const idx1 = columns.findIndex((c) => c.id === "enzyme_id");
  const idx2 = columns.findIndex((c) => c.id === "enzyme_name");

  if (idx1 !== -1 && idx2 !== -1) {
    const temp = columns[idx1];
    columns[idx1] = columns[idx2];
    columns[idx2] = temp;
  }

  console.log(columns);

  // Format column header names to be more user-friendly
  function formatColumnHeader(columnName) {
    return columnName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Set column widths based on content type
  function getColumnWidth(columnName) {
    switch (columnName) {
      case "enzyme_id":
        return 270;
      case "enzyme_name":
        return 350;
      case "gene_name":
        return 150;
      case "taxon_name":
        return 300;
      default:
        return 300;
    }
  }

  // Filter and sort data when dependencies change
  useEffect(() => {
    if (!data?.results?.bindings) {
      startTransition(() => {
        setFilteredData([]);
      });
      return;
    }

    let processed = [...data.results.bindings];

    // Apply search filtering
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      processed = processed.filter((row) => {
        // Prioritize exact matches on enzyme_name
        if (row.enzyme_name?.value?.toLowerCase() === q) {
          return true;
        }
        // Check for partial matches across all fields
        return data.head.vars.some((v) => {
          const value = row[v]?.value || "";
          return value.toLowerCase().includes(q);
        });
      });
    }

    // Apply sorting
    if (sortBy) {
      processed.sort((a, b) => {
        const aVal = (a[sortBy]?.value || "").toLowerCase();
        const bVal = (b[sortBy]?.value || "").toLowerCase();
        return sortDirection === "ASC"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    startTransition(() => {
      setFilteredData(processed);
    });

    console.log(filteredData)

    // After sorting, scroll to top to show the sorted results
    if (tableRef.current) {
      tableRef.current.scrollToRow(0);
    }
  }, [data, searchQuery, sortBy, sortDirection]);

  // Handle column header click for sorting
  const handleSort = useCallback((columnId) => {
    setSortBy((prev) => {
      if (prev === columnId) {
        setSortDirection((d) => (d === "ASC" ? "DESC" : "ASC"));
        return columnId;
      }
      setSortDirection("ASC");
      return columnId;
    });
  }, []);

  // Render table cell content
  const cellRenderer = useCallback(
    ({ columnIndex, rowIndex, key, style }) => {
      const row = filteredData[rowIndex];
      if (!row) return null;

      const colId = columns[columnIndex].id;
      const val = row[colId]?.value || "";
      const isUri = row[colId]?.type === "uri";
      const isSelected =
        selectedRow && selectedRow.enzyme_id?.value === row.enzyme_id?.value;

      // Highlight text that matches search query
      const highlightText = (text, query) => {
        if (!query || !text) return text;
        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();
        if (!lowerText.includes(lowerQuery)) return text;

        const startIndex = lowerText.indexOf(lowerQuery);
        const endIndex = startIndex + lowerQuery.length;
        return (
          <>
            {text.substring(0, startIndex)}
            <span className="bg-yellow-200 font-medium">
              {text.substring(startIndex, endIndex)}
            </span>
            {text.substring(endIndex)}
          </>
        );
      };

      return (
        <div
          key={key}
          style={{
            ...style,
            whiteSpace: "normal", // Allow text wrapping
            backgroundColor: isSelected ? "rgba(59, 130, 246, 0.1)" : "inherit",
          }}
          className={`px-4 py-2 border-b border-gray-200 text-sm ${
            isSelected ? "bg-blue-50" : ""
          } hover:bg-gray-50 cursor-pointer`}
          title={val} // Full text on hover
        >
          {isUri ? (
            <a
              href={val}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block"
              onClick={(e) => e.stopPropagation()}
            >
              {val.replace(/^https?:\/\//, "")}
            </a>
          ) : (
            highlightText(val, searchQuery)
          )}
        </div>
      );
    },
    [filteredData, columns, selectedRow, searchQuery]
  );

  // Render column headers with proper sort indicators
  const headerRenderer = ({ dataKey, label }) => {
    const isSorted = sortBy === dataKey;

    // Handle sort when clicking on the header (toggles between unsorted and ASC)
    const handleHeaderClick = () => {
      if (sortBy !== dataKey) {
        setSortBy(dataKey);
        setSortDirection("ASC");
      } else {
        // If already sorted ASC, toggle to DESC, else toggle to ASC
        setSortDirection((prev) => (prev === "ASC" ? "DESC" : "ASC"));
      }
    };

    // Handle click specifically on the arrow icons
    const handleAscArrowClick = (e) => {
      e.stopPropagation(); // Prevent the header click event
      setSortBy(dataKey);
      setSortDirection("DESC"); // Clicking on up arrow changes to DESC
    };

    const handleDescArrowClick = (e) => {
      e.stopPropagation(); // Prevent the header click event
      setSortBy(dataKey);
      setSortDirection("ASC"); // Clicking on down arrow changes to ASC
    };

    const handleDefaultArrowClick = (e) => {
      e.stopPropagation(); // Prevent the header click event
      setSortBy(dataKey);
      setSortDirection("ASC"); // Default to ASC when clicking neutral arrow
    };

    return (
      <div
        className="flex items-center justify-between px-4 py-3 text-xs font-medium text-gray-700 cursor-pointer select-none"
        onClick={handleHeaderClick}
      >
        {isPending && "Loading.."}
        <span>{label}</span>
        {isSorted ? (
          sortDirection === "ASC" ? (
            <div
              onClick={handleAscArrowClick}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronUp className="h-4 w-4 text-blue-500" />
            </div>
          ) : (
            <div
              onClick={handleDescArrowClick}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronDown className="h-4 w-4 text-blue-500" />
            </div>
          )
        ) : (
          <div
            onClick={handleDefaultArrowClick}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ArrowUpDown className="h-4 w-4 opacity-30" />
          </div>
        )}
      </div>
    );
  };

  // Handle row click
  const handleRowClick = ({ rowData }) => {
    onRowClick(rowData);
  };

  if (!data) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
        No data available.
      </div>
    );
  }

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
          <div style={{ height: 400, minWidth: 1040 }}>
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
                        ? "rgba(59, 130, 246, 0.1)"
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
