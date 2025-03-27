import { Link } from "react-router";

const ReviewHeader = ({ title, description, pageState, handleSave, isEdit }) => {
    return (
        <div className="flex gap-5 items-start w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full">
                <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
                    <h1 className="self-stretch my-auto text-4xl font-bold text-neutral-900">
                        {title || "no value"}
                    </h1>

                    {pageState === "review" &&
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
                                    to="/protein-pathway-data?tab=my"
                                    className="flex gap-2 justify-center items-center self-stretch px-4 py-2 my-auto rounded-sm border border-[#57369E] hover:border-transparent border-solid min-h-[40px] hover:text-white hover:bg-[#00A7D3] transition-colors duration-500 "
                                    onClick={handleSave}
                                >
                                    <span className="self-stretch my-auto">Save & Register RDF</span>
                                    <img src="/images/icons/document-download-light.svg" />
                                </Link>
                            </div>
                        </div>
                    }

                    {
                        pageState === "preview" &&
                        <div className="flex gap-5 items-center self-stretch my-auto text-sm font-semibold group text-center text-violet-900">
                            {isEdit && <Link
                                to="/protein-pathway-data?tab=my"
                                className="flex gap-2 justify-center items-center self-stretch px-4 py-2 my-auto rounded-sm border border-violet-900 group-hover:border-transparent border-solid min-h-[40px] group-hover:text-white group-hover:bg-[#00A7D3] transition-colors duration-500 "
                                onClick={handleSave}
                            >
                                <span className="self-stretch my-auto">Register RDF</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 17V11L7 13" className=" stroke-[#57369E] group-hover:stroke-white transition-colors duration-500 " strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9 11L11 13" className=" stroke-[#57369E] group-hover:stroke-white transition-colors duration-500 " strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" className=" stroke-[#57369E] group-hover:stroke-white transition-colors duration-500 " strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" className=" stroke-[#57369E] group-hover:stroke-white transition-colors duration-500 " strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>}
                        </div>
                    }

                </div>
                <p className="flex-1 shrink gap-10 mt-5 w-full text-xl text-[#626262] max-md:max-w-full">
                    {description || "no value "}
                </p>
            </div>
        </div>
    )
};

export default ReviewHeader;
