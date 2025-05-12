export const layouts = {
    random: {
        name: "random",
        ppadding: 50,
        animate: true
    },
    grid: {
        name: "grid",
        ppadding: 50,
        animate: true
    },
    circle: {
        name: "circle",
        ppadding: 50,
        animate: true
    },
    breadthfirst: {
        name: "breadthfirst",
        ppadding: 50,
        animate: true
    },
    klay: {
        name: "klay",
        animate: true,
        padding: 10,
        nodeDimensionsIncludeLabels: false,
        nodeSeparation: 200,
        fit: true,
        klay: {
            spacing: 100,
            mergeEdges: false
        }
    },
    fcose: {
        name: "fcose",
        animate: false,
        padding: 200,
        nodeSeparation: 200,
        nodeDimensionsIncludeLabels: true,
        fcose: {
            spacing: 100,
            mergeEdges: false
        }
    },
    cose: {
        name: "cose",
        animate: false,
        padding: 200,
        fit: true,
        cose: {
            spacing: 100,
            mergeEdges: false
        }
    },

    cola: {
        name: "cola",
        // animate: true,
    },
    dagre: {
        name: "dagre",
        animate: true
    }
};

["box", "disco", "force", "layered", "mrtree", "random", "stress"].forEach(
    (elkAlgo) => {
        layouts[`elk_${elkAlgo}`] = {
            name: "elk",
            animate: true,
            elk: {
                algorithm: elkAlgo
            }
        };
    }
);
