const InputField = ({
    label,
    value,
    placeholder,
    onChange,
    className = "",
}) => {
    const id = label.toLowerCase().replace(/\s+/g, "-");

    return (
        <div
            className={`flex flex-col w-full text-sm tracking-tight text-[#111118] self-end ${className}`}
        >
            {label && (
                <label htmlFor={id} className="text-sm font-medium opacity-80 mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                type="text"
                defaultValue={value}
                onChange={onChange}
                placeholder={placeholder}
                className="px-3 py-2 border border-[#878787] focus:outline-none min-h-[40px]"
            />
        </div>
    );
};

export default InputField;
