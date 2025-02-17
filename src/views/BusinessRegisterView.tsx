import { useState } from "react";
import { Input, Select, Button } from '../components';
import toast from "react-hot-toast";
import { BusinessModel } from "../models";

// Definir la interfaz para las props
interface BusinessRegisterViewProps {
    categories: Array<{ id_categoria_negocio: number; nombre: string }>;
    handleCreateBusiness: (business: BusinessModel) => Promise<void>;
    loading: boolean;
}

const BusinessRegisterView: React.FC<BusinessRegisterViewProps> = ({ categories, handleCreateBusiness, loading }) => {
    const [newBusiness, setNewBusiness] = useState({
        nombre: "",
        propietario: "",
        direccion: "",
        telefono: "",
        estatus: true,
        id_categoria_negocio: 0
    });

    const handleSubmitBusiness = async () => {
        if (!newBusiness.nombre.trim() || newBusiness.id_categoria_negocio === 0) {
            toast.error('Por favor, completa todos los campos requeridos', { position: 'bottom-right' });
            return;
        }
        if (!newBusiness.telefono.trim() || newBusiness.telefono.length !== 9) {
            toast.error('Porfavor el telefono debe ser 9 digitos', { position: 'bottom-right' });
            return;
        }

        await handleCreateBusiness(newBusiness);
        setNewBusiness({
            nombre: "",
            propietario: "",
            direccion: "",
            telefono: "",
            estatus: true,
            id_categoria_negocio: 0
        });
    };

    return (
        <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Agregar Nuevo Negocio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Nombre del negocio"
                    placeholder="Ej: Botica Salud y Vida"
                    value={newBusiness.nombre}
                    onChange={(e) => setNewBusiness({ ...newBusiness, nombre: e.target.value })}
                />
                <Input
                    label="Propietario"
                    placeholder="Ej: Juan Pérez"
                    value={newBusiness.propietario}
                    onChange={(e) => setNewBusiness({ ...newBusiness, propietario: e.target.value })}
                />
                <Input
                    label="Dirección"
                    placeholder="Ej: Av. Curaciones Norte 456"
                    value={newBusiness.direccion}
                    onChange={(e) => setNewBusiness({ ...newBusiness, direccion: e.target.value })}
                />
                <Input
                    label="Teléfono"
                    placeholder="Ej: 987654322"
                    value={newBusiness.telefono}
                    onChange={(e) => setNewBusiness({ ...newBusiness, telefono: e.target.value })}
                />
                <Select
                    label="Categoría"
                    options={[
                        { value: "0", label: "Selecciona una categoría" },
                        ...categories.map((cat) => ({ value: String(cat.id_categoria_negocio), label: cat.nombre }))
                    ]}
                    value={String(newBusiness.id_categoria_negocio)}
                    onChange={(e) => setNewBusiness({ ...newBusiness, id_categoria_negocio: Number(e.target.value) })}
                />
                <div className="flex items-end">
                    <Button onClick={handleSubmitBusiness} isLoading={loading}>
                        Agregar Negocio
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BusinessRegisterView;