const LoadingProcess = ({ label }) => {
  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-[#57369E]"></div>
        <p className="mt-4 text-gray-700 font-medium">{label}</p>
      </div>
    </div>
  );
};

export default LoadingProcess;
