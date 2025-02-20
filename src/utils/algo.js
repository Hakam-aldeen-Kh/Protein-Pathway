
export function convertToCytoscapeFormat(reactions) {
    const elements = [];
    console.log(reactions)

    reactions.forEach((reaction, reactionIndex) => {
        // Create reaction node
        elements.push({
            data: {
                id: `r${reactionIndex}`,
                class: "complex",
                label: `Reaction - ${reaction.id}`,
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

        // Process controllers
        reaction.controllers.forEach((controller) => {
            elements.push(createChemicalNode(`${controller.name}-process`, "", `r${reactionIndex}`, "process"));
            elements.push(createChemicalNode(controller.name, controller, `r${reactionIndex}`, "macromolecule"));
            elements.push(createEdge(`e${controller.name}-${controller.name}-process`, controller.name, `${controller.name}-process`, "catalysis"));

            // Add edge from controller to products
            reaction.reactants.forEach((reactant) => {
                elements.push(createEdge(`e-${reactant.name}-${controller.name}-process`, reactant.name, `${controller.name}-process`));
            });

            reaction.products.forEach((product) => {
                elements.push(createEdge(`e-${controller.name}-process-${product.name}`, `${controller.name}-process`, product.name));
            });
        });

        // Process reactants
        reaction.reactants.forEach((reactant) => {
            elements.push(createChemicalNode(reactant.name, reactant, `r${reactionIndex}`, "simple chemical"));

            // Add edge from reactant to controller
            // elements.push(createEdge(`e${elements.length}`, `n${index}`, `n${reaction.reactants.length}`));
        });



        // Process products
        reaction.products.forEach((product) => {
            elements.push(createChemicalNode(product.name, product, `r${reactionIndex}`, "simple chemical"));
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
            parent,
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