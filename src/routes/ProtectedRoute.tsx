import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = null;
  /* const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  } */

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
