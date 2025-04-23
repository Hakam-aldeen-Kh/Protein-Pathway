import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Auth loading state is handled by the AuthProvider
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
