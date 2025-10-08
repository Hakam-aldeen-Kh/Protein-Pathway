import { useNavigate } from "react-router";
import Graph from "../../../common/Graph";
import { layouts } from "../../Pathway-Result/components/layouts";
import { reactionsDataToCytoscapeFormat } from "../../../utils/reactionsDataToCytoscapeFormat";
import { capitalize } from "../../../hooks/useCapitalize";
import { useState } from "react";
import {
  regulatorNodeId,
  regulatorNodeName,
  productNodeId,
  productNodeName,
  reactantNodeId,
  reactantNodeName,
} from "../../../utils/nameNode";

const PathwayInfo = ({ pathway, id }) => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState(layouts.klay);

  const today = new Date();
  const recordDate = `${today.getDate()}.${
    today.getMonth() + 1
  }.${today.getFullYear()}`;

  const getDiseaseNames = (diseaseInput) => {
    if (!Array.isArray(diseaseInput) || diseaseInput.length === 0) {
      return "";
    }

    const diseaseNames = diseaseInput
      .filter((disease) => disease?.value?.Disease_name)
      .map((disease) => disease.value.Disease_name);

    return diseaseNames.length > 0 ? diseaseNames.join(", ") : "";
  };

  const relatedDiseasesValues = getDiseaseNames(pathway?.diseaseInput);

  const pathwayData = [
    { label: "Species", value: pathway?.species || "no value" },
    { label: "Pathway Category:", value: pathway?.category || "no value" },
    { label: "Tissue:", value: pathway?.tissue?.label || "no value" },
    { label: "Related Disease:", value: relatedDiseasesValues || "no value" },
    { label: "Record Date:", value: pathway?.recordDate || recordDate },
    {
      label: "PubMeds",
      value:
        JSON.stringify(pathway.pubMeds) === "{}"
          ? "no value"
          : pathway?.pubMeds,
      isArray: Array.isArray(pathway?.pubMeds),
    },
  ];

  const handleExport = () => {
    const pathwayData = {
      pathway_id: pathway?._id || "",
      pathway_name: pathway?.title || "",
      pathway_description: pathway?.description || "",
      pathway_category: {
        category_name: pathway?.category || "",
        category_id: "PW_000002",
      },
      pathway_reference:
        pathway?.pubMeds?.map((item) => ({
          reference_id: item?.id || "",
          reference_db: "PubMed",
          reference_title: item?.title || "",
        })) || {},
      pathway_taxon: {
        taxon_db: "NCBI",
        taxon_id: "9606",
        taxon_name: pathway?.species || "",
      },
      pathway_tissue: {
        tissue_db: "BRENDA Tissue Ontology",
        tissue_id: pathway?.tissue?.id || "",
        tissue_name: pathway?.tissue?.label || "",
      },
      pathway_disease:
        pathway?.diseaseInput?.map((item) => ({
          disease_db: "Mondo Disease Ontology (MONDO)",
          disease_id: item?.value?.Disease_id || "",
          disease_name: item?.value?.Disease_name || "",
          type: item?.type || "",
        })) || [],
      pathway_reactions_num: pathway?.reactions?.length,
      reactions:
        pathway?.reactions?.map((item) => ({
          rxn_number: item?.id || "",
          rxn_id: item?.id || "",
          rxn_component: [
            {
              role: "reactant",
              reactant_info:
                item?.reactants?.map((item) => ({
                  type: item?.pType || "",
                  db: "UniProt",
                  id: reactantNodeId(item) || "",
                  name: reactantNodeName(item) || "",
                  cellular_location: {
                    location_db: "GO Ontology",
                    location_id:
                      item?.cellularLocation?.cell_localization_id || "",
                    location_name:
                      item?.cellularLocation?.cell_localization_name || "",
                  },
                  cell_type: {
                    co_db: "Cell Ontology",
                    co_id: item?.cellType?.cType_id || "",
                    co_name: item?.cellType?.cType_name || "",
                  },
                })) || [],
            },
            {
              role: "regulator",
              regulator_info:
                item?.regulators?.map((item) => ({
                  type: item?.pType || "",
                  db: "UniProt",
                  id: regulatorNodeId(item) || "",
                  name: regulatorNodeName(item) || "",
                  cellular_location: {
                    location_db: "GO Ontology",
                    location_id:
                      item?.cellularLocation?.cell_localization_id || "",
                    location_name:
                      item?.cellularLocation?.cell_localization_name || "",
                  },
                  cell_type: {
                    co_db: "Cell Ontology",
                    co_id: item?.cellType?.cType_id || "",
                    co_name: item?.cellType?.cType_name || "",
                  },
                })) || [],
            },
            {
              role: "product",
              product_info:
                item?.products?.map((item) => ({
                  type: item?.pType || "",
                  db: "GO ontology",
                  id: productNodeId(item) || "",
                  name: productNodeName(item) || "",
                  cellular_location: {
                    location_db: "GO Ontology",
                    location_id:
                      item?.cellularLocation?.cell_localization_id || "",
                    location_name:
                      item?.cellularLocation?.cell_localization_name || "",
                  },
                  cell_type: {
                    co_db: "Cell Ontology",
                    co_id: item?.cellType?.cType_id || "",
                    co_name: item?.cellType?.cType_name || "",
                  },
                })) || [],
            },
          ],
        })) || [],
    };

    const jsonString = JSON.stringify(pathwayData, null, 2); // Pretty print with indentation
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "pathway_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // Clean up

    // if (window.cy) {
    //   const png = window.cy.png({ full: true });
    //   const link = document.createElement("a");
    //   link.href = png;
    //   link.download = "pathway.png";
    //   link.click();
    // }
  };

  const handleGoToPathwayResult = () => {
    if (id) {
      navigate(`/pathway-result/${id}`, { state: { data: pathway } });
    } else {
      navigate("/pathway-result");
    }
  };

  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <h2 className="text-2xl font-bold text-neutral-900">
          Pathway Basic Information
        </h2>
        <div className="flex flex-wrap gap-5 mt-2 w-full max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink self-start text-base basis-0 min-w-[240px] max-md:max-w-full">
            {pathwayData.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap gap-2 items-center mt-5 w-full max-md:max-w-full"
              >
                <div className="self-stretch my-auto w-60 text-zinc-600">
                  {capitalize(item.label)}
                </div>
                <div className="flex-1 shrink gap-2.5 self-stretch p-2 my-auto rounded-lg bg-slate-100 min-w-[240px] text-neutral-900 max-md:max-w-full">
                  {item.isArray
                    ? item?.value?.map((item, index) => (
                        <div key={index} className="flex gap-2">
                          <span>ID: {item.id}</span>
                          <span>Title: {item.title}</span>
                        </div>
                      ))
                    : capitalize(item.value)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex relative flex-1 shrink gap-5 min-h-[280px] rounded h-full basis-0 min-w-[240px] max-md:max-w-full mt-5 border">
            <div className="w-full  object-contain cursor-pointer z-0 flex-1 shrink p-1 basis-0 min-w-[240px] max-md:max-w-full relative">
              <Graph
                elements={
                  pathway.reactionsA ||
                  reactionsDataToCytoscapeFormat(pathway.reactions)
                }
                layout={layout}
                touch={true}
              />
            </div>

            <div className="flex absolute top-2 right-2 z-0 gap-2.5 items-center self-start">
              <button
                className="flex gap-2 text-white justify-center items-center self-stretch px-0.5 my-auto w-6 h-6 rounded bg-neutral-900 bg-opacity-50 min-h-[24px]"
                onClick={() => {
                  if (layout === layouts.klay) {
                    setLayout(layouts.cola);
                  } else {
                    setLayout(layouts.klay);
                  }
                }}
              >
                F
              </button>

              <button
                className="flex gap-2 justify-center items-center self-stretch px-0.5 my-auto w-6 h-6 rounded bg-neutral-900 bg-opacity-50 min-h-[24px]"
                onClick={handleGoToPathwayResult}
              >
                <img src="/images/icons/btn-search-light.svg" />
              </button>

              <button
                className="flex gap-2 justify-center items-center self-stretch px-0.5 my-auto w-6 h-6 rounded bg-neutral-900 bg-opacity-50 min-h-[24px]"
                onClick={handleExport}
              >
                <img src="/images/icons/document-download-light.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathwayInfo;
