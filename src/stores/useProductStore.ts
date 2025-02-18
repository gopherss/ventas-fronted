import { create } from 'zustand';
import { ProductCategoryModel, ProductModel } from '../models';
import { fetchCategoriesProducts, createCategoryProduct, updateCategoryProduct, fetchProductsByBusiness } from '../services/productService';

interface ProductsState {
    products: object;
    categories: ProductCategoryModel[];
    loading: boolean;
    error: string | null;
    setProducts: (products: ProductModel[]) => void;
    setCategories: (categories: ProductCategoryModel[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    fetchAllCategoriesProducts: (token: string, negocioId: number) => Promise<void>;
    createCategory: (token: string, negocioId: number, nombre: string) => Promise<void>;
    updateCategory: (token: string, negocioId: number, categoriaId: number, nombre: string) => Promise<void>;
    fetchProducts: (token: string, negocioId: number, page: number, limit: number) => Promise<void>;
}

export const useProductsStores = create<ProductsState>((set) => ({
    products: [],
    categories: [],
    loading: false,
    error: null,
    setProducts: (products) => set({ products }),
    setCategories: (categories) => set({ categories }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    fetchAllCategoriesProducts: async (token, negocioId) => {
        try {
            set({ loading: true, error: null });
            const data = await fetchCategoriesProducts(token, negocioId);
            set({ categories: data });
        } catch (error) {
            console.log(error);
            set({ error: 'Error al cargar las categorías' });
        } finally {
            set({ loading: false });
        }
    },

    createCategory: async (token, negocioId, nombre) => {
        try {
            set({ loading: true, error: null });
            const newCategory = await createCategoryProduct(token, negocioId, nombre);
            set((state) => ({ categories: [...state.categories, newCategory] }));
        } catch (error) {
            console.log(error);
            set({ error: 'Error al crear la categoría' });
        } finally {
            set({ loading: false });
        }
    },

    updateCategory: async (token, negocioId, categoriaId, nombre) => {
        try {
            set({ loading: true, error: null });
            const updatedCategory = await updateCategoryProduct(token, negocioId, categoriaId, nombre);
            set((state) => ({
                categories: state.categories.map((cat) =>
                    cat.id_categoria_producto === categoriaId ? updatedCategory : cat
                ),
            }));
        } catch (error) {
            console.log(error);
            set({ error: 'Error al actualizar la categoría' });
        } finally {
            set({ loading: false });
        }
    },

    // Método agregado para obtener productos por negocio
    fetchProducts: async (token, negocioId, page, limit) => {
        try {
            set({ loading: true, error: null });
            const data = await fetchProductsByBusiness(token, negocioId, page, limit);
            set({ products: data });
        } catch (error) {
            console.log(error);
            set({ error: 'Error al obtener productos' });
        } finally {
            set({ loading: false });
        }
    },
}));
