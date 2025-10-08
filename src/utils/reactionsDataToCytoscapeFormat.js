import {
  reactantNodeName,
  regulatorNodeName,
  productNodeName,
} from "./nameNode";

export function reactionsDataToCytoscapeFormat(reactions) {
  let elements = [];
  const toDeletedFromElements = [];

  reactions.forEach((reaction) => {
    const reactionRegulator = (reaction.regulators ?? [])[0];

    // create node for each regulator with edge form reactant to regulator inside parent node
    if (
      reactionRegulator?.cellularLocation?.cell_localization_name &&
      !isFindElement(
        elements,
        reactionRegulator?.cellularLocation?.cell_localization_name
      )
    ) {
      elements.push(
        createChemicalNode(
          reactionRegulator?.cellularLocation?.cell_localization_name,
          reactionRegulator?.cellularLocation?.cell_localization_name,
          "",
          "complex"
        )
      );
    }

    // regulator shape
    elements.push(
      createChemicalNode(
        `process-${reaction.id}`,
        "",
        reaction.products[0]?.cellularLocation?.cell_localization_name,
        "process"
      )
    );

    if (reactionRegulator) {
      elements.push(
        createChemicalNode(
          reactionRegulator.name,
          regulatorNodeName(reactionRegulator),
          reactionRegulator.cellularLocation?.cell_localization_name,
          findClass(reactionRegulator?.pType || "protein")
        )
      );
      elements.push(
        createEdge(
          `e-${reactionRegulator.name}-process-${reaction.id}`,
          reactionRegulator.name,
          `process-${reaction.id}`,
          "stimulation"
        )
      );

      const targetReaction1 = reactions.find(
        (item) => item.id === reactionRegulator.targetReactionId
      );
      const targetReaction2 = reactions.find(
        (item) => item.id === reaction.id + 1
      );

      if (
        reactionRegulator.useNextReaction &&
        targetReaction1 &&
        targetReaction2
      ) {
        elements.push(
          createEdge(
            `e-${reactionRegulator.name}-process-${reaction.id + 1}}`,
            reactionRegulator.name,
            `process-${reaction.id + 1}`
          )
        );

        const targetReactant = targetReaction2.reactants?.find(
          (item) => item.id === reactionRegulator.conectedReactantId
        );
        if (targetReactant) {
          toDeletedFromElements.push(
            `e-${targetReactant.name}-process-${reaction.id + 1}`
          );
          toDeletedFromElements.push(targetReactant.name);
        }
      }
    }

    // create node for each reactant with edge form reactant to regulator inside parent node
    reaction.reactants?.forEach((reactant) => {
      // // parent node
      if (
        reactant.cellularLocation?.cell_localization_name &&
        !isFindElement(
          elements,
          reactant.cellularLocation?.cell_localization_name
        )
      ) {
        elements.push(
          createChemicalNode(
            reactant.cellularLocation?.cell_localization_name,
            reactant.cellularLocation?.cell_localization_name,
            "",
            "complex"
          )
        );
      }
      // // reactant node
      elements.push(
        createChemicalNode(
          reactant.name,
          reactantNodeName(reactant),
          reactant.cellularLocation?.cell_localization_name,
          findClass(reactant?.pType)
        )
      );

      // // edge to regulator
      elements.push(
        createEdge(
          `e-${reactant.name}-process-${reaction.id}`,
          reactant.name,
          `process-${reaction.id}`
        )
      );
    });

    // create node for each product with edge form product to regulator inside parent node
    reaction.products.forEach((product) => {
      // // parent node
      if (
        product.cellularLocation?.cell_localization_name &&
        !isFindElement(
          elements,
          product.cellularLocation?.cell_localization_name
        )
      ) {
        elements.push(
          createChemicalNode(
            product.cellularLocation?.cell_localization_name,
            product.cellularLocation?.cell_localization_name,
            "",
            "complex"
          )
        );
      }
      // // product node
      elements.push(
        createChemicalNode(
          product.name,
          productNodeName(product),
          product.cellularLocation?.cell_localization_name,
          product.useNextReaction && product.type === "regulators"
            ? findClass(product?.pType || "protein")
            : findClass(product?.pType)
        )
      );

      // // edge to regulator
      elements.push(
        createEdge(
          `e-${product.name}-process-${reaction.id}`,
          `process-${reaction.id}`,
          product.name
        )
      );

      // is this product useNextReaction and type is reactants:
      // edge form this product to regulator in next reaction and
      // delete reactant which is product in next reaction
      const targetReaction1 = reactions.find(
        (item) => item.id === product.targetReactionId
      );
      const targetReaction2 = reactions.find(
        (item) => item.id === reaction.id + 1
      );

      if (
        product.useNextReaction &&
        product.type === "reactants" &&
        targetReaction1 &&
        targetReaction2
      ) {
        elements.push(
          createEdge(
            `e-${product.name}-process-${reaction.id + 1}}`,
            product.name,
            `process-${reaction.id + 1}`
          )
        );

        toDeletedFromElements.push(
          `e-${
            targetReaction2.reactants.find(
              (item) => item.id === product.conectedReactantId
            ).name
          }-process-${reaction.id + 1}`
        );
        toDeletedFromElements.push(
          targetReaction2.reactants.find(
            (item) => item.id === product.conectedReactantId
          ).name
        );
      }

      // is this product useNextReaction and type is regulators:
      // edge form this product to regulator in next reaction and
      // delete reactant which is product in next reaction
      else if (
        product.useNextReaction &&
        product.type === "regulators" &&
        targetReaction1
      ) {
        elements.push(
          createEdge(
            `e-${product.name}-process-${reaction.id + 1}`,
            product.name,
            `process-${reaction.id + 1}`,
            "stimulation"
          )
        );

        toDeletedFromElements.push(targetReaction1.regulators[0].name);
        toDeletedFromElements.push(
          `e-${targetReaction1.regulators[0].name}-process-${reaction.id + 1}`
        );
      }
    });
  });

  toDeletedFromElements.forEach((deleteItem) => {
    elements = elements.filter((item) => item.data.id !== deleteItem);
  });

  return elements;
}

function createChemicalNode(id, name, parent, classType) {
  return {
    data: {
      id,
      class: classType,
      label: name || "",
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
    classes: "",
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
      portTarget: target,
    },
    group: "edges",
    removed: false,
    selected: false,
    selectable: true,
    locked: false,
    grabbable: true,
    pannable: true,
    classes: "",
  };
}

function isFindElement(elements, id) {
  const isFind = elements.filter((item) => item.data.id === id);
  if (isFind.length === 0) return false;
  else return true;
}

function findClass(type) {
  if (type === "complex") {
    return "complex";
  } else if (type === "protein") {
    return "macromolecule";
  } else if (type === "enzyme") {
    return "enzyme";
  } else {
    return "simple chemical";
  }
}
