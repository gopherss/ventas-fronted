import { useState } from 'react';
import { Pencil, Plus, SearchIcon, XIcon } from 'lucide-react';
import { useProductsViewModel } from '../viewmodels/productViewModel';
import { Input, Button, ProductsTable } from '../components';

const ProductsView = () => {
    const {
        products,
        categories,
        error,
        loading,
        createCategory,
        updateCategory,
        fetchProducts,
        updateExistingProduct
    } = useProductsViewModel();

    const [newCategoryName, setNewCategoryName] = useState('');
    const [updateCategoryName, setUpdateCategoryName] = useState('');
    const [categoryToUpdate, setCategoryToUpdate] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const [page, setPage] = useState(1);
    const limit = 10;  // Puedes ajustar el límite según tus necesidades


    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        fetchProducts(newPage, limit, searchTerm);
    };

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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Categorías de Productos
                </h3>


                {loading && <p className="text-center text-gray-500 dark:text-gray-400">Cargando categorías...</p>}
                {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 text-center">{error}</div>}

                {/* Botón "Añadir nueva categoría" */}
                <Button
                    color='from-blue-600 to-cyan-500'
                    onClick={() => setIsCreateModalOpen(true)}  // Abrir modal de creación
                >
                    <Plus size={20} />
                </Button>

                <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-lg">
                    {categories.map((category) => (
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
                                <Button
                                    onClick={() => category.id_categoria_producto && handleSelectCategoryToUpdate(category.id_categoria_producto, category.nombre)}
                                >
                                    <Pencil size={20} />
                                </Button>

                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Products Panel */}
            <div className="col-span-2 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Productos</h3>
                <div className="relative flex ">
                    <input
                        autoFocus
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                fetchProducts(page, limit, searchTerm);
                            }
                        }}
                        className="w-full px-4 py-2 pr-20 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    <div className="absolute right-0 flex items-center h-full pr-2">
                        {searchTerm && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    fetchProducts(page, limit, '');
                                }}
                                className="p-1 mr-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                <XIcon size={20} />
                            </button>
                        )}
                        <button
                            onClick={() => fetchProducts(page, limit, searchTerm)}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <SearchIcon size={20} />
                        </button>
                    </div>
                </div>
                {/* Mostrar mensaje de carga o error */}
                {loading && <p className="text-center text-gray-500 dark:text-gray-400">Cargando productos...</p>}
                {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 text-center">{error}</div>}

                {/* Tabla de productos */}
                <ProductsTable
                    products={products}
                    total={products?.total}
                    page={page}
                    limit={limit}
                    onPageChange={handlePageChange}
                    updateExistingProduct={updateExistingProduct}
                />
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
                                    color='from-rose-600 to-fuchsia-500'
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
                                    color='from-rose-600 to-fuchsia-500'
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
