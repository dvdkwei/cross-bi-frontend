import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthScreen } from "../pages/AuthScreen";
import { AuthProviderValue } from "../types/AuthTypes";

export const RouteProtector = () => {
  const { isAuthenticated } = useAuth() as AuthProviderValue;

  return isAuthenticated ? <Outlet /> : <AuthScreen />
}