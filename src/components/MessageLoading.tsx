import { Loader2 } from "lucide-react";

interface MessageProps {
    message?: string;
}

const MessageLoading = ({ message = "Cargando..." }: MessageProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 dark:text-blue-400" />
            <p className="mt-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                {message}
            </p>
        </div>
    );
}

export default MessageLoading;