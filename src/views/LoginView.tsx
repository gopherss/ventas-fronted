import { useState } from 'react';
import { useAuthViewModel } from '../viewmodels/authViewModel';
import { Button, Input } from '../components';
import { Eye, EyeOff, UserCircle2, LogIn } from 'lucide-react'; // Importa íconos de lucide-react

const LoginView = () => {
    const { handleLogin, error, loading } = useAuthViewModel();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 rounded-xl 
                bg-white dark:bg-gray-800 
                shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Iniciar Sesión
                </h2>
                {/* Ícono debajo del título */}
                <div className="flex justify-center">
                    <UserCircle2 className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                {error && <p className="text-red-600 dark:text-red-400 text-center">{error}</p>}
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <Input autoFocus type="email" label="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="relative">
                        <Input
                            type={showPassword ? 'text' : 'password'} // Cambia dinámicamente el tipo de input
                            label="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            onClick={() => setShowPassword(!showPassword)} // Alternar visibilidad
                        >
                            {showPassword ? (
                                <EyeOff className="h-10 mt-7 text-gray-500" />
                            ) : (
                                <Eye className="h-10 mt-7 text-gray-500" />
                            )}
                        </button>
                    </div>
                    <Button type="submit" isLoading={loading} disabled={loading || !email || !password}>
                        <div className="flex items-center gap-2">
                            <LogIn className="h-5 w-5" /> {/* Ícono al lado del botón */}
                            <span>Ingresar</span>
                        </div>
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginView;