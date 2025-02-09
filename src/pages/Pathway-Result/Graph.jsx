import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import { useEffect } from "react";

const Graph = ({ elements, layout, touch = false }) => {
    const cyStylesheet = sbgnStylesheet(cytoscape);
    const stylesheet = [
        {
            selector: 'node',
            style: {
                "label": "data(label)",
                "font-size": "12px",
                // "text-valign": "center",
                // "text-halign": "center",
                "shape": "oval",
                "width": "mapData(labelLength, 1, 20, 50, 150)",
                "height": "40px",
                "padding": "5px",
            },
        },
        {
            selector: 'edge',
            style: {
                width: 2,
                "label": "data(label)",
                "text-margin-y": -10,
                "font-size": "10px",
                "text-halign": "center",
                "text-valign": "top",
                // "target-arrow-shape": "triangle",
                // "line-color": "green",
                // "target-arrow-color": "red",
                // "target-arrow-size": 60,
                // "curve-style": "bezier"
            }
        }
    ]
    useEffect(() => {
        elements.nodes.forEach((node) => {
            node.data.labelLength = node.data.label.length;
            // node.data.shape = node.data.label.length > 8 ? "ellipse" : "oval";
        });
    }, [elements]);

    return (
        <CytoscapeComponent
            elements={CytoscapeComponent.normalizeElements(elements)}
            style={{ width: "100%", height: "100%" }}
            maxZoom={2}
            minZoom={0.05}
            layout={layout}
            cy={(cy) => {
                cy.style(cyStylesheet).append(stylesheet).update();
                window.cy = cy;
                if (!touch) {
                    cy.nodes().forEach(node => node.lock()); // Lock all nodes
                    cy.boxSelectionEnabled(false); // Disable selection
                    cy.userPanningEnabled(false); // Disable graph panning
                    // cy.zoomingEnabled(false); // Disable zooming
                    cy.zoom(0.7)
                }
                cy.center();

            }}
        />
    );
};

export default Graph;