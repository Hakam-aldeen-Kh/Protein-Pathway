import { Link } from "react-router";
import FeatureCard from "../../components/FeatureCard";

const linksTitle = [
  {
    title: "Protein Pathways",
    href: "/new-pathway",
  },
  {
    title: "Glycan Synthetic Pathways",
    href: "/",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
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
            {linksTitle.map((link, i) => (
              <Link
                key={i}
                to={link.href}
                className="bg-[#00A7D3] hover:bg-[#1e8cab] w-[333px] text-center text-white px-6 py-2 rounded-sm transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 px-8 md:px-16">
        <h2 className="text-4xl font-black text-[#1F1F1F] text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-[1664px] mx-auto">
          {["Register", "Input", "Manage"].map((title, index) => (
            <div key={title} className="bg-[#3E81C81A] p-6 rounded-lg">
              <span className="text-[#484848]">Phase {index + 1}</span>
              <h3 className="text-xl font-black text-[#1F1F1F] mb-4">
                {title}
              </h3>
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

      {/* What We Do Section */}
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
                />
              }
              title="Service Title"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
