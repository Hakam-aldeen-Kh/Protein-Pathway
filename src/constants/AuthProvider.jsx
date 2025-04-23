// AuthProvider.jsx
import { createContext, useState, useEffect } from "react";
import api from "../utils/api";
import LoadingProcess from "../common/LoadingProcess";

// Create the context
export const AuthContext = createContext({
  isAuthenticated: false,
  isLoading: true,
  refreshAuth: () => {},
});

// Provider component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to check authentication status via API
  const checkAuth = async () => {
    try {
      const response = await api.get("auth/check-auth");

      // Check if response has the expected structure
      if (response.data && response.data.data) {
        return response.data.data.isAuthenticated || false;
      }

      return false;
    } catch (error) {
      console.error("Authentication check failed:", error);
      return false;
    }
  };

  // Function to verify authentication status
  const verifyAuth = async () => {
    setIsLoading(true);
    try {
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
    } catch (error) {
      console.error("Error in auth verification:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication on mount
  useEffect(() => {
    verifyAuth();
  }, []);

  // Authentication context value
  const contextValue = {
    isAuthenticated,
    isLoading,
    refreshAuth: verifyAuth,
  };

  // Show loading screen while performing initial auth check
  if (isLoading) {
    return <LoadingProcess />;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
