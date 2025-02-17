import { useState } from "react";
import { useBusinessViewModel } from "../viewmodels/businessViewModel";
import { MessageError, MessageLoading, BusinessCategorySelect, BusinessTable, Input, Button } from '../components';
import toast from "react-hot-toast";
import BusinessRegisterView from "./BusinessRegisterView";
import { BusinessModel } from "../models";

const BusinessView = () => {
    const {
        categories,
        businesses,
        error,
        selectedCategory,
        setSelectedCategory,
        handleCreateCategory,
        handleCreateBusiness,
        handleUpdateBusiness,
        loading
    } = useBusinessViewModel();

    const [newCategory, setNewCategory] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [editingBusiness, setEditingBusiness] = useState<BusinessModel | null>(null);

    const handleSubmitCategory = async () => {
        if (!newCategory.trim()) {
            toast.error('Ingresa el nombre de la categoría ', { position: 'bottom-right' });
            return;
        };
        await handleCreateCategory(newCategory);
        setNewCategory("");
    };

    const handleSaveEdit = async () => {
        if (!editingBusiness || editingBusiness.id_negocio === undefined) {
            toast.error("No se puede actualizar un negocio sin ID.");
            return;
        }

        await handleUpdateBusiness(editingBusiness.id_negocio, editingBusiness);
        setEditingBusiness(null);
    };


    return (
        <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Gestión de Negocios</h2>

                {error && <MessageError message={error} />}

                {/* Botón para alternar la visibilidad del formulario de registro */}
                <div className="mb-4">
                    <Button onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? "Cancelar Registro" : "Agregar Nuevo Negocio"}
                    </Button>
                </div>

                {/* Contenedor del formulario de registro con transición */}
                <div className={`transition-all duration-300 ease-in-out ${isRegistering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 h-0 overflow-hidden'}`}>
                    {isRegistering && (
                        <BusinessRegisterView
                            categories={categories}
                            handleCreateBusiness={handleCreateBusiness}
                            loading={loading}
                        />
                    )}
                </div>

                {/* Formulario para agregar nueva categoría */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 dark:text-white text-gray-900">
                        Agregar Nueva Categoría
                    </h3>

                    <div className="p-6 bg-white/10 dark:bg-gray-900/40 border border-gray-300/40 dark:border-gray-700/40 
                rounded-xl shadow-lg backdrop-blur-md">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Selección de categoría existente */}
                            <BusinessCategorySelect
                                categories={categories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                            />

                            {/* Agregar nueva categoría */}
                            <div className="flex items-end gap-4">
                                <div className="flex-grow">
                                    <Input
                                        label="Nueva Categoría"
                                        placeholder="Ej: Farmacia"
                                        required
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Button onClick={handleSubmitCategory} isLoading={loading}>
                                        Agregar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? <MessageLoading /> : <BusinessTable businesses={businesses} categories={categories} onEdit={setEditingBusiness} />}

                {/* Modal de Edición */}
                {editingBusiness && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg w-96">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Editar Negocio</h3>

                            {/* Nombre */}
                            <Input
                                label="Nombre"
                                value={editingBusiness.nombre}
                                onChange={(e) => setEditingBusiness({ ...editingBusiness, nombre: e.target.value })}
                                required
                            />

                            {/* Propietario */}
                            <Input
                                label="Propietario"
                                value={editingBusiness.propietario}
                                onChange={(e) => setEditingBusiness({ ...editingBusiness, propietario: e.target.value })}
                                required
                            />

                            {/* Dirección */}
                            <Input
                                label="Dirección"
                                value={editingBusiness.direccion}
                                onChange={(e) => setEditingBusiness({ ...editingBusiness, direccion: e.target.value })}
                                required
                            />

                            {/* Teléfono */}
                            <Input
                                label="Teléfono"
                                type="tel"
                                value={editingBusiness.telefono}
                                onChange={(e) => setEditingBusiness({ ...editingBusiness, telefono: e.target.value })}
                                required
                            />

                            {/* Selección de Categoría */}
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">Categoría</label>
                            <select
                                className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
                                value={editingBusiness.id_categoria_negocio}
                                onChange={(e) => setEditingBusiness({ ...editingBusiness, id_categoria_negocio: Number(e.target.value) })}
                            >
                                {categories.map((category) => (
                                    <option key={category.id_categoria_negocio} value={category.id_categoria_negocio}>
                                        {category.nombre}
                                    </option>
                                ))}
                            </select>

                            {/* Estado (Activo/Inactivo) */}
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">Estado</label>
                            <select
                                className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
                                value={editingBusiness.estatus ? "true" : "false"}
                                onChange={(e) => setEditingBusiness({ ...editingBusiness, estatus: e.target.value === "true" })}
                            >
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>

                            {/* Botones */}
                            <div className="flex justify-end gap-2 mt-6">
                                <Button onClick={() => setEditingBusiness(null)}>Cancelar</Button>
                                <Button onClick={handleSaveEdit}>Guardar Cambios</Button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default BusinessView;