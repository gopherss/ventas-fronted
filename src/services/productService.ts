import URI_BACKEND from "../config";

const API_URL = URI_BACKEND + '/productos';

// Obtener categorías de productos
export const fetchCategoriesProducts = async (token: string, negocioId: number) => {
    const response = await fetch(`${API_URL}/negocio/${negocioId}/categorias`, {
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

    return result;
};

// Crear una categoría de producto
export const createCategoryProduct = async (token: string, negocioId: number, nombre: string) => {
    const response = await fetch(`${API_URL}/negocio/${negocioId}/categorias`, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
    });

    const result = await response.json();

    if (!response.ok) {
        console.error('Error al crear categoría:', result);
        throw new Error(result.message || 'Error desconocido');
    }

    return result;
};

// Actualizar una categoría de producto
export const updateCategoryProduct = async (token: string, negocioId: number, categoriaId: number, nombre: string) => {
    const response = await fetch(`${API_URL}/negocio/${negocioId}/categorias/${categoriaId}`, {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
    });

    const result = await response.json();

    if (!response.ok) {
        console.error('Error al actualizar categoría:', result);
        throw new Error(result.message || 'Error desconocido');
    }

    return result;
};
