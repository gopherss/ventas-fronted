import { useCallback, useState } from 'react';
import { fetchCategoriesProducts, createCategoryProduct, updateCategoryProduct } from '../services/productService';
import { ProductCategoryModel, ProductModel } from '../models';
import { useAuthStore } from '../stores/useAuthStore';

export const useProductsViewModel = () => {
    const { token } = useAuthStore();
    const negocioId = 2; // Asumiendo que el negocioId es 2. Si este valor es dinámico, cambia esto según corresponda.
    const [categoriesProducts, setCategoriesProducts] = useState<ProductCategoryModel[]>([]);
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Estado de carga

    // Función para obtener las categorías de productos
    const fetchCategoriesProductData = useCallback(async () => {
        if (!token) return;
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
        if (!token) return;
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
        if (!token) return;
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

    return { categoriesProducts, products, error, loading, fetchCategoriesProductData, createCategory, updateCategory };
};
