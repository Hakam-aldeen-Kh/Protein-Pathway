import FormElement from "../../components/FormElement";
import Complex from "./reactant-type/Complex";
import Dna from "./reactant-type/Dna";
import Glycan from "./reactant-type/Glycan";
import Protein from "./reactant-type/Protein";
import SmallMolecule from "./reactant-type/SmallMolecule";

const ReactantForm = ({ handleChangeData, reaction, reactantData, reactantIndex }) => {

    const handleChange = (e) => handleChangeData(e, reaction.id, "reactants", reactantIndex)

    return (
        <div className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4">
                <FormElement isRequired={false} type="select" label={"Cell Type"} name="cellType" value={reactantData?.cellType} handleChange={handleChange} placeholder="Select Cell Type">
                    <option value="embryonic cell">embryonic cell</option>
                    <option value="prokaryotic cell">prokaryotic cell</option>
                </FormElement>

                <FormElement isRequired={false} type="select" label={" Cellular Location"} name="cellularLocation" value={reactantData?.cellularLocation} handleChange={handleChange} placeholder="Select Location" >
                    <option value="cytocol">Cytosol</option>
                    <option value="golgi">Golgi</option>
                </FormElement>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormElement isRequired={false} type="select" label={"Reactant Type"} name="reactantType" value={reactantData?.reactantType} handleChange={handleChange} placeholder="Select Reactant Type" >
                    <option value="complex">Complex</option>
                    <option value="protein">Protein</option>
                    <option value="glycan">Glycan</option>
                    <option value="small_molecule">Small molecule</option>
                    <option value="dna">DNA</option>
                </FormElement>
            </div>

            {reactantData.reactantType === "complex" && <Complex reactantData={reactantData} handleChange={handleChange} />}
            {reactantData.reactantType === "protein" && <Protein reactantData={reactantData} handleChange={handleChange} />}
            {reactantData.reactantType === "glycan" && <Glycan reactantData={reactantData} handleChange={handleChange} />}
            {reactantData.reactantType === "small_molecule" && <SmallMolecule reactantData={reactantData} handleChange={handleChange} />}
            {reactantData.reactantType === "dna" && <Dna reactantData={reactantData} handleChange={handleChange} />}
        </div>
    )
};

export default ReactantForm;
