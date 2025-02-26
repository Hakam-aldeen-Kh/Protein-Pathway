import { Link, useOutletContext, useParams } from "react-router";
import ReactionTable from "../../components/ReactionTable";
import Swal from "sweetalert2";
import samplePathways from "../../data/simpleData";
import "../../styles/global.css";
import PathwayInfoOnce from "../../components/PathwayInfoOnce";

const Preview = () => {
  const { myPathwayData } = useOutletContext();
  const { id } = useParams();
  const pathway1 = samplePathways.find((p) => p.id === id)
  const pathway2 = myPathwayData?.find((p) => p.id == id);


  if (!pathway1 && !pathway2) {
    return (
      <p className="text-center text-red-500 text-xl">Pathway not found</p>
    );
  }


  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    customClass: {
      popup: "custom-toast",
    },
    didOpen: (toast) => {
      toast.querySelector(".close-btn").addEventListener("click", () => {
        Swal.close();
      });

      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  return (
    <div className="flex flex-col px-32 py-[40px] max-md:px-5">
      <div className="flex overflow-hidden flex-col p-5 w-full bg-white rounded-lg border border-solid border-zinc-400 max-md:max-w-full">
        <div className="flex gap-5 items-start w-full max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
              <h1 className="self-stretch my-auto text-4xl font-bold text-neutral-900">
                {pathway1?.title || pathway2?.title || "no value"}
              </h1>
              <div className="flex gap-5 items-center self-stretch my-auto text-sm font-semibold text-center text-violet-900">
                {!pathway1 && <Link
                  to="/protein-pathway-data"
                  className="flex gap-2 justify-center items-center self-stretch px-4 py-2 my-auto rounded-sm border border-violet-900 hover:border-transparent border-solid min-h-[40px] hover:text-white hover:bg-[#00A7D3] transition-colors duration-500 "
                  onClick={() => {
                    Toast.fire({
                      title: `<div class='flex justify-between items-center'><span>Pathway Updated</span><button class="close-btn text-xl font-bold inline"><img src="/images/icons/close.svg" class="close-btn" /></button></div>`,
                      html: `<p class="text-sm text-gray-600">Your pathway was updated successfully</p>`,
                    });
                  }}
                >
                  <span className="self-stretch my-auto">Register RDF</span>
                  <img src="/images/icons/document-upload.svg" />
                </Link>}
              </div>
            </div>
            <p className="flex-1 shrink gap-10 mt-5 w-full text-xl text-zinc-600 max-md:max-w-full">
              {pathway1?.description || pathway2?.description || "no value"}
            </p>
          </div>
        </div>
        <PathwayInfoOnce pathway={pathway1 || pathway2} id={id} />
        <ReactionTable reactions={pathway1?.reactions || pathway2?.reactions} isEdit={!pathway1} />
      </div>
    </div>
  );
};

export default Preview;
