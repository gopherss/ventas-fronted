interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
    return (
        <div className="max-w-lg w-full bg-white dark:bg-gray-900 shadow-neon rounded-2xl p-8 
        border border-gray-200 dark:border-gray-700 transition-all hover:shadow-glow">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white tracking-wide mb-6">
                {title}
            </h2>
            <div className="flex flex-col items-center space-y-4 text-gray-700 dark:text-gray-300">
                {children}
            </div>
        </div>
    );
};

export default Card;
