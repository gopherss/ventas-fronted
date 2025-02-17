import { useEffect, useState } from 'react';

export const useTheme = () => {
    // Inicializar el tema desde localStorage o usar 'system' como valor predeterminado
    const [theme, setTheme] = useState(() =>
        localStorage.getItem('theme') || 'system'
    );

    useEffect(() => {
        const root = document.documentElement;
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Primero, remover todas las clases de tema
        root.classList.remove('light', 'dark');

        // Luego, aplicar la clase correspondiente según el tema seleccionado
        switch (theme) {
            case 'dark':
                root.classList.add('dark');
                break;
            case 'system':
                if (systemDark) {
                    root.classList.add('dark');
                } else {
                    root.classList.add('light');
                }
                break;
            default: // 'light'
                root.classList.add('light');
                break;
        }

        // Guardar la preferencia en localStorage
        localStorage.setItem('theme', theme);

        // Configurar un listener para cambios en el tema del sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                root.classList.remove('light', 'dark');
                root.classList.add(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);

        // Cleanup
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    return { theme, setTheme };
};