export const elements = {

    nodes: [
        // reactions
        {
            data: {
                id: "r1",
                class: "complex",
                label: "Reaction - 01",
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
                id: "r2",
                class: "complex",
                label: "Reaction - 02",
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
                label: "reactant - 1",
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
                label: "reactant - 2",
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
                label: "reactant - 3",
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
                class: "simple chemical",
                label: "reactant - 4",
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
        // -----
        {
            data: {
                id: "n5",
                class: "simple chemical",
                label: "reactant - 5",
                parent: "r2",
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
                label: "reactant - 6",
                parent: "r2",
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
                id: "n7",
                class: "simple chemical",
                label: "reactant - 7",
                parent: "r2",
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
                id: "n8",
                class: "simple chemical",
                label: "reactant - 8",
                parent: "r2",
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
                id: "n9",
                class: "process",
                label: "controller",
                parent: "r2",
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
    ],

    edges: [
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
        {
            data: {
                id: "e3",
                class: "production",
                cardinality: 0,
                source: "n3",
                target: "n4",
                bendPointPositions: [],
                portSource: "n3",
                portTarget: "n4"
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
                id: "e4",
                class: "production",
                cardinality: 0,
                source: "n5",
                target: "n9",
                bendPointPositions: [],
                portSource: "n5",
                portTarget: "n9"
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
                source: "n6",
                target: "n9",
                bendPointPositions: [],
                portSource: "n6",
                portTarget: "n9"
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
                id: "e6",
                class: "production",
                cardinality: 0,
                source: "n4",
                target: "n6",
                bendPointPositions: [],
                portSource: "n4",
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
                id: "e7",
                class: "production",
                cardinality: 0,
                source: "n9",
                target: "n8",
                bendPointPositions: [],
                portSource: "n9",
                portTarget: "n8"
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
                id: "e8",
                class: "production",
                cardinality: 0,
                label: "controller",
                source: "n9",
                target: "n7",
                bendPointPositions: [],
                portSource: "n9",
                portTarget: "n7"
            },
            group: "edges",
            removed: false,
            selected: false,
            selectable: true,
            locked: false,
            grabbable: true,
            pannable: true,
            classes: ""
        }

    ]
}