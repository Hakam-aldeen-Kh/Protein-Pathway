import { useParams, useLocation } from "react-router";

import GraphView from "./components/GraphView";
import NotFound from "../404/NotFound";

import { usePathwayDataById } from "../../hooks/usePathwayDataById";


const PathwayResultForPreview = () => {

  const { id } = useParams();
  const location = useLocation();
  const data = location.state?.data;

  const { pathwayData } = usePathwayDataById(id)

  if (!pathwayData) {
    return (
      <NotFound />
    );
  }

  return (
    data ?
      <GraphView pathwayData={data} /> :
      <GraphView pathwayData={pathwayData} />

  );
};

export default PathwayResultForPreview;