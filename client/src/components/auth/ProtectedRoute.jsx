import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) {

        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );

    }

    // Not logged in
    if (!user) {

        return <Navigate to="/404" replace />;

    }

    // Not admin
    if (user.role !== "admin") {

        return <Navigate to="/404" replace />;

    }

    return children;

}

export default ProtectedRoute;