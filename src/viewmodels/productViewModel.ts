import { useCallback, useEffect, useState } from 'react';
import { fetchCategoriesProducts, createCategoryProduct, updateCategoryProduct, fetchProductsByBusiness } from '../services/productService';
import { ProductCategoryModel } from '../models';
import { useAuthStore } from '../stores/useAuthStore';
import { useAuthViewModel } from './authViewModel';

export const useProductsViewModel = () => {
    const { token } = useAuthStore();
    const { profile, loadProfile } = useAuthViewModel();
    const negocioId = profile?.id_negocio;

    const [categoriesProducts, setCategoriesProducts] = useState<ProductCategoryModel[]>([]);
    const [products, setProducts] = useState<object>({});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Estado de carga

    useEffect(() => {
        if (token) {
            loadProfile();
        }
    }, [loadProfile, token]);


    // Función para obtener las categorías de productos
    const fetchCategoriesProductData = useCallback(async () => {
        if (!token || !negocioId) return;
        setLoading(true); // Activamos el loading al comenzar la solicitud
        try {
            const data: ProductCategoryModel[] = await fetchCategoriesProducts(token, negocioId); // Agregar negocioId
            setCategoriesProducts(data);
            setError(null);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            setCategoriesProducts([]);
            setError('Error al obtener categorías');
        } finally {
            setLoading(false); // Desactivamos el loading cuando la solicitud finaliza
        }
    }, [token, negocioId]); // Asegúrate de incluir negocioId en las dependencias

    // Función para crear una nueva categoría de producto
    const createCategory = useCallback(async (nombre: string) => {
        if (!token || !negocioId) return;
        setLoading(true);
        try {
            const newCategory = await createCategoryProduct(token, negocioId, nombre); // Pasamos negocioId
            setCategoriesProducts((prev) => [...prev, newCategory]); // Agregamos la nueva categoría al estado
            setError(null);
        } catch (error) {
            console.error('Error al crear categoría:', error);
            setError('Error al crear la categoría');
        } finally {
            setLoading(false);
        }
    }, [token, negocioId]);

    // Función para actualizar una categoría de producto
    const updateCategory = useCallback(async (categoriaId: number, nombre: string) => {
        if (!token || !negocioId) return;
        setLoading(true);
        try {
            const updatedCategory = await updateCategoryProduct(token, negocioId, categoriaId, nombre); // Pasamos negocioId
            setCategoriesProducts((prev) =>
                prev.map((category) =>
                    category.id_categoria_producto === categoriaId ? updatedCategory : category
                )
            );
            setError(null);
        } catch (error) {
            console.error('Error al actualizar categoría:', error);
            setError('Error al actualizar la categoría');
        } finally {
            setLoading(false);
        }
    }, [token, negocioId]);

    // Función para obtener los productos de un negocio
    const fetchProducts = useCallback(async (page: number = 1, limit: number = 10, search?: string) => {
        if (!token || !negocioId) return;
        setLoading(true); // Activamos el loading al comenzar la solicitud

        try {
            const response = await fetchProductsByBusiness(token, negocioId, page, limit, search);
            setProducts(response || {});
            setError(null);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            setProducts({}); // Limpiamos los productos en caso de error
            setError('Error al obtener productos');
        } finally {
            setLoading(false); // Desactivamos el loading cuando la solicitud finaliza
        }
    }, [token, negocioId]); // Asegúrate de incluir negocioId en las dependencias

    return { categoriesProducts, products, error, loading, fetchCategoriesProductData, createCategory, updateCategory, fetchProducts };
};
