import { useState } from "react";
import Accordion from "../../../common/Accordion";
import FormElement from "../../../common/reaction/components/FormElement";

const BasicInfoForm = ({ data, handleChange }) => {
  const [diseaseType, setDiseaseType] = useState(data.relatedDisease);

  const handleDiseaseTypeChange = (e) => {
    const { value } = e.target;
    setDiseaseType(value);
    handleChange(e);
  };

  return (
    <Accordion
      variant="gray"
      title={"Pathway Basic Information"}
      className="border rounded-lg"
    >
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isRequired
            type="input"
            label="Title"
            name="title"
            value={data?.title}
            handleChange={handleChange}
            placeholder="Add Title"
          />
          <FormElement
            isRequired
            type="input"
            label="Description"
            name="description"
            value={data?.description}
            handleChange={handleChange}
            placeholder="Add Description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormElement
            type="select"
            label="Species"
            name="species"
            value={data?.species}
            handleChange={handleChange}
          >
            <option value="Homo spaiens">Homo spaiens</option>
          </FormElement>
          <FormElement
            type="select"
            label="Pathway Category"
            name="category"
            value={data?.category}
            handleChange={handleChange}
          >
            <option value="classic metabolic pathway">
              classic metabolic pathway
            </option>
            <option value="signaling pathway">signaling pathway</option>
            <option value="regulatory pathway">regulatory pathway</option>
            <option value="disease pathway">disease pathway</option>
            <option value="drug pathway">drug pathway</option>
          </FormElement>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormElement
            type="select"
            label="Tissue"
            name="tissue"
            value={data?.tissue}
            handleChange={handleChange}
          >
            <option value="Blood">Blood</option>
            <option value="Heart">Heart</option>
          </FormElement>

          <div className="grid grid-cols-2 gap-2 items-end">
            <FormElement
              type="select"
              label="Related Disease"
              name="relatedDisease"
              value={data?.relatedDisease}
              handleChange={handleDiseaseTypeChange}
              placeholder="Select a Type"
            >
              <option value="Human">Human</option>
              <option value="Animal">Animal</option>
              <option value="Plant">Plant</option>
            </FormElement>

            <FormElement
              label=""
              type="diseaseSelect"
              name="diseaseInput"
              value={data?.diseaseInput}
              handleChange={handleChange}
              diseaseType={diseaseType}
            />
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default BasicInfoForm;
