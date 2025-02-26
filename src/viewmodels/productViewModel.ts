import { useCallback, useEffect } from 'react';
import {
    fetchCategoriesProducts,
    createCategoryProduct,
    updateCategoryProduct,
    fetchProductsByBusiness,
    createProduct,
    updateProduct
} from '../services/productService';
import { ProductModel } from '../models';
import { useAuthViewModel } from './authViewModel';
import { useProductsStores } from '../stores/useProductStore';
import toast from 'react-hot-toast';

export const useProductsViewModel = () => {
    const { token, profile, loadProfile } = useAuthViewModel();
    const negocioId = profile?.id_negocio;

    const {
        products,
        categories,
        loading,
        error,
        setProducts,
        setCategories,
        setLoading,
        setError,
        addCategory,
        updateCategoryInStore,
        addProduct,
        updateProductInStore
    } = useProductsStores();

    useEffect(() => {
        if (token) {
            loadProfile();
        }
    }, [loadProfile, token]);

    // Función para obtener las categorías de productos
    const fetchCategoriesProductData = useCallback(async () => {
        if (!token || !negocioId) return;
        setLoading(true);
        try {
            const data = await fetchCategoriesProducts(token, negocioId);
            setCategories(data);
            setError(null);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            setCategories([]);
            setError('Error al obtener categorías');
        } finally {
            setLoading(false);
        }
    }, [token, negocioId, setLoading, setCategories, setError]);

    // Función para crear una nueva categoría de producto
    const createCategory = useCallback(async (nombre: string) => {
        if (!token || !negocioId) return;
        setLoading(true);
        try {
            const newCategory = await createCategoryProduct(token, negocioId, nombre);
            addCategory(newCategory);
            setError(null);
            return newCategory;
        } catch (error) {
            console.error('Error al crear categoría:', error);
            setError('Error al crear la categoría');
            return null;
        } finally {
            setLoading(false);
        }
    }, [token, negocioId, setLoading, addCategory, setError]);

    // Función para actualizar una categoría de producto
    const updateCategory = useCallback(async (categoriaId: number, nombre: string) => {
        if (!token || !negocioId) return;
        setLoading(true);
        try {
            const updatedCategory = await updateCategoryProduct(token, negocioId, categoriaId, nombre);
            updateCategoryInStore(categoriaId, updatedCategory);
            setError(null);

            toast.success("Categoria actualizada correctamente", { position: 'bottom-right' });
            return updatedCategory;
        } catch (error) {
            console.error('Error al actualizar categoría:', error);
            setError('Error al actualizar la categoría');
            return null;
        } finally {
            setLoading(false);
        }
    }, [token, negocioId, setLoading, updateCategoryInStore, setError]);

    // Función para obtener los productos de un negocio
    const fetchProducts = useCallback(async (page: number = 1, limit: number = 10, search?: string) => {
        if (!token || !negocioId) return;
        setLoading(true);
        try {
            const response = await fetchProductsByBusiness(token, negocioId, page, limit, search);
            setProducts(response || {});
            setError(null);
            return response;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            setProducts({});
            setError('Error al obtener productos');
            return null;
        } finally {
            setLoading(false);
        }
    }, [token, negocioId, setLoading, setProducts, setError]);

    // Función para crear un producto
    const createNewProduct = useCallback(async (productData: ProductModel) => {
        if (!token) return;
        setLoading(true);
        try {
            // Add business ID if not provided
            if (!productData.id_negocio && negocioId) {
                productData.id_negocio = negocioId;
            }

            const newProduct = await createProduct(token, productData);

            if (!newProduct || typeof newProduct !== "object") {
                console.error("El producto creado no es válido:", newProduct);
                return null;
            }

            addProduct(newProduct);
            setError(null);
            return newProduct;
        } catch (error) {
            console.error("Error al crear el producto:", error);
            setError("Error al crear el producto");
            return null;
        } finally {
            setLoading(false);
        }
    }, [token, negocioId, setLoading, addProduct, setError]);

    // Mejorar la función updateExistingProduct
    const updateExistingProduct = useCallback(async (productId: number, productData: ProductModel) => {
        if (!token || !productId) return null;
        setLoading(true);
        try {
            // Asegurar que se incluye el ID del negocio
            if (!productData.id_negocio && negocioId) {
                productData.id_negocio = negocioId;
            }

            const updatedProduct = await updateProduct(token, productId, productData);
            updateProductInStore(productId, updatedProduct);
            setError(null);

            toast.success("Producto actualizado correctamente", { position: 'bottom-right' });
            return updatedProduct;
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            setError("Error al actualizar el producto");
            return null;
        } finally {
            setLoading(false);
        }
    }, [token, negocioId, setLoading, updateProductInStore, setError]);

    useEffect(() => {
        fetchCategoriesProductData();
        fetchProducts();
    }, [fetchCategoriesProductData, fetchProducts]);

    return {
        // State from store
        categories,
        products,
        loading,
        error,

        // Actions/methods
        fetchCategoriesProductData,
        createCategory,
        updateCategory,
        fetchProducts,
        createNewProduct,
        updateExistingProduct
    };
};