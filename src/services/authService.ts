import toast from "react-hot-toast";
import { useAuthStore } from "../stores/useAuthStore";
import { jwtDecode } from 'jwt-decode';
import URI_BACKEND from "../config";

const API_URL = URI_BACKEND + '/auth';

export const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error en el login");

    const decodedToken = jwtDecode<{ exp: number }>(data.token);
    const expiresInMs = (decodedToken.exp * 1000) - Date.now(); // Calcula el tiempo hasta la expiración

    useAuthStore.getState().setToken(data.token); // Guarda el token
    autoLogout(expiresInMs); // Programa el cierre de sesión automático

    return data;
};

const autoLogout = (expiresInMs: number) => {
    console.log(`Cerrando sesión en ${expiresInMs / 1000} segundos`);
    setTimeout(() => {
        useAuthStore.getState().logout();
        toast.error("Tu sesión ha expirado. Inicia sesión nuevamente.", { position: "bottom-right" });
    }, expiresInMs);
};


export const getProfile = async (token: string) => {
    const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        useAuthStore.getState().logout();
        toast.error(
            "Sesión expirado, por favor inicia sesión",
            { position: "bottom-right" }
        );
        return;
    }

    if (!response.ok) {
        throw new Error('Error al obtener el perfil');
    }

    return response.json();
};



