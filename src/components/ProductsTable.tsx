import { Button } from '../components'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import { ProductoModePagination } from '../models';

interface Props {
    products: ProductoModePagination;
    total: number;
    page: number;
    limit: number;
    onPageChange: (newPage: number) => void;
}

const ProductsTable = ({ products, total, page, limit, onPageChange }: Props) => {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">Producto</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">Descripción</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">SKU</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">Precio</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">Stock</th>
                        <th className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.data?.map((product: ProductoModePagination) => (
                        <tr key={product.id_producto} className="hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{product.nombre}</td>
                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{product.descripcion}</td>
                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{product.sku}</td>
                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">S/ {product.precio}</td>
                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{product.stock} {product.tipo_unidad}</td>
                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{product.categoriaProducto?.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="flex justify-between items-center mt-4 gap-2">
                <Button
                    className="px-2 py-1 text-sm"  // Botón más angosto
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}>
                    <ArrowLeftCircle />
                </Button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    Página {page} de {Math.ceil(total / limit)}
                </span>
                <Button
                    className="px-2 py-1 text-sm"  // Botón más angosto
                    onClick={() => onPageChange(page + 1)} disabled={page * limit >= total}>
                    <ArrowRightCircle />
                </Button>
            </div>
        </div>
    );
};

export default ProductsTable;
