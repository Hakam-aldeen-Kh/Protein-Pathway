import { useNavigate } from "react-router";
import Graph from "../pages/Pathway-Result/Graph";
import { elements } from "../pages/Pathway-Result/data5";
import { layouts } from "../pages/Pathway-Result/layouts";

function PathwayInfo({ pathway }) {
  const navigate = useNavigate()
  const pathwayData = [
    { label: "Species", value: pathway.species },
    { label: "Pathway Category:", value: pathway.category },
    { label: "Tissue:", value: "Blood" },
    { label: "Related Disease:", value: "Human, Leukemia" },
    { label: "Record Date:", value: pathway.date },
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

  return (
    <div className="flex flex-col mt-16 w-full max-md:mt-10 max-md:max-w-full">
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
          <div className="flex relative flex-1 shrink gap-5 min-h-96 h-full basis-0 min-w-[240px] max-md:max-w-full mt-5">
            {/* result */}

            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/0330d223f5f1457b89c89c318411efd1/c43c12f2d8304c2e6307605fb11adc1b200b5b801beef0b5303bf22b07d85ca2?apiKey=c30e22be1ed44b2a93fb0b9e3e65ed74&"
              alt="Pathway diagram"
              onClick={() => navigate("/pathway-result")}
              className="object-contain cursor-pointer z-0 flex-1 shrink w-full aspect-[2.87] basis-0 min-w-[240px] max-md:max-w-full relative"
            /> */}
            <div className="w-full h-full object-contain cursor-pointer z-0 flex-1 shrink aspect-[2.87] basis-0 min-w-[240px] max-md:max-w-full relative" onClick={() => navigate("/pathway-result")}>
              <Graph elements={elements} layout={layouts.fcose} touch={false} />
            </div>

            <div className="flex absolute top-2 right-2 z-0 gap-2.5 items-center self-start">
              <button
                className="flex gap-2 justify-center items-center self-stretch px-0.5 my-auto w-6 h-6 rounded bg-neutral-900 bg-opacity-50 min-h-[24px]"
                aria-label="Action 1"
                onClick={() => navigate("/pathway-result")}
              >
                <img src="/images/icons/btn-search-light.svg" />
              </button>
              <button
                className="flex gap-2 justify-center items-center self-stretch px-0.5 my-auto w-6 h-6 rounded bg-neutral-900 bg-opacity-50 min-h-[24px]"
                aria-label="Action 2"
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
