// useAuth.jsx - Make sure this is a .jsx file
import { useContext } from "react";
import { AuthContext } from "../constants/AuthProvider";


export const useAuth = () => {
  return useContext(AuthContext);
};
