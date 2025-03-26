import HeroSection from "./sections/HeroSection";
import HowItWorks from "./sections/HowItWorks";
import WhatWeDo from "./sections/WhatWeDo";

const Home = () => {
  return (
    <div className="min-h-screen text-white">
      <HeroSection />
      <HowItWorks />
      <WhatWeDo />
    </div>
  );
};

export default Home;
