import { ReactElement, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookie } from "../hooks/useCookie";
import { useToast } from "../hooks/useToast";
import { ToastProviderValue } from "./ToastContext";

type LoginData = {
  email: string,
  password: string
}

type registerData = {
  email: string,
  password: string,
  username: string | null,
  company: string | null,
  forename: string | null,
  surname: string | null,
}

export type AuthProviderValue = {
  isLoading: boolean,
  isAuthenticated: boolean,
  handleLogin: (loginData: LoginData) => void,
  handleLogout: () => void
  handleRegister: (registerData: registerData) => void
}

export const AuthContext = createContext<Partial<AuthProviderValue>>({})

export function AuthProvider({ children }: { children: ReactElement }) {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { value, persistCookie, removeCookie } = useCookie('cbAuthed');
  const { addToast } = useToast() as ToastProviderValue;

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
        else if(res.status !== 200){
          throw Error('Registration failed');
        }
      });
    } catch (err: unknown) {
      addToast({message: (err as Error).message, style: 'toast-error', timeout: 4000});
      return;
    } finally{
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
          throw Error()
        }
      });
    } catch (err: unknown) {
      addToast({message: 'False email or password', style: 'toast-error', timeout: 4000});
      return;
    } finally{
      setIsLoading(false);
    }

    const expiryDate = new Date();
    expiryDate.setUTCHours(expiryDate.getUTCHours() + 3);
    persistCookie('true', { sameSite: 'Strict', expires: expiryDate });
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const handleLogout = () => {
    removeCookie();
    setIsAuthenticated(false);
  };

  const providerValue: AuthProviderValue = {
    isLoading, isAuthenticated, handleLogin, handleLogout, handleRegister
  }

  useEffect(() => {
    if(value){
      setIsAuthenticated(true);
    }
  }, [value])

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login');
      return
    }
    navigate('/my-workspace');
  }, [isAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}