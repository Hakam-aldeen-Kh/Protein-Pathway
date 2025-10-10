import { useState } from "react";
import FormElement from "../../components/FormElement";
import Complex from "./products-type/Complex";
import Protein from "./products-type/Protein";
import Lipid from "./products-type/Lipid";
import Dna from "./products-type/Dna";
import Glycan from "./products-type/Glycan";
import SmallMolecule from "./products-type/SmallMolecule";
// change

const ProductForm = ({
  handleChangeData,
  reaction,
  productData,
  productId,
  reactions,
  addReaction,
  setPathwayData,
}) => {
  const handleChange = (e) =>
    handleChangeData(e, reaction.id, "products", productId);

  let localReactions = reactions;

  // const handleChangeWithConfirm = (e) => {
  //   if (productData?.useNextReaction) {
  //     handleChange(e);
  //   } else {
  //     handleCheckboxChange(
  //       reaction.id,
  //       "products",
  //       productId,
  //       e,
  //       e.target.checked
  //     );
  //   }
  // };

  // const handleUseInNextReaction = (e) => {
  //   handleChangeData(e, reaction.id, "products", productId);
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

  const addReactant = (reactionId) => {
    const nextReaction = localReactions.find((item) => item.id === reactionId);

    console.log("nextReaction", localReactions);
    let reactantId =
      nextReaction.reactants[nextReaction.reactants.length - 1]?.id + 1;

    const firstUnReferencedReactant = nextReaction.reactants.find(
      (r) => !r.reference || r.reference.trim() === ""
    );
    const unReferencedReactantId = firstUnReferencedReactant
      ? firstUnReferencedReactant.id
      : reactantId;

    if (!firstUnReferencedReactant) {
      console.log(reactantId);
      setPathwayData((prevPathwayData) => ({
        ...prevPathwayData,
        reactions: prevPathwayData.reactions.map((reaction) =>
          reaction.id === reactionId
            ? {
                ...reaction,
                reactants: [
                  ...reaction.reactants,
                  {
                    id: reactantId,
                    name: `reactant_${reactionId}.${reactantId}`,
                  },
                ],
              }
            : reaction
        ),
      }));
    }

    return unReferencedReactantId;
  };

  const addController = (reactionId) => {
    const nextReaction = localReactions.find((item) => item.id === reactionId);

    console.log("nextReaction", localReactions);

    const findController = nextReaction.regulators[0];

    if (!findController) {
      setPathwayData((prevPathwayData) => ({
        ...prevPathwayData,
        reactions: prevPathwayData.reactions.map((reaction) =>
          reaction.id === reactionId
            ? {
                ...reaction,
                regulators: [
                  ...reaction.regulators,
                  {
                    id: 1,
                    name: `regulator_${reactionId}.${1}`,
                  },
                ],
              }
            : reaction
        ),
      }));
    }
  };

  const handleChangeRadioBtn = (e) => {
    handleChange(e);

    // if check then create reaction +1 if not created and add this controller in reactants
    const foundNextReaction = reactions.find(
      (item) => item.id === reaction.id + 1
    );

    let targetReactionId = reaction.id + 1;
    let targetReactantId = reaction?.products.find(
      (item) => item.id === productId
    )?.conectedReactantId;

    let targetReaction = null;

    if (!foundNextReaction && e.target.value) {
      if (e.target.value === "regulators") {
        targetReaction = addReaction(true, targetReactionId);
      } else {
        targetReaction = addReaction(false, targetReactionId);
      }
      localReactions.push(targetReaction);
      targetReactionId = targetReaction.id;
      handleChangeData(
        { target: { value: targetReactionId, name: "targetReactionId" } },
        reaction.id,
        "products",
        productId
      );
    }

    // reset reference property in reactant and controller
    handleChangeData(
      { target: { value: "", name: "reference" } },
      targetReactionId,
      "regulators",
      1
    );
    handleChangeData(
      { target: { value: "", name: "fromReaction" } },
      targetReactionId,
      "regulators",
      1
    );
    handleChangeData(
      { target: { value: "", name: "productId" } },
      targetReactionId,
      "regulators",
      1
    );
    handleChangeData(
      { target: { value: "", name: "conectedReactantId" } },
      reaction.id,
      "products",
      productId
    );
    handleChangeData(
      { target: { value: "", name: "connectedData" } },
      targetReactionId,
      "regulators",
      1
    );

    if (targetReactantId) {
      handleChangeData(
        { target: { value: "", name: "reference" } },
        targetReactionId,
        "reactants",
        targetReactantId
      );
      handleChangeData(
        { target: { value: "", name: "fromReaction" } },
        targetReactionId,
        "reactants",
        targetReactantId
      );
      handleChangeData(
        { target: { value: "", name: "connectedData" } },
        targetReactionId,
        "reactants",
        targetReactantId
      );
    }

    if (e.target.value === "regulators") {
      addController(targetReactionId);

      const reference = `(Product - ${reaction.id}.${productData.id} of Reaction ${reaction.id})`;

      handleChangeData(
        { target: { value: true, name: "useNextReaction" } },
        reaction.id,
        "products",
        productId
      );
      handleChangeData(
        { target: { value: targetReactionId, name: "targetReactionId" } },
        reaction.id,
        "products",
        productId
      );

      handleChangeData(
        { target: { value: reference, name: "reference" } },
        targetReactionId,
        "regulators",
        1
      );
      handleChangeData(
        { target: { value: productId, name: "productId" } },
        targetReactionId,
        "regulators",
        1
      );

      handleChangeData(
        { target: { value: reaction.id, name: "fromReaction" } },
        targetReactionId,
        "regulators",
        1
      );

      handleChangeData(
        {
          target: {
            value: { type: "products", id: productId },
            name: "connectedData",
          },
        },
        targetReactionId,
        "regulators",
        1
      );

      // uncheck controller in next reaction if is checked
      const foundControllerCheckedNextReaction = reactions.find(
        (item) => item.id === reaction.id + 1
      );
      console.log(foundControllerCheckedNextReaction);

      if (
        foundControllerCheckedNextReaction &&
        foundControllerCheckedNextReaction.regulators[0]?.useNextReaction
      ) {
        handleChangeData(
          { target: { value: "", name: "conectedReactantId" } },
          targetReactionId,
          "regulators",
          1
        );
        handleChangeData(
          { target: { value: "", name: "targetReactionId" } },
          targetReactionId,
          "regulators",
          1
        );
        handleChangeData(
          { target: { value: false, name: "useNextReaction" } },
          targetReactionId,
          "regulators",
          productId
        );

        handleChangeData(
          { target: { value: "", name: "reference" } },
          targetReactionId + 1,
          "reactants",
          foundControllerCheckedNextReaction.regulators[0].conectedReactantId
        );
        handleChangeData(
          { target: { value: "", name: "fromReaction" } },
          targetReactionId + 1,
          "reactants",
          foundControllerCheckedNextReaction.regulators[0].conectedReactantId
        );
        handleChangeData(
          { target: { value: "", name: "connectedData" } },
          targetReactionId + 1,
          "reactants",
          foundControllerCheckedNextReaction.regulators[0].conectedReactantId
        );
      }
    } else if (e.target.value === "reactants") {
      targetReactantId = addReactant(targetReactionId);

      const reference = `(Product - ${reaction.id}.${productData.id} of Reaction ${reaction.id})`;

      handleChangeData(
        { target: { value: targetReactantId, name: "conectedReactantId" } },
        reaction.id,
        "products",
        productId
      );

      handleChangeData(
        { target: { value: true, name: "useNextReaction" } },
        reaction.id,
        "products",
        productId
      );
      handleChangeData(
        { target: { value: targetReactionId, name: "targetReactionId" } },
        reaction.id,
        "products",
        productId
      );

      handleChangeData(
        { target: { value: reference, name: "reference" } },
        targetReactionId,
        "reactants",
        targetReactantId
      );
      handleChangeData(
        { target: { value: reaction.id, name: "fromReaction" } },
        targetReactionId,
        "reactants",
        targetReactantId
      );

      handleChangeData(
        {
          target: {
            value: { type: "products", id: productId },
            name: "connectedData",
          },
        },
        targetReactionId,
        "reactants",
        targetReactantId
      );
    } else {
      handleChangeData(
        { target: { value: "", name: "reference" } },
        targetReactionId,
        "regulators",
        1
      );
      handleChangeData(
        { target: { value: "", name: "fromReaction" } },
        targetReactionId,
        "regulators",
        1
      );
      handleChangeData(
        { target: { value: false, name: "useNextReaction" } },
        reaction.id,
        "products",
        productId
      );
      handleChangeData(
        { target: { value: "", name: "targetReactionId" } },
        reaction.id,
        "products",
        productId
      );

      handleChangeData(
        { target: { value: "", name: "reference" } },
        targetReactionId,
        "reactants",
        targetReactantId
      );
      handleChangeData(
        { target: { value: "", name: "fromReaction" } },
        targetReactionId,
        "reactants",
        targetReactantId
      );
      handleChangeData(
        { target: { value: "", name: "productId" } },
        targetReactionId,
        "regulators",
        1
      );
      handleChangeData(
        { target: { value: "", name: "conectedReactantId" } },
        reaction.id,
        "products",
        productId
      );

      handleChangeData(
        { target: { value: "", name: "connectedData" } },
        targetReactionId,
        "reactants",
        targetReactantId
      );
      handleChangeData(
        { target: { value: "", name: "connectedData" } },
        targetReactionId,
        "regulators",
        1
      );
    }
  };

  // --- Glycan Multiple Support ---
  const [glycans, setGlycans] = useState(
    Array.isArray(productData.glycans) && productData.glycans.length > 0
      ? productData.glycans
      : [{ glycanTextType: "", glycanText: "" }]
  );

  const addGlycan = () => {
    setGlycans((prev) => {
      const updated = [...prev, { glycanTextType: "", glycanText: "" }];
      handleChange({
        target: { name: "glycans", value: updated },
      });
      return updated;
    });
  };

  const removeGlycan = (idx) => {
    setGlycans((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      handleChange({
        target: { name: "glycans", value: updated },
      });
      return updated;
    });
  };

  const handleGlycanChange = (e, idx) => {
    const { name, value } = e.target;
    setGlycans((prev) => {
      const updated = prev.map((glycan, i) =>
        i === idx ? { ...glycan, [name]: value } : glycan
      );
      handleChange({
        target: { name: "glycans", value: updated },
      });
      return updated;
    });
  };

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
          name="pType"
          value={productData?.pType}
          handleChange={handleChange}
          placeholder="Select Product Type"
        >
          <option value="complex">Complex</option>
          <option value="protein">Protein</option>
          <option value="glycan">Glycan</option>
          <option value="small_molecule">Small molecule</option>
          <option value="dna">DNA</option>
          <option value="lipid">Lipid</option>
        </FormElement>
      </div>

      {productData.pType === "protein" && (
        <Protein productData={productData} handleChange={handleChange} />
      )}

      {productData.pType === "complex" && (
        <Complex productData={productData} handleChange={handleChange} />
      )}

      {productData.pType === "glycan" && (
        <div className="space-y-4">
          {glycans.map((glycan, idx) => (
            <Glycan
              key={idx}
              index={idx + 1}
              productData={glycan}
              handleChange={(e) => handleGlycanChange(e, idx)}
              canDelete={glycans.length > 1 && idx > 0}
              onRemove={() => removeGlycan(idx)}
            />
          ))}

          <button
            type="button"
            className="w-full mt-4 px-4 py-2.5 bg-[#57369E] text-white rounded-lg hover:bg-[#00A7D3] transition-colors duration-200 font-medium flex items-center justify-center gap-2"
            onClick={addGlycan}
          >
            <span className="text-xl">+</span>
            Add Glycan
          </button>
        </div>
      )}

      {productData.pType === "small_molecule" && (
        <SmallMolecule productData={productData} handleChange={handleChange} />
      )}

      {productData.pType === "dna" && (
        <Dna productData={productData} handleChange={handleChange} />
      )}

      {productData.pType === "lipid" && (
        <Lipid productData={productData} handleChange={handleChange} />
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
          id={`type1-${reaction.id}-${productId}`}
          placeholder={"Use this product as a reactant in the next reaction"}
          name="type"
          value={"reactants"}
          checked={productData?.type}
          handleChange={handleChangeRadioBtn}
        />
      </div>

      {/* found referense in next reaction in regulator */}
      {!reactions.find((item) => item.id === reaction.id + 1)?.regulators[0]
        ?.reference ? (
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isRequired={false}
            type="radio"
            id={`type2-${reaction.id}-${productId}`}
            placeholder={"Use this product as a regulator in the next reaction"}
            name={`type`}
            value={"regulators"}
            checked={productData?.type}
            handleChange={handleChangeRadioBtn}
          />
        </div>
      ) : (
        reactions.find((item) => item.id === reaction.id + 1)?.regulators[0]
          ?.productId === productId && (
          <div className="grid grid-cols-2 gap-4">
            <FormElement
              isRequired={false}
              type="radio"
              id={`type2-${reaction.id}-${productId}`}
              placeholder={
                "Use this product as a regulator in the next reaction"
              }
              name={`type`}
              value={"regulators"}
              checked={productData?.type}
              handleChange={handleChangeRadioBtn}
            />
          </div>
        )
      )}

      <div className="grid grid-cols-2 gap-4">
        <FormElement
          isRequired={false}
          type="radio"
          id={`type3-${reaction.id}-${productId}`}
          placeholder={"None"}
          name="type"
          value={""}
          checked={productData?.type}
          handleChange={handleChangeRadioBtn}
        />
      </div>

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
              onChange={(e) => handleChangeData(reaction.id, "products", productId, e)}
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
