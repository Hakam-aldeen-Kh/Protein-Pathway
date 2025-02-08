import Modal from "react-modal";
import InputField from "./InputField";
import SelectField from "./SelectField";
import Button from "./Button";

Modal.setAppElement("#root");

const EditModal = ({ isOpen, setIsOpen, data }) => {
  if (!data) return null;

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.50)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      borderRadius: "8px",
      width: "640px",
      background: "white",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      contentLabel="Edit Reaction Modal"
    >
      <div className="flex justify-between items-center pb-5">
        <h2 className="text-xl font-bold">Edit Reaction</h2>
        <button onClick={() => setIsOpen(false)}>
          <img src="/images/icons/close.svg" alt="Close" />
        </button>
      </div>

      <form className="flex flex-col space-y-5 bg-white rounded-lg">
        <InputField label="Reaction ID" value={data.rxnId} />

        {/* Reactant Glycan Section */}
        <div className="grid grid-cols-2 gap-x-5">
          <SelectField
            label="Reactant Glycan"
            value={"GlyToucan ID"}
            options={[{ label: "GlyToucan ID", value: "GlyToucan ID" }]}
          />
          <InputField value={data.reactant.code} label={""} />
        </div>

        {/* Enzyme Section with Bold Title */}
        <h3 className="text-lg font-bold mt-4">Choose Enzyme</h3>
        <div className="flex items-center gap-x-5">
          <InputField label="EC Enzyme" placeholder="Type enzyme name" />
          <InputField label="Uniport Protein" placeholder="Type protein name" />
          <button className="w-[40px] h-[40px]  border border-[#878787] p-2 self-end ">
            <img
              src="/images/icons/search-normal.svg"
              alt="Search"
              className="min-w-[24px] h-[24px]"
            />
          </button>
        </div>

        <InputField label="Sugar Nucleotide" value={data.sugarNucleotide} />

        {/* Product Glycan Section */}
        <div className="grid grid-cols-2 gap-x-5">
          <SelectField
            label="Reactant Glycan"
            value={"GlyToucan ID"}
            options={[{ label: "GlyToucan ID", value: "GlyToucan ID" }]}
          />{" "}
          <InputField value={data.product.code} label={""} />
        </div>

        <InputField label="Cellular Localization" value={data.cellLocation} />

        {/* Buttons */}
        <div className="flex gap-5 justify-center mt-10">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
