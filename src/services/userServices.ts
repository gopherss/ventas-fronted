import URI_BACKEND from "../config";
import { UserModel, UserRegisterModel, UserUpdateModel } from "../models";

const API_URL = URI_BACKEND + '/auth';

export const registerUser = async (token: string, userData: UserRegisterModel): Promise<UserModel> => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("Respuesta del backend:", data);

    if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
    }

    return data;
};

export const getAllUsers = async (token: string): Promise<UserModel[]> => {
    const response = await fetch(`${API_URL}/list-users`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener usuarios");
    }

    const data = await response.json();
    return data.users;
};


export const updateProfile = async (
    token: string,
    userId: number,
    updatedData: UserUpdateModel
): Promise<UserModel> => {
    const response = await fetch(`${API_URL}/profile/${userId}`, {
        method: "PUT",
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar perfil");
    }

    const data = await response.json();
    return data.user;
};