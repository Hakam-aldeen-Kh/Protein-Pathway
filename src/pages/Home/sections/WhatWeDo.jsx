import FeatureCard from "../../../components/FeatureCard";

const WhatWeDo = () => {
  return (
    <div className="py-16 px-8 md:px-16">
      <h2 className="text-4xl font-bold text-[#1F1F1F] text-center mb-12">
        What We Do
      </h2>
      <div className="grid md:grid-cols-4 gap-8 max-w-[1664px] mx-auto">
        {[1, 2, 3, 4].map((num) => (
          <FeatureCard
            key={num}
            icon={
              <img
                src={`/images/do${num}.png`}
                className="w-32 h-32 text-blue-500"
                alt={`Service ${num}`}
              />
            }
            title="Service Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        ))}
      </div>
    </div>
  );
};

export default WhatWeDo;
