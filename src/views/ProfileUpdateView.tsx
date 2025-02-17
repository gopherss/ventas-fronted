import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Button, Input, Select } from "../components";
import { useBusinessStore } from "../stores/useBusinessStore";
import { Role, UserUpdateModel } from "../models";
import { useUserViewModel } from "../viewmodels/userViewModel";

interface ProfileUpdateViewProps {
    user: UserUpdateModel;
}

const ProfileUpdateView = ({ user }: ProfileUpdateViewProps) => {
    const { token } = useAuthStore();
    const { handleUpdateProfile } = useUserViewModel();
    const { businesses, fetchAllBusinesses } = useBusinessStore();

    const [form, setForm] = useState<UserUpdateModel>({
        nombre: '',
        email: '',
        password: '',
        id_negocio: 1,
        role: 'USER',
        estatus: true,
    });

    useEffect(() => {
        if (user) {
            setForm({
                nombre: user.nombre,
                email: user.email,
                password: '',
                id_negocio: user.id_negocio,
                role: user.role as Role,
                estatus: user.estatus,
            });
        }
    }, [user]);

    useEffect(() => {
        if (token) {
            fetchAllBusinesses(token);
        }
    }, [fetchAllBusinesses, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return;
        handleUpdateProfile(Number(user.id_usuario), form);
    };

    const businessOptions = businesses.map((business) => ({
        value: business.id_negocio.toString(),
        label: business.nombre,
    }));

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                    Actualizar Perfil
                </h2>

                <div className="space-y-4">
                    <Input
                        label="Nombre"
                        type="text"
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        required
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />

                    <Input
                        label="Nueva contraseña"
                        type="password"
                        placeholder="Dejar en blanco para mantener la actual"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    {user.role !== 'ROOT' && (
                        <Select
                            label="Role"
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                            options={[
                                { value: "ADMIN", label: "Admin" },
                                { value: "USER", label: "User" },
                            ]}
                        />
                    )}

                    <Select
                        label="Negocio"
                        value={form.id_negocio}
                        onChange={(e) => setForm({ ...form, id_negocio: Number(e.target.value) })}
                        options={[{ value: "", label: "Seleccione un negocio" }, ...businessOptions]}
                        required
                    />

                    {user.role !== 'ROOT' && (
                        <Select
                            label="Estado"
                            value={form.estatus ? "Activo" : "Inactivo"} // Convertimos boolean a string
                            onChange={(e) => setForm({ ...form, estatus: e.target.value === "Activo" })} // Convertimos string a boolean
                            options={[
                                { value: "Activo", label: "Activo" },
                                { value: "Inactivo", label: "Inactivo" },
                            ]}
                        />
                    )}


                </div>

                <Button
                    type="submit"
                >
                    Guardar Cambios
                </Button>
            </form>
        </div>
    );
};

export default ProfileUpdateView;
