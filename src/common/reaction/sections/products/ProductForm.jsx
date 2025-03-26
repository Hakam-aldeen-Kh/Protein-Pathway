import FormElement from "../../components/FormElement";

const ProductForm = ({ handleChangeData, reaction, productData, productIndex, handleCheckboxChange }) => {

    const handleChange = (e) => handleChangeData(e, reaction.id, "products", productIndex)

    const handleChangeWithConfirm = (e) => {
        if (productData?.useNextReaction) {
            handleChange(e)
        }
        else {
            handleCheckboxChange(reaction.id, "products", productIndex, e, e.target.checked)
        }
    }

    const handleUseInNextReaction = (e) => {
        handleChangeData(e, reaction.id, "products", productIndex)

        // reset isProduct property in reactant and controller  
        handleChangeData({ target: { value: false, name: "isProduct" } }, reaction.id + 1, "reactants", 0)
        handleChangeData({ target: { value: false, name: "isProduct" } }, reaction.id + 1, "controllers", 0)

        // reset reference property in reactant and controller  
        handleChangeData({ target: { value: "", name: "reference" } }, reaction.id + 1, "reactants", 0)
        handleChangeData({ target: { value: "", name: "reference" } }, reaction.id + 1, "controllers", 0)

        //change reference and isProduct property in reactant or controller  
        if (e.target.value) {
            handleChangeData({ target: { value: true, name: "isProduct" } }, reaction.id + 1, e.target.value, 0);
            handleChangeData({ target: { value: "(Product -01 of Reaction 1)", name: "reference" } }, reaction.id + 1, e.target.value, 0)
        }


    }


    return (
        <div className="space-y-4 p-4">

            <div className="grid grid-cols-2 gap-4">
                <FormElement isRequired={false} type="select" label={"Cell Type"} name="cellType" value={productData?.cellType} handleChange={handleChange} placeholder="Select Cell Type">
                    <option value="embryonic cell">embryonic cell</option>
                    <option value="prokaryotic cell">prokaryotic cell</option>
                </FormElement>

                <FormElement isRequired={false} type="select" label={" Cellular Location"} name="cellularLocation" value={productData?.cellularLocation} handleChange={handleChange} placeholder="Select Location" >
                    <option value="cytocol">Cytosol</option>
                    <option value="golgi">Golgi</option>
                </FormElement>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormElement isRequired={false} type="select" label={"Product Type"} name="productType" value={productData?.productType} handleChange={handleChange} placeholder="Select Product Type">
                    <option value="protein">Protein</option>
                    <option value="complex">Complex</option>
                </FormElement>
            </div>

            <div>
                <span className=' font-bold text-xs block py-4'>Protein Name</span>

                <div className="grid grid-cols-2 gap-4">
                    <FormElement isRequired={false} type="input" label={"Binding site Code"} name="bindingSiteCode" value={productData?.bindingSiteCode} handleChange={handleChange} placeholder="Three letters code of binding site (e.g. ser, tyr...)" />
                    <FormElement isRequired={false} type="input" label={"Protein Symbol"} name="proteinSymbol" value={productData?.proteinSymbol} handleChange={handleChange} placeholder="Type protein symbol" />
                </div>
            </div>

            <div>
                <span className=' font-bold text-xs block py-4'>Protein size (Fragmented protein size information)</span>

                <div className="grid grid-cols-2 gap-4">
                    <FormElement isRequired={false} type="input" label={"Starting Site"} name="startingSite" value={productData?.startingSite} handleChange={handleChange} placeholder="Starting Site" />
                    <FormElement isRequired={false} type="input" label={"Ending Site"} name="endingSite" value={productData?.endingSite} handleChange={handleChange} placeholder="Ending Site" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormElement isRequired={false} type="checkbox" id={`useNextReaction1-${reaction.id}-${productIndex}`} placeholder={"Use this product in the next reaction"} name="useNextReaction" value={productData?.useNextReaction} handleChange={handleChangeWithConfirm} />
            </div>

            {productData.useNextReaction &&
                <div className="grid grid-cols-2 gap-4">
                    <FormElement isRequired={false} type="select" label={"Type"} name="type" value={productData?.type} handleChange={handleUseInNextReaction} placeholder="Type">
                        <option value="reactants">Ractant</option>
                        <option value="controllers">Controller</option>
                    </FormElement>

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700">Targeted Reaction</label>
                        <select
                            disabled={!productData.type}
                            className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            value={productData?.targetedReaction || ""}
                            name='targetedReaction'
                            onChange={(e) => handleChangeData(reaction.id, "products", productIndex, e)}
                        >
                            <option value="">Select reaction</option>
                            {pathwayData?.reactions?.map(productData =>
                                <option key={productData.id} value={productData.id}>Reaction {productData.id}</option>
                            )}
                        </select>
                    </div> */}
                </div>
            }
        </div>
    )
};

export default ProductForm;
