import FeatureCard from "../components/FeatureCard";
import whatWeDoData from "../../../data/home/whatWeDoData.json";

const WhatWeDo = () => {
  return (
    <div className="py-16 px-8 md:px-16">
      <h2 className="text-4xl font-bold text-[#1F1F1F] text-center mb-12">
        What We Do
      </h2>
      <div className="grid md:grid-cols-4 gap-8 max-w-[1664px] mx-auto">
        {whatWeDoData.map((item) => (
          <FeatureCard
            key={item.id}
            icon={
              <img
                src={item.icon}
                className="w-32 h-32 text-blue-500"
                alt={item.title}
              />
            }
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default WhatWeDo;
