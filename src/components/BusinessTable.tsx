import { BusinessModel, BusinessCategoryModel } from "../models";
import Button from "./Button";

interface Props {
    businesses: BusinessModel[];
    categories: BusinessCategoryModel[];
}

const BusinessTable = ({ businesses, categories, onEdit }: Props & { onEdit: (business: BusinessModel) => void }) => {
    return (
        <div className="overflow-auto rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Propietario</th>
                        <th>Dirección</th>
                        <th>Estado</th>
                        <th>telefono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {businesses.map((business, index) => (
                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{business.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {categories.find((cat) => cat.id_categoria_negocio === business.id_categoria_negocio)?.nombre || "Desconocido"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {business.propietario}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {business.direccion}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${business.estatus ?
                                        'bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-red-200 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                    {business.estatus ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {business.telefono}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Button onClick={() => onEdit(business)}>Editar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BusinessTable;
