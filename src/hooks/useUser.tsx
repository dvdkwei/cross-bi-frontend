import { useEffect, useState } from "react";
import { useCookie } from "./useCookie"
import { User } from "../types/UserTypes";
import { useToast } from "./useToast";
import { ToastProviderValue } from "../types/ToastTypes";

export const useUser = (): User => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { value } = useCookie('cb_user_id');
  const { addToast } = useToast() as ToastProviderValue;
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    if (value) {
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');
      try {
        fetch(`${BASE_API_URL}/user/${value}`, {
          headers,
          method: 'GET'
        }).then(res => res.json())
          .then(parsed => setCurrentUser(parsed.data))
      } catch (err: unknown) {
        if (err instanceof Error) {
          addToast({
            message: err.message,
            timeout: 4000,
            style: 'toast-error'
          })
        }
      }
    }
  }, [API_KEY, BASE_API_URL, addToast, value]);

  return (currentUser as User)
}