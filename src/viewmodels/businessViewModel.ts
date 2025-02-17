import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useBusinessStore } from "../stores/useBusinessStore";
import { BusinessModel } from "../models";
import toast from "react-hot-toast";

export const useBusinessViewModel = () => {
    const { token } = useAuthStore();
    const {
        businesses,
        categories,
        error,
        fetchAllBusinesses,
        fetchAllCategoriesBusinesses,
        createNewBusinessCategory,
        createNewBusiness,
        updateExistingBusiness
    } = useBusinessStore();

    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (token) {
            fetchAllCategoriesBusinesses(token);
            fetchAllBusinesses(token);
        }
    }, [token, fetchAllBusinesses, fetchAllCategoriesBusinesses]);

    const filterBusinesses = businesses.filter(
        (business) => !selectedCategory || business.id_categoria_negocio === Number(selectedCategory)
    );

    const handleCreateCategory = async (nombre: string) => {
        if (!token) return;
        setLoading(true);
        try {
            await createNewBusinessCategory(token, nombre);
            toast.success('Categoría Nueva creada correctamente', { position: 'bottom-right' })
        } catch (error) {
            console.error("Error al crear la categoría:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBusiness = async (businessData: BusinessModel) => {
        if (!token) return;
        setLoading(true);
        try {
            await createNewBusiness(token, businessData);
            toast.success('Negocio Nuevo creada correctamente', { position: 'bottom-right' })
        } catch (error) {
            console.error("Error al crear el negocio:", error);
            toast.error('Ocurrión un error al crear el negocio', { position: 'bottom-right' })
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateBusiness = async (businessId: number, businessData: BusinessModel) => {
        if (!token) return;
        setLoading(true);
        try {
            await updateExistingBusiness(token, businessId, businessData);
            toast.success("Negocio actualizado correctamente", { position: "bottom-right" });
        } catch (error) {
            console.error("Error al actualizar el negocio:", error);
            toast.error("Ocurrió un error al actualizar el negocio", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        businesses: filterBusinesses,
        error,
        selectedCategory,
        setSelectedCategory,
        handleCreateCategory,
        handleCreateBusiness,
        handleUpdateBusiness,
        loading
    };
};
