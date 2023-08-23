import { Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { AuthScreen } from "../pages/AuthScreen";
import { AuthProviderValue } from "../types/AuthTypes";

export const RouteProtector = () => {
  const { isAuthenticated } = useAuthContext() as AuthProviderValue;

  return isAuthenticated ? <Outlet /> : <AuthScreen />
}