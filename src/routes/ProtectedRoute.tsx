import { Navigate } from "react-router-dom";
import useAuthStore from "../core/features/auth/store/useAuthStore";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const authStore = useAuthStore();

  if (!authStore.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
