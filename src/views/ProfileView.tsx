import { useEffect } from "react";
import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthViewModel } from "../viewmodels/authViewModel";
import { useAuthStore } from "../stores/useAuthStore";
import { Button, Card } from "../components";

const ProfileView = () => {
    const { token, profile, loadProfile } = useAuthViewModel();
    const { setToken } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            loadProfile();
        }
    }, [loadProfile, token]);

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
                <p className="text-lg text-gray-600 dark:text-gray-400 animate-pulse">
                    Cargando perfil...
                </p>
            </div>
        );
    }

    const handleLogout = () => {
        setToken(null);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-neon rounded-2xl p-10 border border-gray-300 dark:border-gray-700 
            transform transition-all hover:scale-105 hover:shadow-glow">
                <div className="flex justify-center mb-6">
                    <UserCircle className="w-28 h-28 text-gray-500 dark:text-gray-400" />
                </div>

                <Card title="Perfil del Usuario">
                    <div className="space-y-4">
                        <p className="text-gray-600 font-bold dark:text-gray-200 text-lg">
                            <strong className="text-blue-400">Nombre:</strong> {profile.nombre}
                        </p>
                        <p className="text-gray-600 font-bold dark:text-gray-200 text-lg">
                            <strong className="text-pink-400">Email:</strong> {profile.email}
                        </p>
                        <p className="text-gray-600 font-bold dark:text-gray-200 text-lg">
                            <strong className="text-green-400">Rol:</strong> {profile.role}
                        </p>
                    </div>

                    {/* Botón de cerrar sesión con efecto de luz */}
                    <div className="mt-6 w-full">
                        <Button onClick={handleLogout} className="relative w-full">
                            <span className="absolute inset-0 bg-white opacity-10 blur-md pointer-events-none" />
                            Cerrar Sesión
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProfileView;
