import { create } from 'zustand';
import { ProductCategoryModel, ProductModel } from '../models';

interface ProductsState {
    products: object;
    categories: ProductCategoryModel[];
    loading: boolean;
    error: string | null;
    setProducts: (products: object) => void;
    setCategories: (categories: ProductCategoryModel[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    addCategory: (category: ProductCategoryModel) => void;
    updateCategoryInStore: (categoryId: number, updatedCategory: ProductCategoryModel) => void;
    addProduct: (product: ProductModel) => void;
    updateProductInStore: (productId: number, updatedProduct: ProductModel) => void;
    resetState: () => void;
}

const initialState = {
    products: {},
    categories: [],
    loading: false,
    error: null,
};

export const useProductsStores = create<ProductsState>((set) => ({
    ...initialState,

    // Basic state setters
    setProducts: (products) => set({ products }),
    setCategories: (categories) => set({ categories }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    // More specific state updaters
    addCategory: (category) => set((state) => ({
        categories: [...state.categories, category]
    })),

    updateCategoryInStore: (categoryId, updatedCategory) => set((state) => ({
        categories: state.categories.map((cat) =>
            cat.id_categoria_producto === categoryId ? updatedCategory : cat
        ),
    })),

    addProduct: (product) => set((state) => {
        const currentProducts = state.products as any;

        // Check if products is an array (for backward compatibility)
        if (Array.isArray(currentProducts)) {
            return { products: [...currentProducts, product] };
        }

        // If it's an object with pagination structure
        if (currentProducts.data && Array.isArray(currentProducts.data)) {
            return {
                products: {
                    ...currentProducts,
                    data: [...currentProducts.data, product],
                    total: (currentProducts.total || 0) + 1
                }
            };
        }

        // Fallback if structure is unknown
        return { products: { data: [product], total: 1 } };
    }),

    // New function to update a product in the store
    // En useProductsStores.ts

    // Actualizar la función updateProductInStore
    updateProductInStore: (productId, updatedProduct) => set((state) => {
        const currentProducts = state.products as any;
        console.log("Estado actual:", currentProducts);
        console.log("Actualizando producto ID:", productId, "con:", updatedProduct);

        // Si es un objeto con estructura de paginación
        if (currentProducts.data && Array.isArray(currentProducts.data)) {
            const updatedData = currentProducts.data.map(product => {
                if (product.id_producto === productId) {
                    console.log("Encontrado producto a actualizar:", product.id_producto);
                    return { ...product, ...updatedProduct };
                }
                return product;
            });

            console.log("Datos actualizados:", updatedData);

            return {
                products: {
                    ...currentProducts,
                    data: updatedData
                }
            };
        }

        // Si es un array simple
        if (Array.isArray(currentProducts)) {
            const updatedProducts = currentProducts.map(product =>
                product.id_producto === productId ? { ...product, ...updatedProduct } : product
            );

            return { products: updatedProducts };
        }

        // Si la estructura no es reconocida, retornar sin cambios
        console.warn("Estructura de productos no reconocida:", currentProducts);
        return { products: currentProducts };
    }),
    // Reset state to initial values
    resetState: () => set(initialState),
}));
