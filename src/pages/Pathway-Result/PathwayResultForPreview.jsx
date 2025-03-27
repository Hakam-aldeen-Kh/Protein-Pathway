import { useParams } from "react-router";

import GraphView from "./components/GraphView";
import NotFound from "../404/NotFound";

import { usePathwayDataById } from "../../hooks/usePathwayDataById";


const PathwayResultForPreview = () => {

  const { id } = useParams();

  const { pathwayData } = usePathwayDataById(id)

  if (!pathwayData) {
    return (
      <NotFound />
    );
  }

  return (
    <GraphView pathwayData={pathwayData} />
  );
};

export default PathwayResultForPreview;