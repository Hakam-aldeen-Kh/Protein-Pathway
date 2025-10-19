import FormElement from "../../../components/FormElement";

const Rna = ({ reactantData, handleChange, isEdit }) => {
    const rnaType = reactantData?.rnaType;

    return (
        <>
            {/* Base Fields */}
            <div className="grid grid-cols-2 gap-4">
                <FormElement
                    isEdit={isEdit}
                    isRequired={false}
                    type="input"
                    label="RNA Name / Symbol"
                    name="rnaName"
                    value={reactantData?.rnaName}
                    handleChange={handleChange}
                    placeholder="RNA Name or Symbol"
                />
                <FormElement
                    isEdit={isEdit}
                    isRequired={false}
                    type="select"
                    label="RNA Type"
                    name="rnaType"
                    value={reactantData?.rnaType}
                    handleChange={handleChange}
                    placeholder="Select RNA Type"
                >
                    <option value="">Select Type</option>
                    <option value="mRNA">mRNA</option>
                    <option value="pre-mRNA">pre-mRNA</option>
                    <option value="miRNA">miRNA</option>
                    <option value="lncRNA">lncRNA</option>
                    <option value="circRNA">circRNA</option>
                </FormElement>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <FormElement
                    isEdit={isEdit}
                    isRequired={false}
                    type="input"
                    label="Database ID(s)"
                    name="rnaDatabaseId"
                    value={reactantData?.rnaDatabaseId}
                    handleChange={handleChange}
                    placeholder="Primary Accession"
                />
                <FormElement
                    isEdit={isEdit}
                    isRequired={false}
                    type="input"
                    label="Description"
                    name="rnaDescription"
                    value={reactantData?.rnaDescription}
                    handleChange={handleChange}
                    placeholder="Optional short text"
                />
            </div>

            {/* Type-Specific Fields for mRNA / pre-mRNA */}
            {(rnaType === "mRNA" || rnaType === "pre-mRNA") && (
                <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-700 mt-4">
                        {rnaType} Specific Fields
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormElement
                            isEdit={isEdit}
                            isRequired={false}
                            type="input"
                            label="Transcript ID (Ensembl/RefSeq)"
                            name="transcriptId"
                            value={reactantData?.transcriptId}
                            handleChange={handleChange}
                            placeholder="e.g., ENST00000..."
                        />
                        <FormElement
                            isEdit={isEdit}
                            isRequired={false}
                            type="input"
                            label="Gene Symbol"
                            name="rnaGeneSymbol"
                            value={reactantData?.rnaGeneSymbol}
                            handleChange={handleChange}
                            placeholder="Gene Symbol"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormElement
                            isEdit={isEdit}
                            isRequired={false}
                            type="input"
                            label="RefSeq ID"
                            name="refseqId"
                            value={reactantData?.refseqId}
                            handleChange={handleChange}
                            placeholder="e.g., NM_..."
                        />
                    </div>
                </div>
            )}

            {/* Type-Specific Fields for miRNA */}
            {rnaType === "miRNA" && (
                <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-700 mt-4">
                        miRNA Specific Fields
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormElement
                            isEdit={isEdit}
                            isRequired={false}
                            type="input"
                            label="miRNA ID (miRBase)"
                            name="mirnaId"
                            value={reactantData?.mirnaId}
                            handleChange={handleChange}
                            placeholder="e.g., hsa-miR-..."
                        />
                        <FormElement
                            isEdit={isEdit}
                            isRequired={false}
                            type="input"
                            label="miRNA Accession (miRBase)"
                            name="mirnaAccession"
                            value={reactantData?.mirnaAccession}
                            handleChange={handleChange}
                            placeholder="e.g., MI0..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormElement
                            isEdit={isEdit}
                            isRequired={false}
                            type="input"
                            label="RNAcentral URS"
                            name="rnacentralUrs"
                            value={reactantData?.rnacentralUrs}
                            handleChange={handleChange}
                            placeholder="e.g., URS..."
                        />
                    </div>
                </div>
            )}

            {/* Type-Specific Fields for lncRNA / circRNA */}
            {(rnaType === "lncRNA" || rnaType === "circRNA") && (
                <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-700 mt-4">
                        {rnaType} Specific Fields
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormElement
                            isEdit={isEdit}
                            isRequired={false}
                            type="input"
                            label="RNAcentral ID"
                            name="rnacentralId"
                            value={reactantData?.rnacentralId}
                            handleChange={handleChange}
                            placeholder="e.g., URS..."
                        />
                        <FormElement
                            isEdit={isEdit}
                            isRequired={false}
                            type="input"
                            label="Ensembl ID"
                            name="ensemblId"
                            value={reactantData?.ensemblId}
                            handleChange={handleChange}
                            placeholder="e.g., ENSG..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormElement
                            isEdit={isEdit}
                            isRequired={false}
                            type="input"
                            label="Gene Symbol"
                            name="rnaGeneSymbol"
                            value={reactantData?.rnaGeneSymbol}
                            handleChange={handleChange}
                            placeholder="Gene Symbol"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Rna;