import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";

const Graph = ({ elements, layout, touch = false }) => {

    const cyStylesheet = sbgnStylesheet(cytoscape);
    return (
        <CytoscapeComponent
            elements={CytoscapeComponent.normalizeElements(elements)}
            // CytoscapeComponent.normalizeElements()
            style={{ width: "100%", height: "100%" }}
            maxZoom={2}
            minZoom={0.05}
            zoom={0.5}
            layout={layout}
            cy={(cy) => {
                cy.style(cyStylesheet).update();
                window.cy = cy;

                if (!touch) {
                    cy.nodes().forEach(node => node.lock());
                    cy.boxSelectionEnabled(false);
                    cy.userPanningEnabled(false);
                    cy.zoom(0.15);
                }

                cy.center();

                // Add tooltip logic here
                // cy.on('mouseover', 'node', async (evt) => {
                //     const node = evt.target;
                //     const link = node.data('link');

                //     const tooltip = document.getElementById('tooltip');
                //     const image = document.getElementById('tooltip-image');
                //     const title = document.getElementById('tooltip-title');

                //     if (!link) return;

                //     try {
                //         const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(link)}`);
                //         const result = await response.json();
                //         const metadata = result.data;


                //         image.src = metadata.image?.url || '';
                //         title.innerText = node.data('label') || 'No title';
                //         const renderedPosition = node.renderedPosition();

                //         tooltip.style.left = renderedPosition.x + 'px';
                //         tooltip.style.top = renderedPosition.y + 30 + 'px';
                //         tooltip.style.display = 'block';

                //         // // Position tooltip near the mouse
                //         // tooltip.style.left = evt.originalEvent.pageX + 'px';
                //         // tooltip.style.top = evt.originalEvent.pageY + 'px';
                //         // tooltip.style.display = 'block';
                //     } catch (err) {
                //         console.log(err);
                //         title.innerText = 'Preview not available';
                //         tooltip.style.display = 'none';
                //     }
                // });

                // cy.on('mouseout', 'node', () => {
                //     const tooltip = document.getElementById('tooltip');
                //     tooltip.style.display = 'none';
                // });
            }}

        />
    );
};

export default Graph;

// cy = {(cy) => {
//     cy.style(cyStylesheet).update();
//     // .append(stylesheet)
//     window.cy = cy;
//     if (!touch) {
//         cy.nodes().forEach(node => node.lock()); // Lock all nodes
//         cy.boxSelectionEnabled(false); // Disable selection
//         cy.userPanningEnabled(false); // Disable graph panning
//         // cy.zoomingEnabled(false); // Disable zooming
//         cy.zoom(0.15)
//     }
//     cy.center();

// }}





// const stylesheet = [
//     {
//         selector: 'node',
//         style: {
//             "label": "data(label)",
//             "font-size": "12px",
//             // "text-valign": "center",
//             // "text-halign": "center",
//             "shape": "oval",
//             "width": "mapData(labelLength, 1, 20, 50, 150)",
//             "height": "40px",
//             "padding": "5px",
//         },
//     },
//     {
//         selector: 'edge',
//         style: {
//             width: 2,
//             "label": "data(label)",
//             "text-margin-y": -10,
//             "font-size": "10px",
//             "text-halign": "center",
//             "text-valign": "top",
//             // "target-arrow-shape": "triangle",
//             // "line-color": "green",
//             // "target-arrow-color": "red",
//             // "target-arrow-size": 60,
//             // "curve-style": "bezier"
//         }
//     }
// ]
// useEffect(() => {
//     console.log(elements)
//     elements.forEach((node) => {
//         node.data.labelLength = node.data.label.length;
//         // node.data.shape = node.data.label.length > 8 ? "ellipse" : "oval";
//     });
// }, [elements]);