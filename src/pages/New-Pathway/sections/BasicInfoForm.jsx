import { useEffect, useState } from "react";
import Accordion from "../../../common/Accordion";
import FormElement from "../../../common/reaction/components/FormElement";
import SpeciesTable from "./SpeciesTable";
import PubMedID from "../components/PubMedID";

const BasicInfoForm = ({ data, handleChange, setIsReviewDisabled }) => {
  const [pubMeds, setPubMeds] = useState(
    data.pubMeds?.length > 0
      ? data.pubMeds.map((item) => ({
          id: item.id || "",
          title: item.title || "",
        }))
      : []
  );

  // Track per-row status reported by PubMed component
  // shape: { [index]: { loading: bool, error: bool, valid: bool } }
  const [pubMedStatuses, setPubMedStatuses] = useState({});

  useEffect(() => {
    // sync initial parent value
    handleChange({ target: { name: "pubMeds", value: pubMeds } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  // whenever pubMeds or their statuses change, decide whether Review should be disabled
  useEffect(() => {
    const hasPubMeds = pubMeds && pubMeds.length > 0;

    // if there are no pubmeds, don't disable review because of pubmeds
    if (!hasPubMeds) {
      setIsReviewDisabled(false);
      return;
    }

    // if any status is loading or has error -> disable review
    const statuses = Object.values(pubMedStatuses);
    const anyLoading = statuses.some((s) => s?.loading);
    const anyError = statuses.some((s) => s?.error);

    const shouldDisableReview = anyLoading || anyError;

    setIsReviewDisabled(shouldDisableReview);
  }, [pubMeds, pubMedStatuses, setIsReviewDisabled]);

  const [relatedDiseases, setRelatedDiseases] = useState(
    data.diseaseInput && data.diseaseInput.length > 0
      ? data.diseaseInput
      : [{ type: "", value: "" }]
  );
  const [isOpen, setOpenTablePagination] = useState(false);

  // Callback from PubMedID rows to report status
  const handlePubMedStatusChange = (rowIndex, status) => {
    setPubMedStatuses((prev) => {
      const next = { ...prev, [rowIndex]: status };
      return next;
    });
  };

  // Callback to handle species selection
  const handleSpeciesSelect = ({ species }) => {
    handleChange({
      target: {
        name: "species",
        value: species,
      },
    });
    setOpenTablePagination(false);
  };

  const addPubMed = () => {
    const newPubMeds = [...pubMeds, { id: "", title: "" }];
    setPubMeds(newPubMeds);
    handleChange({ target: { name: "pubMeds", value: newPubMeds } });
    // initialize status for new row as not loading, no error, not valid
    setPubMedStatuses((prev) => ({ ...prev, [newPubMeds.length - 1]: { loading: false, error: false, valid: false } }));
  };

  /**
   * Robust handler for PubMed changes:
   * - Accepts an event-like object or a raw value for convenience.
   * - Uses functional setState to avoid stale closures/race conditions.
   * - Calls parent handleChange once with the full new array.
   */
  const handleChangePubMed = (eOrValue, pubMedIndex, field) => {
    const value =
      eOrValue && eOrValue.target && typeof eOrValue.target.value !== "undefined"
        ? eOrValue.target.value
        : eOrValue;

    setPubMeds((prevPubMeds) => {
      const newPubMeds = prevPubMeds.map((pubMed, index) => {
        if (index === pubMedIndex) {
          return { ...pubMed, [field]: value };
        }
        return pubMed;
      });
      // sync parent once
      handleChange({ target: { name: "pubMeds", value: newPubMeds } });
      return newPubMeds;
    });
  };

  const removePubMed = (pubMedIndex) => {
    setPubMeds((prev) => {
      const newPubMeds = prev.filter((_, index) => index !== pubMedIndex);
      handleChange({ target: { name: "pubMeds", value: newPubMeds } });

      // remove status entry and shift indexes down
      setPubMedStatuses((prevStatuses) => {
        const next = {};
        Object.keys(prevStatuses)
          .map((k) => parseInt(k, 10))
          .filter((k) => k !== pubMedIndex)
          .sort((a, b) => a - b)
          .forEach((oldIndex, newIndex) => {
            next[newIndex] = prevStatuses[oldIndex];
          });
        return next;
      });

      return newPubMeds;
    });
  };

  const addRelatedDisease = () => {
    const newRelatedDiseases = [...relatedDiseases, { type: "", value: "" }];
    setRelatedDiseases(newRelatedDiseases);
    handleChange({
      target: { name: "diseaseInput", value: newRelatedDiseases },
    });
  };

  const removeRelatedDisease = (index) => {
    const newRelatedDiseases = relatedDiseases.filter((_, i) => i !== index);
    setRelatedDiseases(newRelatedDiseases);
    handleChange({
      target: { name: "diseaseInput", value: newRelatedDiseases },
    });
  };

  const handleRelatedDiseaseChange = (index, field, value) => {
    const newRelatedDiseases = relatedDiseases.map((rd, i) => {
      if (i === index) {
        return { ...rd, [field]: value };
      }
      return rd;
    });
    setRelatedDiseases(newRelatedDiseases);
    handleChange({
      target: { name: "diseaseInput", value: newRelatedDiseases },
    });
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
            isRequired={false}
            type="speciesPaginationTable"
            label="Species"
            name="species"
            placeholder="Select Species"
            value={data?.species}
            handleChange={handleChange}
            speciesPaginationTable
            customStyle="flex items-end gap-x-2 flex-1"
            setOpenTablePagination={setOpenTablePagination}
          />

          <SpeciesTable
            isOpen={isOpen}
            setOpenTablePagination={setOpenTablePagination}
            onSpeciesSelect={handleSpeciesSelect}
            data={data}
          />

          <FormElement
            type="itemType"
            label="Pathway Category"
            name="category"
            value={data?.category}
            handleChange={handleChange}
            itemType="Categories"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormElement
              type="itemType"
              label="Tissue"
              name="tissue"
              itemType="Tissue"
              value={data?.tissue}
              handleChange={handleChange}
            />
            <button
              className="text-[14px] text-start text-[#57369E] mt-4 mb-2"
              onClick={addPubMed}
              type="button"
            >
              + Add PubMed
            </button>
            <div className="space-y-2">
              {pubMeds?.map((item, idx) => (
                <PubMedID
                  key={idx}
                  handleChangePubMed={handleChangePubMed}
                  removePubMed={removePubMed}
                  setPubMeds={setPubMeds}
                  handleChange={handleChange}
                  item={item}
                  index={idx}
                  onStatusChange={handlePubMedStatusChange}
                />
              ))}
            </div>
          </div>
          {/* Related Diseases */}
          <div className="space-y-2">
            {relatedDiseases?.map((relatedDisease, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div className="flex items-end gap-x-1">
                  <FormElement
                    type="select"
                    label="Related Disease"
                    name={`relatedDiseaseType`}
                    value={relatedDisease?.type}
                    handleChange={(e) =>
                      handleRelatedDiseaseChange(index, "type", e.target.value)
                    }
                    placeholder="Select a Type"
                    className={`${index > 0 ? "w-[90%]" : "w-full"}`}
                  >
                    <option value="Human">Human</option>
                    <option value="Plant">Plant</option>
                  </FormElement>
                  {index > 0 && (
                    <div
                      className="flex items-center h-[40px] justify-center py-2 px-3 border bg-[#57369E] cursor-pointer rounded-lg hover:bg-[#00A7D3] transition-all duration-200"
                      onClick={() => removeRelatedDisease(index)}
                    >
                      <img
                        src="/images/icons/trash.svg"
                        className="w-[24px] h-[24px]"
                        alt="Remove"
                      />
                    </div>
                  )}
                </div>

                <FormElement
                  label=""
                  type="itemType"
                  name={`diseaseInput`}
                  value={relatedDisease?.value}
                  handleChange={(e) =>
                    handleRelatedDiseaseChange(index, "value", e.target.value)
                  }
                  itemType={relatedDisease.type}
                  placeholder="Enter disease value"
                  className="self-end"
                />

                {index === 0 && (
                  <button
                    className="text-[14px] text-end text-[#57369E] col-span-2"
                    onClick={addRelatedDisease}
                    type="button"
                  >
                    + Add Related Disease
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default BasicInfoForm;
