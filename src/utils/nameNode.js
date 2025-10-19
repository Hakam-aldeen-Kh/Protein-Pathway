export const reactantNodeName = (reactant) => {
  const type = reactant.pType;

  if (type === "complex") {
    return (
      reactant?.complexSymbolGo ||
      reactant.complexSymbolicName?.go_complex_name ||
      reactant.name
    );
  }

  if (type === "protein") {
    return (
      reactant?.proteinSymbol || reactant?.proteinSymbolicName || reactant.name
    );
  }

  if (type === "glycan") {
    // Handle multiple glycans
    return reactant.glycans.map((glycan) => glycan.glycanText || "");

    // return reactant?.glycanText || reactant.name;
  }

  if (type === "small_molecule") {
    return reactant.smallMolecule?.Molecule_name || reactant.name;
  }

  if (type === "dna") {
    return reactant.geneName || reactant.name;
  }

  if (type === "lipid") {
    return reactant.lipid?.backbone_name || reactant.name;
  }

  if (type === "rna") {
    return reactant?.rnaName || reactant?.rnaGeneSymbol || reactant.name;
  }

  return reactant.name;
};

export const regulatorNodeName = (regulator) => {
  const type = regulator.pType;

  if (type === "protein") {
    return (
      regulator.proteinSymbol || regulator.proteinSymbolicName || regulator.name
    );
  }

  if (type === "enzyme") {
    return regulator.regulator_ec_enzyme?.enzyme_name?.value || regulator.name;
  }

  return regulator.name;
};

export const productNodeName = (product) => {
  const type = product.pType;

  if (type === "complex") {
    return (
      product.complexSymbolGo ||
      product.complexSymbolicName?.go_complex_name ||
      product.name
    );
  }

  if (type === "protein") {
    return product.proteinSymbol || product.proteinSymbolicName || product.name;
  }

  if (type === "glycan") {
    // Handle multiple glycans
    if (Array.isArray(product.glycans) && product.glycans.length > 0) {
      return product.glycans.map((glycan) => glycan.glycanText || "");
    }
    return product?.glycanText || product.name;
  }

  if (type === "small_molecule") {
    return product.smallMolecule?.Molecule_name || product.name;
  }

  if (type === "dna") {
    return product.geneName || product.name;
  }

  if (type === "lipid") {
    return product.lipid?.backbone_name || product.name;
  }

  if (type === "rna") {
    return product?.rnaName || product?.rnaGeneSymbol || product.name;
  }

  return product.name;
};

export const reactantNodeId = (reactant) => {
  const type = reactant?.pType;

  if (type === "complex") {
    return reactant.complexSymbolicName?.go_complex_id || "";
  }

  if (type === "protein") {
    return reactant?.reactant_protein_uniprot_id || "";
  }

  if (type === "glycan") {
    // Handle multiple glycans
    if (Array.isArray(reactant.glycans) && reactant.glycans.length > 0) {
      return reactant.glycans
        .map((glycan) => glycan.glycanText || "")
        .filter(Boolean)
        .join("|");
    }
    return reactant?.glycanText || "";
  }

  if (type === "small_molecule") {
    return reactant?.smallMolecule?.Molecule_id || "";
  }

  if (type === "dna") {
    return reactant?.geneName;
  }

  if (type === "lipid") {
    return reactant?.lipid?.backbone_id || "";
  }

  if (type === "rna") {
    return reactant?.rnaDatabaseId || reactant?.transcriptId || reactant?.mirnaId || reactant?.rnacentralId || "";
  }

  return "";
};

export const regulatorNodeId = (regulator) => {
  const type = regulator?.pType;

  if (type === "protein") {
    return regulator?.proteinSymbol || regulator.proteinSymbolicName || "";
  }

  if (type === "enzyme") {
    return regulator?.regulator_ec_enzyme?.enzyme_name?.value || "";
  }

  return "";
};

export const productNodeId = (product) => {
  const type = product?.pType;

  if (type === "complex") {
    return product?.complexSymbolicName?.go_complex_id || "";
  }

  if (type === "protein") {
    return product?.product_protein_uniprot_id || product?.reactant_protein_uniprot_id || "";
  }

  if (type === "glycan") {
    // Handle multiple glycans
    if (Array.isArray(product.glycans) && product.glycans.length > 0) {
      return product.glycans
        .map((glycan) => glycan.glycanText || "")
        .filter(Boolean)
        .join("|");
    }
    return product?.glycanText || "";
  }

  if (type === "small_molecule") {
    return product?.smallMolecule?.Molecule_id || "";
  }

  if (type === "dna") {
    return product?.geneName || "";
  }

  if (type === "lipid") {
    return product?.lipid?.backbone_id || "";
  }

  if (type === "rna") {
    return product?.rnaDatabaseId || product?.transcriptId || product?.mirnaId || product?.rnacentralId || "";
  }

  return "";
};