import { BusinessCategoryModel } from "../models";

interface Props {
    categories: BusinessCategoryModel[];
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
}

const BusinessCategorySelect = ({ categories, selectedCategory, setSelectedCategory }: Props) => {
    return (
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg 
                            border border-gray-300 dark:border-gray-600 
                            bg-white dark:bg-gray-800 
                            text-gray-900 dark:text-white
                            focus:ring-2 focus:ring-blue-500
                             dark:focus:ring-blue-400">
            <option value="">Todas las Categorías</option>
            {categories.map((category) => (
                <option key={category.id_categoria_negocio} value={category.id_categoria_negocio}>
                    {category.nombre}
                </option>
            ))}
        </select>
    );
};

export default BusinessCategorySelect;
