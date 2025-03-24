
import { useParams } from "react-router";

import "../../styles/global.css";

import ReactionTable from "../../components/ReactionTable";
import { ShowToast } from "../../common/ToastNotification";
import ReviewHeader from "../../common/ReviewHeader";
import { useGetPathwayById } from "../../services/pathway";
import PathwayInfo from "../../components/PathwayInfo";
import NotFound from "../404/NotFound";
import { useState } from "react";


const Preview = () => {
  const { id } = useParams();

  const { pathwayData, isEdit, saveEditingPathway } = useGetPathwayById(id)

  const [pathwayClone, setPathwayClone] = useState(pathwayData)

  if (!pathwayData) {
    return (
      <NotFound />
    );
  }


  const handleChangeClone = (e, reactionId = null, type = null, index = null, v = null) => {
    const { name, value, checked } = e.target;

    setPathwayClone((prevPathwayData) => {
      if (reactionId === null) {
        return { ...prevPathwayData, [name]: value };
      }

      return {
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
      };


    });
  };



  const handleSave = () => {
    ShowToast("Pathway Updated", "Your pathway was updated successfully")
    saveEditingPathway(pathwayClone, id)
  }


  return (
    <div className="flex flex-col px-32 py-[40px] max-md:px-5">
      <div className="flex overflow-hidden space-y-16 flex-col p-5 w-full bg-white rounded-lg border border-solid border-zinc-400 max-md:max-w-full">
        <ReviewHeader title={pathwayClone.title} description={pathwayClone.description} state="review" handleSave={handleSave} isEdit={isEdit} />
        <PathwayInfo pathway={pathwayClone} id={id} />
        <ReactionTable reactions={pathwayClone.reactions} isEdit={isEdit} setEditPathwayData={setPathwayClone} handleChangeData={handleChangeClone} />
      </div>
    </div>
  );
};

export default Preview;
