import { useCallback, useEffect, useState } from "react"
import { useToastContext } from "./useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";
import { Incident } from "../types/IncidentTypes";

export const useIncidents = () => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { addToast } = useToastContext() as ToastProviderValue;
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchIncidents = useCallback(async () => {
    const headers = new Headers();
    headers.append('x-api-key', API_KEY);
    headers.append('Content-Type', 'appplication/json');

    await fetch(`${BASE_API_URL}/incidents/`, {
      headers,
      method: 'GET'
    })
      .then(res => res.json())
      .then(parsed => {
        const parsedData: Incident[] = parsed.data;
        parsedData.forEach((incident) => incident.timestamp = new Date(incident.timestamp));
        parsedData.sort((firstIncident, secondIncident) => {
          return secondIncident.timestamp.getTime() - firstIncident.timestamp.getTime();
        });

        setIncidents(parsedData);
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
  }, [API_KEY, BASE_API_URL, addToast]);

  useEffect(() => {
    fetchIncidents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchIncidents();
    }, 60000);

    return () => clearInterval(interval);

  }, [fetchIncidents]);

  return {
    isLoading,
    incidents
  }
}