
export function reactionsDataToCytoscapeFormat(reactions) {
    console.log(reactions)
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


        // Process regulators
        reaction.regulators.forEach((regulator) => {
            elements.push(createChemicalNode(`${regulator.name}-process`, "", regulator.cellularLocation.cell_localization_name, "process"));
            elements.push(createChemicalNode(regulator.name, regulator, regulator.cellularLocation.cell_localization_name, "macromolecule"));

            elements.push(createEdge(`e${regulator.name}-${regulator.name}-process`, regulator.name, `${regulator.name}-process`, "stimulation"));

            // Add edge from  reactant to regulator
            reaction.reactants.forEach((reactant) => {
                elements.push(createEdge(`e-${reactant.name}-${regulator.name}-process`, reactant.name, `${regulator.name}-process`));
            });

            // Add edge from regulator to products
            reaction.products.forEach((product) => {
                elements.push(createEdge(`e-${regulator.name}-process-${product.name}`, `${regulator.name}-process`, product.name));
            });
        });

        // Process reactants
        reaction.reactants.forEach((reactant) => {
            elements.push(createChemicalNode(reactant.name, reactant, reactant.cellularLocation.cell_localization_name, "simple chemical"));
        });

        // Process products
        reaction.products.forEach((product) => {
            elements.push(createChemicalNode(product.name, product, product.cellularLocation.cell_localization_name, "simple chemical"));
            if (product.useNextReaction) {
                if (product.type !== "regulators") {
                    elements.push(createEdge(`e-${product.name}-${product.regulator}-process`, product.name, `${product.regulator}-process`));
                }
                else {
                    elements.push(createChemicalNode(`${product.regulator}-process`, "", product.cellularLocation.cell_localization_name, "process"));
                    elements.push(createEdge(`e-${product.name}-${product.regulator}-process`, product.name, `${product.regulator}-process`, "stimulation"));

                    // Add edge from  reactant to regulator
                    filterReaction[rIndex + 1].reactants.forEach((reactant) => {
                        elements.push(createEdge(`e-${reactant.name}-${product.regulator}-process`, reactant.name, `${product.regulator}-process`));
                    });

                    // Add edge from regulator to products
                    filterReaction[rIndex + 1].products.forEach((producti) => {
                        elements.push(createEdge(`e-${product.regulator}-process-${producti.name}`, `${product.regulator}-process`, producti.name));
                    });
                }
            }

        });
    });

    console.log(elements)

    return elements;
}

function createChemicalNode(id, chemical, parent, classType) {
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

function createEdge(id, source, target, type) {
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
        ...reaction.reactants.map(item => item.cellularLocation.cell_localization_name),
        ...reaction.regulators.map(item => item.cellularLocation.cell_localization_name),
        ...reaction.products.map(item => item.cellularLocation.cell_localization_name)
    ];

    return [...new Set(result)];
}

function filterIsProductModern(arrays) {
    return arrays.map(item => ({
        ...item,
        reactants: item.reactants.filter(r => !r.isProduct),
        regulators: item.regulators.filter(c => !c.isProduct),
        products: item.products.filter(p => !p.isProduct)
    }));
}