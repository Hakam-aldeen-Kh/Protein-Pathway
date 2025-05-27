export const reactantNodeName = (reactant) => {
    const type = reactant.pType

    if (type === "complex") {
        return reactant?.complexSymbolGo || reactant.complexSymbolicName?.go_complex_name || reactant.name
    }

    if (type === "protein") {
        return reactant?.proteinSymbol || reactant?.proteinSymbolicName || reactant.name
    }

    if (type === "glycan") {
        return reactant?.glycanText || reactant.name
    }

    if (type === "small_molecule") {
        return reactant.smallMolecule?.Molecule_name || reactant.name
    }

    if (type === "dna") {
        return reactant.geneName || reactant.name
    }

    if (type === "lipid") {
        return reactant.lipid?.backbone_name || reactant.name
    }

    return reactant.name

}

export const controllerNodeName = (controller) => {
    const type = controller.pType

    if (type === "protein") {
        return controller.proteinSymbol || controller.proteinSymbolicName || controller.name
    }

    if (type === "enzyme") {
        return controller.controller_ec_enzyme?.enzyme_name?.value || controller.name
    }

    return controller.name

}

export const productNodeName = (product) => {
    const type = product.pType

    if (type === "complex") {
        return product.complexSymbolGo || product.complexSymbolicName?.go_complex_name || product.name
    }

    if (type === "protein") {
        return product.proteinSymbol || product.proteinSymbolicName || product.name
    }
    return product.name

}




export const reactantNodeId = (reactant) => {
    const type = reactant?.pType

    if (type === "complex") {
        return reactant.complexSymbolicName?.go_complex_id || ""
    }

    if (type === "protein") {
        return reactant?.reactant_protein_uniprot_id || ""
    }

    if (type === "glycan") {
        return reactant?.glycanText || ""
    }

    if (type === "small_molecule") {
        return reactant?.smallMolecule?.Molecule_id || ""
    }

    if (type === "dna") {
        return reactant?.geneName
    }

    if (type === "lipid") {
        return reactant?.lipid?.backbone_id || ""
    }

    return ""

}

export const controllerNodeId = (controller) => {
    const type = controller?.pType

    if (type === "protein") {
        return controller?.proteinSymbol || controller.proteinSymbolicName || ""
    }

    if (type === "enzyme") {
        return controller?.controller_ec_enzyme?.enzyme_name?.value || ""
    }

    return ""

}

export const productNodeId = (product) => {
    const type = product?.pType
    if (type === "complex") {
        return product?.complexSymbolicName?.go_complex_id || ""
    }

    if (type === "protein") {
        return product?.reactant_protein_uniprot_id || ""
    }
    return ""

}