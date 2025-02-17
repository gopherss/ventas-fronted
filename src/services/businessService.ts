import URI_BACKEND from "../config";
import { BusinessModel } from "../models";

const API_URL = URI_BACKEND + '/negocios';

export const fetchCategoriesBusiness = async (token: string) => {
    const response = await fetch(`${API_URL}/categoria`, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    });

    const result = await response.json();

    if (!response.ok) {
        console.error('Error al obtener categorías:', result);
        throw new Error(result.message || 'Error desconocido');
    }

    return result; // 🔹 No necesitas `result.data`
};

export const fetchBusinesses = async (token: string) => {
    const response = await fetch(`${API_URL}?page=1&limit=100`, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error('Error al obtener los negocios');
    }

    return result.data; // 🔹 Accede a `result.data`
};

export const createBusinessCategory = async (token: string, nombre: string) => {
    const response = await fetch(`${API_URL}/categoria`, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
    });

    const result = await response.json();

    if (!response.ok) {
        console.error('Error al crear la categoría:', result);
        throw new Error(result.message || 'Error desconocido');
    }

    return result;
};

export const createBusiness = async (token: string, businessData: BusinessModel): Promise<BusinessModel> => {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al crear el negocio');
    }

    return result;
};

export const updateBusiness = async (token: string, businessId: number, businessData: BusinessModel): Promise<BusinessModel> => {
    const response = await fetch(`${API_URL}/${businessId}`, {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Error al actualizar el negocio');
    }

    return result;
};
