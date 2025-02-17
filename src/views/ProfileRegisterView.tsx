import React, { useState, useEffect } from "react";
import { useBusinessStore } from "../stores/useBusinessStore";
import { Input, Select, Button } from "../components";
import { Role, UserRegisterModel } from "../models";
import { useAuthViewModel } from "../viewmodels/authViewModel";

interface RegisterViewProps {
    onRegister: (userData: UserRegisterModel) => void;
}

const ProfileRegisterView = ({ onRegister }: RegisterViewProps) => {
    const { token } = useAuthViewModel();
    const { businesses, fetchAllBusinesses } = useBusinessStore();

    const [userData, setUserData] = useState<UserRegisterModel>({
        nombre: '',
        email: '',
        role: 'USER',
        id_negocio: 0,
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister(userData);
        setUserData({
            nombre: '',
            email: '',
            role: 'USER',
            id_negocio: 1,
            password: '',
        })
    }

    const businessOptions = businesses.map((business) => ({
        value: business.id_negocio.toString(),
        label: business.nombre,
    }));

    useEffect(() => {
        fetchAllBusinesses(token);
    }, [token, fetchAllBusinesses]);

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                    Registro de Usuario
                </h2>

                {/* {error && <p className="text-red-500 text-center">{error}</p>} */}

                <div className="space-y-4">
                    <Input
                        label="Nombre"
                        type="text"
                        placeholder="Tu nombre"
                        value={userData.nombre}
                        onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                        required
                    />

                    <Input
                        label="Correo"
                        type="email"
                        placeholder="example@email.com"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        required
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        placeholder="•••••••"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        required
                    />

                    <Select
                        label="Role"
                        value={userData.role}
                        onChange={(e) => setUserData({ ...userData, role: e.target.value as Role })}
                        options={[
                            { value: "USER", label: "User" },
                            { value: "ADMIN", label: "Admin" },
                        ]}
                    />

                    <Select
                        label="Negocio"
                        value={userData.id_negocio.toString()}
                        onChange={(e) => setUserData({ ...userData, id_negocio: Number(e.target.value) })}
                        options={[{ value: "", label: "Seleccione un negocio" }, ...businessOptions]}
                        required
                    />

                </div>

                <Button type="submit">
                    Registrarse
                </Button>
            </form>
        </div>
    );
};

export default ProfileRegisterView;

