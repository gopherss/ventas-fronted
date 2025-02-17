import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.ts';
import ProtectedRoute from './ProtectedRoute';
import Navbar from '../components/Navbar';
import ProtectedRouteByRole from './ProtectedRouteByRole.tsx';

import LoginView from '../views/LoginView';
import UsersView from '../views/UsersView.tsx';
import ProfileView from '../views/ProfileView';
import BusinessView from '../views/BusinessView.tsx';
import ProfileUpdateView from '../views/ProfileUpdateView.tsx';
import ProfileRegisterView from '../views/ProfileRegisterView.tsx';
import ProductsView from '../views/ProductsView.tsx';

const AppRouter = () => {
    const { token } = useAuthStore();

    return (
        <Router>
            {token && <Navbar />}
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={token ? <Navigate to="/profile" /> : <LoginView />} />
                <Route path="/register" element={
                    <ProtectedRouteByRole allowedRoles={['ROOT']}>
                        <ProfileRegisterView />
                    </ProtectedRouteByRole>
                } />
                <Route path="/users" element={
                    <ProtectedRouteByRole allowedRoles={["ROOT"]}>
                        <UsersView />
                    </ProtectedRouteByRole>
                } />
                <Route path="/update-profile" element={
                    <ProtectedRouteByRole allowedRoles={["ROOT"]}>
                        <ProfileUpdateView />
                    </ProtectedRouteByRole>
                } />

                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfileView />
                    </ProtectedRoute>
                } />
                <Route path="/products" element={
                    <ProtectedRoute>
                        <ProductsView />
                    </ProtectedRoute>
                } />
                <Route path="/business" element={
                    <ProtectedRouteByRole allowedRoles={['ROOT']}>
                        <BusinessView />
                    </ProtectedRouteByRole>
                } />
            </Routes>
        </Router>
    );
};

export default AppRouter;
