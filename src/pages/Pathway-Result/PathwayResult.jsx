
import { elements } from "./data5";
import { layouts } from "./layouts";
import setupCy from "./setupCy";
import { useState } from "react";
import Graph from "./Graph";

setupCy();

const PathwayResult = () => {
  const [layout, setLayout] = useState(layouts.fcose);

  const handleExport = () => {
    if (window.cy) {
      const png = window.cy.png({ full: true });
      const link = document.createElement("a");
      link.href = png;
      link.download = "pathway.png";
      link.click();
    }
  };

  const handleZoomIn = () => {
    if (window.cy) {
      window.cy.zoom(window.cy.zoom() + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (window.cy) {
      window.cy.zoom(window.cy.zoom() - 0.1);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-71px)] flex items-start justify-center gap-2 p-2 bg-gray-100 relative">

      <div className="flex-1 h-full bg-white rounded-lg shadow-lg flex items-center justify-center">
        <Graph elements={elements} layout={layout} touch={true} />
      </div>

      <div className="w-[150px] space-y-2">
        <button
          onClick={handleExport}
          className=" w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Export as PNG
        </button>
        <button
          onClick={handleZoomIn}
          className="bg-green-500 w-full text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
        >
          Zoom In
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-red-500 w-full text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
        >
          Zoom Out
        </button>

        <select
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setLayout({ ...layouts[e.target.value] });
          }}
        >
          <option value={"klay"}>
            Select layout
          </option>
          {Object.keys(layouts).map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
};

export default PathwayResult;