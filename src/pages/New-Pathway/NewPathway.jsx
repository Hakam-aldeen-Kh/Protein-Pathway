import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate, useOutletContext } from 'react-router';
import DeleteModal from '../../common/DeleteModal';
import Modal from "react-modal";
import BasicInfoForm from '../../components/new-pathway/BasicInfoForm';
import Accordion from '../../components/new-pathway/Accordion';
import ReactantForm from '../../components/new-pathway/ReactantForm';

function NewPathway() {

  const { pathwayData, setPathwayData, cancle } = useOutletContext();

  const navigate = useNavigate()

  const [modalData, setModalData] = useState({
    isModalOpen: false,
    closeModal: () => console.log("click"),
    title: "",
    handleDelete: () => console.log("click")
  });

  const [activeTabs, setActiveTabs] = useState({});

  const closeModal = () => setModalData((prev) => ({ ...prev, isModalOpen: false }))


  const handleChangePathwayData = (e) => {
    const { name, value } = e.target;
    setPathwayData({
      ...pathwayData,
      [name]: value,
    });
  }

  const handleChangeData = (reactionId, type, index, e, v) => {
    const { name, value, checked } = e.target;

    setPathwayData((prevPathwayData) => ({
      ...prevPathwayData,
      reactions: prevPathwayData.reactions.map((reaction) =>
        reaction.id === reactionId
          ? {
            ...reaction,
            [type]: reaction[type].map((item, i) =>
              i === index ? { ...item, [name]: value === "on" ? v ? v : checked : value } : item
            ),
          }
          : reaction
      ),
    }));
  }

  const handleSubmit = () => {

    console.log("pathwayData : ", pathwayData)

    // localStorage.setItem('pathwayData', JSON.stringify({ ...pathwayData, reactions: reactions }));
    // setPathwayData({ ...pathwayData, reactions: reactions })

    navigate("/review")

  }

  // reactions
  const addReaction = () => {
    setPathwayData((prevPathwayData) => ({
      ...prevPathwayData,
      reactions: [...prevPathwayData.reactions, {
        id: prevPathwayData.reactions[prevPathwayData.reactions.length - 1]?.id + 1 || 0,
        reactants: [{
          id: 0,
          name: `reactant_${prevPathwayData.reactions[prevPathwayData.reactions.length - 1]?.id + 1 || 0}.0`
        }],
        controllers: [{
          id: 0,
          name: `controller_${prevPathwayData.reactions[prevPathwayData.reactions.length - 1]?.id + 1 || 0}.0`
        }],
        products: [{
          id: 0,
          name: `product_${prevPathwayData.reactions[prevPathwayData.reactions.length - 1]?.id + 1 || 0}.0`
        }]
      }]
    }));

  };

  const deleteReaction = (id) => {
    setModalData({
      isModalOpen: true,
      closeModal,
      title: "Reaction",
      handleDelete: () => {
        setPathwayData((prevPathwayData) => ({
          ...prevPathwayData,
          reactions: prevPathwayData.reactions.filter((reaction) => reaction.id !== id)
        }));
      }
    })
  };

  // reactants
  const addReactant = (reactionId) => {
    setPathwayData((prevPathwayData) => ({
      ...prevPathwayData,
      reactions: prevPathwayData.reactions.map((reaction) =>
        reaction.id === reactionId
          ? {
            ...reaction,
            reactants: [
              ...reaction.reactants,
              {
                id: reaction.reactants[reaction.reactants.length - 1]?.id + 1 || 0,
                name: `reactant_${reactionId}.${reaction.reactants[reaction.reactants.length - 1]?.id + 1 || 0}`
              }
            ]
          }
          : reaction
      )
    }));
  };

  const deleteReactant = (reactionId, reactantId) => {
    setModalData({
      isModalOpen: true,
      closeModal,
      title: "Reactant",
      handleDelete: () => {
        setPathwayData((prevPathwayData) => (
          {
            ...prevPathwayData,
            reactions: prevPathwayData.reactions.map((reaction) =>
              reaction.id === reactionId
                ? {
                  ...reaction,
                  reactants: reaction.reactants.filter((reactant) => reactant.id !== reactantId)
                }
                : reaction
            )
          }
        ))
      }
    })
  };

  // controller
  const addController = (reactionId) => {
    setPathwayData((prevPathwayData) =>
    (
      {
        ...prevPathwayData,
        reactions: prevPathwayData.reactions.map((reaction) =>
          reaction.id === reactionId
            ? {
              ...reaction,
              controllers: [
                ...reaction.controllers,
                {
                  id: reaction.controllers[reaction.controllers.length - 1]?.id + 1 || 0,
                  name: `controller_${reactionId}.${reaction.controllers[reaction.controllers.length - 1]?.id + 1 || 0}`
                }
              ]
            }
            : reaction
        )
      }))
  };

  const deleteController = (reactionId, controllerId) => {
    setModalData({
      isModalOpen: true,
      closeModal,
      title: "Contoller",
      handleDelete: () => {
        setPathwayData((prevPathwayData) =>
        (
          {
            ...prevPathwayData,
            reactions: prevPathwayData.reactions.map((reaction) =>
              reaction.id === reactionId
                ? {
                  ...reaction,
                  controllers: reaction.controllers.filter((controller) => controller.id !== controllerId)
                }
                : reaction
            )
          }))
      }
    })
  };

  // products
  const addProduct = (reactionId) => {
    setPathwayData((prevPathwayData) =>
    (
      {
        ...prevPathwayData,
        reactions: prevPathwayData.reactions.map((reaction) =>
          reaction.id === reactionId
            ? {
              ...reaction,
              products: [
                ...reaction.products,
                {
                  id: reaction.products[reaction.products.length - 1]?.id + 1 || 0,
                  name: `product_${reactionId}.${reaction.products[reaction.products.length - 1]?.id + 1 || 0}`
                }
              ]
            }
            : reaction
        )
      }
    ))
  };

  const deleteProduct = (reactionId, productId) => {
    setModalData({
      isModalOpen: true,
      closeModal,
      title: "Product",
      handleDelete: () => {
        setPathwayData((prevPathwayData) =>
        (
          {
            ...prevPathwayData,
            reactions: prevPathwayData.reactions.map((reaction) =>
              reaction.id === reactionId
                ? {
                  ...reaction,
                  products: reaction.products.filter((product) => product.id !== productId)
                }
                : reaction
            )
          }
        ))
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
  const [pendingCheck, setPendingCheck] = useState({
    change: () => console.log("change")
  });

  const openModal = () => setModalIsOpen(true);
  const closeCheckModal = () => setModalIsOpen(false);

  const confirmChange = () => {
    pendingCheck.change()
    setModalIsOpen(false);
  };

  const handleCheckboxChange = (reactionId, field, index, e, v) => {
    openModal();
    setPendingCheck({
      change: () => {
        handleChangeData(reactionId, field, index, e, v)
        handleChangeData(reactionId, field, index, { target: { value: `controller_${reactionId + 1}.0`, name: "controller" } })
        addReaction()
      },
    });
  };

  const handelCancelPathway = () => {
    cancle()
    navigate("/")
  }

  return (
    <div className="min-h-screen px-32 py-10">
      <div className="w-full mx-auto">
        <div className="p-6 space-y-6">

          <div className="flex justify-between items-center sticky top-0 bg-white px-2 py-5 z-50">
            <h1 className="text-4xl font-black">Add New Pathway</h1>
            <div className="space-x-2">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800" onClick={handelCancelPathway}>Cancel</button>
              <button className="px-4 py-2 bg-[#57369E] text-white rounded" onClick={handleSubmit}>Review</button>
            </div>
          </div>

          {/* Pathway Basic Information */}
          <BasicInfoForm data={pathwayData} handleChange={handleChangePathwayData} />

          {/* Reactions */}
          {pathwayData?.reactions?.map((reaction) => (
            <Accordion key={reaction.id} title={`Reaction - ${reaction.id}`} className='border bg-[#DDD7EC] rounded-lg mb-4' deleteFn={() => deleteReaction(reaction.id)}>
              <div className="border-t p-4">
                <div className="flex space-x-1 ">
                  <button onClick={() => handleTabChange(reaction.id, "reactants")} className={`px-4  py-2 bg-white rounded-t-lg text-gray-500 hover:text-gray-700 ${getActiveTab(reaction.id) === "reactants" && "border-b-2 border-purple-500 font-medium"}`}>
                    Reactants
                  </button>
                  <button onClick={() => handleTabChange(reaction.id, "controllers")} className={`px-4  py-2 bg-white rounded-t-lg text-gray-500 hover:text-gray-700 ${getActiveTab(reaction.id) === "controllers" && "border-b-2 border-purple-500 font-medium"}`}>
                    Controllers
                  </button>
                  <button onClick={() => handleTabChange(reaction.id, "products")} className={`px-4  py-2 bg-white rounded-t-lg text-gray-500 hover:text-gray-700 ${getActiveTab(reaction.id) === "products" && "border-b-2 border-purple-500 font-medium"}`}>
                    Products
                  </button>
                </div>

                {getActiveTab(reaction.id) === "reactants" &&
                  <div className='bg-white rounded-lg pb-2 rounded-tl-none p-5'>
                    {reaction.reactants.map((item, index) => (
                      <Accordion key={index} className='border rounded-lg mb-10' variant="gray" deleteFn={() => deleteReactant(reaction.id, item.id)} title={`Reactant ${item.id}`}>
                        <ReactantForm handleChangeData={handleChangeData} reaction={reaction} reactantData={item} reactantIndex={index} />
                      </Accordion>
                    ))}
                    <button onClick={() => addReactant(reaction.id)} className="flex items-center text-blue-600 hover:text-blue-700 mt-5">
                      <PlusIcon className="h-5 w-5 mr-1" /> Add New Reactant
                    </button>
                  </div>
                }

                {getActiveTab(reaction.id) === "controllers" &&
                  <div className='bg-white rounded-lg pb-2 px-2 rounded-tl-none p-5' >
                    {reaction.controllers.map((item, index) => (
                      <Accordion key={index} className='border rounded-lg mb-10' variant="gray" deleteFn={() => deleteController(reaction.id, item.id)} title={`Controller ${item.id}`}>
                        <div className="space-y-4 p-4">

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Cell Type
                              </label>
                              <select
                                className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={item?.cellType || ""}
                                name='cellType'
                                onChange={(e) =>
                                  handleChangeData(reaction.id, "controllers", index, e)
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
                                value={item?.cellularLocation || ""}
                                name='cellularLocation'
                                onChange={(e) =>
                                  handleChangeData(reaction.id, "controllers", index, e)
                                }
                              >
                                <option value="">Select Location</option>
                                <option value="cytocol">Cytosol</option>
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
                                value={item?.controllerType || ""}
                                name='controllerType'
                                onChange={(e) =>
                                  handleChangeData(reaction.id, "controllers", index, e)
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
                                value={item?.actionType || ""}
                                name='actionType'
                                onChange={(e) =>
                                  handleChangeData(reaction.id, "controllers", index, e)
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
                                  className="mt-1 border w-[49%] rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  value={item?.goOntology || ""}
                                  name='goOntology'
                                  onChange={(e) =>
                                    handleChangeData(reaction.id, "controllers", index, e)
                                  }
                                />
                                <input
                                  type="text"
                                  className="mt-1 border w-[49%] rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  value={item?.goOntologyValue || ""}
                                  name='goOntologyValue'
                                  onChange={(e) =>
                                    handleChangeData(reaction.id, "controllers", index, e)
                                  }
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
                                value={item?.notGoOntology || ""}
                                name='notGoOntology'
                                onChange={(e) =>
                                  handleChangeData(reaction.id, "controllers", index, e)
                                }
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-x-3">
                              <input
                                type="checkbox"
                                id={`useNextReactionController-${reaction.id}-${index}`}
                                checked={item?.useNextReaction || false}
                                name='useNextReaction'
                                onChange={(e) =>
                                  handleChangeData(
                                    reaction.id,
                                    "controllers",
                                    index,
                                    e
                                  )
                                }
                              />
                              <label htmlFor={`useNextReactionController-${reaction.id}-${index}`} className="text-sm cursor-pointer font-medium text-gray-700">
                                Use this Controller in the next reaction
                              </label>
                            </div>
                          </div>


                        </div>
                      </Accordion>
                    ))}
                    {reaction.controllers.length < 1 && <button onClick={() => addController(reaction.id)} className="flex items-center text-blue-600 hover:text-blue-700 mt-5">
                      <PlusIcon className="h-5 w-5 mr-1" /> Add New controller
                    </button>}
                  </div>
                }

                {getActiveTab(reaction.id) === "products" &&
                  <div className='bg-white rounded-lg pb-2 px-2 rounded-tl-none p-5'>
                    {reaction.products.map((item, index) => (
                      <Accordion key={index} className='border rounded-lg mb-10' variant="gray" deleteFn={() => deleteProduct(reaction.id, item.id)} title={`Product ${item.id}`}>
                        <div className="space-y-4 p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Cell Type</label>
                              <select
                                className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                value={item?.cellType || ""}
                                name='cellType'
                                onChange={(e) => handleChangeData(reaction.id, "products", index, e)}
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
                                value={item?.cellularLocation || ""}
                                name='cellularLocation'
                                onChange={(e) => handleChangeData(reaction.id, "products", index, e)}
                              >
                                <option value="">Select Location</option>
                                <option value="cytocol">Cytosol</option>
                                <option value="golgi">Golgi</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Product Type</label>
                            <select
                              className="mt-1 border block w-1/2 rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={item?.productType || ""}
                              name='productType'
                              onChange={(e) => handleChangeData(reaction.id, "products", index, e)}
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
                                  value={item?.bindingSiteCode || ""}
                                  name='bindingSiteCode'
                                  onChange={(e) => handleChangeData(reaction.id, "products", index, e)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Protein Symbol</label>
                                <input
                                  type="text"
                                  className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="Type protein symbol"
                                  value={item?.proteinSymbol || ""}
                                  name='proteinSymbol'
                                  onChange={(e) => handleChangeData(reaction.id, "products", index, e)}
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
                                  name='startingSite'
                                  value={item?.startingSite || ""}
                                  onChange={(e) => handleChangeData(reaction.id, "products", index, e)}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Ending Site</label>
                                <input
                                  type="text"
                                  className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  placeholder="Ending site"
                                  value={item?.endingSite || ""}
                                  name='endingSite'
                                  onChange={(e) => handleChangeData(reaction.id, "products", index, e)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className='space-x-3'>
                              <input
                                type="checkbox"
                                id={`useNextReaction1-${reaction.id}-${index}`}
                                checked={item?.useNextReaction || false}
                                name='useNextReaction'
                                onChange={(e) => {
                                  if (item?.useNextReaction) {
                                    handleChangeData(reaction.id, "products", index, e)
                                  }
                                  else {
                                    handleCheckboxChange(reaction.id, "products", index, e, e.target.checked)
                                  }
                                }}
                              />
                              <label htmlFor={`useNextReaction1-${reaction.id}-${index}`} className="text-sm cursor-pointer font-medium text-gray-700">Use this product in the next reaction</label>
                            </div>
                          </div>

                          {item.useNextReaction &&
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <select
                                  className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  value={item?.type || ""}
                                  name='type'
                                  onChange={(e) => {
                                    handleChangeData(reaction.id, "products", index, e)
                                    handleChangeData(reaction.id + 1, "reactants", 0, { target: { value: false, name: "isProduct" } })
                                    handleChangeData(reaction.id + 1, "controllers", 0, { target: { value: false, name: "isProduct" } })
                                    handleChangeData(reaction.id + 1, e.target.value, 0, { target: { value: true, name: "isProduct" } })
                                  }}
                                >
                                  <option value="">Type</option>
                                  <option value="reactants">Ractant</option>
                                  <option value="controllers">Controller</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700">Targeted Reaction</label>
                                <select
                                  disabled={!item.type}
                                  className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  value={item?.targetedReaction || ""}
                                  name='targetedReaction'
                                  onChange={(e) => handleChangeData(reaction.id, "products", index, e)}
                                >
                                  <option value="">Select reaction</option>
                                  {pathwayData?.reactions?.map(item =>
                                    <option key={item.id} value={item.id}>Reaction {item.id}</option>
                                  )}
                                </select>
                              </div>
                            </div>
                          }
                        </div>
                      </Accordion>
                    ))}
                    <button onClick={() => addProduct(reaction.id)} className="flex items-center text-blue-600 hover:text-blue-700 mt-5">
                      <PlusIcon className="h-5 w-5 mr-1" /> Add New Products
                    </button>
                  </div>
                }
              </div>
            </Accordion>
          ))}

          <button onClick={addReaction} className="mt-4 bg-white border border-[#57369E] text-[#57369E] flex items-center justify-center p-3 mx-auto font-bold">
            <PlusIcon className="h-5 w-5 mr-1" />
            <span>Add New Reaction</span>
          </button>

        </div>
      </div>


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
  );
}

export default NewPathway;
