// ============================================
// 1. reactionsDataToCytoscapeFormat.js
// ============================================

import {
  reactantNodeName,
  reactantNodeId,
  regulatorNodeName,
  regulatorNodeId,
  productNodeName,
  productNodeId,
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
          "complex",
          null,
          null,
          null
        )
      );
    }

    // regulator shape (process node)
    elements.push(
      createChemicalNode(
        `process-${reaction.id}`,
        "",
        reaction.products[0]?.cellularLocation?.cell_localization_name,
        "process",
        null,
        null,
        null
      )
    );

    if (reactionRegulator) {
      const regulatorId = regulatorNodeId(reactionRegulator);
      elements.push(
        createChemicalNode(
          reactionRegulator.name,
          regulatorNodeName(reactionRegulator),
          reactionRegulator.cellularLocation?.cell_localization_name,
          findClass(reactionRegulator?.pType || "protein"),
          null,
          regulatorId,
          reactionRegulator?.pType || "protein"
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
      // parent node
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
            "complex",
            null,
            null,
            null
          )
        );
      }

      // Get glycan images if it's a glycan type
      let glycanImages = null;
      if (reactant.pType === "glycan") {
        // For multiple glycans, collect all images
        if (Array.isArray(reactant.glycans) && reactant.glycans.length > 0) {
          glycanImages = reactant.glycans
            .map((glycan) => glycan.glycanImage)
            .filter(Boolean);
        } else if (reactant.glycanImage) {
          glycanImages = [reactant.glycanImage];
        }
      }

      const reactantId = reactantNodeId(reactant);

      // reactant node
      elements.push(
        createChemicalNode(
          reactant.name,
          reactantNodeName(reactant),
          reactant.cellularLocation?.cell_localization_name,
          findClass(reactant?.pType),
          glycanImages,
          reactantId,
          reactant?.pType
        )
      );

      // edge to process
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
      // parent node
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
            "complex",
            null,
            null,
            null
          )
        );
      }

      // Get glycan images if it's a glycan type
      let glycanImages = null;
      if (product.pType === "glycan") {
        // For multiple glycans, collect all images
        if (Array.isArray(product.glycans) && product.glycans.length > 0) {
          glycanImages = product.glycans
            .map((glycan) => glycan.glycanImage)
            .filter(Boolean);
        } else if (product.glycanImage) {
          glycanImages = [product.glycanImage];
        }
      }

      const productId = productNodeId(product);

      // product node
      elements.push(
        createChemicalNode(
          product.name,
          productNodeName(product),
          product.cellularLocation?.cell_localization_name,
          product.useNextReaction && product.type === "regulators"
            ? findClass(product?.pType || "protein")
            : findClass(product?.pType),
          glycanImages,
          productId,
          product?.pType
        )
      );

      // edge to process
      elements.push(
        createEdge(
          `e-${product.name}-process-${reaction.id}`,
          `process-${reaction.id}`,
          product.name
        )
      );

      // is this product useNextReaction and type is reactants
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
          `e-${targetReaction2.reactants.find(
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
      // is this product useNextReaction and type is regulators
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

function createChemicalNode(id, name, parent, classType, glycanImages = null, databaseId = null, pType = null) {
  const nodeData = {
    data: {
      id,
      class: classType,
      label: name || "",
      parent: parent,
      stateVariables: [],
      unitsOfInformation: [],
      databaseId: databaseId || "",
      pType: pType || "",
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

  // Add glycan images if provided (can be single or multiple)
  if (glycanImages && Array.isArray(glycanImages) && glycanImages.length > 0) {
    nodeData.data.glycanImages = glycanImages;
    nodeData.data.glycanCount = glycanImages.length;
    // Use first image as primary background for single image display
    nodeData.data.backgroundImage = glycanImages[0];
  }

  return nodeData;
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
  // SBGN Process Diagram entity types
  if (type === "complex") {
    return "complex";
  } else if (type === "protein") {
    return "macromolecule"; // SBGN: rounded rectangle
  } else if (type === "enzyme") {
    return "macromolecule"; // Enzymes are proteins, so macromolecule
  } else if (type === "rna") {
    return "nucleic acid feature"; // SBGN: bottom-rounded rectangle
  } else if (type === "dna") {
    return "nucleic acid feature"; // SBGN: bottom-rounded rectangle
  } else if (type === "glycan") {
    return "glycan"; // Custom class for glycan with image
  } else if (type === "lipid") {
    return "simple chemical"; // SBGN: circle
  } else if (type === "small_molecule") {
    return "simple chemical"; // SBGN: circle
  } else {
    return "simple chemical"; // Default to simple chemical
  }
}
