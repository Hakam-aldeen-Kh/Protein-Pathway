import { ChevronDownIcon, ChevronUpIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import Modal from "react-modal";
import DeleteModal from "../common/DeleteModal";
import Button from "./Button";
// import InputField from "./InputField";
// import SelectField from "./SelectField";
// import Button from "./Button";

Modal.setAppElement("#root");

const AddModal = ({ isOpen, setIsOpen, addReaction, title }) => {
  const [activeTabs, setActiveTabs] = useState({});
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

  const [modalData, setModalData] = useState({
    isModalOpen: false,
    closeModal: () => console.log("click"),
    title: "",
    handleDelete: () => console.log("click")
  });

  const closeModal = () => setModalData((prev) => ({ ...prev, isModalOpen: false }))


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

  // // reactions
  // const addReaction = () => {
  //   setReactionsState((prev) => [...prev,
  //   {
  //     id: prev[prev.length - 1]?.id + 1 || 0,
  //     state: true,
  //     reactants: [{ id: 0, state: true }],
  //     controllers: [{ id: 0, state: true }],
  //     products: [{ id: 0, state: true }]
  //   }
  //   ]);

  //   setReactions((prev) => [...prev,
  //   {
  //     id: prev[prev.length - 1]?.id + 1 || 0,
  //     reactants:
  //       [
  //         {
  //           id: 0,
  //           cellType: "",
  //           location: "",
  //           reactantType: "",
  //           glycanTextType: "",
  //           glycanText: "",
  //           bindingSiteCode: "",
  //           aminoAcidBindingSite: ""
  //         }
  //       ],
  //     controllers:
  //       [
  //         {
  //           id: 0,
  //           cellType: "",
  //           location: "",
  //           controllerType: "",
  //           actionType: "",
  //           goOntology: "",
  //           notGoOntology: "",
  //           useNextReaction: false
  //         }
  //       ],
  //     products:
  //       [
  //         {
  //           id: 0,
  //           cellType: "",
  //           location: "",
  //           productType: "",
  //           bindingSiteCode: "",
  //           proteinSymbol: "",
  //           startingSite: "",
  //           endingSite: "",
  //           useNextReaction: false
  //         }
  //       ]
  //   }
  //   ])

  // };

  // const deleteReaction = (id) => {
  //   setModalData({
  //     isModalOpen: true,
  //     closeModal,
  //     title: "Reaction",
  //     handleDelete: () => {
  //       setReactions((prev) => prev.filter((reaction) => reaction.id !== id));
  //       setReactionsState((prev) => prev.filter((reaction) => reaction.id !== id));
  //     }
  //   })
  // };

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
    setModalData({
      isModalOpen: true,
      closeModal,
      title: "Reactant",
      handleDelete: () => {
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
      }
    })
  };

  // controller

  const addController = (reactionId) => {
    setReactions((prev) =>
      prev.map((reaction) =>
        reaction.id === reactionId
          ? {
            ...reaction, controllers: [...reaction.controllers,
            {
              id: reaction.controllers[reaction.controllers.length - 1]?.id + 1 || 0,
              cellType: "",
              location: "",
              controllerType: "",
              actionType: "",
              goOntology: "",
              notGoOntology: "",
              useNextReaction: false
            }]
          }
          : reaction
      )
    );

    setReactionsState((prev) =>
      prev.map((reaction) =>
        reaction.id === reactionId
          ? { ...reaction, controllers: [...reaction.controllers, { id: reaction.controllers[reaction.controllers.length - 1]?.id + 1 || 0, state: true }] }
          : reaction
      )
    );

  };

  const deleteController = (reactionId, controllerId) => {
    setModalData({
      isModalOpen: true,
      closeModal,
      title: "Contoller",
      handleDelete: () => {
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
      }
    })
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
    setModalData({
      isModalOpen: true,
      closeModal,
      title: "Product",
      handleDelete: () => {
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
      }
    })
  };

  const getActiveTab = (id) => activeTabs[id] || "reactants"; // Default to "reactants"

  const handleTabChange = (id, tab) => {
    setActiveTabs((prev) => ({
      ...prev,
      [id]: tab,
    }));
  };



  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pendingCheck, setPendingCheck] = useState(null);

  const openModal = () => setModalIsOpen(true);
  const closeCheckModal = () => setModalIsOpen(false);

  const confirmChange = () => {
    pendingCheck.change()
    setModalIsOpen(false);
  };

  const handleCheckboxChange = (reactionId, field, index, key, value) => {
    openModal();
    setPendingCheck({
      change: () => handleChange(reactionId, field, index, key, value),
    });
  };
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.50)",
    },
    content: {
      top: "20px",
      left: "50%",
      right: "auto",
      bottom: "20px",
      marginRight: "-50%",
      transform: "translate(-50%)",
      padding: "20px",
      borderRadius: "8px",
      width: "920px",
      background: "white",
      height: "auto",
      position: "relative"
    },
  };

  const closeMainModal = () => {
    setIsOpen(false)
    setReactions(
      [
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
      ]
    )

    setReactionsState(
      [
        {
          id: 0,
          state: true,
          reactants: [{ id: 0, state: true }],
          controllers: [{ id: 0, state: true }],
          products: [{ id: 0, state: true }]
        }
      ]
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeMainModal}
      style={customStyles}
      bodyOpenClassName="ReactModal__Body--open"
      htmlOpenClassName={
        "ReactModal__Html--open"}
      contentLabel="Edit Reaction Modal"
    >
      <div className="flex justify-between items-center pb-5">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={closeMainModal}>
          <img src="/images/icons/close.svg" alt="Close" />
        </button>
      </div>

      <div className="flex flex-col space-y-5 bg-white rounded-lg">
        {reactionsState[0].state && (
          <div className="border-t p-4 bg-[#DDD7EC]">
            <div className="flex space-x-1 ">
              <button onClick={() => handleTabChange(0, "reactants")} className={`px-4  py-2 bg-white rounded-t-lg text-gray-500 hover:text-gray-700 ${getActiveTab(0) === "reactants" && "border-b-2 border-purple-500 font-medium"}`}>
                Reactants
              </button>
              <button onClick={() => handleTabChange(0, "controllers")} className={`px-4  py-2 bg-white rounded-t-lg text-gray-500 hover:text-gray-700 ${getActiveTab(0) === "controllers" && "border-b-2 border-purple-500 font-medium"}`}>
                Controllers
              </button>
              <button onClick={() => handleTabChange(0, "products")} className={`px-4  py-2 bg-white rounded-t-lg text-gray-500 hover:text-gray-700 ${getActiveTab(0) === "products" && "border-b-2 border-purple-500 font-medium"}`}>
                Products
              </button>
            </div>

            {getActiveTab(0) === "reactants" &&
              <div className='bg-white rounded-lg pb-2 px-2 rounded-tl-none'>
                {reactions[0].reactants.map((item, index) => (
                  <div key={item.id} className="p-4">
                    <div className="border rounded-lg mb-4">
                      <div className="">
                        <div className="flex p-4 border-b justify-between items-center">
                          <span>Reactant {item.id}</span>
                          <div className="flex items-center space-x-2">
                            <button onClick={() => deleteReactant(0, item.id)} className="p-1 hover:bg-red-100 rounded">
                              <TrashIcon className="h-5 w-5 text-gray-500" />
                            </button>
                            <button className="p-1 hover:bg-purple-100 rounded" onClick={() => toggleState("reactant", 0, item.id)}>
                              {reactionsState[0].reactants[index].state ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        {reactionsState[0].reactants[index].state &&
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
                                    handleChange(0, "reactants", index, "cellType", e.target.value)
                                  }
                                >
                                  <option value="">Select Cell Type</option>
                                  <option value="embryonic cell">embryonic cell</option>
                                  <option value="prokaryotic cell">prokaryotic cell</option>
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
                                    handleChange(0, "reactants", index, "location", e.target.value)
                                  }
                                >
                                  <option value="">Select Location</option>
                                  <option value="golgi">Golgi</option>
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
                                  handleChange(0, "reactants", index, "reactantType", e.target.value)
                                }
                              >
                                <option value="">Select Reactant Type</option>
                                <option value="complex">Complex</option>
                                <option value="protein">Protein</option>
                                <option value="glycan">Glycan</option>
                                <option value="small_molecule">Small molecule</option>
                                <option value="dna">DNA</option>
                              </select>
                            </div>

                            {item.reactantType === "complex" &&
                              <>

                                <div>
                                  <span className="font-bold text-xs block py-4">
                                    When you re complex is in GO ontology complex
                                  </span>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Symbolic Name
                                      </label>
                                      <input
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Symbolic Name (NF-KappaB p50/p65 complex)"
                                      // value={item.glycanTextType}
                                      // onChange={(e) =>
                                      //   handleChange(0, "reactants", index, "glycanTextType", e.target.value)
                                      // }
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Complex Symbol
                                      </label>
                                      <input
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Complex Symbol"
                                      // value={item.glycanText}
                                      // onChange={(e) =>
                                      //   handleChange(0, "reactants", index, "glycanText", e.target.value)
                                      // }
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <span className="font-bold text-xs block py-4">
                                    When you re complex is NOT in GO ontology complex
                                  </span>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Complex Name
                                      </label>
                                      <input
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Type The Complex Name"
                                      // value={item.bindingSiteCode}
                                      // onChange={(e) =>
                                      //   handleChange(0, "reactants", index, "bindingSiteCode", e.target.value)
                                      // }
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Complex Symbol
                                      </label>
                                      <input
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Complex Symbol"
                                      // value={item.aminoAcidBindingSite}
                                      // onChange={(e) =>
                                      //   handleChange(0, "reactants", index, "aminoAcidBindingSite", e.target.value)
                                      // }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            }

                            {item.reactantType === "protein" &&
                              <>
                                <div>
                                  <span className="font-bold text-xs block py-4">
                                    Protein Name
                                  </span>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Symbolic Name
                                      </label>
                                      <select
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Symbolic Name (NF-KappaB p50/p65 complex)"
                                      // value={item.glycanTextType}
                                      // onChange={(e) =>
                                      //   handleChange(0, "reactants", index, "glycanTextType", e.target.value)
                                      // }
                                      >
                                        <option value="">Select Symbolic Name</option>
                                        <option value="NF-KappaB p50/p65 complex">NF-KappaB p50/p65 complex</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Protein Symbol
                                      </label>
                                      <input
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Protein Symbol (e.g. RecA)"
                                      // value={item.glycanText}
                                      // onChange={(e) =>
                                      //   handleChange(0, "reactants", index, "glycanText", e.target.value)
                                      // }
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <span className="font-bold text-xs block py-4">
                                    Protein Modification
                                  </span>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Modifying site
                                      </label>
                                      <input
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Modifying site of amino acid (number)"
                                      // value={item.bindingSiteCode}
                                      // onChange={(e) =>
                                      //   handleChange(0, "reactants", index, "bindingSiteCode", e.target.value)
                                      // }
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Modifying Type
                                      </label>
                                      <select
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Modifying type (PSI-MOD, e.g. “sulfated residue”)"
                                      // value={item.aminoAcidBindingSite}
                                      // onChange={(e) =>
                                      //   handleChange(0, "reactants", index, "aminoAcidBindingSite", e.target.value)
                                      // }
                                      >
                                        <option value="">Select Modifying Type</option>
                                        <option value="sulfated residue">sulfated residue</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </>
                            }

                            {item.reactantType === "glycan" &&
                              <>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Glycan Text Type
                                    </label>
                                    <select
                                      className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    // value={item.glycanTextType}
                                    // onChange={(e) =>
                                    //   handleChange(0, "reactants", index, "glycanTextType", e.target.value)
                                    // }
                                    >
                                      <option value="">Select Glycan Text Type</option>
                                      <option value="Linear code">Linear code</option>
                                      <option value="IUPAC Extended">IUPAC Extended</option>
                                      <option value="IUPAC condensed">IUPAC condensed</option>
                                      <option value="GlyTouCan ID">GlyTouCan ID</option>
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
                                    // value={item.glycanText}
                                    // onChange={(e) =>
                                    //   handleChange(0, "reactants", index, "glycanText", e.target.value)
                                    // }
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
                                      // value={item.bindingSiteCode}
                                      // onChange={(e) =>
                                      //   handleChange(0, "reactants", index, "bindingSiteCode", e.target.value)
                                      // }
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
                                      // value={item.aminoAcidBindingSite}
                                      // onChange={(e) =>
                                      //   handleChange(0, "reactants", index, "aminoAcidBindingSite", e.target.value)
                                      // }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            }

                            {item.reactantType === "small_molecule" &&
                              <>
                                <div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Small Molecule
                                      </label>
                                      <select
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                      // value={item.bindingSiteCode}
                                      // onChange={(e) =>
                                      //   handleChange(reaction.id, "reactants", index, "bindingSiteCode", e.target.value)
                                      // }
                                      >
                                        <option value="">Select Small Molecule</option>
                                        <option value="ATP">ATP</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Lipid
                                      </label>
                                      <select
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Lipid name or LIPIDMAPS (e.g. Sphinganin-1-phosphocholine)"
                                      // value={item.aminoAcidBindingSite}
                                      // onChange={(e) =>
                                      //   handleChange(reaction.id, "reactants", index, "aminoAcidBindingSite", e.target.value)
                                      // }
                                      >
                                        <option value="">Select Lipid name or LIPIDMAPS</option>
                                        <option value="Sphinganin-1-phosphocholine">Sphinganin-1-phosphocholine</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </>
                            }

                            {item.reactantType === "dna" &&
                              <>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Gene Name
                                    </label>
                                    <input
                                      type="text"
                                      className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                      placeholder="Gene Name"
                                    // value={item.bindingSiteCode}
                                    // onChange={(e) =>
                                    //   handleChange(0, "reactants", index, "bindingSiteCode", e.target.value)
                                    // }
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Chromosom Number
                                    </label>
                                    <input
                                      type="text"
                                      className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                      placeholder="Chromosom Number"
                                    // value={item.aminoAcidBindingSite}
                                    // onChange={(e) =>
                                    //   handleChange(0, "reactants", index, "aminoAcidBindingSite", e.target.value)
                                    // }
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        P (long arm) or Q (short arm)
                                      </label>
                                      <input
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Name"
                                      // value={item.bindingSiteCode}
                                      // onChange={(e) =>
                                      //   handleChange(0, "reactants", index, "bindingSiteCode", e.target.value)
                                      // }
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Specific band location
                                      </label>
                                      <input
                                        type="text"
                                        className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Specific band location (number)"
                                      // value={item.aminoAcidBindingSite}
                                      // onChange={(e) =>
                                      //   handleChange(0, "reactants", index, "aminoAcidBindingSite", e.target.value)
                                      // }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            }

                          </div>
                        }
                      </div>
                    </div>


                  </div>
                ))}
                <button onClick={() => addReactant(0)} className="flex items-center text-blue-600 hover:text-blue-700 mt-5">
                  <PlusIcon className="h-5 w-5 mr-1" /> Add New Reactant
                </button>
              </div>
            }

            {getActiveTab(0) === "controllers" &&
              <div className='bg-white rounded-lg pb-2 px-2 rounded-tl-none' >
                {reactions[0].controllers.map((item, index) => (
                  <div key={item.id} className="p-4">
                    <div className="border rounded-lg mb-4">
                      <div className="">
                        <div className="flex p-4 border-b justify-between items-center">
                          <span>Controller {item.id}</span>
                          <div className="flex items-center space-x-2">
                            <button onClick={() => deleteController(0, item.id)} className="p-1 hover:bg-red-100 rounded">
                              <TrashIcon className="h-5 w-5 text-gray-500" />
                            </button>
                            <button className="p-1 hover:bg-purple-100 rounded" onClick={() => toggleState("controller", 0, item.id)}>
                              {reactionsState[0].controllers[index].state ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        {reactionsState[0].controllers[index].state &&
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
                                    handleChange(0, "controllers", index, "cellType", e.target.value)
                                  }
                                >
                                  <option value="">Select Cell Type</option>
                                  <option value="embryonic cell">embryonic cell</option>
                                  <option value="prokaryotic cell">prokaryotic cell</option>
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
                                    handleChange(0, "controllers", index, "location", e.target.value)
                                  }
                                >
                                  <option value="">Select Location</option>
                                  <option value="golgi">Golgi</option>
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
                                    handleChange(0, "controllers", index, "controllerType", e.target.value)
                                  }
                                >
                                  <option value="">Select Controller Type</option>
                                  <option value="protein">Protein</option>
                                  <option value="enzyme">Enzyme</option>
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
                                    handleChange(0, "controllers", index, "actionType", e.target.value)
                                  }
                                >
                                  <option value="">Select Action Type</option>
                                  <option value="activation">Activation</option>
                                  <option value="inhibition">Inhibition</option>
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
                                    className="mt-1 border w-[48%] rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value={item.goOntology}
                                    onChange={(e) =>
                                      handleChange(0, "controllers", index, "goOntology", e.target.value)
                                    }
                                  />
                                  <input
                                    type="text"
                                    className="mt-1 border w-[48%] rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                                    handleChange(0, "controllers", index, "notGoOntology", e.target.value)
                                  }
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-x-3">
                                <input
                                  type="checkbox"
                                  id={`useNextReactionController-${0}-${index}`}
                                  checked={item.useNextReaction}
                                  onChange={(e) =>
                                    handleChange(
                                      0,
                                      "controllers",
                                      index,
                                      "useNextReaction",
                                      e.target.checked
                                    )
                                  }
                                />
                                <label htmlFor={`useNextReactionController-${0}-${index}`} className="text-sm cursor-pointer font-medium text-gray-700">
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
                {reactions[0].controllers.length < 1 && <button onClick={() => addController(0)} className="flex items-center text-blue-600 hover:text-blue-700 mt-5">
                  <PlusIcon className="h-5 w-5 mr-1" /> Add New controller
                </button>}
              </div>
            }

            {getActiveTab(0) === "products" &&
              <div className='bg-white rounded-lg pb-2 px-2 rounded-tl-none'>
                {reactions[0].products.map((item, index) => (
                  <div key={item.id} className="p-4">
                    <div className="border rounded-lg mb-4">
                      <div className="">
                        <div className="flex p-4 border-b justify-between items-center">
                          <span>Product - {item.id}</span>
                          <div className="flex items-center space-x-2">
                            <button onClick={() => deleteProduct(0, item.id)} className="p-1 hover:bg-red-100 rounded">
                              <TrashIcon className="h-5 w-5 text-gray-500" />
                            </button>
                            <button className="p-1 hover:bg-purple-100 rounded" onClick={() => toggleState("product", 0, item.id)}>
                              {reactionsState[0].products[index].state ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        {reactionsState[0].products[index].state &&
                          <div className="space-y-4 p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Cell Type</label>
                                <select
                                  className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  value={item.cellType}
                                  onChange={(e) => handleChange(0, "products", index, "cellType", e.target.value)}
                                >
                                  <option value="">Select Cell Type</option>
                                  <option value="embryonic cell">embryonic cell</option>
                                  <option value="prokaryotic cell">prokaryotic cell</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Cellular Location</label>
                                <select
                                  className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  value={item.location}
                                  onChange={(e) => handleChange(0, "products", index, "location", e.target.value)}
                                >
                                  <option value="">Select Location</option>
                                  <option value="golgi">Golgi</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">Product Type</label>
                              <select
                                className="mt-1 border block w-1/2 rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={item.productType}
                                onChange={(e) => handleChange(0, "products", index, "productType", e.target.value)}
                              >
                                <option value="">Select Product Type</option>
                                <option value="protein">Protein</option>
                                <option value="complex">Complex</option>
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
                                    onChange={(e) => handleChange(0, "products", index, "bindingSiteCode", e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Protein Symbol</label>
                                  <input
                                    type="text"
                                    className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Type protein symbol"
                                    value={item.proteinSymbol}
                                    onChange={(e) => handleChange(0, "products", index, "proteinSymbol", e.target.value)}
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
                                    onChange={(e) => handleChange(0, "products", index, "startingSite", e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Ending Site</label>
                                  <input
                                    type="text"
                                    className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Ending site"
                                    value={item.endingSite}
                                    onChange={(e) => handleChange(0, "products", index, "endingSite", e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className='space-x-3'>
                                <input
                                  type="checkbox"
                                  id={`useNextReaction-${0}-${index}`}
                                  checked={item.useNextReaction}
                                  onChange={(e) => {
                                    if (item.useNextReaction) {
                                      handleChange(0, "products", index, "useNextReaction", e.target.checked)
                                    }
                                    else {
                                      handleCheckboxChange(0, "products", index, "useNextReaction", e.target.checked)
                                    }
                                  }}
                                />
                                <label htmlFor={`useNextReaction-${0}-${index}`} className="text-sm cursor-pointer font-medium text-gray-700">Use this product in the next reaction</label>
                              </div>
                            </div>

                            {item.useNextReaction &&
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Type</label>
                                  <select
                                    className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value={item.type}
                                    onChange={(e) => handleChange(0, "products", index, "type", e.target.value)}
                                  >
                                    <option value="">Type</option>
                                    <option value="reactant">Ractant</option>
                                    <option value="controller">Controller</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700">Targeted Reaction</label>
                                  <select
                                    disabled={!item.type}
                                    className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  // value={item.productType}
                                  // onChange={(e) => handleChange(0, "products", index, "productType", e.target.value)}
                                  >
                                    <option value="">Select reaction</option>
                                    {reactions.map(item =>
                                      <option key={item.id} value={item.id}>Reaction {item.id}</option>
                                    )}
                                  </select>
                                </div>
                              </div>
                            }
                          </div>
                        }
                      </div>
                    </div>


                  </div>
                ))}
                <button onClick={() => addProduct(0)} className="flex items-center text-blue-600 hover:text-blue-700 mt-5">
                  <PlusIcon className="h-5 w-5 mr-1" /> Add New Products
                </button>
              </div>
            }

          </div>
        )}

        <DeleteModal data={modalData} />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeCheckModal}
          contentLabel="Confirm Action"
          className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <h2 className="text-lg font-semibold mb-4">Use In Next Reaction</h2>
          <p>Are you sure you want to use this Product - 01 in next Reaction?</p>
          <div className="flex justify-end mt-4 space-x-2">
            <button onClick={closeCheckModal} className="px-4 w-[48%] py-2 bg-gray-300 rounded">Cancel</button>
            <button onClick={confirmChange} className="px-4 w-[48%] py-2 bg-[#57369E] text-white rounded">Confirm</button>
          </div>
        </Modal>
      </div>

      {/* Buttons */}
      <div className="flex gap-5 justify-center mt-10">
        <Button variant="secondary" onClick={closeMainModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {
          setIsOpen(false)
          addReaction()
        }}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default AddModal;
