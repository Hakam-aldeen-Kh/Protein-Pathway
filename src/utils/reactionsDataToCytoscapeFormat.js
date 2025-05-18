

export function reactionsDataToCytoscapeFormat(reactions) {
    let elements = [];
    const toDeletedFromElements = []
    // console.log(reactions)

    reactions.forEach((reaction, reactionIndex) => {
        const reactionController = reaction.controllers[0]

        // create node for each controller with edge form reactant to controller inside parent node

        //  // controller parent
        if (reactionController?.cellularLocation?.cell_localization_name && !isFindElement(elements, reactionController?.cellularLocation?.cell_localization_name)) {
            elements.push(createChemicalNode(reactionController?.cellularLocation?.cell_localization_name, reactionController?.cellularLocation?.cell_localization_name, "", "complex"));
        }

        // controller shape
        elements.push(createChemicalNode(`process-${reactionIndex}`, "", reaction.reactants[0].cellularLocation?.cell_localization_name, "process"));

        if (reactionController) {
            elements.push(createChemicalNode(reactionController.name, reactionController.name, reactionController.cellularLocation?.cell_localization_name, "macromolecule"));
            elements.push(createEdge(`e-${reactionController.name}-process-${reactionIndex}`, reactionController.name, `process-${reactionIndex}`, "stimulation"));

            const targetReaction = reactions.find(item => item.id === reactionController.targetReactionId)

            if (reactionController.useNextReaction && targetReaction) {

                elements.push(createEdge(`e-${reactionController.name}-process-${reactionIndex + 1}}`, reactionController.name, `process-${reactionIndex + 1}`));


                toDeletedFromElements.push(targetReaction.reactants.find(item => item.id === reactionController.conectedReactantId).name)
                toDeletedFromElements.push(`e-${targetReaction.reactants.find(item => item.id === reactionController.conectedReactantId).name}-process-${reactionIndex + 1}`)
            }
        }


        // create node for each reactant with edge form reactant to controller inside parent node
        reaction.reactants.forEach((reactant) => {
            // // parent node
            if (reactant.cellularLocation?.cell_localization_name && !isFindElement(elements, reactant.cellularLocation?.cell_localization_name)) {
                elements.push(createChemicalNode(reactant.cellularLocation?.cell_localization_name, reactant.cellularLocation?.cell_localization_name, "", "complex"));
            }
            // // reactant node
            elements.push(createChemicalNode(reactant.name, reactant.name, reactant.cellularLocation?.cell_localization_name, "simple chemical"));

            // // edge to controller
            elements.push(createEdge(`e-${reactant.name}-process-${reactionIndex}`, reactant.name, `process-${reactionIndex}`));



        })

        // create node for each product with edge form product to controller inside parent node
        reaction.products.forEach((product) => {
            // // parent node
            if (product.cellularLocation?.cell_localization_name && !isFindElement(elements, product.cellularLocation?.cell_localization_name)) {
                elements.push(createChemicalNode(product.cellularLocation?.cell_localization_name, product.cellularLocation?.cell_localization_name, "", "complex"));
            }
            // // product node
            elements.push(createChemicalNode(product.name, product.name, product.cellularLocation?.cell_localization_name, product.useNextReaction && product.type === "controllers" ? "macromolecule" : "simple chemical"));

            // // edge to controller
            elements.push(createEdge(`e-${product.name}-process-${reactionIndex}`, `process-${reactionIndex}`, product.name));


            // is this product useNextReaction and type is reactants:
            // edge form this product to controller in next reaction and 
            // delete reactant which is product in next reaction
            const targetReaction = reactions.find(item => item.id === product.targetReactionId)
            // const targetReaction = reactions[reactionIndex + 1]


            if (product.useNextReaction && product.type === "reactants" && targetReaction) {
                elements.push(createEdge(`e-${product.name}-process-${reactionIndex + 1}}`, product.name, `process-${reactionIndex + 1}`));

                toDeletedFromElements.push(targetReaction.reactants.find(item => item.id === product.conectedReactantId).name)
                toDeletedFromElements.push(`e-${targetReaction.reactants.find(item => item.id === product.conectedReactantId).name}-process-${reactionIndex + 1}`)
            }

            // is this product useNextReaction and type is controllers:
            // edge form this product to controller in next reaction and 
            // delete reactant which is product in next reaction
            else if (product.useNextReaction && product.type === "controllers" && targetReaction) {

                elements.push(createEdge(`e-${product.name}-process-${reactionIndex + 1}`, product.name, `process-${reactionIndex + 1}`, "stimulation"));

                toDeletedFromElements.push(targetReaction.controllers[0].name)
                toDeletedFromElements.push(`e-${targetReaction.controllers[0].name}-process-${reactionIndex + 1}`)
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
            parent: parent,
            stateVariables: [],
            unitsOfInformation: [],
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


