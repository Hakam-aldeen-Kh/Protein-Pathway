import { useParams } from "react-router";

import GraphView from "./components/GraphView";
import NotFound from "../404/NotFound";
import { useGetPathwayById } from "../../services/pathway";


const PathwayResultForPreview = () => {

  const { id } = useParams();

  const { pathwayData } = useGetPathwayById(id)

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