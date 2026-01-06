import { Navigate } from "react-router-dom";
import useAuthStore from "../core/features/auth/store/useAuthStore";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
  const authStore = useAuthStore();

  if (authStore.user) {
    return <Navigate to="/users" replace />;
  }

  return children;
};

export default PublicRoute;
