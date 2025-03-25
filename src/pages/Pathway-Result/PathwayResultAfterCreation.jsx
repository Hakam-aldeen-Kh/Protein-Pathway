
import { useOutletContext } from "react-router";

import GraphView from "./components/GraphView";

const PathwayResultAfterCreation = () => {

  const { pathwayData } = useOutletContext();

  return (
    <GraphView pathwayData={pathwayData} />
  );
};

export default PathwayResultAfterCreation;