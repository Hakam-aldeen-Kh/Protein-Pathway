import HeroSection from "./sections/HeroSection";
import HowItWorks from "./sections/HowItWorks";
import WhatWeDo from "./sections/WhatWeDo";

const Home = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <HowItWorks />

      {/* What We Do Section */}
      <WhatWeDo />
    </div>
  );
};

export default Home;
