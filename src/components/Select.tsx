interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: { value: string; label: string }[];
}

const Select = ({ label, options, ...props }: SelectProps) => {
    return (
        <div className="w-full">
            <label className="block text-gray-700 dark:text-white mb-1">{label}</label>
            <select
                {...props}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                text-gray-900 dark:text-white"
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
