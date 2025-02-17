import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    color?: string;
}

const Button = ({ children, isLoading, color = "from-purple-600 to-indigo-500", ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={`relative w-full flex items-center justify-center p-3 text-white font-semibold rounded-xl 
            bg-gradient-to-r ${color} shadow-lg shadow-purple-800/50 
            hover:shadow-indigo-500/50 transition-all duration-300 ease-out 
            hover:-translate-y-1 active:scale-95
            border border-purple-500/30 backdrop-blur-md bg-opacity-80
            disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5 text-white" />
            ) : (
                <span className="relative z-10">{children}</span>
            )}
            {/* Brillo Animado */}
            <span className="absolute inset-0 bg-white opacity-10 blur-xl rounded-xl pointer-events-none" />
        </button>
    );
};

export default Button;
