/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Color primario (azul)
        secondary: '#10B981', // Color secundario (verde)
        accent: '#F59E0B', // Color de acento (naranja)
        success: '#10B981', // Color para éxito (verde)
        error: '#EF4444', // Color para errores (rojo)
        warning: '#F59E0B', // Color para advertencias (naranja)
        info: '#3B82F6', // Color para información (azul claro)
        background: {
          light: '#F9FAFB', // Fondo claro
          dark: '#1F2937', // Fondo oscuro
        },
        text: {
          light: '#111827', // Texto claro
          dark: '#F9FAFB', // Texto oscuro
        },
      },
      animation: {},
      keyframes: {},
    },
  },
  plugins: [],
};