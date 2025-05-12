import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PathwayDetails from "./components/PathwayDetails";
import NotFound from "../404/NotFound";
import api from "../../utils/api";
import LoadingProcess from "../../common/LoadingProcess";
import { useAuth } from "../../hooks/useAuth";
import { usePathway } from "../../hooks/usePathway";

const PreviewPathway = () => {
  const { id } = useParams();

  const { handleSubmitEditPathway, isLoading: editLoading } = usePathway()
  const { isAuthenticated, loading: authLoading } = useAuth(); // Add loading state from auth hook

  const [pathwayData, setPathwayClone] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // Only fetch data when authentication state is determined (not loading)
    if (authLoading) return;

    const fetchData = async () => {
      try {

        if (isAuthenticated) {
          const response = await api.get(`user/pathway/protein/${id}`);
          const checkIsOwner = response.data.data.isOwner;

          if (checkIsOwner) {
            setIsEdit(true);
          }
          setPathwayClone(response.data.data.pathway);
        } else {
          const response = await api.get(`pathway/protein/${id}`);
          setPathwayClone(response.data.data.pathway);
        }
      } catch (error) {
        console.error("Error fetching pathway:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, isAuthenticated, authLoading]); // Add authLoading as dependency

  if (authLoading || isLoading) {
    return <LoadingProcess />;
  }

  if (!pathwayData) {
    return <NotFound />;
  }

  const handleChangeClone = (e, reactionId = null, type = null, index = null, check = null) => {
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
              [type]: reaction[type].map((item) =>
                item.id === index ? { ...item, [name]: value === "on" ? check ? check : checked : value } : item
              ),
            }
            : reaction
        ),
      };

    });
  };

  const handleSaveAfterEdit = () => {
    console.log(pathwayData);
    handleSubmitEditPathway(pathwayData, id)
  }

  return (
    <div className="flex flex-col px-32 py-[40px] max-md:px-5">
      <PathwayDetails
        pathway={pathwayData}
        isEdit={isEdit}
        id={id}
        pageState={"preview"}
        setPathwayClone={setPathwayClone}
        handleSave={handleSaveAfterEdit}
        handleChangeClone={handleChangeClone}
        isLoading={editLoading}
      />
    </div>
  );
};

export default PreviewPathway;
