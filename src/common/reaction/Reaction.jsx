import Controllers from "./sections/controllers/Controllers";
import Products from "./sections/products/Products";
import Reactants from "./sections/reactant/Reactants";
import { TabItem, Tabs } from "../Tabs";

const Reaction = ({
    reactions,
    reactionIndex,
    reactionData,
    setPathwayData,
    handleChangeData,
    setDeleteModalData,
    addReaction
}) => {

    return (
        <Tabs index={reactionIndex}>
            <TabItem label="Reactants">
                <Reactants reactions={reactions} reaction={reactionData} setPathwayData={setPathwayData} handleChangeData={handleChangeData} setDeleteModalData={setDeleteModalData} />
            </TabItem>
            <TabItem label="Controllers">
                <Controllers reactions={reactions} reaction={reactionData} setPathwayData={setPathwayData} handleChangeData={handleChangeData} setDeleteModalData={setDeleteModalData} />
            </TabItem>
            <TabItem label="Products">
                <Products reaction={reactionData} setPathwayData={setPathwayData} handleChangeData={handleChangeData} setDeleteModalData={setDeleteModalData} addReaction={addReaction} />
            </TabItem>
        </Tabs>
    )
};

export default Reaction;
