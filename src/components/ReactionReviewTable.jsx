
const ReactionReviewTable = ({ reactions }) => {

  const reactionData = reactions.map(item => (
    {
      rxnId: item.id,
      reactants: item.reactants.map(reactant => ({ code: reactant.name, image: "/images/gpr.png" })),
      enzyme: "-",
      sugarNucleotide: "D-Glucose",
      products: item.products.map(reactant => ({ code: reactant.name, image: "/images/gpr.png" })),
      cellularLocation: item.reactants[0].cellularLocation || "Cytosol",
    }
  ))

  return (
    <div className="w-full mt-10">

      <div className="flex flex-wrap gap-2.5 justify-center items-center w-full max-md:max-w-full mb-5">
        <h2 className="flex-1 shrink self-stretch my-auto text-2xl font-bold basis-0 text-neutral-900 max-md:max-w-full">
          Reaction Table
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm font-semibold">
              <th className="p-3">RXN ID</th>
              <th className="p-3">Reactant</th>
              <th className="p-3">Enzyme</th>
              <th className="p-3">Sugar Nucleotide</th>
              <th className="p-3">Product</th>
              <th className="p-3">Cell Location</th>
            </tr>
          </thead>

          <tbody>
            {reactionData.map((reaction, index) => (
              <tr key={index} className="border-b-[5px] border-white bg-[#F1F5F9] hover:bg-gray-100 rounded" >

                <td className="px-4">{reaction.rxnId}</td>
                {/* reactants */}
                <td className="flex flex-col items-start gap-2 pt-[5px]">
                  {reaction.reactants.map((item, index) =>
                    <div key={index} className="px-4 flex items-center gap-2 pt-[5px]">
                      <img
                        src={item.image}
                        alt={item.code}
                        className="w-[60px] h-[36px] object-contain"
                      />
                      <span className="text-violet-900 hover:text-violet-600 cursor-pointer">
                        {item.code}
                      </span>
                    </div>
                  )}
                </td>

                <td className="px-4">{reaction.enzyme}</td>
                <td className="px-4">{reaction.sugarNucleotide}</td>
                {/* products */}
                <td className="lex flex-col items-start gap-2 pt-[5px]">
                  {reaction.products.map((item, index) =>
                    <div key={index} className="px-4 flex items-center gap-2 pt-[5px]">
                      <img
                        src={item.image}
                        alt={item.code}
                        className="w-[60px] h-[36px] object-contain"
                      />
                      <span className="text-violet-900 hover:text-violet-600 cursor-pointer">
                        {item.code}
                      </span>
                    </div>
                  )}
                </td>

                <td className="px-4">{reaction.cellularLocation}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReactionReviewTable;
