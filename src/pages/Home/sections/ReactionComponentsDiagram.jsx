const ReactionComponentsDiagram = () => {
  return (
    <div className="p-8 bg-white font-sans">
      {/* Top Section - Reaction Components */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold mb-8 text-black">Reaction Components</h1>
        
        <div className="flex items-center justify-center gap-8 relative">
          {/* Left side - Reactants */}
          <div className="flex flex-col gap-4">
            <div className="bg-blue-200 px-8 py-4 rounded-full text-black font-medium text-lg">
              Reactant 1
            </div>
            <div className="bg-blue-200 px-8 py-4 rounded-full text-black font-medium text-lg">
              Reactant 2
            </div>
          </div>
          
          {/* Center - Controller and Arrow */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-purple-400 px-6 py-3 rounded-lg text-black font-medium italic text-lg border-2 border-purple-500">
              controller
            </div>
            <div className="text-purple-600 text-3xl font-bold">
              →
            </div>
          </div>
          
          {/* Right side - Products */}
          <div className="flex flex-col gap-4">
            <div className="bg-blue-400 px-8 py-4 rounded-full text-black font-medium text-lg">
              Product 1
            </div>
            <div className="bg-blue-400 px-8 py-4 rounded-full text-black font-medium text-lg">
              Product 2
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section - Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-black">
          Input Order for Each Reaction of Pathway<br />
          information
        </h2>
        
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-400 p-4 text-center font-medium text-black">
                Input order
              </th>
              <th className="border border-gray-400 p-4 text-center font-medium text-blue-600">
                Reactant
              </th>
              <th className="border border-gray-400 p-4 text-center font-medium text-purple-600">
                Controller
              </th>
              <th className="border border-gray-400 p-4 text-center font-medium text-blue-600">
                Product
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="border border-gray-400 p-4 font-medium text-black text-center">
                first reaction (Reaction 1)
              </td>
              <td className="border border-gray-400 p-4 text-black text-center">
                DLL1, NOTCH1
              </td>
              <td className="border border-gray-400 p-4 text-black text-center">
                
              </td>
              <td className="border border-gray-400 p-4 text-black text-center">
                DLL4:NOTCH1
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-4 font-medium text-black text-center">
                second reaction (Reaction 2)
              </td>
              <td className="border border-gray-400 p-4 text-black text-center">
                DLL4:NOTCH1, Ub
              </td>
              <td className="border border-gray-400 p-4 text-black text-center">
                MIB/NEURL
              </td>
              <td className="border border-gray-400 p-4 text-black text-center">
                Ub-DLL:NOTCH1
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-4 font-medium text-black text-center">
                third reaction (Reaction 3)
              </td>
              <td className="border border-gray-400 p-4 text-black text-center">
                Ub-DLL:NOTCH1
              </td>
              <td className="border border-gray-400 p-4 text-black text-center">
                ADAM10
              </td>
              <td className="border border-gray-400 p-4 text-black text-center">
                Ub-DLL:NOTCH1 fragment, NEXT1
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-4 font-medium text-black text-center">
                fourth reaction (Reaction 4)
              </td>
              <td className="border border-gray-400 p-4 text-black text-center">
                NEXT1
              </td>
              <td className="border border-gray-400 p-4 text-black text-center">
                gamma-secretase complex
              </td>
              <td className="border border-gray-400 p-4 text-black text-center">
                NICD1
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReactionComponentsDiagram;