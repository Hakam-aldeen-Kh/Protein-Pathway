import { useOutletContext } from "react-router";
import Accordion from "./Accordion";
import { PlusIcon } from "lucide-react";
import ProductForm from "./ProductForm";
import Modal from "react-modal";
import { useState } from "react";

const Products = ({ reaction, handleChangeData, setModalData, addReaction }) => {

  const { setPathwayData } = useOutletContext();

  const closeModal = () => setModalData((prev) => ({ ...prev, isModalOpen: false }))

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

  return (
    <div className='bg-white rounded-lg pb-2 rounded-tl-none p-5'>
      {reaction.products.map((item, index) => (
        <>
          <Accordion key={index} className='border rounded-lg mb-10' variant="gray" deleteFn={() => deleteProduct(reaction.id, item.id)} title={`Product - ${reaction.id}.${item.id}`}>
            <ProductForm handleChangeData={handleChangeData} reaction={reaction} productData={item} productIndex={index} handleCheckboxChange={handleCheckboxChange} />
          </Accordion>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeCheckModal}
            contentLabel="Confirm Action"
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20"
          >
            <h2 className="text-lg font-semibold mb-4">Use In Next Reaction</h2>
            <p>Are you sure you want to use this {`Product - ${reaction.id}.${item.id}`} in next Reaction?</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={closeCheckModal} className="px-4 w-[48%] py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={confirmChange} className="px-4 w-[48%] py-2 bg-[#57369E] text-white rounded">Confirm</button>
            </div>

          </Modal>
        </>
      ))}
      <button onClick={() => addProduct(reaction.id)} className="flex items-center text-blue-600 hover:text-blue-700 mt-5">
        <PlusIcon className="h-5 w-5 mr-1" /> Add New Products
      </button>


    </div>
  )
};

export default Products;
