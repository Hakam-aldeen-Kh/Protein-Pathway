export const elements = [

    // reactions
    {
        data: {
            id: "r1",
            class: "complex",
            label: "Reaction - 1",
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
            label: "n1",
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
            label: "n2",
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
            id: "n3",
            class: "simple chemical",
            label: "n3",
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




]