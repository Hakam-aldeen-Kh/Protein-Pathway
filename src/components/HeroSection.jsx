const HeroSection = () => {
  return (
    <div className="flex overflow-hidden gap-10 justify-center items-center px-32 py-10 w-full bg-[url(/images/hero-data.png)] text-white max-md:px-5 max-md:max-w-full">
      <div className="flex flex-1 shrink gap-10 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[576px]">
          <h1 className="text-4xl font-bold max-md:max-w-full">
            Protein Pathway Data
          </h1>
          <p className="mt-2 text-xl max-md:max-w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
