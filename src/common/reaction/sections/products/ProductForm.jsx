import FormElement from "../../components/FormElement";
import Complex from "./products-type/Complex";
import Protein from "./products-type/Protein";

const ProductForm = ({
  handleChangeData,
  reaction,
  productData,
  productIndex,
  reactions,
  addReaction
}) => {
  const handleChange = (e) =>
    handleChangeData(e, reaction.id, "products", productIndex);

  // const handleChangeWithConfirm = (e) => {
  //   if (productData?.useNextReaction) {
  //     handleChange(e);
  //   } else {
  //     handleCheckboxChange(
  //       reaction.id,
  //       "products",
  //       productIndex,
  //       e,
  //       e.target.checked
  //     );
  //   }
  // };

  // const handleUseInNextReaction = (e) => {
  //   handleChangeData(e, reaction.id, "products", productIndex);
  //   const targetReactionId = productData.targetReactionId;

  //   // reset isProduct property in reactant and controller
  //   handleChangeData(
  //     { target: { value: false, name: "isProduct" } },
  //     targetReactionId,
  //     "reactants",
  //     0
  //   );
  //   handleChangeData(
  //     { target: { value: false, name: "isProduct" } },
  //     targetReactionId,
  //     "controllers",
  //     0
  //   );

  //   // reset reference property in reactant and controller
  //   handleChangeData(
  //     { target: { value: "", name: "reference" } },
  //     targetReactionId,
  //     "reactants",
  //     0
  //   );
  //   handleChangeData(
  //     { target: { value: "", name: "reference" } },
  //     targetReactionId,
  //     "controllers",
  //     0
  //   );

  //   // reset fromReaction property in reactant and controller
  //   handleChangeData(
  //     { target: { value: "", name: "fromReaction" } },
  //     targetReactionId,
  //     "reactants",
  //     0
  //   );
  //   handleChangeData(
  //     { target: { value: "", name: "fromReaction" } },
  //     targetReactionId,
  //     "controllers",
  //     0
  //   );
  //   handleChangeData(
  //     { target: { value: "", name: "fromProduct" } },
  //     targetReactionId,
  //     "reactants",
  //     0
  //   );
  //   handleChangeData(
  //     { target: { value: "", name: "fromProduct" } },
  //     targetReactionId,
  //     "controllers",
  //     0
  //   );
  //   //change reference and isProduct property in reactant or controller
  //   if (e.target.value) {
  //     handleChangeData(
  //       { target: { value: true, name: "isProduct" } },
  //       targetReactionId,
  //       e.target.value,
  //       0
  //     );
  //     handleChangeData(
  //       {
  //         target: {
  //           value: `(Product - ${reaction.id}.${productData.id} of Reaction ${reaction.id})`,
  //           name: "reference",
  //         },
  //       },
  //       targetReactionId,
  //       e.target.value,
  //       0
  //     );
  //     handleChangeData(
  //       { target: { value: reaction.id, name: "fromReaction" } },
  //       targetReactionId,
  //       e.target.value,
  //       0
  //     );
  //     handleChangeData(
  //       { target: { value: productData.id, name: "fromProduct" } },
  //       targetReactionId,
  //       e.target.value,
  //       0
  //     );
  //   }
  // };

  const handleChangeRadioBtn = (e) => {
    handleChange(e)


    // if check then create reaction +1 if not created and add this controller in reactants
    const foundNextReaction = reactions.find(item => item.id === reaction.id + 1)
    let targetReactionId = reaction.id + 1

    if (!foundNextReaction) {
      targetReactionId = addReaction()
      handleChangeData({ target: { value: targetReactionId, name: "targetReactionId" } }, reaction.id, "products", productIndex)

    }

    // reset reference property in reactant and controller
    handleChangeData({ target: { value: "", name: "reference" } }, targetReactionId, "reactants", 0);
    handleChangeData({ target: { value: "", name: "reference" } }, targetReactionId, "controllers", 0);
    handleChangeData({ target: { value: "", name: "fromReaction" } }, targetReactionId, "reactants", 0);
    handleChangeData({ target: { value: "", name: "fromReaction" } }, targetReactionId, "controllers", 0);

    if (e.target.value === "reactants" || e.target.value === "controllers") {
      console.log(e.target.value)

      const reference = `(Product - ${reaction.id}.${productData.id} of Reaction ${reaction.id})`

      handleChangeData({ target: { value: true, name: "useNextReaction", }, }, reaction.id, "products", productIndex);
      handleChangeData({ target: { value: targetReactionId, name: "targetReactionId" } }, reaction.id, "products", productIndex)

      handleChangeData({ target: { value: reference, name: "reference", }, }, targetReactionId, e.target.value, 0);
      handleChangeData({ target: { value: reaction.id, name: "fromReaction" } }, targetReactionId, e.target.value, 0);
    }

    else {
      console.log("none")

      handleChangeData({ target: { value: false, name: "useNextReaction", }, }, reaction.id, "products", productIndex);
      handleChangeData({ target: { value: "", name: "targetReactionId" } }, reaction.id, "products", productIndex)
    }

  }

  return (
    <form className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* <FormElement
          isRequired={false}
          type="select"
          label={"Cell Type"}
          name="cellType"
          value={productData?.cellType}
          handleChange={handleChange}
          placeholder="Select Cell Type"
        >
          <option value="embryonic cell">embryonic cell</option>
          <option value="prokaryotic cell">prokaryotic cell</option>
        </FormElement> */}

        <FormElement
          isRequired={false}
          label={"Cell Type"}
          name="cellType"
          value={productData?.cellType}
          handleChange={handleChange}
          placeholder="Select Cell Type"
          type="itemType"
          itemType="CellType"
        />

        {/* <FormElement
          isRequired={false}
          type="select"
          label={" Cellular Location"}
          name="cellularLocation"
          value={productData?.cellularLocation}
          handleChange={handleChange}
          placeholder="Select Location"
        >
          <option value="cytocol">Cytosol</option>
          <option value="golgi">Golgi</option>
        </FormElement> */}

        <FormElement
          isRequired={false}
          type="itemType"
          label={" Cellular Location"}
          name="cellularLocation"
          value={productData?.cellularLocation}
          handleChange={handleChange}
          placeholder="Select Location"
          itemType="Cellular"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormElement
          isRequired={false}
          type="select"
          label={"Product Type"}
          name="productType"
          value={productData?.productType}
          handleChange={handleChange}
          placeholder="Select Product Type"
        >
          <option value="protein">Protein</option>
          <option value="complex">Complex</option>
        </FormElement>
      </div>

      {productData.productType === "protein" && (
        <Protein productData={productData} handleChange={handleChange} />
      )}

      {productData.productType === "complex" && (
        <Complex productData={productData} handleChange={handleChange} />
      )}

      {/* Protein Size (commit part) */}
      {/* <div>
        <span className=" font-bold text-xs block py-4">
          Protein size (Fragmented protein size information)
        </span>

        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isRequired={false}
            type="input"
            label={"Starting Site"}
            name="startingSite"
            value={productData?.startingSite}
            handleChange={handleChange}
            placeholder="Starting Site"
          />
          <FormElement
            isRequired={false}
            type="input"
            label={"Ending Site"}
            name="endingSite"
            value={productData?.endingSite}
            handleChange={handleChange}
            placeholder="Ending Site"
          />
        </div>
      </div> */}

      <div className="grid grid-cols-2 gap-4">
        <FormElement
          isRequired={false}
          type="radio"
          id={`type1-${reaction.id}-${productIndex}`}
          placeholder={"Use this product as a reactant in the next reaction"}
          name="type"
          value={"reactants"}
          checked={productData?.type}
          handleChange={handleChangeRadioBtn}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormElement
          isRequired={false}
          type="radio"
          id={`type2-${reaction.id}-${productIndex}`}
          placeholder={"Use this product as a controller in the next reaction"}
          name={`type`}
          value={"controllers"}
          checked={productData?.type}
          handleChange={handleChangeRadioBtn}
        />
      </div>

      {/* <div className="grid grid-cols-2 gap-4">
        <FormElement
          isRequired={false}
          type="radio"
          id={`type3-${reaction.id}-${productIndex}`}
          placeholder={"None"}
          name="type"
          value={""}
          checked={productData?.type}
          handleChange={handleChangeRadioBtn}
        />
      </div> */}

      {/* {productData.useNextReaction && (
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isRequired={false}
            type="select"
            label={"Type"}
            name="type"
            value={productData?.type}
            handleChange={handleUseInNextReaction}
            placeholder="Type"
          >
            <option value="reactants">Ractant</option>
            <option value="controllers">Controller</option>
          </FormElement>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Targeted Reaction
            </label>
            <input
              disabled
              className="mt-1 border block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={`Reaction - ${productData?.targetReactionId}`}
            />
          </div>


          <div>
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
          </div>
        </div>
      )} */}
    </form>
  );
};

export default ProductForm;
