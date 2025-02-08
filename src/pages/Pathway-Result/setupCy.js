import Cytoscape from "cytoscape";
// @ts-ignore
import klay from "cytoscape-klay";
// @ts-ignore
import fcose from "cytoscape-fcose";
// @ts-ignore
import cola from "cytoscape-cola";
// @ts-ignore
import elk from "cytoscape-elk";
// @ts-ignore
import dagre from "cytoscape-dagre";

export default function () {
    Cytoscape.use(klay);
    Cytoscape.use(fcose);
    Cytoscape.use(cola);
    Cytoscape.use(elk);
    Cytoscape.use(dagre);
}