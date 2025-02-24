import { elements } from "../pages/Pathway-Result/data"
const samplePathways = Array(50)
  .fill()
  .map((_, index) => ({
    id: `GPW-415820FQ-${index + 1}`,
    title: `Pathway Title ${index + 1}`,
    species: "Homo Sapiens",
    category:
      index % 3 === 0
        ? "Notch Signaling"
        : index % 3 === 1
          ? "Metabolic"
          : "Cell Cycle",
    reactants: [`G04602LA-${index + 1}`, `G04602LB-${index + 1}`],
    controller: `G04602LA-${index + 1}`,
    products: [`G04602LC-${index + 1}`, `G04602LD-${index + 1}`],
    recordDate: `${(index % 28) + 1}.${(index % 12) + 1}.202${index % 2 === 0 ? "4" : "5"
      }`,
    owner: index % 2 === 0 ? "me" : "other",
    status: index % 3 === 0 ? "Active" : "Inactive",
    reactionsA: elements,
    reactions: [
      {
        id: `${index + 1}`,
        reactants: [{ name: "G04602LA", image: "/images/gpr.png" }],
        enzyme: "-",
        sugarNucleotide: "L-Fucose",
        products: [{ name: "G04602LA", image: "/images/gpr.png" }],
        cellLocation: "Cytosol",
      },
      {
        id: `${index + 1}`,
        reactants: [{ name: "G04602LA", image: "/images/gpr.png" }],
        enzyme: "-",
        sugarNucleotide: "L-Fucose",
        products: [{ name: "G04602LA", image: "/images/gpr.png" }],
        cellLocation: "Cytosol",
      }
    ],
    isEdit: false
  }));

export default samplePathways;
