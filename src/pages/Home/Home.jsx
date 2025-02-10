import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="min-h-screen  text-white">
      {/* Hero Section */}
      <div
        className="relative h-[600px] flex items-center px-8 md:px-16"
        style={{
          backgroundImage: ` url('/images/hero.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-10">GLYCAN PATHWAY PORTAL</h1>
          <p className="text-3xl mb-10 text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className='flex items-center justify-start gap-4'>
            <Link to={"/new-pathway"} className="bg-[#00A7D3] w-[333px]  text-center text-white px-6 py-2 rounded-sm transition-colors">
              Add Protein Pathway
            </Link>
            <Link to={"/"} className="bg-[#00A7D3] w-[333px]  text-center text-white px-6 py-2 rounded-sm transition-colors">
              Add Glycan Synthetic Pathway
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 px-8 md:px-16 ">
        <h2 className="text-4xl font-black text-[#1F1F1F] text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-[1664px] mx-auto">
          {['Register', 'Input', 'Manage'].map((title, index) => (
            <div key={title} className="bg-[#3E81C81A] p-6 rounded-lg">
              <span className='text-[#484848]'>Phase {index + 1}</span>
              <h3 className="text-xl font-black text-[#1F1F1F] mb-4">Step {index + 1}: {title}</h3>
              <ul className="space-y-2 text-[#484848]">
                <li>Step 1 instructions</li>
                <li>Step 2 instructions</li>
                <li>Step 3 instructions</li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* What We Do Section */}
      <div className="py-16 px-8 md:px-16">
        <h2 className="text-4xl font-bold text-[#1F1F1F] text-center mb-12">What We Do</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-[1664px] mx-auto">
          <FeatureCard
            icon={<img src={"/images/do1.png"} className="w-32 h-32 text-blue-500" />}
            title="Service Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <FeatureCard
            icon={<img src={"/images/do2.png"} className="w-32 h-32 text-blue-500" />}
            title="Service Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <FeatureCard
            icon={<img src={"/images/do3.png"} className="w-32 h-32 text-blue-500" />}
            title="Service Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <FeatureCard
            icon={<img src={"/images/do4.png"} className="w-32 h-32 text-blue-500" />}
            title="Service Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </div>
      </div>
    </div>
  );
};

export default Home;



function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg text-center">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl text-[#1F1F1F] font-black mb-2">{title}</h3>
      <p className="text-[#484848] text-sm">{description}</p>
    </div>
  );
}