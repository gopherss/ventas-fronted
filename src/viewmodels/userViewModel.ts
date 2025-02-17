import { useCallback } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserStore } from '../stores/useUserStore';
import toast from 'react-hot-toast';
import { UserRegisterModel, UserUpdateModel } from '../models';
import { getAllUsers, registerUser, updateProfile } from '../services/userServices';

export const useUserViewModel = () => {
    const { token } = useAuthStore();
    const { setLoading, setError, setUsers, addUser, updateUser } = useUserStore();

    const handleAllUsers = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);

        try {
            const users = await getAllUsers(token);
            setUsers(users);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            setError("No se pudo cargar los datos");
            toast.error("No se pudo cargar los datos", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    }, [token, setError, setLoading, setUsers]);

    const handleRegisterUser = useCallback(async (userData: UserRegisterModel) => {
        if (!token) return;
        setLoading(true);
        setError(null);

        try {
            const newUser = await registerUser(token, userData);
            addUser(newUser);
            toast.success("Usuario registrado correctamente", { position: "bottom-right" });
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            setError("Error al registrar el usuario");
            toast.error("Error al registrar el usuario", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    }, [token, addUser, setError, setLoading]);

    const handleUpdateProfile = useCallback(async (userId: number, updatedData: UserUpdateModel) => {
        if (!token) return;
        setLoading(true);
        setError(null);

        try {
            const updatedUser = await updateProfile(token, userId, updatedData);
            updateUser(userId, updatedUser);
            toast.success("Perfil actualizado correctamente", { position: "bottom-right" });
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            setError("Error al actualizar el perfil");
            toast.error("Error al actualizar el perfil", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    }, [token, updateUser, setLoading, setError]);

    return {
        handleAllUsers,
        handleRegisterUser,
        handleUpdateProfile
    };
};
