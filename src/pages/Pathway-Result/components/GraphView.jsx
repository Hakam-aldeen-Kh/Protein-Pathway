import { useState } from "react";
import { useNavigate } from "react-router";

// components
import { layouts } from "./layouts";
import Graph from "../../../common/Graph";
import Button from "./Button";

import setupCy from "./setupCy";
import { reactionsDataToCytoscapeFormat } from "../../../utils/reactionsDataToCytoscapeFormat";

// Cytoscape setup
setupCy();


const GraphView = ({ pathwayData, backLink }) => {

  const navigate = useNavigate()

  const [layout, setLayout] = useState(layouts.klay);

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

  const handleGoBack = () => {
    navigate(backLink)
  };



  return (
    <div className="w-full h-[calc(100vh-71px)] flex items-start justify-center gap-2 p-2 bg-gray-100 relative">

      <div className="flex-1 h-full bg-white rounded-lg shadow-lg flex items-center justify-center">
        <Graph elements={pathwayData.reactionsA || reactionsDataToCytoscapeFormat(pathwayData.reactions)} layout={layout} touch={true} />
      </div>

      <div className="w-[150px] space-y-2">
        <Button onClick={handleGoBack} variant="purple" label="Back" />
        <Button onClick={handleExport} variant="blue" label="Export as PNG" />
        <Button onClick={handleZoomIn} variant="green" label="Zoom In" />
        <Button onClick={handleZoomOut} variant="red" label="Zoom Out" />


        <select
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setLayout({ ...layouts[e.target.value] })}
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

export default GraphView;