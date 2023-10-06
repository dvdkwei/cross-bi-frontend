import { useCallback, useEffect, useState } from "react"
import { useWorkspaceContext } from "./useWorkspaceContext";
import { WorkspaceProviderValue } from "../types/WorkspaceTypes";
import { View } from "../types/ViewTypes";
import { useToastContext } from "./useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";
import { useDashboardContext } from "./useDashboardContext";
import { DashboardProviderValue } from "../types/DashboardTypes";

export const useViewsOfWorkspaceAndDashboard = () => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { currentWorkspace } = useWorkspaceContext() as WorkspaceProviderValue;
  const { pickedDashboard } = useDashboardContext() as DashboardProviderValue;
  const [views, setViews] = useState<View[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { addToast } = useToastContext() as ToastProviderValue;

  const fetchViews = useCallback(async () => {
    if(currentWorkspace && !pickedDashboard){
      setViews([]);
      setIsLoading(false);
      return;
    }
    if (currentWorkspace && pickedDashboard) {
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');

      await fetch(`${BASE_API_URL}/view/filter?workspace_id=${currentWorkspace.id}&dashboard_id=${pickedDashboard.id}`, {
        headers,
        method: 'GET'
      })
        .then(res => res.json())
        .then(parsed => {
          if(parsed.data){
            setViews(parsed.data);
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
        .finally(() => setIsLoading(false))
    }
  }, [API_KEY, BASE_API_URL, addToast, currentWorkspace, pickedDashboard]);

  useEffect(() => {
    fetchViews()
  }, [fetchViews]);

  return {
    views,
    isLoading,
  }
}