

export function reactionsDataToCytoscapeFormat(reactions) {
    let elements = [];
    const toDeletedFromElements = []
    // console.log(reactions)

    reactions.forEach((reaction, reactionIndex) => {
        const reactionController = reaction.controllers[0]

        // create node for each controller with edge form reactant to controller inside parent node

        //  // controller parent
        if (reactionController.cellularLocation && !isFindElement(elements, reactionController.cellularLocation)) {
            elements.push(createChemicalNode(reactionController.cellularLocation, reactionController.cellularLocation, "", "complex"));
        }

        // controller shape
        elements.push(createChemicalNode(`${reactionController.name}-process`, "", reactionController.cellularLocation, "process"));
        elements.push(createChemicalNode(reactionController.name, reactionController.name, reactionController.cellularLocation, "macromolecule"));
        elements.push(createEdge(`e-${reactionController.name}-${reactionController.name}-process`, reactionController.name, `${reactionController.name}-process`, "stimulation"));


        // create node for each reactant with edge form reactant to controller inside parent node
        reaction.reactants.forEach((reactant) => {
            // // parent node
            if (reactant.cellularLocation && !isFindElement(elements, reactant.cellularLocation)) {
                elements.push(createChemicalNode(reactant.cellularLocation, reactant.cellularLocation, "", "complex"));
            }
            // // reactant node
            elements.push(createChemicalNode(reactant.name, reactant.name, reactant.cellularLocation, "simple chemical"));

            // // edge to controller
            elements.push(createEdge(`e-${reactant.name}-${reactionController.name}-process`, reactant.name, `${reactionController.name}-process`));



        })

        // create node for each product with edge form product to controller inside parent node
        reaction.products.forEach((product) => {
            // // parent node
            if (product.cellularLocation && !isFindElement(elements, product.cellularLocation)) {
                elements.push(createChemicalNode(product.cellularLocation, product.cellularLocation, "", "complex"));
            }
            // // product node
            elements.push(createChemicalNode(product.name, product.name, product.cellularLocation, product.useNextReaction && product.type === "controllers" ? "macromolecule" : "simple chemical"));

            // // edge to controller
            elements.push(createEdge(`e-${product.name}-${reactionController.name}-process`, `${reactionController.name}-process`, product.name));


            // is this product useNextReaction and type is reactants:
            // edge form this product to controller in next reaction and 
            // delete reactant which is product in next reaction
            const targetReaction = reactions[reactionIndex + 1]

            if (product.useNextReaction && product.type === "reactants" && targetReaction) {



                elements.push(createEdge(`e-${product.name}-${targetReaction.controllers[0].name}-process}`, product.name, `${targetReaction.controllers[0].name}-process`));


                toDeletedFromElements.push(targetReaction.reactants[0].name)
                toDeletedFromElements.push(`e-${targetReaction.reactants[0].name}-${targetReaction.controllers[0].name}-process`)
            }

            // is this product useNextReaction and type is controllers:
            // edge form this product to controller in next reaction and 
            // delete reactant which is product in next reaction
            else if (product.useNextReaction && product.type === "controllers" && targetReaction) {

                elements.push(createEdge(`e-${product.name}-${targetReaction.controllers[0].name}-process`, product.name, `${targetReaction.controllers[0].name}-process`, "stimulation"));

                toDeletedFromElements.push(targetReaction.controllers[0].name)
                toDeletedFromElements.push(`e-${targetReaction.controllers[0].name}-${targetReaction.controllers[0].name}-process`)
            }

        })



    })

    toDeletedFromElements.forEach(deleteItem => {
        elements = elements.filter(item => item.data.id !== deleteItem)
    })

    // console.log(elements)
    return elements;

}

function createChemicalNode(id, name, parent, classType) {
    return {
        data: {
            id,
            class: classType,
            label: name || '',
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

function isFindElement(elements, id) {
    const isFind = elements.filter(item =>
        item.data.id === id
    )
    if (isFind.length === 0) return false
    else return true
}


