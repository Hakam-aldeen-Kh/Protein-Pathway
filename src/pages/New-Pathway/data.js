export const data = {
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

                        //if reactantType is complex
                        complexSymbolicName: "",
                        complexSymbolGo: "",
                        complexName: "",
                        complexSymbolNotInGo: "",

                        //if reactantType is protein
                        proteinSymbolicName: "",
                        proteinSymbol: "",
                        modifyingSite: "",
                        modifyingType: "",

                        //if reactantType is glycan
                        glycanTextType: "",
                        glycanText: "",
                        bindingSiteCode: "",
                        aminoAcidBindingSite: "",

                        //if reactantType is small_molecule
                        smallMolecule: "",
                        lipid: "",

                        //if reactantType is dna
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
                        useNextReaction: true,
                        type: "",
                        targetedReaction: ""
                    }
                ]
        }
    ]
}