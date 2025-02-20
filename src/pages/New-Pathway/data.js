const data = {
    title: "",
    description: "",
    species: "",
    category: "",
    tissue: "",
    relatedDisease: "",
    diseaseInput: "",
    recordDate: "",
    reactions: [
        {
            id: 0,
            reactants:
                [
                    {
                        id: 0,
                        cellType: "",
                        cellularLocation: "",
                        reactantType: "",

                        // complex
                        complexSymbolicName: "",
                        complexSymbolGo: "",
                        complexName: "",
                        complexSymbolNotInGo: "",

                        // protein
                        proteinSymbolicName: "",
                        proteinSymbol: "",
                        modifyingSite: "",
                        modifyingType: "",

                        // glycan
                        glycanTextType: "",
                        glycanText: "",
                        bindingSiteCode: "",
                        aminoAcidBindingSite: "",

                        // small molecule
                        smallMolecule: "",
                        lipid: "",

                        // DNA
                        geneName: "",
                        chromosomNumber: "",
                        pORq: "",
                        specificBandLocation: "",
                    }
                ],
            controller:
                [
                    {
                        id: 0,
                        cellType: "",
                        cellularLocation: "",
                        controllerType: "",
                        actionType: "",
                        goOntology: "",
                        goOntologyValue: "",
                        notGoOntology: "",
                        useNextReaction: false
                    }
                ],
            products:
                [
                    {
                        id: 0,
                        cellType: "",
                        cellularLocation: "",
                        productType: "",
                        bindingSiteCode: "",
                        proteinSymbol: "",
                        startingSite: "",
                        endingSite: "",
                        useNextReaction: false,
                        type: "",
                        targetedReaction: ""
                    }
                ]
        }
    ]
}