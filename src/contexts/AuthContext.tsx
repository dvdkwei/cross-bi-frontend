import { ReactElement, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookie } from "../hooks/useCookie";
import { useToast } from "../hooks/useToast";
import { AuthProviderValue, LoginData, registerData } from "../types/AuthTypes";
import { ToastProviderValue } from "../types/ToastTypes";

export const AuthContext = createContext<Partial<AuthProviderValue>>({})

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast() as ToastProviderValue;
  const { value: authValue, persistCookie: persistAuthCookie } = useCookie('cb_authed');
  const { persistCookie: persistUIDCookie } = useCookie('cb_user_id');

  const removeAllCookies = () => {
    document.cookie.split(';').forEach(cookie => {
      document.cookie = cookie.trim() + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    })
  }

  const handleRegister = async (registerData: registerData) => {
    setIsLoading(true);
    const headers = new Headers();
    headers.append('x-api-key', API_KEY);
    headers.append('Content-Type', 'appplication/json');

    try {
      await fetch(`${BASE_API_URL}/user/`, {
        headers,
        method: 'POST',
        body: JSON.stringify(registerData)
      }).then(res => {
        if (res.status === 409) {
          throw Error('A user with this email is already registered');
        }
        else if (res.status !== 200) {
          throw Error('Registration failed');
        }
        return res.json()
      });
    } catch (err: unknown) {
      addToast({ message: (err as Error).message, style: 'toast-error', timeout: 4000 });
      return;
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
    navigate('/');
    addToast({
      message: 'You can now log in with the registered email and password!',
      style: 'toast-success',
      timeout: 5000
    });
  }

  const handleLogin = async (loginData: LoginData) => {
    setIsLoading(true);
    const headers = new Headers();
    headers.append('x-api-key', API_KEY);
    headers.append('Content-Type', 'appplication/json');

    try {
      await fetch(`${BASE_API_URL}/user/login`, {
        headers,
        method: 'POST',
        body: JSON.stringify(loginData)
      }).then(res => {
        if (res.status === 401) {
          throw Error('False Email or Password');
        }
        if (res.status !== 200) {
          throw Error('Error logging in. Please check your internet connection');
        }
        return res.json();
      }).then(parsed => {
        persistUIDCookie(parsed.data.id);
      });
    } catch (err: unknown) {
      addToast({ message: (err as Error).message, style: 'toast-error', timeout: 4000 });
      return;
    } finally {
      setIsLoading(false);
    }

    const expiryDate = new Date();
    expiryDate.setUTCHours(expiryDate.getUTCHours() + 3);
    persistAuthCookie('true', { sameSite: 'Strict', expires: expiryDate });
    setIsAuthenticated(true);
    setIsLoading(false);
    navigate('/');
  };

  const handleLogout = () => {
    removeAllCookies();
    setIsAuthenticated(false);
  };

  const providerValue: AuthProviderValue = {
    isLoading, 
    isAuthenticated, 
    handleLogin, 
    handleLogout, 
    handleRegister,
  }

  useEffect(() => {
    if (authValue) {
      setIsAuthenticated(true);
    }
  }, [authValue]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}