import { useEffect, useState } from "react";
import { Button, Input, Textarea } from ".";
import { ProductModel } from "../models";
import toast from "react-hot-toast";
import { useProductsViewModel } from "../viewmodels/productViewModel";
import { useAuthViewModel } from "../viewmodels/authViewModel";
import { Select } from "./";

interface PropsCreateProduct {
    isOpen: boolean;
    onClose: () => void;
}

const CreateProductModal = ({ isOpen, onClose }: PropsCreateProduct) => {
    const { token, profile, loadProfile } = useAuthViewModel();
    const { createNewProduct, categories, fetchCategoriesProductData } = useProductsViewModel();

    useEffect(() => {
        if (token) {
            loadProfile();
        }
        fetchCategoriesProductData();
    }, [loadProfile, token, fetchCategoriesProductData]);

    const [newProduct, setNewProduct] = useState<ProductModel>({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        tipo_unidad: "",
        id_negocio: 0,
        id_categoria_producto: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setNewProduct(prev => ({
            ...prev,
            id_negocio: profile?.id_negocio || 0,
            [name]: name === "precio" || name === "stock" ? (value ? Number(value) : 0) : value,
        }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewProduct(prev => ({
            ...prev,
            id_categoria_producto: Number(e.target.value),
        }));
    };

    const handleSubmit = async () => {
        if (!newProduct.nombre.trim() || !newProduct.precio || !newProduct.stock || !newProduct.id_categoria_producto) {
            toast.error("Por favor, completa todos los campos obligatorios.", { position: 'bottom-right' });
            return;
        }

        try {
            await createNewProduct(newProduct);
            toast.success("Producto creado exitosamente", { position: 'bottom-right' });
            setNewProduct({
                nombre: "",
                descripcion: "",
                precio: 0,
                stock: 0,
                tipo_unidad: "",
                id_negocio: 0,
                id_categoria_producto: 0
            });
            onClose();
        } catch (error) {
            toast.error("Error al crear el producto", { position: 'bottom-right' });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Crear Nuevo Producto</h3>
                <div className="space-y-3">
                    <Input label="Nombre" name="nombre" value={newProduct.nombre} onChange={handleChange} />
                    <Textarea label="Descripción" name="descripcion" value={newProduct.descripcion} onChange={handleChange} rows={4} />
                    <Input label="Precio" name="precio" type="number" value={newProduct.precio} onChange={handleChange} />
                    <Input label="Stock" name="stock" type="number" value={newProduct.stock} onChange={handleChange} />
                    <Input label="Unidad" name="tipo_unidad" value={newProduct.tipo_unidad} onChange={handleChange} />
                    <Select
                        label="Categoría"
                        options={Array.isArray(categories) ? categories.map(category => ({
                            value: category.id_categoria_producto.toString(),
                            label: category.nombre
                        })) : []}
                        value={newProduct.id_categoria_producto.toString()}
                        onChange={handleCategoryChange}
                    />
                    <div className="flex gap-4 mt-4">
                        <Button onClick={handleSubmit}>Crear</Button>
                        <Button color="from-rose-600 to-fuchsia-500" onClick={onClose}>Cancelar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProductModal;
