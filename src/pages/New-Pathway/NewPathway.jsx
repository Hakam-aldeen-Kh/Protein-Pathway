import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate, useOutletContext } from 'react-router';
import DeleteModal from '../../common/DeleteModal';
import BasicInfoForm from '../../components/new-pathway/BasicInfoForm';
import Accordion from '../../components/new-pathway/Accordion';
import Reactants from '../../components/new-pathway/Reactants';
import Controllers from '../../components/new-pathway/Controllers';
import Products from '../../components/new-pathway/Products';
import { TabItem, Tabs } from '../../common/Tabs';

function NewPathway() {

  const { pathwayData, setPathwayData, cancle } = useOutletContext();

  const navigate = useNavigate()

  const [modalData, setModalData] = useState({
    isModalOpen: false,
    closeModal: () => console.log("click"),
    title: "",
    handleDelete: () => console.log("click")
  });

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


  const handelCancelPathway = () => {
    cancle()
    navigate("/")
  }

  return (
    <div className="min-h-screen px-32 py-10">
      <div className="w-full mx-auto">
        <div className="p-6 space-y-6">

          <div className="flex justify-between items-center sticky top-0 bg-white px-2 py-5 z-10">
            <h1 className="text-4xl font-black">Add New Pathway</h1>
            <div className="space-x-2">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800" onClick={handelCancelPathway}>Cancel</button>
              <button className="px-4 py-2 bg-[#57369E] text-white rounded" onClick={handleSubmit}>Review</button>
            </div>
          </div>

          {/* Pathway Basic Information */}
          <BasicInfoForm data={pathwayData} handleChange={handleChangePathwayData} />

          {/* Reactions */}
          {pathwayData?.reactions?.map((reaction, index) => (
            <Accordion key={reaction.id} title={`Reaction - ${reaction.id}`} className='border bg-[#DDD7EC] rounded-lg mb-4' deleteFn={() => deleteReaction(reaction.id)}>

              <Tabs index={index}>
                <TabItem label="Reactants">
                  <Reactants reaction={reaction} handleChangeData={handleChangeData} setModalData={setModalData} />
                </TabItem>
                <TabItem label="Controllers">
                  <Controllers reaction={reaction} handleChangeData={handleChangeData} setModalData={setModalData} />
                </TabItem>
                <TabItem label="Products">
                  <Products reaction={reaction} handleChangeData={handleChangeData} setModalData={setModalData} addReaction={addReaction} />
                </TabItem>
              </Tabs>

            </Accordion>
          ))}

          <button onClick={addReaction} className="mt-4 bg-white border border-[#57369E] text-[#57369E] flex items-center justify-center p-3 mx-auto font-bold">
            <PlusIcon className="h-5 w-5 mr-1" />
            <span>Add New Reaction</span>
          </button>

        </div>
      </div>


      <DeleteModal data={modalData} />

    </div>
  );
}

export default NewPathway;
