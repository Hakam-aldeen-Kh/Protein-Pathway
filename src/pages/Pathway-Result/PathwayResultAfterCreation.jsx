
import { useOutletContext } from "react-router";

import GraphView from "./components/GraphView";

const PathwayResultAfterCreation = () => {

  const { pathwayData } = useOutletContext();

  return (
    <GraphView pathwayData={pathwayData} backLink="/review" />
  );
};

export default PathwayResultAfterCreation;