import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const ProfileProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? children : <Navigate to="/profile" />;
};

export default ProfileProtectedRoute;
