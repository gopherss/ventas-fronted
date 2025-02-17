import { useTheme } from '../hooks/useTheme.ts';
import { Sun, Moon } from 'lucide-react';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Alternar tema"
            className="fixed top-20 right-8 p-4  rounded-full bg-white dark:bg-gray-900 
          shadow-lg border border-gray-300 dark:border-gray-700 transition-all hover:scale-110"
        >
            {theme === 'dark' ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
        </button>
    );
};

export default ThemeSwitcher;
