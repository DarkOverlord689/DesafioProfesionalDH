import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, roles = [] }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    if (roles.length > 0 && !roles.includes(user.rol)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
