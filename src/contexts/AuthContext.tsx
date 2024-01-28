import { ReactElement, createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookie } from "../hooks/useCookie";
import { useToastContext } from "../hooks/useToastContext";
import { AuthProviderValue, LoginData, registerData } from "../types/AuthTypes";
import { ToastProviderValue } from "../types/ToastTypes";
import { useUser } from "../hooks/useUser";
import { User } from "../types/UserTypes";

export const AuthContext = createContext<Partial<AuthProviderValue>>({})

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addToast } = useToastContext() as ToastProviderValue;
  const { setCurrentUser }  = useUser();

  const { 
    persistCookie: persistAuthCookie, 
    removeCookie: removeAuthCookie, 
    getCookieValue: getAuthCookie
  } = useCookie('cb_authed');

  const { 
    persistCookie: persistUIDCookie, 
    removeCookie: removeUserCookie 
  } = useCookie('cb_user_id');

  const { removeCookie: removeWorkspaceCookie } = useCookie('cb_current_workspace_id');

  
  const handleRegister = async (registerData: registerData) => {
    setIsLoading(true);
    const headers = new Headers();
    headers.append('x-api-key', API_KEY);
    headers.append('Content-Type', 'appplication/json');
    
    try {
      await fetch(`${BASE_API_URL}/users/`, {
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
  
  function urlB64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
  const subscribeToPush = () => {
    if(!navigator.serviceWorker){
      return Promise.reject('No ServiceWorker installed');
    }
    
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(
          'BI1bqMiu8LCFSdSMRHUVkQgHr2iV1fSmL01lQlQ5UH5wpt6v61no9YNISbHHVy-h0zH7eP9rzoU4ZP5dXQoXy4E'
          ),
        })
        .then((subscriptionObject) => {
          const headers = new Headers();
          headers.append('x-api-key', API_KEY);
          headers.append('Content-Type', 'application/json');
          
          fetch(BASE_API_URL + '/subscriptions/', {
            method: 'POST',
            headers: headers,
            redirect: 'follow',
            body: JSON.stringify({
              subscription_json: subscriptionObject, 
            })
          })
        })
        .catch(err => {
          console.error(err);
          return Promise.reject(err);
        });
      });
      
      return Promise.resolve();
    }
    
    const getExpiryDate = (): Date => {
      const expiryDate = new Date();
      const offset = expiryDate.getTimezoneOffset() * -1;
      
      expiryDate.setUTCMinutes(expiryDate.getUTCMinutes() + offset);
      expiryDate.setUTCHours(expiryDate.getUTCHours() + 2);
      return expiryDate;
    }
    
    const handleLogin = async (loginData: LoginData) => {
      setIsLoading(true);
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');
      
      try {
        await fetch(`${BASE_API_URL}/users/login`, {
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
          persistUIDCookie(parsed.data.id, { sameSite: 'Strict', expires: getExpiryDate() });
          persistAuthCookie('true', { sameSite: 'Strict', expires: getExpiryDate() });
          setCurrentUser(parsed as User);
        }).then(() => {
          if (!("Notification" in window)) return;
          
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              subscribeToPush();
            }
          });
        });
      } catch (err: unknown) {
        addToast({ message: (err as Error).message, style: 'toast-error', timeout: 4000 });
        return;
      } finally {
        setIsLoading(false);
      }
      
      setIsAuthenticated(true);
      setIsLoading(false);
      navigate('/');
    };
    
    const removeAllCookies = useCallback(() => {
      removeWorkspaceCookie();
      removeAuthCookie();
      removeUserCookie();
    }, [removeAuthCookie, removeUserCookie, removeWorkspaceCookie]);
    
    const handleLogout = useCallback(() => {
      setCurrentUser(undefined);
      removeAllCookies();
      setIsAuthenticated(false);
      navigate('/')
    }, [navigate, removeAllCookies, setCurrentUser]);

    useEffect(() => {
      if(getAuthCookie() && !isAuthenticated){
        setIsAuthenticated(true);
      }
    }, [getAuthCookie, isAuthenticated]);
    
    useEffect(() => {
      if (isAuthenticated) {
        const checkAuthenticatedInterval = setInterval(() => {
          if(!getAuthCookie()){
            handleLogout();
            window.alert("Your session has expired, please log in again.");
        }
      }, 10000);

      return () => clearInterval(checkAuthenticatedInterval);
    }
  }, [getAuthCookie, handleLogout, isAuthenticated, navigate]);

  const providerValue: AuthProviderValue = {
    isLoading, 
    isAuthenticated, 
    handleLogin, 
    handleLogout, 
    handleRegister,
  }

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  )
}