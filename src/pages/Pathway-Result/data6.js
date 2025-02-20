export const elements = [
    // reactions
    {
        data: {
            id: "r1",
            class: "complex",
            label: "Reaction - 0",
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
    },


    // reactant
    {
        data: {
            id: "n1",
            class: "simple chemical",
            label: "reactant_0.0",
            parent: "r1",
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
    },

    {
        data: {
            id: "n2",
            class: "simple chemical",
            label: "reactant_0.1",
            parent: "r1",
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
    },

    // edges
    {
        data: {
            id: "e1",
            class: "production",
            cardinality: 0,
            source: "n1",
            target: "n3",
            bendPointPositions: [],
            portSource: "n1",
            portTarget: "n3"
        },
        group: "edges",
        removed: false,
        selected: false,
        selectable: true,
        locked: false,
        grabbable: true,
        pannable: true,
        classes: ""
    },
    {
        data: {
            id: "e2",
            class: "production",
            cardinality: 0,
            source: "n2",
            target: "n3",
            bendPointPositions: [],
            portSource: "n2",
            portTarget: "n3"
        },
        group: "edges",
        removed: false,
        selected: false,
        selectable: true,
        locked: false,
        grabbable: true,
        pannable: true,
        classes: ""
    },

    // controller
    {
        data: {
            id: "n3",
            class: "process",
            parent: "r1",
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
    },
    {
        data: {
            id: "n4",
            class: "macromolecule",
            label: "controller_0.0",
            parent: "r1",
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
    },

    {
        data: {
            id: "e3",
            class: "production",
            cardinality: 0,
            source: "n4",
            target: "n3",
            bendPointPositions: [],
            portSource: "n4",
            portTarget: "n3"
        },
        group: "edges",
        removed: false,
        selected: false,
        selectable: true,
        locked: false,
        grabbable: true,
        pannable: true,
        classes: ""
    },

    // edges
    {
        data: {
            id: "e4",
            class: "production",
            cardinality: 0,
            source: "n3",
            target: "n6",
            bendPointPositions: [],
            portSource: "n3",
            portTarget: "n6"
        },
        group: "edges",
        removed: false,
        selected: false,
        selectable: true,
        locked: false,
        grabbable: true,
        pannable: true,
        classes: ""
    },

    {
        data: {
            id: "e5",
            class: "production",
            cardinality: 0,
            source: "n3",
            target: "n5",
            bendPointPositions: [],
            portSource: "n3",
            portTarget: "n5"
        },
        group: "edges",
        removed: false,
        selected: false,
        selectable: true,
        locked: false,
        grabbable: true,
        pannable: true,
        classes: ""
    },


    // products
    {
        data: {
            id: "n5",
            class: "simple chemical",
            label: "product_0.0",
            parent: "r1",
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
    },
    {
        data: {
            id: "n6",
            class: "simple chemical",
            label: "product_0.1",
            parent: "r1",
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
    },


]

// [
//     {
//         id: 0,
//         reactants: [{ id: 0, name: "reactant_0.0" }, { id: 1, name: "reactant_0.1" }],
//         controllers: [{ id: 0, name: "controller_0.0" }],
//         products: [{ id: 0, name: "product_0.0" }, { id: 1, name: "product_0.1" }]
//     }
// ]