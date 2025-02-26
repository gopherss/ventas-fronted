import { useState, useEffect } from "react";
import { ProductModel } from "../models";
import { Button, Input, Select, Textarea } from './index';
import { useProductsViewModel } from "../viewmodels/productViewModel";
import toast from "react-hot-toast";

const EditProductModal = ({ product, isOpen, onClose, onUpdate }: {
    product: ProductModel;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (updatedProduct: ProductModel) => void;
}) => {
    const [formData, setFormData] = useState<ProductModel>({
        ...product,
        fecha_expiracion: product.fecha_expiracion ? new Date(product.fecha_expiracion) : undefined,
    });
    const { categories, fetchCategoriesProductData } = useProductsViewModel();

    useEffect(() => {
        fetchCategoriesProductData();
    }, [fetchCategoriesProductData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === "precio" || name === "stock" ? (value ? Number(value) : 0) : value }));
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            id_categoria_producto: Number(e.target.value),
        }));
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            estatus: e.target.value === 'true',
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (selectedDate && selectedDate < currentDate) {
            toast.error("La fecha de expiración no puede ser anterior a la fecha actual.", { position: 'bottom-right' });
            return;
        }

        setFormData(prev => ({
            ...prev,
            fecha_expiracion: selectedDate,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
        onClose();
    };

    return (
        <div className={`fixed inset-0 flex justify-center items-center z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[800px]">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Editar Producto</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <Input
                            label="Nombre"
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                        <Textarea label="Descripción"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            rows={4} />
                        <Input
                            label="SKU"
                            type="text"
                            name="sku"
                            value={formData.sku || ''}
                            onChange={handleChange}
                        />
                        <Input
                            label="Precio"
                            type="number"
                            name="precio"
                            value={formData.precio}
                            onChange={handleChange}
                        />
                        <Input
                            label="Stock"
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-1">
                        <Input
                            label="Unidad"
                            type="text"
                            name="tipo_unidad"
                            value={formData.tipo_unidad}
                            onChange={handleChange}
                        />
                        <Select
                            label="Categoría"
                            options={Array.isArray(categories) ? categories.map(category => ({
                                value: category.id_categoria_producto.toString(),
                                label: category.nombre
                            })) : []}
                            value={formData.id_categoria_producto?.toString()}
                            onChange={handleCategoryChange}
                        />
                        <Select
                            label="Estatus"
                            options={[{ value: 'true', label: 'Activo' }, { value: 'false', label: 'Inactivo' }]}
                            value={formData.estatus ? 'true' : 'false'}
                            onChange={handleStatusChange}
                        />
                        <Input
                            label="Fecha de Expiración"
                            type="date"
                            name="fecha_expiracion"
                            value={formData.fecha_expiracion instanceof Date ? formData.fecha_expiracion.toISOString().split('T')[0] : ''}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="col-span-2 flex justify-end gap-4">
                        <Button type="submit">Guardar</Button>
                        <Button color="from-rose-600 to-fuchsia-500" onClick={onClose}>Cancelar</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;