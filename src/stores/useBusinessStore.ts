import { create } from "zustand";
import { BusinessModel, BusinessCategoryModel } from "../models";
import {
    fetchBusinesses,
    fetchCategoriesBusiness,
    createBusinessCategory,
    createBusiness,
    updateBusiness
} from "../services/businessService";

interface BusinessState {
    businesses: BusinessModel[];
    categories: BusinessCategoryModel[];
    loading: boolean;
    error: string | null;
    fetchAllBusinesses: (token: string) => Promise<void>;
    fetchAllCategoriesBusinesses: (token: string) => Promise<void>;
    createNewBusinessCategory: (token: string, nombre: string) => Promise<void>;
    createNewBusiness: (token: string, businessData: BusinessModel) => Promise<void>;
    updateExistingBusiness: (token: string, businessId: number, businessData: BusinessModel) => Promise<void>;
}

export const useBusinessStore = create<BusinessState>((set) => ({
    businesses: [],
    categories: [],
    loading: false,
    error: null,

    fetchAllBusinesses: async (token: string) => {
        try {
            set({ loading: true, error: null });
            const data = await fetchBusinesses(token);
            set({ businesses: data });
        } catch (error) {
            console.error(error);
            set({ error: "Error al obtener los negocios" });
        } finally {
            set({ loading: false });
        }
    },

    fetchAllCategoriesBusinesses: async (token: string) => {
        try {
            set({ loading: true, error: null });
            const data = await fetchCategoriesBusiness(token);
            set({ categories: data });
        } catch (error) {
            console.error(error);
            set({ error: "Error al obtener categorías" });
        } finally {
            set({ loading: false });
        }
    },

    createNewBusinessCategory: async (token: string, nombre: string) => {
        try {
            set({ loading: true, error: null });
            const newCategory = await createBusinessCategory(token, nombre);

            // Actualizar el estado agregando la nueva categoría
            set((state) => ({
                categories: [...state.categories, newCategory]
            }));
        } catch (error) {
            console.error(error);
            set({ error: "Error al crear la categoría" });
        } finally {
            set({ loading: false });
        }
    },

    createNewBusiness: async (token: string, businessData: BusinessModel) => {
        try {
            set({ loading: true, error: null });
            const newBusiness = await createBusiness(token, businessData);

            // Actualizar el estado agregando el nuevo negocio
            set((state) => ({
                businesses: [...state.businesses, newBusiness]
            }));

            const updatedBusinesses = await fetchBusinesses(token);
            set({ businesses: updatedBusinesses });
        } catch (error) {
            console.error(error);
            set({ error: "Error al crear el negocio" });
        } finally {
            set({ loading: false });
        }
    },
    updateExistingBusiness: async (token: string, businessId: number, businessData: BusinessModel) => {
        try {
            set({ loading: true, error: null });
            const updatedBusiness = await updateBusiness(token, businessId, businessData);

            set((state) => ({
                businesses: state.businesses.map((b) =>
                    b.id_negocio === businessId ? updatedBusiness : b
                ),
            }));

            // Obtener todos los negocios actualizados
            const updatedBusinesses = await fetchBusinesses(token);
            set({ businesses: updatedBusinesses });

        } catch (error) {
            console.error(error);
            set({ error: "Error al actualizar el negocio" });
        } finally {
            set({ loading: false });
        }
    },
}));
