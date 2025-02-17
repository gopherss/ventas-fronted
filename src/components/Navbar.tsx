import { Link, useLocation } from 'react-router-dom';
import { User, Briefcase, Users, Store, ShoppingBag, Logs, X } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';
import { useAuthViewModel } from '../viewmodels/authViewModel';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const { role } = useAuthStore();
    const { token, profile, loadProfile } = useAuthViewModel();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (token) {
            loadProfile();
        }
    }, [loadProfile, token]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-700">
            <div className="max-w-6xl mx-auto p-4">
                <div className="flex items-center justify-between">
                    {/* Nombre del negocio alineado a la izquierda */}
                    <div className="flex items-center space-x-2">
                        <Store className="w-6 h-6 text-blue-500" />
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-full">
                            {profile?.negocio?.nombre || "Cargando..."}
                        </h1>
                    </div>

                    {/* Menú hamburguesa para móviles */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 dark:text-white focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Logs className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {/* Menú de navegación para pantallas medianas y grandes */}
                    <ul className="hidden md:flex space-x-3 lg:space-x-6">
                        <li>
                            <Link
                                to="/products"
                                className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-all text-sm lg:text-base
                                ${location.pathname === '/products'
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                            >
                                <ShoppingBag className="w-4 h-4 lg:w-5 lg:h-5" />
                                Productos
                            </Link>
                        </li>

                        {/* ✅ Mostrar solo si el usuario es ROOT */}
                        {role === 'ROOT' && (
                            <>
                                <li>
                                    <Link
                                        to="/business"
                                        className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-all text-sm lg:text-base
                                        ${location.pathname === '/business'
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                    >
                                        <Briefcase className="w-4 h-4 lg:w-5 lg:h-5" />
                                        Negocios
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/users"
                                        className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-all text-sm lg:text-base
                                        ${location.pathname === '/users'
                                                ? 'bg-blue-500 text-white shadow-md'
                                                : 'text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                    >
                                        <Users className="w-4 h-4 lg:w-5 lg:h-5" />
                                        Usuarios
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link
                                to="/profile"
                                className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-all text-sm lg:text-base
                                ${location.pathname === '/profile'
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                            >
                                <User className="w-4 h-4 lg:w-5 lg:h-5" />
                                Perfil
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Menú móvil desplegable */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-2">
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <Link
                                    to="/products"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                                    ${location.pathname === '/products'
                                            ? 'bg-blue-500 text-white shadow-md'
                                            : 'text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    Productos
                                </Link>
                            </li>

                            {/* ✅ Mostrar solo si el usuario es ROOT */}
                            {role === 'ROOT' && (
                                <>
                                    <li>
                                        <Link
                                            to="/business"
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                                            ${location.pathname === '/business'
                                                    ? 'bg-blue-500 text-white shadow-md'
                                                    : 'text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Briefcase className="w-5 h-5" />
                                            Negocios
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/users"
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                                            ${location.pathname === '/users'
                                                    ? 'bg-blue-500 text-white shadow-md'
                                                    : 'text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Users className="w-5 h-5" />
                                            Usuarios
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link
                                    to="/profile"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                                    ${location.pathname === '/profile'
                                            ? 'bg-blue-500 text-white shadow-md'
                                            : 'text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <User className="w-5 h-5" />
                                    Perfil
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;