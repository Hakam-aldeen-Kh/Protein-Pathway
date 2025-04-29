import { Navigate } from "react-router";


import LoadingProcess from "../common/LoadingProcess";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoutes = ({children}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingProcess />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
