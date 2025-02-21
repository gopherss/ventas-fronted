interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const Textarea = ({ label, ...props }: TextareaProps) => {
    return (
        <div className="w-full">
            <label className="block text-gray-700 dark:text-white mb-1">{label}</label>
            <textarea
                {...props}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-transparent focus:ring-2 focus:ring-blue-500 
                dark:focus:ring-blue-400 text-gray-900 dark:text-white"
            />
        </div>
    );
};

export default Textarea;
