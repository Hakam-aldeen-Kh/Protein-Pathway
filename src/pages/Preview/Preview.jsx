import { Link, useParams } from "react-router";
import PathwayInfo from "../../components/PathwayInfo";
import ReactionTable from "../../components/ReactionTable";
import Swal from "sweetalert2";
import samplePathways from "../../data/simpleData";
import "../../styles/global.css";

const Preview = () => {
  const { id } = useParams();
  const pathway = samplePathways.find((p) => p.id === id);

  if (!pathway) {
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
                O2 Antigen
              </h1>
              <div className="flex gap-5 items-center self-stretch my-auto text-sm font-semibold text-center text-violet-900">
                <Link
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
                </Link>
              </div>
            </div>
            <p className="flex-1 shrink gap-10 mt-5 w-full text-xl text-zinc-600 max-md:max-w-full">
              Description text, Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Duis at tincidunt ex. Vivamus varius nulla eget
              nisl interdum sollicitudin eget at turpis. Integer ut interdum
              velit, sed maximus turpis. Maecenas ornare massa et pharetra
              suscipit. Sed ultrices, lacus <br />
              eu vestibulum rhoncus, risus quam lacinia dui, iaculis molestie
              leo dui non nulla. Phasellus neque dolor, molestie ut hendrerit
              id, aliquet a sapien.{" "}
            </p>
          </div>
        </div>
        <PathwayInfo pathway={pathway} />
        <ReactionTable reactions={pathway.reactants} />
      </div>
    </div>
  );
};

export default Preview;
