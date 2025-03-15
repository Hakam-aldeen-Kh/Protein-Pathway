function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl text-[#1F1F1F] font-black mb-2">{title}</h3>
      <p className="text-[#484848] text-sm">{description}</p>
    </div>
  );
}

export default FeatureCard;
