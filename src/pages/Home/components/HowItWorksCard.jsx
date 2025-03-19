const HowItWorksCard = ({ phaseNumber, title, steps }) => {
  return (
    <div className="bg-[#3E81C81A] p-6 rounded-lg">
      <span className="text-[#484848]">Phase {phaseNumber}</span>
      <h3 className="text-xl font-black text-[#1F1F1F] mb-4">{title}</h3>
      <ul className="space-y-2 text-[#484848]">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-x-1">
            <span className="w-6 h-6 bg-[#FEFEFE] flex items-center justify-center rounded">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HowItWorksCard;
