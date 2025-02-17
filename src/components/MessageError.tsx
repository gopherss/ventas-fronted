import { AlertCircle } from "lucide-react";

interface MessageProps {
    message?: string;
}

const MessageError = ({ message = "Ha ocurrido un error." }: MessageProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            <p className="mt-3 text-lg font-medium text-red-600 dark:text-red-400">
                Error: {message}
            </p>
        </div>
    );
}

export default MessageError;
