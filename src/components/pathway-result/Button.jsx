const Button = ({
    variant = 'gray',
    label = 'Button',
    onClick,
    className,
    ...props
}) => {
    const variants = {
        blue: "bg-blue-500 hover:bg-blue-600",
        red: "bg-red-500 hover:bg-red-600",
        green: "bg-green-500 hover:bg-green-600",
        purple: "bg-[#57369E] hover:bg-[#00A7D3]",
        gray: "bg-gray-400"
    };

    return (
        <button
            onClick={onClick}
            className={`w-full text-white px-4 py-2 rounded-lg shadow-md ${variants[variant]} ${className || ''}`}
            {...props}
        >
            {label}
        </button>
    );
};

export default Button;