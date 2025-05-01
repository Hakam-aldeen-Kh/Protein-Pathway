import { useParams, useLocation } from "react-router";

import GraphView from "./components/GraphView";
import NotFound from "../404/NotFound";

import { usePathwayDataById } from "../../hooks/usePathwayDataById";
import { useEffect, useState } from "react";
import LoadingProcess from "../../common/LoadingProcess";
import api from "../../utils/api";

const PathwayResultForPreview = () => {
  const { id } = useParams();
  // const location = useLocation();
  // const data = location.state?.data;

  // const { pathwayData } = usePathwayDataById(id)

  const [pathwayData, setPathwayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`pathway/protein/${id}`);
        setPathwayData(response.data.data.pathway);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <LoadingProcess />;
  }

  if (!pathwayData) {
    return <NotFound />;
  }

  // return data ? (
  //   <GraphView pathwayData={data} />
  // ) : (
  //   <GraphView pathwayData={pathwayData} />
  // );

  return <GraphView pathwayData={pathwayData} />;
};

export default PathwayResultForPreview;
