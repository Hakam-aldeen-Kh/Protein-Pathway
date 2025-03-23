import howItWorksData from "../../../data/home/howItWorksData.json";
import HowItWorksCard from "../components/HowItWorksCard";

const HowItWorks = () => {
  return (
    <div className="py-20 px-8 md:px-16">
      <h2 className="text-4xl font-black text-[#1F1F1F] text-center mb-12">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-[1664px] mx-auto">
        {howItWorksData.map((item, index) => (
          <HowItWorksCard
            key={item.id}
            phaseNumber={index + 1}
            title={item.title}
            steps={item.steps}
          />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
