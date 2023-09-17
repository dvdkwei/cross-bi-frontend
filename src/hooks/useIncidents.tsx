import { useEffect, useState } from "react"
import { useToastContext } from "./useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";
import { IncidentStatuses } from "../enums";

type Incident = {
  id: number,
  title: string,
  timestamp: Date,
  description: string,
  department: string,
  status: IncidentStatuses
}

export const useIncidents = () => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { addToast } = useToastContext() as ToastProviderValue;
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');

      await fetch(`${BASE_API_URL}/incident/`, {
        headers,
        method: 'GET'
      })
        .then(res => res.json())
        .then(parsed => {
          setIncidents(parsed.data)
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
    }

    fetchIncidents();
  }, [API_KEY, BASE_API_URL, addToast])

  return {
    isLoading,
    incidents
  }
}