import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router';

function NewPathway() {
  const navigate = useNavigate()
  const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(true);
  const [activeTap, setActiveTap] = useState("reactants");
  const [reactions, setReactions] = useState([
    {
      id: 0,
      reactants:
        [
          {
            id: 0,
            cellType: "",
            location: "",
            reactantType: "",
            glycanTextType: "",
            glycanText: "",
            bindingSiteCode: "",
            aminoAcidBindingSite: ""
          }
        ],
      controllers:
        [
          {
            id: 0,
            cellType: "",
            location: "",
            controllerType: "",
            actionType: "",
            goOntology: "",
            notGoOntology: "",
            useNextReaction: false
          }
        ],
      products:
        [
          {
            id: 0,
            cellType: "",
            location: "",
            productType: "",
            bindingSiteCode: "",
            proteinSymbol: "",
            startingSite: "",
            endingSite: "",
            useNextReaction: false
          }
        ]
    }
  ]);

  const [reactionsState, setReactionsState] = useState(
    [
      {
        id: 0,
        state: true,
        reactants: [{ id: 0, state: true }],
        controllers: [{ id: 0, state: true }],
        products: [{ id: 0, state: true }]
      }
    ]
  );

  const [basicInfoData, setBasicInfoData] = useState({
    title: "",
    description: "",
    species: "",
    category: "",
    tissue: "",
    disease: "",
    diseaseInput: ""
  });

  const handleChangeBasicInfo = (e) => {
    const { name, value } = e.target;
    setBasicInfoData({
      ...basicInfoData,
      [name]: value,
    });
  };

  const handleChange = (reactionId, type, index, field, value) => {
    setReactions((prevReactions) =>
      prevReactions.map((reaction) =>
        reaction.id === reactionId
          ? {
            ...reaction,
            [type]: reaction[type].map((item, i) =>
              i === index ? { ...item, [field]: value } : item
            ),
          }
          : reaction
      )
    );
  };

  const handleSubmit = () => {
    console.log("basicInfoData : ", basicInfoData)
    console.log("reactions : ", reactions)
    navigate("/review")

  }

  const toggleState = (type, reactionId, itemId = null) => {
    setReactionsState((prevState) =>
      prevState.map((reaction) => {
        if (reaction.id === reactionId) {
          if (type === "reaction") {
            return { ...reaction, state: !reaction.state };
          }

          const toggleItemState = (items) =>
            items.map((item) =>
              item.id === itemId ? { ...item, state: !item.state } : item
            );

          return {
            ...reaction,
            reactants: type === "reactant" ? toggleItemState(reaction.reactants) : reaction.reactants,
            controllers: type === "controller" ? toggleItemState(reaction.controllers) : reaction.controllers,
            products: type === "product" ? toggleItemState(reaction.products) : reaction.products,
          };
        }
        return reaction;
      })
    );
  };

  // reactions
  const addReaction = () => {
    setReactionsState((prev) => [...prev,
    {
      id: prev[prev.length - 1]?.id + 1 || 0,
      state: true,
      reactants: [{ id: 0, state: true }],
      controllers: [{ id: 0, state: true }],
      products: [{ id: 0, state: true }]
    }
    ]);

    setReactions((prev) => [...prev,
    {
      id: prev[prev.length - 1]?.id + 1 || 0,
      reactants:
        [
          {
            id: 0,
            cellType: "",
            location: "",
            reactantType: "",
            glycanTextType: "",
            glycanText: "",
            bindingSiteCode: "",
            aminoAcidBindingSite: ""
          }
        ],
      controllers:
        [
          {
            id: 0,
            cellType: "",
            location: "",
            controllerType: "",
            actionType: "",
            goOntology: "",
            notGoOntology: "",
            useNextReaction: false
          }
        ],
      products:
        [
          {
            id: 0,
            cellType: "",
            location: "",
            productType: "",
            bindingSiteCode: "",
            proteinSymbol: "",
            startingSite: "",
            endingSite: "",
            useNextReaction: false
          }
        ]
    }
    ])

  };

  const deleteReaction = (id) => {
    setReactions((prev) => prev.filter((reaction) => reaction.id !== id));
    setReactionsState((prev) => prev.filter((reaction) => reaction.id !== id));
  };

  // reactants
  const addReactant = (reactionId) => {
    setReactions((prev) =>
      prev.map((reaction) =>
        reaction.id === reactionId
          ? {
            ...reaction, reactants: [...reaction.reactants,
            {
              id: reaction.reactants[reaction.reactants.length - 1]?.id + 1 || 0,
              cellType: "",
              location: "",
              reactantType: "",
              glycanTextType: "",
              glycanText: "",
              bindingSiteCode: "",
              aminoAcidBindingSite: ""
            }
            ]
          }
          : reaction
      )
    );
    setReactionsState((prev) =>
      prev.map((reaction) =>
        reaction.id === reactionId
          ? { ...reaction, reactants: [...reaction.reactants, { id: reaction.reactants[reaction.reactants.length - 1]?.id + 1 || 0, state: true }] }
          : reaction
      )
    );
  };

  const deleteReactant = (reactionId, reactantId) => {
    setReactions((prev) =>
      prev.map((reaction) =>
        reaction.id === reactionId
          ? { ...reaction, reactants: reaction.reactants.filter((reactant) => reactant.id !== reactantId) }
          : reaction
      )
    );
    setReactionsState((prev) =>
      prev.map((reaction) =>
        reaction.id === reactionId
          ? { ...reaction, reactants: reaction.reactants.filter((reactant) => reactant.id !== reactantId) }
          : reaction
      )
    );
  };

  // controller

  // const addController = (reactionId) => {
  //   setReactions((prev) =>
  //     prev.map((reaction) =>
  //       reaction.id === reactionId
  //         ? {
  //           ...reaction, controllers: [...reaction.controllers,
  //           {
  //             id: reaction.controllers[reaction.controllers.length - 1]?.id + 1 || 0,
  //             cellType: "",
  //             location: "",
  //             controllerType: "",
  //             actionType: "",
  //             goOntology: "",
  //             notGoOntology: "",
  //             useNextReaction: false
  //           }]
  //         }
  //         : reaction
  //     )
  //   );

  //   setReactionsState((prev) =>
  //     prev.map((reaction) =>
  //       reaction.id === reactionId
  //         ? { ...reaction, controllers: [...reaction.controllers, { id: reaction.controllers[reaction.controllers.length - 1]?.id + 1 || 0, state: true }] }
  //         : reaction
  //     )
  //   );

  // };

  const deleteController = (reactionId, controllerId) => {
    setReactions((prev) =>
      prev.map((reaction) =>
        reaction.id === reactionId
          ? { ...reaction, controllers: reaction.controllers.filter((controller) => controller.id !== controllerId) }
          : reaction
      )
    );
    setReactionsState((prev) =>
      prev.map((reaction) =>
        reaction.id === reactionId
          ? { ...reaction, controllers: reaction.controllers.filter((controller) => controller.id !== controllerId) }
          : reaction
      )
    );
  };

  // products

  const addProduct = (reactionId) => {
    setReactions((prev) =>
      prev.map((reaction) =>
        reaction.id === reactionId
          ? {
            ...reaction, products: [...reaction.products, {
              id: reaction.products[reaction.products.length - 1]?.id + 1 || 0,
              cellType: "",
              location: "",
              productType: "",
              bindingSiteCode: "",
              proteinSymbol: "",
              startingSite: "",
              endingSite: "",
              useNextReaction: false
            }]
          }
          : reaction
      )
    );
    setReactionsState((prev) =>
      prev.map((reaction) =>
        reaction.id === reactionId
          ? { ...reaction, products: [...reaction.products, { id: reaction.products[reaction.products.length - 1]?.id + 1 || 0, state: true }] }
          : reaction
      )
    );
  };

  const deleteProduct = (reactionId, productId) => {
    setReactions((prev) =>
      prev.map((reaction) =>
        reaction.id === reactionId
          ? { ...reaction, products: reaction.products.filter((product) => product.id !== productId) }
          : reaction
      )
    );
    setReactionsState((prev) =>
      prev.map((reaction) =>
        reaction.id === reactionId
          ? { ...reaction, products: reaction.products.filter((product) => product.id !== productId) }
          : reaction
      )
    );
  };

  return (
    <div className="min-h-screen px-32 py-10">
      <div className="w-full mx-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white px-2 py-5">
            <h1 className="text-4xl font-black">Add New Pathway</h1>
            <div className="space-x-2">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800" onClick={() => navigate("/")}>Cancel</button>
              <button className="px-4 py-2 bg-[#57369E] text-white rounded" onClick={handleSubmit}>
                Review
              </button>
            </div>
          </div>

          {/* Pathway Basic Information */}
          <div className="mb-6 border rounded-lg">
            <button
              className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 rounded-t-lg"
              onClick={() => setIsBasicInfoOpen(!isBasicInfoOpen)}
            >
              <span className="font-medium">Pathway Basic Information</span>
              {isBasicInfoOpen ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </button>

            {isBasicInfoOpen && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="text-red-500">*</span>Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={basicInfoData.title}
                      onChange={handleChangeBasicInfo}
                      className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Add Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      <span className="text-red-500">*</span> Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={basicInfoData.description}
                      onChange={handleChangeBasicInfo}
                      className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Add Description"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Species</label>
                    <select
                      name="species"
                      value={basicInfoData.species}
                      onChange={handleChangeBasicInfo}
                      className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Species</option>
                      <option value="Human">Human</option>
                      <option value="Mouse">Mouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pathway Category</label>
                    <select
                      name="category"
                      value={basicInfoData.category}
                      onChange={handleChangeBasicInfo}
                      className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      <option value="Metabolic">Metabolic</option>
                      <option value="Signaling">Signaling</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tissue</label>
                    <select
                      name="tissue"
                      value={basicInfoData.tissue}
                      onChange={handleChangeBasicInfo}
                      className="mt-1 block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Tissue</option>
                      <option value="Liver">Liver</option>
                      <option value="Heart">Heart</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Related Disease</label>
                    <div className="space-x-1">
                      <select
                        name="disease"
                        value={basicInfoData.disease}
                        onChange={handleChangeBasicInfo}
                        className="mt-1 w-[49%] rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Type or Select Disease</option>
                        <option value="Diabetes">Diabetes</option>
                        <option value="Cancer">Cancer</option>
                      </select>
                      <input
                        type="text"
                        name="diseaseInput"
                        value={basicInfoData.diseaseInput}
                        onChange={handleChangeBasicInfo}
                        className="mt-1 w-[49%] rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reactions */}
          {reactions.map((reaction, reactionIndex) => (
            <div key={reaction.id} className="border rounded-lg mb-4">
              <div className="bg-[#DDD7EC] rounded-t-lg px-4 py-3 flex justify-between items-center">
                <h2 className="font-medium">Reaction - {reaction.id}</h2>
                <div className="flex items-center space-x-2">
                  <button onClick={() => deleteReaction(reaction.id)} className="p-1 hover:bg-purple-100 rounded">
                    <TrashIcon className="h-5 w-5 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-purple-100 rounded" onClick={() => toggleState("reaction", reaction.id)}>
                    {reactionsState[reactionIndex].state ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {reactionsState[reactionIndex].state && (
                <div className="border-t p-4 bg-[#DDD7EC]">
                  <div className="flex space-x-1 ">
                    <button onClick={() => setActiveTap("reactants")} className={`px-4  py-2 bg-white rounded-t-lg text-gray-500 hover:text-gray-700 ${activeTap === "reactants" && "border-b-2 border-purple-500 font-medium"}`}>
                      Reactants
                    </button>
                    <button onClick={() => setActiveTap("controllers")} className={`px-4  py-2 bg-white rounded-t-lg text-gray-500 hover:text-gray-700 ${activeTap === "controllers" && "border-b-2 border-purple-500 font-medium"}`}>
                      Controllers
                    </button>
                    <button onClick={() => setActiveTap("products")} className={`px-4  py-2 bg-white rounded-t-lg text-gray-500 hover:text-gray-700 ${activeTap === "products" && "border-b-2 border-purple-500 font-medium"}`}>
                      Products
                    </button>
                  </div>

                  {activeTap === "reactants" &&
                    <div className='bg-white rounded-lg pb-2 px-2 rounded-tl-none'>
                      {reaction.reactants.map((item, index) => (
                        <div key={item.id} className="p-4">
                          <div className="border rounded-lg mb-4">
                            <div className="">
                              <div className="flex p-4 border-b justify-between items-center">
                                <span>Reactant {item.id}</span>
                                <div className="flex items-center space-x-2">
                                  <button onClick={() => deleteReactant(reaction.id, item.id)} className="p-1 hover:bg-red-100 rounded">
                                    <TrashIcon className="h-5 w-5 text-gray-500" />
                                  </button>
                                  <button className="p-1 hover:bg-purple-100 rounded" onClick={() => toggleState("reactant", reaction.id, item.id)}>
                                    {reactionsState[reactionIndex].reactants[index].state ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                                  </button>
                                </div>
                              </div>

                              {reactionsState[reactionIndex].reactants[index].state &&
                                <div className="space-y-4 p-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Cell Type
                                      </label>
                                      <select
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={item.cellType}
                                        onChange={(e) =>
                                          handleChange(reaction.id, "reactants", index, "cellType", e.target.value)
                                        }
                                      >
                                        <option value="">Select Cell Type</option>
                                        <option value="a1">A1</option>
                                        <option value="a2">A2</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Cellular Location
                                      </label>
                                      <select
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={item.location}
                                        onChange={(e) =>
                                          handleChange(reaction.id, "reactants", index, "location", e.target.value)
                                        }
                                      >
                                        <option value="">Select Location</option>
                                        <option value="a1">A1</option>
                                        <option value="a2">A2</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Reactant Type
                                    </label>
                                    <select
                                      className="mt-1 border block w-1/2 rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                      value={item.reactantType}
                                      onChange={(e) =>
                                        handleChange(reaction.id, "reactants", index, "reactantType", e.target.value)
                                      }
                                    >
                                      <option value="">Select Reactant Type</option>
                                      <option value="a1">A1</option>
                                      <option value="a2">A2</option>
                                    </select>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Glycan Text Type
                                      </label>
                                      <select
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={item.glycanTextType}
                                        onChange={(e) =>
                                          handleChange(reaction.id, "reactants", index, "glycanTextType", e.target.value)
                                        }
                                      >
                                        <option value="">Select Glycan Text Type</option>
                                        <option value="a1">A1</option>
                                        <option value="a2">A2</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Glycan Text
                                      </label>
                                      <input
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Type Glycan Text"
                                        value={item.glycanText}
                                        onChange={(e) =>
                                          handleChange(reaction.id, "reactants", index, "glycanText", e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <span className="font-bold text-xs block py-4">
                                      Binding Backbone Information
                                    </span>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                          Binding Site Code
                                        </label>
                                        <input
                                          type="text"
                                          className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                          placeholder="Three letters code of binding site (e.g. ser, tyr...)"
                                          value={item.bindingSiteCode}
                                          onChange={(e) =>
                                            handleChange(reaction.id, "reactants", index, "bindingSiteCode", e.target.value)
                                          }
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                          Number of Amino Acid Binding Site
                                        </label>
                                        <input
                                          type="text"
                                          className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                          placeholder="Type number of amino acid binding site (e.g. 123)"
                                          value={item.aminoAcidBindingSite}
                                          onChange={(e) =>
                                            handleChange(reaction.id, "reactants", index, "aminoAcidBindingSite", e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              }
                            </div>
                          </div>


                        </div>
                      ))}
                      <button onClick={() => addReactant(reaction.id)} className="flex items-center text-blue-600 hover:text-blue-700 mt-5">
                        <PlusIcon className="h-5 w-5 mr-1" /> Add New Reactant
                      </button>
                    </div>
                  }

                  {activeTap === "controllers" &&
                    <div className='bg-white rounded-lg pb-2 px-2 rounded-tl-none' >
                      {reaction.controllers.map((item, index) => (
                        <div key={item.id} className="p-4">
                          <div className="border rounded-lg mb-4">
                            <div className="">
                              <div className="flex p-4 border-b justify-between items-center">
                                <span>controller {item.id}</span>
                                <div className="flex items-center space-x-2">
                                  <button onClick={() => deleteController(reaction.id, item.id)} className="p-1 hover:bg-red-100 rounded">
                                    <TrashIcon className="h-5 w-5 text-gray-500" />
                                  </button>
                                  <button className="p-1 hover:bg-purple-100 rounded" onClick={() => toggleState("controller", reaction.id, item.id)}>
                                    {reactionsState[reactionIndex].controllers[index].state ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                                  </button>
                                </div>
                              </div>

                              {reactionsState[reactionIndex].controllers[index].state &&
                                <div className="space-y-4 p-4">

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Cell Type
                                      </label>
                                      <select
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={item.cellType}
                                        onChange={(e) =>
                                          handleChange(reaction.id, "controllers", index, "cellType", e.target.value)
                                        }
                                      >
                                        <option value="">Select Cell Type</option>
                                        <option value="a1">A1</option>
                                        <option value="a2">A2</option>
                                      </select>
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Cellular Location
                                      </label>
                                      <select
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={item.location}
                                        onChange={(e) =>
                                          handleChange(reaction.id, "controllers", index, "location", e.target.value)
                                        }
                                      >
                                        <option value="">Select Location</option>
                                        <option value="a1">A1</option>
                                        <option value="a2">A2</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Controller Type
                                      </label>
                                      <select
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={item.controllerType}
                                        onChange={(e) =>
                                          handleChange(reaction.id, "controllers", index, "controllerType", e.target.value)
                                        }
                                      >
                                        <option value="">Select Controller Type</option>
                                        <option value="a1">A1</option>
                                        <option value="a2">A2</option>
                                      </select>
                                    </div>

                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Action Type
                                      </label>
                                      <select
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={item.actionType}
                                        onChange={(e) =>
                                          handleChange(reaction.id, "controllers", index, "actionType", e.target.value)
                                        }
                                      >
                                        <option value="">Select Action Type</option>
                                        <option value="a1">A1</option>
                                        <option value="a2">A2</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        When your complex is in GO ontology complex.
                                      </label>
                                      <div className=' space-x-2'>
                                        <input
                                          type="text"
                                          className="mt-1 border w-[49%] rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                          value={item.goOntology}
                                          onChange={(e) =>
                                            handleChange(reaction.id, "controllers", index, "goOntology", e.target.value)
                                          }
                                        />
                                        <input
                                          type="text"
                                          className="mt-1 border w-[49%] rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        When your complex is not in GO ontology complex.
                                      </label>
                                      <input
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={item.notGoOntology}
                                        onChange={(e) =>
                                          handleChange(reaction.id, "controllers", index, "notGoOntology", e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-x-3">
                                      <input
                                        type="checkbox"
                                        checked={item.useNextReaction}
                                        onChange={(e) =>
                                          handleChange(
                                            reaction.id,
                                            "controllers",
                                            index,
                                            "useNextReaction",
                                            e.target.checked
                                          )
                                        }
                                      />
                                      <label className="text-sm font-medium text-gray-700">
                                        Use this Controller in the next reaction
                                      </label>
                                    </div>
                                  </div>


                                </div>
                              }
                            </div>
                          </div>


                        </div>
                      ))}
                      {/* <button onClick={() => addController(reaction.id)} className="flex items-center text-blue-600 hover:text-blue-700 mt-5">
                        <PlusIcon className="h-5 w-5 mr-1" /> Add New controller
                      </button> */}
                    </div>
                  }

                  {activeTap === "products" &&
                    <div className='bg-white rounded-lg pb-2 px-2 rounded-tl-none'>
                      {reaction.products.map((item, index) => (
                        <div key={item.id} className="p-4">
                          <div className="border rounded-lg mb-4">
                            <div className="">
                              <div className="flex p-4 border-b justify-between items-center">
                                <span>Product - {item.id}</span>
                                <div className="flex items-center space-x-2">
                                  <button onClick={() => deleteProduct(reaction.id, item.id)} className="p-1 hover:bg-red-100 rounded">
                                    <TrashIcon className="h-5 w-5 text-gray-500" />
                                  </button>
                                  <button className="p-1 hover:bg-purple-100 rounded" onClick={() => toggleState("product", reaction.id, item.id)}>
                                    {reactionsState[reactionIndex].products[index].state ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                                  </button>
                                </div>
                              </div>

                              {reactionsState[reactionIndex].products[index].state &&
                                <div className="space-y-4 p-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Cell Type</label>
                                      <select
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={item.cellType}
                                        onChange={(e) => handleChange(reaction.id, "products", index, "cellType", e.target.value)}
                                      >
                                        <option value="">Select Cell Type</option>
                                        <option value="a1">A1</option>
                                        <option value="a2">A2</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">Cellular Location</label>
                                      <select
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={item.location}
                                        onChange={(e) => handleChange(reaction.id, "products", index, "location", e.target.value)}
                                      >
                                        <option value="">Select Location</option>
                                        <option value="a1">A1</option>
                                        <option value="a2">A2</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Product Type</label>
                                    <select
                                      className="mt-1 border block w-1/2 rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                      value={item.productType}
                                      onChange={(e) => handleChange(reaction.id, "products", index, "productType", e.target.value)}
                                    >
                                      <option value="">Select Product Type</option>
                                      <option value="a1">A1</option>
                                      <option value="a2">A2</option>
                                    </select>
                                  </div>

                                  <div>
                                    <span className=' font-bold text-xs block py-4'>Protein Name</span>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                          Binding site Code
                                        </label>
                                        <input
                                          type="text"
                                          className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                          placeholder="Three letters code of binding site (e.g. ser, tyr...)"
                                          value={item.bindingSiteCode}
                                          onChange={(e) => handleChange(reaction.id, "products", index, "bindingSiteCode", e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Protein Symbol</label>
                                        <input
                                          type="text"
                                          className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                          placeholder="Type protein symbol"
                                          value={item.proteinSymbol}
                                          onChange={(e) => handleChange(reaction.id, "products", index, "proteinSymbol", e.target.value)}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <span className=' font-bold text-xs block py-4'>Protein size (Fragmented protein size information)</span>

                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Starting Site</label>
                                        <input
                                          type="text"
                                          className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                          placeholder="Starting site"
                                          value={item.startingSite}
                                          onChange={(e) => handleChange(reaction.id, "products", index, "startingSite", e.target.value)}
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Ending Site</label>
                                        <input
                                          type="text"
                                          className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                          placeholder="Ending site"
                                          value={item.endingSite}
                                          onChange={(e) => handleChange(reaction.id, "products", index, "endingSite", e.target.value)}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className='space-x-3'>
                                      <input
                                        type="checkbox"
                                        checked={item.useNextReaction}
                                        onChange={(e) => handleChange(reaction.id, "products", index, "useNextReaction", e.target.checked)}
                                      />
                                      <label className="text-sm font-medium text-gray-700">Use this product in the next reaction</label>
                                    </div>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>


                        </div>
                      ))}
                      <button onClick={() => addProduct(reaction.id)} className="flex items-center text-blue-600 hover:text-blue-700 mt-5">
                        <PlusIcon className="h-5 w-5 mr-1" /> Add New Products
                      </button>
                    </div>
                  }

                </div>
              )}
            </div>
          ))}

          <button onClick={addReaction} className="mt-4 bg-white border border-[#57369E] text-[#57369E] flex items-center justify-center p-3 mx-auto font-bold">
            <PlusIcon className="h-5 w-5 mr-1" /> Add New Reaction
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPathway;
