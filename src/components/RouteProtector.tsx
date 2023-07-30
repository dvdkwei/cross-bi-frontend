import { Outlet } from "react-router-dom";
import { AuthProviderValue } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth"
import { AuthScreen } from "../pages/AuthScreen";

export const RouteProtector = () => {
  const { isAuthenticated } = useAuth() as AuthProviderValue;

  return isAuthenticated ? <Outlet /> : <AuthScreen />
}