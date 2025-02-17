import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { UserModel } from '../models/UserModel';
import { loginUser, getProfile } from '../services/authService';

export const useAuthViewModel = () => {
    const navigate = useNavigate();
    const { token, setToken, setRole } = useAuthStore();
    const [profile, setProfile] = useState<UserModel | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginUser(email, password);
            setToken(data.token);

            const profile = await getProfile(data.token);
            setRole(profile.user.role);

            toast.success('Inicio de sesión exitoso', { position: 'bottom-right' });
            navigate('/profile');
        } catch (err) {
            setError('Error en el login');
            toast.error(`Credenciales incorrectas: ${err}`, { position: 'bottom-right' });
        } finally {
            setLoading(false);
        }
    };

    const loadProfile = useCallback(async () => {
        if (!token) return;
        try {
            const data = await getProfile(token);
            setProfile(data.user as UserModel);
        } catch (err) {
            setError(`Error al obtener perfil ${err}`);
            toast.error('No se pudo cargar el perfil', { position: 'bottom-right' });
        }
    }, [token]);

    return { token, profile, error, loading, handleLogin, loadProfile };
};
