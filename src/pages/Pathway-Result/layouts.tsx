export const layouts: Record<string, any> = {
    random: {
        name: "random",
        animate: true
    },
    grid: {
        name: "grid",
        animate: true
    },
    circle: {
        name: "circle",
        animate: true
    },
    breadthfirst: {
        name: "breadthfirst",
        animate: true
    },
    klay: {
        name: "klay",
        animate: true,
        padding: 4,
        nodeDimensionsIncludeLabels: true,
        klay: {
            spacing: 40,
            mergeEdges: false
        }
    },
    fcose: {
        name: "fcose",
        animate: true
    },
    cose: {
        name: "cose",
        animate: false
    },

    cola: {
        name: "cola",
        animate: true,
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
