import { Link, useOutletContext } from "react-router";
import Swal from "sweetalert2";
import "../../styles/global.css";

import PathwayInfo from "../../components/PathwayInfo";
import ReactionReviewTable from "../../components/ReactionReviewTable";

const Review = () => {

  const { pathwayData, save } = useOutletContext();


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

  const handleSave = () => {
    save()
    Toast.fire({
      title: `<div class='flex justify-between items-center'><span>Pathway Added</span><button class="close-btn text-xl font-bold inline"><img src="/images/icons/close.svg" class="close-btn" /></button></div>`,
      html: `<p class="text-sm text-gray-600">Your new pathway was added successfully</p>`,
    });
  }

  return (
    <div className="flex flex-col px-32 py-[40px] max-md:px-5">
      <div className="flex overflow-hidden space-y-16 flex-col p-5 w-full bg-white rounded-lg border border-solid border-zinc-400 max-md:max-w-full">

        <div className="flex gap-5 items-start w-full max-md:max-w-full">
          <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
              <h1 className="self-stretch my-auto text-4xl font-bold text-neutral-900">
                {pathwayData.title || "no value"}
              </h1>

              <div className="flex items-center justify-center gap-2">
                <div className="flex gap-5 items-center self-stretch group my-auto text-sm font-semibold text-center g text-[#57369E]">
                  <Link
                    to="/new-pathway"
                    className="flex gap-2 justify-center items-center self-stretch px-4 py-2 my-auto rounded-sm border border-[#57369E] group-hover:border-transparent border-solid min-h-[40px] group-hover:text-white group-hover:bg-[#00A7D3] transition-colors duration-500 "
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.57 5.92969L3.5 11.9997L9.57 18.0697" className=" stroke-[#57369E] group-hover:stroke-white transition-colors duration-500 " strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20.5019 12H3.67188" className=" stroke-[#57369E] group-hover:stroke-white transition-colors duration-500 " strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="self-stretch my-auto">Back To Edit Pathway</span>
                  </Link>
                </div>

                <div className="flex gap-5 items-center self-stretch my-auto text-sm font-semibold text-center text-white bg-[#57369E]">
                  <Link
                    to="/protein-pathway-data"
                    className="flex gap-2 justify-center items-center self-stretch px-4 py-2 my-auto rounded-sm border border-[#57369E] hover:border-transparent border-solid min-h-[40px] hover:text-white hover:bg-[#00A7D3] transition-colors duration-500 "
                    onClick={handleSave}
                  >
                    <span className="self-stretch my-auto">Save & Register RDF</span>
                    <img src="/images/icons/document-download-light.svg" />
                  </Link>
                </div>
              </div>


            </div>
            <p className="flex-1 shrink gap-10 mt-5 w-full text-xl text-[#626262] max-md:max-w-full">
              {pathwayData.description || "no value "}
            </p>
          </div>
        </div>

        <PathwayInfo pathway={pathwayData} />
        <ReactionReviewTable reactions={pathwayData?.reactions} />
      </div>
    </div>
  );
};

export default Review;
