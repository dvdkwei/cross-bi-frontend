import { useEffect, useState } from "react";
import { ToastProviderValue } from "../types/ToastTypes";
import { useToastContext } from "./useToastContext";

export const useColumns = (viewName: string) => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { addToast } = useToastContext() as ToastProviderValue;
  const [columns, setColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const headers = new Headers();
    headers.append('x-api-key', API_KEY);
    headers.append('Content-Type', 'appplication/json');

    (async () => {
      await fetch(`${BASE_API_URL}/view/columns?view_name=${viewName}`, {
        headers,
        method: 'GET'
      })
        .then(res => res.json())
        .then(parsed => {
          if (parsed.data) {
            setColumns(parsed.data);
          }
        })
        .catch((error: unknown) => {
          if (error instanceof Error) {
            addToast({
              message: error.message,
              style: 'toast-error',
              timeout: 4000
            })
          }
        })
        .finally(() => setIsLoading(false));
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { columns, isLoading }
}