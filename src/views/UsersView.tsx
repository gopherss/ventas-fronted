import { useEffect, useState, Fragment } from "react";
import { ArrowLeft, Edit, UserCircle, UserPlus } from "lucide-react";
import { UserModel, UserUpdateModel } from "../models";
import RegisterView from "./ProfileRegisterView";
import ProfileUpdateView from "./ProfileUpdateView";
import { useUserStore } from "../stores/useUserStore";
import { useUserViewModel } from "../viewmodels/userViewModel";
import { Button, MessageLoading, MessageError } from "../components";

const UsersView = () => {
    const { users, error, loading } = useUserStore();
    const { handleAllUsers, handleRegisterUser } = useUserViewModel();

    const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
    const [isRegistering, setIsRegistering] = useState(false);

    // Agrupar usuarios por id_negocio
    const groupedUsers = users.reduce((acc: { [key: number]: typeof users }, user) => {
        const key = user.id_negocio;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(user);
        return acc;
    }, {} as { [key: number]: typeof users });


    useEffect(() => {
        handleAllUsers();
    }, [handleAllUsers]);

    const changeView = (newView: 'list' | 'register' | 'edit', user: UserModel | null = null) => {
        if (newView === 'edit') {
            setSelectedUser(user);
        } else {
            setSelectedUser(null);
        }
        setIsRegistering(newView === 'register');
    };

    if (loading) return <MessageLoading />;
    if (error) return <MessageError />;

    return (
        <div className="p-6 lg:p-8 min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-5">
                        {selectedUser ? "Gestión de Usuario" : "Usuarios Registrados"}
                    </h2>

                    {selectedUser ? (
                        <button
                            onClick={() => changeView('list')}
                            className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-md"
                        >
                            <ArrowLeft className="w-5 h-5" /> Volver
                        </button>
                    ) : (
                        <div className="flex rounded-md shadow-sm">
                            <button
                                onClick={() => changeView('list')}
                                className={`px-4 py-2 flex items-center gap-2 
                                    ${!isRegistering ? 'bg-blue-600 text-white' :
                                        'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'} 
                                        rounded-l-lg transition-all duration-200 hover:bg-blue-700 hover:text-white`}
                            >
                                <UserCircle className="w-5 h-5" /> Ver Usuarios
                            </button>
                            <button
                                onClick={() => changeView('register')}
                                className={`px-4 py-2 flex items-center gap-2 ${isRegistering ?
                                    'bg-blue-600 text-white' :
                                    'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'} 
                                    rounded-r-lg transition-all duration-200 hover:bg-blue-700 hover:text-white`}
                            >
                                <UserPlus className="w-5 h-5" /> Registrar
                            </button>
                        </div>
                    )}
                </div>

                <div className={`transition-all duration-300 ease-in-out ${selectedUser || isRegistering ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}>
                    {selectedUser ? (
                        <ProfileUpdateView user={selectedUser as UserUpdateModel} />
                    ) : isRegistering ? (
                        <RegisterView onRegister={handleRegisterUser} />
                    ) : (
                        <div className="overflow-auto rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
                            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-700">
                                        <th className="p-3 text-left">Nombre</th>
                                        <th className="p-3 text-left">Email</th>
                                        <th className="p-3 text-left">Rol</th>
                                        <th className="p-3 text-left">Estatus</th>
                                        <th className="p-3 text-left">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {Object.entries(groupedUsers).map(([idNegocio, usersGroup]) => (
                                        <Fragment key={`negocio-${idNegocio}`}>
                                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td colSpan={6} className="p-3 font-semibold text-lg text-center uppercase text-gray-900 dark:text-white">
                                                    Negocio: {usersGroup[0].negocio?.nombre}
                                                </td>
                                            </tr>
                                            {usersGroup.map((user) => (
                                                <tr
                                                    key={user.id_usuario}
                                                    className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.nombre}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.role}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.estatus ? 'bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-200 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                            {user.estatus ? "Activo" : "Inactivo"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6  whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                        <Button
                                                            color="bg-amber-300 hover:bg-amber-400 text-zinc-800 font-medium shadow-md flex items-center justify-center gap-2 px-3 py-2"
                                                            onClick={() => changeView('edit', user)}
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersView;