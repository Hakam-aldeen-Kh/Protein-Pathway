import FormElement from "../FormElement";

const Protein = ({ reactantData, handleChange }) => {
    return (
        <>
            <div>
                <span className="font-bold text-xs block py-4">
                    Protein Name
                </span>
                <div className="grid grid-cols-2 gap-4">
                    <FormElement isRequired={false} type="select" label={"Symbolic Name"} name="proteinSymbolicName" value={reactantData?.proteinSymbolicName} handleChange={handleChange} placeholder="Select Symbolic Name" >
                        <option value="NF-KappaB p50/p65 complex">NF-KappaB p50/p65 complex</option>
                    </FormElement>
                    <FormElement isRequired={false} type="input" label={"Protein Symbol"} name="proteinSymbol" value={reactantData?.proteinSymbol} handleChange={handleChange} placeholder="Protein Symbol (e.g. RecA)" />
                </div>
            </div>

            <div>
                <span className="font-bold text-xs block py-4">
                    Protein Modification
                </span>
                <div className="grid grid-cols-2 gap-4">
                    <FormElement isRequired={false} type="input" label={"Modifying site"} name="modifyingSite" value={reactantData?.modifyingSite} handleChange={handleChange} placeholder="Modifying site of amino acid (number)" />
                    <FormElement isRequired={false} type="select" label={"Modifying Type"} name="modifyingType" value={reactantData?.modifyingType} handleChange={handleChange} placeholder="Select Modifying Type" >
                        <option value="sulfated residue">sulfated residue</option>
                    </FormElement>
                </div>
            </div>
        </>

    )
};

export default Protein;
