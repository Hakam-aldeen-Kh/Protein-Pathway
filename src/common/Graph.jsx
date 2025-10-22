

// ============================================
// 2. Graph.jsx (Updated)
// ============================================

import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import { useEffect, useRef } from "react";

// Helper function to get external database URL
const getExternalDatabaseUrl = (pType, databaseId) => {
    if (!databaseId) return null;

    switch (pType) {
        case "glycan":
            return `https://glycosmos.org/glycans/${databaseId}`;
        case "protein":
        case "enzyme":
            return `https://www.uniprot.org/uniprotkb/${databaseId}`;
        case "small_molecule":
            return `https://www.ebi.ac.uk/chebi/searchId.do?chebiId=${databaseId}`;
        case "lipid":
            return `https://www.lipidmaps.org/databases/lmsd/${databaseId}`;
        case "dna":
            return `https://www.ncbi.nlm.nih.gov/gene/?term=${databaseId}`;
        case "rna":
            return `https://rnacentral.org/rna/${databaseId}`;
        case "complex":
            return `https://www.ebi.ac.uk/complexportal/complex/${databaseId}`;
        default:
            return null;
    }
};

// Helper function to get database name
const getDatabaseName = (pType) => {
    switch (pType) {
        case "glycan":
            return "GlycoSmos";
        case "protein":
        case "enzyme":
            return "UniProt";
        case "small_molecule":
            return "ChEBI";
        case "lipid":
            return "LIPID MAPS";
        case "dna":
            return "NCBI Gene";
        case "rna":
            return "RNAcentral";
        case "complex":
            return "Complex Portal";
        default:
            return "Database";
    }
};

// Helper function to create a composite image from multiple glycan images
const createCompositeGlycanImage = async (imageUrls) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size based on number of images
        const imageSize = 100; // Size of each glycan image
        const padding = 10;
        const numImages = imageUrls.length;

        // Arrange images horizontally
        canvas.width = (imageSize + padding) * numImages;
        canvas.height = imageSize + padding * 2;

        // Load all images
        const imagePromises = imageUrls.map((url) => {
            return new Promise((resolveImg) => {
                const img = new Image();
                img.crossOrigin = 'anonymous'; // Enable CORS
                img.onload = () => resolveImg(img);
                img.onerror = () => {
                    console.error(`Failed to load image: ${url}`);
                    resolveImg(null); // Resolve with null instead of rejecting
                };
                img.src = url;
            });
        });

        Promise.all(imagePromises).then((images) => {
            // Draw all images on canvas
            images.forEach((img, index) => {
                if (img) {
                    const x = index * (imageSize + padding) + padding;
                    const y = padding;
                    ctx.drawImage(img, x, y, imageSize, imageSize);
                }
            });

            // Convert canvas to data URL
            const dataUrl = canvas.toDataURL('image/png');
            resolve(dataUrl);
        }).catch(reject);
    });
};

const Graph = ({ elements, layout, touch = false }) => {
    const tooltipRef = useRef(null);
    // Custom styles for glycan and biomolecule nodes
    const customStyles = [
        // Custom style for glycan nodes with single image
        {
            selector: 'node[class="glycan"][glycanCount = 1]',
            style: {
                'shape': 'round-rectangle',
                'width': '120px',
                'height': '120px',
                'background-fit': 'contain',
                'background-clip': 'none',
                'background-image': 'data(backgroundImage)',
                'background-opacity': 1,
                'border-width': 2,
                'border-color': '#333',
                'border-opacity': 1,
                'label': 'data(label)',
                'text-valign': 'bottom',
                'text-halign': 'center',
                'text-margin-y': 5,
                'font-size': '12px',
                'color': '#000',
                'text-wrap': 'wrap',
                'text-max-width': '110px',
                'padding': '5px'
            }
        },
        // Custom style for glycan nodes with 2 images
        {
            selector: 'node[class="glycan"][glycanCount = 2]',
            style: {
                'shape': 'round-rectangle',
                'width': '240px',
                'height': '120px',
                'background-fit': 'contain',
                'background-clip': 'none',
                'background-image': 'data(backgroundImage)',
                'background-opacity': 1,
                'border-width': 2,
                'border-color': '#333',
                'border-opacity': 1,
                'label': 'data(label)',
                'text-valign': 'bottom',
                'text-halign': 'center',
                'text-margin-y': 5,
                'font-size': '12px',
                'color': '#000',
                'text-wrap': 'wrap',
                'text-max-width': '230px',
                'padding': '5px'
            }
        },
        // Custom style for glycan nodes with 3+ images
        {
            selector: 'node[class="glycan"][glycanCount >= 3]',
            style: {
                'shape': 'round-rectangle',
                'width': '360px',
                'height': '120px',
                'background-fit': 'contain',
                'background-clip': 'none',
                'background-image': 'data(backgroundImage)',
                'background-opacity': 1,
                'border-width': 2,
                'border-color': '#333',
                'border-opacity': 1,
                'label': 'data(label)',
                'text-valign': 'bottom',
                'text-halign': 'center',
                'text-margin-y': 5,
                'font-size': '12px',
                'color': '#000',
                'text-wrap': 'wrap',
                'text-max-width': '350px',
                'padding': '5px'
            }
        },
        // Ensure macromolecules (proteins) are rounded rectangles
        {
            selector: 'node[class="macromolecule"]',
            style: {
                'shape': 'round-rectangle',
                'background-color': '#EFE8F8',
                'border-color': '#9673C1',
                'border-width': 2,
                'width': '80px',
                'height': '50px',
                'label': 'data(label)',
                'text-valign': 'center',
                'text-halign': 'center',
                'font-size': '10px',
                'color': '#000'
            }
        },
        // Simple chemicals (small molecules, lipids) as circles
        {
            selector: 'node[class="simple chemical"]',
            style: {
                'shape': 'ellipse',
                'background-color': '#C8E6F5',
                'border-color': '#52A0D8',
                'border-width': 2,
                'width': '50px',
                'height': '50px',
                'label': 'data(label)',
                'text-valign': 'bottom',
                'text-halign': 'center',
                'text-margin-y': 5,
                'font-size': '10px',
                'color': '#000'
            }
        },
        // Nucleic acid features (DNA/RNA) - bottom rounded rectangle
        {
            selector: 'node[class="nucleic acid feature"]',
            style: {
                'shape': 'bottom-round-rectangle',
                'background-color': '#FFE6CC',
                'border-color': '#F39C12',
                'border-width': 2,
                'width': '80px',
                'height': '50px',
                'label': 'data(label)',
                'text-valign': 'center',
                'text-halign': 'center',
                'font-size': '10px',
                'color': '#000'
            }
        },
        // Complex - octagonal shape (cut corners)
        {
            selector: 'node[class="complex"]',
            style: {
                'shape': 'cut-rectangle',
                'background-color': '#E8F5E9',
                'border-color': '#66BB6A',
                'border-width': 2,
                'width': '100px',
                'height': '80px',
                'label': 'data(label)',
                'text-valign': 'center',
                'text-halign': 'center',
                'font-size': '10px',
                'color': '#000'
            }
        }
    ];

    useEffect(() => {
        // Create tooltip element if it doesn't exist
        if (!tooltipRef.current) {
            const tooltip = document.createElement('div');
            tooltip.id = 'cy-tooltip';
            tooltip.style.cssText = `
        position: absolute;
        display: none;
        background: white;
        border: 2px solid #333;
        border-radius: 8px;
        padding: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        max-width: 350px;
        min-width: 200px;
        font-family: Arial, sans-serif;
        pointer-events: none;
      `;
            const body = document.querySelector('#graph-container');

            body.appendChild(tooltip);
            tooltipRef.current = tooltip;

            // Keep tooltip visible when hovering over it
            tooltip.addEventListener('mouseenter', () => {
                tooltip.style.display = 'block';
            });

            tooltip.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
        }

        return () => {
            // Cleanup tooltip on unmount
            if (tooltipRef.current) {
                tooltipRef.current.remove();
                tooltipRef.current = null;
            }
        };
    }, []);

    return (
        <div id="graph-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
            <CytoscapeComponent
                elements={CytoscapeComponent.normalizeElements(elements)}
                style={{ width: "100%", height: "100%" }}
                maxZoom={2}
                minZoom={0.05}
                zoom={0.5}
                layout={layout}
                cy={(cy) => {
                    // Apply SBGN stylesheet first
                    const cyStylesheet = sbgnStylesheet(cytoscape);
                    cy.style(cyStylesheet);

                    // Then append custom styles
                    cy.style().append(customStyles);

                    cy.style().update();
                    window.cy = cy;

                    // Handle multiple glycan images by creating a custom overlay
                    cy.ready(() => {
                        cy.nodes('[class="glycan"]').forEach((node) => {
                            const glycanImages = node.data('glycanImages');
                            if (glycanImages && glycanImages.length > 1) {
                                // Store the images for custom rendering
                                node.data('multipleGlycans', true);

                                // Create a canvas-based composite image for multiple glycans
                                createCompositeGlycanImage(glycanImages).then((compositeUrl) => {
                                    node.style('background-image', compositeUrl);
                                });
                            }
                        });
                    });

                    // Tooltip handlers
                    cy.on('mouseover', 'node', (event) => {
                        const node = event.target;
                        const data = node.data();
                        // Skip process nodes and parent nodes
                        if (data.class === 'process' || data.class === 'complex' && !data.pType) {
                            return;
                        }

                        const tooltip = tooltipRef.current;
                        if (!tooltip) return;

                        const databaseId = data.databaseId;
                        const pType = data.pType;
                        const label = data.label;
                        const glycanIds = data.label;
                        console.log('Node data for tooltip:', data);

                        const databaseName = getDatabaseName(pType);

                        // Build tooltip content
                        let tooltipContent = `
              <div style="margin-bottom: 8px;">
                <strong style="font-size: 14px; color: #333;">${label || 'Unknown'}</strong>
              </div>
            `;

                        // Handle multiple glycans
                        if (pType === 'glycan' && glycanIds && Array.isArray(glycanIds) && glycanIds.length > 1) {
                            tooltipContent += `<div style="margin-bottom: 4px; color: #666; font-size: 12px;">Multiple Glycans:</div>`;

                            glycanIds.forEach((glycan, index) => {
                                if (glycan) {
                                    const glycanUrl = getExternalDatabaseUrl('glycan', glycan);
                                    tooltipContent += `
                    <div style="margin-bottom: 4px; padding-left: 8px;">
                      <div style="color: #666; font-size: 11px;">
                        ${databaseName} ${index + 1}: ${glycan}
                      </div>
                      ${glycanUrl ? `
                        <div style="font-size: 11px; color: #0066cc; cursor: pointer; text-decoration: underline;" 
                             data-url="${glycanUrl}" 
                             class="glycan-link-${index}"
                             onmouseover="this.style.color='#0052a3'"
                             onmouseout="this.style.color='#0066cc'">
                          → View in ${databaseName}
                        </div>
                      ` : ''}
                    </div>
                  `;
                                }
                            });

                            tooltipContent += `
                <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #eee; font-size: 10px; color: #999; font-style: italic;">
                  Click any link to view in database
                </div>
              `;
                        }
                        // Handle single database entry
                        else {
                            if (databaseId) {
                                tooltipContent += `
                  <div style="margin-bottom: 4px; color: #666; font-size: 12px;">
                    ${databaseName}: ${databaseId}
                  </div>
                `;
                            }

                            const externalUrl = getExternalDatabaseUrl(pType, databaseId);
                            if (externalUrl) {
                                tooltipContent += `
                  <div style="margin-top: 8px; font-size: 12px; color: #0066cc;">
                    Click to view in ${databaseName} →
                  </div>
                `;
                            }
                        }

                        tooltip.innerHTML = tooltipContent;
                        tooltip.style.display = 'block';

                        // Make tooltip interactive for multiple glycan links
                        if (pType === 'glycan' && glycanIds && glycanIds.length > 1) {
                            tooltip.style.pointerEvents = 'auto';

                            // Add click handlers for individual glycan links
                            glycanIds.forEach((glycanId, index) => {
                                const linkElements = tooltip.querySelectorAll(`.glycan-link-${index}`);
                                linkElements.forEach(linkEl => {
                                    linkEl.onclick = (e) => {
                                        e.stopPropagation();
                                        const url = linkEl.getAttribute('data-url');
                                        if (url) {
                                            window.open(url, '_blank');
                                        }
                                    };
                                });
                            });
                        } else {
                            tooltip.style.pointerEvents = 'none';
                        }

                        // Position tooltip near the node
                        const renderedPosition = node.renderedPosition();

                        tooltip.style.left = `${renderedPosition.x + 20}px`;
                        tooltip.style.top = `${renderedPosition.y - 10}px`;
                    });

                    cy.on('mouseout', 'node', (event) => {
                        const tooltip = tooltipRef.current;
                        if (tooltip) {
                            const data = event.target.data();
                            const glycanIds = data.glycanIds;

                            // For multiple glycans, add a small delay before hiding to allow moving to tooltip
                            if (data.pType === 'glycan' && glycanIds && Array.isArray(glycanIds) && glycanIds.length > 1) {
                                setTimeout(() => {
                                    // Only hide if not hovering over tooltip
                                    if (!tooltip.matches(':hover')) {
                                        tooltip.style.display = 'none';
                                    }
                                }, 100);
                            } else {
                                tooltip.style.display = 'none';
                            }
                        }
                    });

                    // Click handler to open external database links
                    cy.on('tap', 'node', (event) => {
                        const node = event.target;
                        const data = node.data();

                        // Skip process nodes
                        if (data.class === 'process') {
                            return;
                        }

                        // For multiple glycans, links are in the tooltip
                        const glycanIds = data.glycanIds;
                        if (data.pType === 'glycan' && glycanIds && Array.isArray(glycanIds) && glycanIds.length > 1) {
                            // Don't open a link - user should click individual links in tooltip
                            return;
                        }

                        // For single database entries, open the link
                        const databaseId = data.databaseId;
                        const pType = data.pType;
                        const externalUrl = getExternalDatabaseUrl(pType, databaseId);

                        if (externalUrl) {
                            window.open(externalUrl, '_blank');
                        }
                    });

                    // Add cursor pointer on hover for clickable nodes
                    cy.on('mouseover', 'node', (event) => {
                        const node = event.target;
                        const data = node.data();

                        // Show pointer for nodes with database IDs (including multiple glycans)
                        if (data.class !== 'process' && (data.databaseId || data.glycanIds)) {
                            event.cy.container().style.cursor = 'pointer';
                        }
                    });

                    cy.on('mouseout', 'node', (event) => {
                        event.cy.container().style.cursor = 'default';
                    });

                    if (!touch) {
                        cy.nodes().forEach((node) => node.lock());
                        cy.boxSelectionEnabled(false);
                        cy.userPanningEnabled(false);
                        cy.zoom(0.15);
                    }

                    cy.center();
                }}
            />
        </div>
    );
};

export default Graph;