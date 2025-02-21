import { Button } from '../components'
import { ArrowLeftCircle, ArrowRightCircle, PenBoxIcon } from 'lucide-react'
import { ProductModel, ProductoModePagination } from '../models';
import { useState, Fragment, useEffect } from 'react';
import CreateProductModal from "./CreateProductModal";

interface Props {
    products: ProductoModePagination;
    total: number;
    page: number;
    limit: number;
    onPageChange: (newPage: number) => void;
}

const COLUMN_STORAGE_KEY: string = "visibleColumns";

const ProductsTable = ({ products, total, page, limit, onPageChange }: Props) => {
    const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({});
    const [visibleColumns, setVisibleColumns] = useState(() => {
        const storedColumns = localStorage.getItem(COLUMN_STORAGE_KEY);
        return storedColumns ? JSON.parse(storedColumns) : {
            descripcion: true,
            sku: true,
            fecha_expiracion: true,
            estatus: true,
        };
    });

    const [isVisible, setIsVisible] = useState(false);

    const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);

    const handleCreateProduct = (product: ProductModel) => {
        console.log("Nuevo producto creado:", product);
        // Aquí podrías hacer una llamada a tu API para guardar el producto
    };

    useEffect(() => {
        setIsVisible(false);
        const timeout = setTimeout(() => setIsVisible(true), 200);
        return () => clearTimeout(timeout);
    }, [products]);

    useEffect(() => {
        localStorage.setItem(COLUMN_STORAGE_KEY, JSON.stringify(visibleColumns));
    }, [visibleColumns]);

    const toggleColumnVisibility = (column: string) => {
        setVisibleColumns(prev => {
            const updatedColumns = { ...prev, [column]: !prev[column] };
            localStorage.setItem(COLUMN_STORAGE_KEY, JSON.stringify(updatedColumns));
            return updatedColumns;
        });
    };
    const toggleDescription = (productId: number) => {
        setExpandedDescriptions({
            ...expandedDescriptions,
            [productId]: !expandedDescriptions[productId],
        });
    };

    const formatDate = (dateString: Date | undefined | null) => {
        if (!dateString) {
            return "N/A";
        }

        try {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid Date";
        }
    };

    interface PropsColumns {
        key: string;
        label: string;
        alwaysVisible?: boolean | undefined;
    };

    const columns: PropsColumns[] = [
        { key: 'nombre', label: 'Producto', alwaysVisible: true },
        { key: 'descripcion', label: 'Descripción' },
        { key: 'sku', label: 'SKU' },
        { key: 'precio', label: 'Precio', alwaysVisible: true },
        { key: 'stock', label: 'Stock', alwaysVisible: true },
        { key: 'tipo_unidad', label: 'Unidad', alwaysVisible: true },
        { key: 'fecha_expiracion', label: 'Fecha de Expiración' },
        { key: 'estatus', label: 'Estado' },
    ];

    return (
        <div className="mt-5 overflow-x-auto shadow-lg rounded-lg p-4 bg-white dark:bg-gray-800">
            {/* Información de productos */}
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between"> {/* Flex column on small screens, row on medium and up */}
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 md:mb-0"> {/* Margin bottom only on small screens */}
                    Total de productos: {total}
                </h2>
                <Button onClick={() => setIsCreateProductModalOpen(true)}>
                    Crear Producto
                </Button>
            </div>

            <CreateProductModal
                isOpen={isCreateProductModalOpen}
                onClose={() => setIsCreateProductModalOpen(false)}
                onCreate={handleCreateProduct}
            />

            {/* Column Visibility Controls */}
            <div className="flex flex-wrap justify-center md:justify-start"> {/* Center on small screens, left-aligned on medium and up */}
                {columns.filter(col => !col.alwaysVisible).map(col => (
                    <label key={col.key} className="inline-flex items-center mr-4 mb-2 md:mb-0">
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            checked={visibleColumns[col.key]}
                            onChange={() => toggleColumnVisibility(col.key)}
                        />
                        <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{col.label}</span>
                    </label>
                ))}
            </div>

            {/* Tabla de productos */}
            <table className={`min-w-full table-auto transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} className={`px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white ${!col.alwaysVisible && !visibleColumns[col.key] ? 'hidden' : ''}`}>
                                {col.label}
                            </th>
                        ))}
                        <th className='px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white'>
                            Editar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products?.data?.map((product: ProductoModePagination) => {
                        const isExpanded = expandedDescriptions[product.id_producto] || false;
                        const shortDescription = product.descripcion?.length > 30
                            ? product.descripcion.substring(0, 30) + '...'
                            : product.descripcion || "N/A";

                        return (
                            <tr key={product.id_producto} className="hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                                {columns.map(col => (
                                    <td key={col.key} className={`px-4 py-2 text-sm text-gray-900 dark:text-white ${!col.alwaysVisible && !visibleColumns[col.key] ? 'hidden' : ''}`}>
                                        {col.key === 'nombre' && product.nombre}
                                        {col.key === 'descripcion' && (
                                            <Fragment>
                                                {isExpanded ? product.descripcion : shortDescription}
                                                {product.descripcion?.length > 30 && (
                                                    <button
                                                        onClick={() => toggleDescription(product.id_producto)}
                                                        className="ml-1 text-blue-500 hover:underline focus:outline-none"
                                                    >
                                                        {isExpanded ? 'Mostrar menos' : 'Mostrar más...'}
                                                    </button>
                                                )}
                                            </Fragment>
                                        )}
                                        {col.key === 'sku' && (product.sku ? product.sku : 'N/A')}
                                        {col.key === 'precio' && `S/ ${product.precio}`}
                                        {col.key === 'stock' && product.stock}
                                        {col.key === 'tipo_unidad' && product.tipo_unidad}
                                        {col.key === 'fecha_expiracion' && formatDate(product.fecha_expiracion)}
                                        {col.key === 'estatus' && (
                                            <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${product.estatus ? 'bg-green-100 text-green-700 dark:bg-green-600/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-600/20 dark:text-red-400'}`}>
                                                {product.estatus ? 'Activo' : 'Inactivo'}
                                            </span>
                                        )}
                                    </td>
                                ))}

                                <td>
                                    <Button
                                        color='from-emerald-600 to-green-500'
                                        onClick={() => { console.log('Editando...') }}
                                    >
                                        <PenBoxIcon size={20} />
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="flex justify-between items-center mt-4 gap-2">
                <Button
                    className="px-2 py-1 text-sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}>
                    <ArrowLeftCircle />
                </Button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    Página {page} de {Math.ceil(total / limit)}
                </span>
                <Button
                    className="px-2 py-1 text-sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= Math.ceil(total / limit)}>
                    <ArrowRightCircle />
                </Button>
            </div>
        </div>
    );
};

export default ProductsTable;
