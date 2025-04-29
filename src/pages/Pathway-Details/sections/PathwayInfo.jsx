import { useNavigate } from "react-router";

import Graph from "../../../common/Graph";
import { layouts } from "../../Pathway-Result/components/layouts";

import { reactionsDataToCytoscapeFormat } from "../../../utils/reactionsDataToCytoscapeFormat";


const PathwayInfo = ({ pathway, id }) => {

  const navigate = useNavigate()
  const pathwayData = [
    { label: "Species", value: pathway?.species || "no value" },
    { label: "Pathway Category:", value: pathway?.category?.text || "no value" },
    { label: "Tissue:", value: pathway?.tissue?.text || "no value" },
    { label: "Related Disease:", value: pathway?.relatedDisease || "no value" },
    { label: "Record Date:", value: pathway?.recordDate },
  ];

  const handleExport = () => {
    if (window.cy) {
      const png = window.cy.png({ full: true });
      const link = document.createElement("a");
      link.href = png;
      link.download = "pathway.png";
      link.click();
    }
  };

  const handleGoToPathwayResult = () => {
    if (id) {
      navigate(`/pathway-result/${id}`, { state: { data: pathway } })
    }
    else {
      navigate("/pathway-result")
    }
  }

  return (
    <div className="flex flex-col w-full max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <h2 className="text-2xl font-bold text-neutral-900">Pathway Info</h2>
        <div className="flex flex-wrap gap-5 mt-2 w-full max-md:max-w-full">

          <div className="flex flex-col flex-1 shrink self-start text-base basis-0 min-w-[240px] max-md:max-w-full">
            {pathwayData.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap gap-2 items-center mt-5 w-full max-md:max-w-full"
              >
                <div className="self-stretch my-auto w-60 text-zinc-600">
                  {item.label}
                </div>
                <div className="flex-1 shrink gap-2.5 self-stretch p-2 my-auto rounded-lg bg-slate-100 min-w-[240px] text-neutral-900 max-md:max-w-full">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div className="flex relative flex-1 shrink gap-5 min-h-[280px] rounded h-full basis-0 min-w-[240px] max-md:max-w-full mt-5 border">
            <div className="w-full  object-contain cursor-pointer z-0 flex-1 shrink p-1 basis-0 min-w-[240px] max-md:max-w-full relative">
              <Graph elements={pathway.reactionsA || reactionsDataToCytoscapeFormat(pathway.reactions)} layout={layouts.klay} touch={false} />
            </div>

            <div className="flex absolute top-2 right-2 z-0 gap-2.5 items-center self-start">
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
}

export default PathwayInfo;
