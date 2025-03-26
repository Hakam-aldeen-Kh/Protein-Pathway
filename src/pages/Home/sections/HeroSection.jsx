import { Link } from "react-router";

import heroLinks from "../../../data/home/heroLinks.json"


const HeroSection = () => {
  return (
    <div
      className="relative h-[600px] flex items-center px-8 md:px-16"
      style={{
        backgroundImage: "url('/images/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-10">
          GLYCAN PATHWAY PORTAL
        </h1>
        <p className="text-3xl mb-10 text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex items-center justify-start gap-4">
          {heroLinks.map(link => (
            <Link
              key={link.id}
              to={link.href}
              className="bg-[#00A7D3] hover:bg-[#1e8cab] w-[333px] text-center text-white px-6 py-2 rounded-sm transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
