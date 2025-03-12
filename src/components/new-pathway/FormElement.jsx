
const FormElement = ({
    isRequired = false,
    type = 'input',
    label = '',
    name = '',
    value = '',
    handleChange,
    placeholder = '',
    children,
    relatedInput = null
}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {isRequired && <span className="text-red-500">*</span>}
                <span>{label}</span>
            </label>
            <div className="flex items-center justify-center gap-2">
                {type === "input" &&
                    <input
                        type="text"
                        value={value || ""}
                        name={name}
                        required={isRequired}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="mt-1 outline-none block w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-[#57369E] focus:ring-[#57369E]"

                    />}
                {type === "select" &&
                    <div className="select-container w-full flex-1">
                        <select
                            required={isRequired}
                            name={name}
                            value={value || ""}
                            onChange={handleChange}
                            className="mt-1 outline-none block w-full flex-1 rounded-md border p-2 border-gray-300 shadow-sm focus:border-[#57369E] focus:ring-[#57369E]"
                        >
                            <option value="">{placeholder}</option>
                            {children}
                        </select>
                    </div>
                }

                {relatedInput &&
                    <input
                        type="text"
                        name={relatedInput.name}
                        value={relatedInput.value || ""}
                        onChange={handleChange}
                        className="mt-1 outline-none block w-full flex-1 rounded-md border p-2 border-gray-300 shadow-sm focus:border-[#57369E] focus:ring-[#57369E]"
                    />
                }
            </div>


        </div>
    )
};

export default FormElement;
