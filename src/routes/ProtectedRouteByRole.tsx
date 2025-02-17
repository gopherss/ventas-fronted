import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { JSX } from 'react';

interface Props {
    children: JSX.Element;
    allowedRoles: string[]; // ✅ Lista de roles permitidos
}

const ProtectedRouteByRole = ({ children, allowedRoles }: Props) => {
    const { token, role } = useAuthStore();

    if (!token || !allowedRoles.includes(role || '')) {
        return <Navigate to="/" />; // ❌ Redirige si no tiene acceso
    }

    return children; // ✅ Muestra la página si tiene el rol correcto
};

export default ProtectedRouteByRole;
