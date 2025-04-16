import InputField from "../../../common/InputField";

const LinkField = ({
  index,
  register,
  errors,
  remove,
  getAvailableLinkTypes,
}) => (
  <div className="grid grid-cols-2 gap-x-5">
    {/* Link Type */}
    <div className="flex flex-col">
      <label
        htmlFor={`links.${index}.title`}
        className="text-sm font-normal text-[#111118] opacity-80 mb-1"
      >
        Link Type
      </label>
      <div className="flex flex-row gap-x-1">
        <select
          {...register(`links.${index}.title`)}
          id={`links.${index}.title`}
          className={`w-[95%] px-3 py-2 border min-h-[40px] focus:outline-none rounded-sm ${
            errors.links?.[index]?.title ? "border-red-500" : "border-[#878787]"
          }`}
        >
          <option value="">Select a link type</option>
          {getAvailableLinkTypes(index).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {/* Remove button */}
        <div
          className="px-3 py-2 border min-h-[40px] bg-[#57369E] cursor-pointer rounded-sm hover:bg-[#00A7D3] transition-all duration-200"
          onClick={() => remove(index)}
        >
          <img src="/images/icons/trash.svg" className="w-[24px] h-[24px]" />
        </div>
      </div>
      {errors.links?.[index]?.title && (
        <p className="text-red-500 text-xs mt-1">
          {errors.links[index].title.message}
        </p>
      )}
    </div>
    {/* Link URL */}
    <InputField
      label="Link URL"
      name={`links.${index}.url`}
      register={register}
      error={errors.links?.[index]?.url?.message}
      placeholder="Enter URL"
    />
  </div>
);

export default LinkField;
