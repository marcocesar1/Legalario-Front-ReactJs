import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  /* const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  } */

  const user = null;

  if (user) {
    return <Navigate to="/users" replace />;
  }

  return children;
};

export default PublicRoute;
