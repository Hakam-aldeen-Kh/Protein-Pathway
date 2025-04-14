import Accordion from "../../../common/Accordion";
import FormElement from "../../../common/reaction/components/FormElement";

const BasicInfoForm = ({ data, handleChange }) => {
  return (
    <Accordion
      variant="gray"
      title={"Pathway Basic Information"}
      className=" border rounded-lg"
    >
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isRequired={true}
            type="input"
            label={"Title"}
            name="title"
            value={data?.title}
            handleChange={handleChange}
            placeholder="Add Title"
          />
          <FormElement
            isRequired={true}
            type="input"
            label={"Description"}
            name="description"
            value={data?.description}
            handleChange={handleChange}
            placeholder="Add Description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormElement
            isRequired={false}
            type="select"
            label={"Species"}
            name="species"
            value={data?.species}
            handleChange={handleChange}
            placeholder="Select Species"
          >
            <option value="Homo spaiens">Homo spaiens</option>
          </FormElement>
          <FormElement
            isRequired={false}
            type="select"
            label={"Pathway Category"}
            name="category"
            value={data?.category}
            handleChange={handleChange}
            placeholder="Select Category"
          >
            <option value="classic metabolic pathway">
              {" "}
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
            isRequired={false}
            type="select"
            label={"Tissue"}
            name="tissue"
            value={data?.tissue}
            handleChange={handleChange}
            placeholder="Select Tissue"
          >
            <option value="Blood">Blood</option>
            <option value="Heart">Heart</option>
          </FormElement>
          <FormElement
            isRequired={false}
            type="select"
            label={"Related Disease"}
            name="relatedDisease"
            value={data?.relatedDisease}
            handleChange={handleChange}
            placeholder="Type or Select Disease"
            relatedInput={{ name: "diseaseInput", value: data?.diseaseInput }}
          >
            <option value="Human">Human</option>
            <option value="Animal">Animal</option>
            <option value="Plant">Plant</option>
          </FormElement>
        </div>
      </div>
    </Accordion>
  );
};

export default BasicInfoForm;
