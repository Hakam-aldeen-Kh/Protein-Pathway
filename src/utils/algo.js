
export function convertToCytoscapeFormat(reactions) {
    const elements = [];
    const filterReaction = filterIsProductModern(reactions)

    filterReaction.forEach((reaction, rIndex) => {
        // Create reaction node
        // find parent
        const parents = getParent(reaction).filter(item => item !== "" && item !== undefined)

        parents.forEach((parent) => {
            const isFindParent = elements.find(item => item.data.id === parent)

            if (!isFindParent) {
                elements.push({
                    data: {
                        id: parent,
                        class: "complex",
                        label: parent,
                        stateVariables: [],
                        unitsOfInformation: []
                    },
                    group: "nodes",
                    removed: false,
                    selected: false,
                    selectable: true,
                    locked: false,
                    grabbable: true,
                    pannable: false,
                    classes: ""
                });
            }
        })


        // Process controllers
        reaction.controllers.forEach((controller) => {
            elements.push(createChemicalNode(`${controller.name}-process`, "", controller.cellularLocation, "process"));
            elements.push(createChemicalNode(controller.name, controller, controller.cellularLocation, "macromolecule"));

            elements.push(createEdge(`e${controller.name}-${controller.name}-process`, controller.name, `${controller.name}-process`, "stimulation"));

            // Add edge from  reactant to controller
            reaction.reactants.forEach((reactant) => {
                elements.push(createEdge(`e-${reactant.name}-${controller.name}-process`, reactant.name, `${controller.name}-process`));
            });

            // Add edge from controller to products
            reaction.products.forEach((product) => {
                elements.push(createEdge(`e-${controller.name}-process-${product.name}`, `${controller.name}-process`, product.name));
            });
        });

        // Process reactants
        reaction.reactants.forEach((reactant) => {
            elements.push(createChemicalNode(reactant.name, reactant, reactant.cellularLocation, "simple chemical"));
        });

        // Process products
        reaction.products.forEach((product) => {
            elements.push(createChemicalNode(product.name, product, product.cellularLocation, "simple chemical"));
            if (product.useNextReaction) {
                if (product.type !== "controllers") {
                    elements.push(createEdge(`e-${product.name}-${product.controller}-process`, product.name, `${product.controller}-process`));
                }
                else {
                    elements.push(createChemicalNode(`${product.controller}-process`, "", product.cellularLocation, "process"));
                    elements.push(createEdge(`e-${product.name}-${product.controller}-process`, product.name, `${product.controller}-process`, "stimulation"));

                    // Add edge from  reactant to controller
                    filterReaction[rIndex + 1].reactants.forEach((reactant) => {
                        elements.push(createEdge(`e-${reactant.name}-${product.controller}-process`, reactant.name, `${product.controller}-process`));
                    });

                    // Add edge from controller to products
                    filterReaction[rIndex + 1].products.forEach((producti) => {
                        elements.push(createEdge(`e-${product.controller}-process-${producti.name}`, `${product.controller}-process`, producti.name));
                    });
                }
            }

        });
    });

    return elements;
}

export function createChemicalNode(id, chemical, parent, classType) {
    return {
        data: {
            id,
            class: classType,
            label: chemical.name || '',
            parent: parent || "cytocol",
            stateVariables: [],
            unitsOfInformation: []
        },
        group: "nodes",
        removed: false,
        selected: false,
        selectable: true,
        locked: false,
        grabbable: true,
        pannable: false,
        classes: ""
    };
}

export function createEdge(id, source, target, type) {
    return {
        data: {
            id,
            class: type || "production",
            cardinality: 0,
            source,
            target,
            bendPointPositions: [],
            portSource: source,
            portTarget: target
        },
        group: "edges",
        removed: false,
        selected: false,
        selectable: true,
        locked: false,
        grabbable: true,
        pannable: true,
        classes: ""
    };
}

function getParent(reaction) {
    const result = [
        ...reaction.reactants.map(item => item.cellularLocation),
        ...reaction.controllers.map(item => item.cellularLocation),
        ...reaction.products.map(item => item.cellularLocation)
    ];

    return [...new Set(result)];
}

function filterIsProductModern(arrays) {
    return arrays.map(item => ({
        ...item,
        reactants: item.reactants.filter(r => !r.isProduct),
        controllers: item.controllers.filter(c => !c.isProduct),
        products: item.products.filter(p => !p.isProduct)
    }));
}