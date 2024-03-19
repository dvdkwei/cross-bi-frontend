import { useCallback, useEffect, useState } from "react";
import { View } from "../types/ViewTypes";
import { useToastContext } from "./useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";

export const useView = (viewId: number) => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [view, setView] = useState<View | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { addToast } = useToastContext() as ToastProviderValue;

  const fetchView = useCallback(async () => {
    const headers = new Headers();
    headers.append('x-api-key', API_KEY);
    headers.append('Content-Type', 'appplication/json');

    await fetch(`${BASE_API_URL}/views/${viewId}`, {
      headers,
      method: 'GET'
    })
      .then(res => res.json())
      .then(parsed => {
        setView(parsed.data)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_KEY, BASE_API_URL, viewId]);

  const updateView = useCallback(async (newView: View) => {
    setIsLoading(true);
    const headers = new Headers();
    headers.append('x-api-key', API_KEY);
    headers.append('Content-Type', 'appplication/json');

    await fetch(`${BASE_API_URL}/views/${viewId}`, {
      headers,
      method: 'PUT',
      body: JSON.stringify(newView)
    })
      .then(res => res.json())
      .then(parsed => {
        setView(parsed.data)
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
  }, [API_KEY, BASE_API_URL, addToast, viewId]);

  useEffect(() => {
    fetchView()
  }, [fetchView]);

  return {
    view,
    isLoading,
    updateView
  }
}