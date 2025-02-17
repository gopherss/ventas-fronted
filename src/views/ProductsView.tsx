import { useEffect, useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { useProductsViewModel } from '../viewmodels/productViewModel';
import { Input, Button } from '../components';

const ProductsView = () => {
    const {
        categoriesProducts,
        error,
        loading,
        fetchCategoriesProductData,
        createCategory,
        updateCategory,
    } = useProductsViewModel();

    const [newCategoryName, setNewCategoryName] = useState('');
    const [updateCategoryName, setUpdateCategoryName] = useState('');
    const [categoryToUpdate, setCategoryToUpdate] = useState<number | null>(null);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        fetchCategoriesProductData();
    }, [fetchCategoriesProductData]);

    const handleCreateCategory = () => {
        if (newCategoryName.trim()) {
            createCategory(newCategoryName);
            setNewCategoryName('');
            setIsCreateModalOpen(false);  // Cerrar modal después de crear
        }
    };

    const handleUpdateCategory = () => {
        if (categoryToUpdate && updateCategoryName.trim()) {
            updateCategory(categoryToUpdate, updateCategoryName);
            setCategoryToUpdate(null);
            setUpdateCategoryName('');
            setIsUpdateModalOpen(false);  // Cerrar modal después de actualizar
        }
    };

    // Función para seleccionar la categoría y mostrar el nombre en el input
    const handleSelectCategoryToUpdate = (id: number, name: string) => {
        setCategoryToUpdate(id);
        setUpdateCategoryName(name);
        setIsUpdateModalOpen(true);  // Abrir modal de actualización
    };

    return (
        <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Categorías de Productos
                </h3>

                {loading && <p className="text-center text-gray-500 dark:text-gray-400">Cargando categorías...</p>}
                {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 text-center">{error}</div>}

                {/* Botón "Añadir nueva categoría" */}
                <Button
                    onClick={() => setIsCreateModalOpen(true)}  // Abrir modal de creación
                    className="mb-4 flex items-center justify-center space-x-2"
                >
                    <Plus size={20} />
                </Button>

                <div className="mt-2 max-h-80 overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-lg 
                bg-white dark:bg-gray-900 shadow-lg scrollbar-thin scrollbar-thumb-gray-400 
                dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
                    {categoriesProducts.map((category) => (
                        <div
                            key={category.id_categoria_producto}
                            className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700
                       bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                       transition-colors duration-200"
                        >
                            <span className="text-lg text-gray-800 dark:text-white font-medium">
                                {category.nombre}
                            </span>
                            <div className="flex">
                                <button
                                    onClick={() => category.id_categoria_producto && handleSelectCategoryToUpdate(category.id_categoria_producto, category.nombre)}
                                >
                                    <Pencil size={20} />
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de Crear Nueva Categoría */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Crear Nueva Categoría
                        </h3>
                        <div className="space-y-4">
                            <Input
                                label="Nombre de nueva categoría"
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                            />
                            <div className="flex gap-4">
                                <Button
                                    onClick={handleCreateCategory}
                                    isLoading={loading} // Activar el loader mientras se está creando
                                >
                                    Crear
                                </Button>
                                <Button
                                    color='bg-red-400'
                                    onClick={() => setIsCreateModalOpen(false)}  // Cerrar modal
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Actualizar Categoría */}
            {isUpdateModalOpen && categoryToUpdate !== null && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Actualizar Categoría
                        </h3>
                        <div className="space-y-4">
                            <Input
                                label="Nuevo nombre de categoría"
                                type="text"
                                value={updateCategoryName}
                                onChange={(e) => setUpdateCategoryName(e.target.value)}
                            />
                            <div className="flex gap-4">
                                <Button
                                    onClick={handleUpdateCategory}
                                    isLoading={loading} // Activar el loader mientras se está actualizando
                                >
                                    Actualizar
                                </Button>
                                <Button
                                    onClick={() => {
                                        setCategoryToUpdate(null);
                                        setUpdateCategoryName('');
                                        setIsUpdateModalOpen(false); // Cerrar modal
                                    }}
                                    color='bg-red-400'
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsView;
