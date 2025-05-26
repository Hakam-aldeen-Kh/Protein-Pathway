import HeroSection from "./sections/HeroSection";
import HowItWorks from "./sections/HowItWorks";
import WhatWeDo from "./sections/WhatWeDo";
import UserManual from "./sections/ReactionComponentsDiagram";

const Home = () => {
  return (
    <div className="min-h-screen text-white">
      <HeroSection />
      <HowItWorks />
      <UserManual />
      <WhatWeDo />
    </div>
  );
};

export default Home;
