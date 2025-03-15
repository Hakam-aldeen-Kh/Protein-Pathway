const HowItWorks = () => {
  return (
    <div className="py-20 px-8 md:px-16">
      <h2 className="text-4xl font-black text-[#1F1F1F] text-center mb-12">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-[1664px] mx-auto">
        {["Register", "Input", "Manage"].map((title, index) => (
          <div key={title} className="bg-[#3E81C81A] p-6 rounded-lg">
            <span className="text-[#484848]">Phase {index + 1}</span>
            <h3 className="text-xl font-black text-[#1F1F1F] mb-4">{title}</h3>
            <ul className="space-y-2 text-[#484848]">
              {[1, 2, 3].map((step) => (
                <li key={step} className="flex gap-x-1">
                  <span className="w-6 h-6 bg-[#FEFEFE] flex items-center justify-center rounded">
                    {step}
                  </span>
                  <span>Step {step} instructions</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
