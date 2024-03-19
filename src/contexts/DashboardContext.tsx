import { ReactElement, createContext, useCallback, useEffect, useState } from "react";
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";
import { useWorkspaceContext } from "../hooks/useWorkspaceContext";
import { WorkspaceProviderValue } from "../types/WorkspaceTypes";
import { Dashboard, DashboardProviderValue } from "../types/DashboardTypes";

export const DashboardContext = createContext<Partial<DashboardProviderValue>>({});

export const DashboardProvider = ({ children }: { children: ReactElement }) => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { addToast } = useToastContext() as ToastProviderValue;
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [pickedDashboard, setPickedDashboard] = useState<Dashboard | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentWorkspace } = useWorkspaceContext() as WorkspaceProviderValue;

  const fetchDashboards = useCallback(async () => {
    if (currentWorkspace) {
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');

      await fetch(`${BASE_API_URL}/dashboards/filter?workspace_id=${currentWorkspace.id}`, {
        headers,
        method: 'GET'
      })
        .then(res => res.json())
        .then(parsed => {
          const { data } = parsed;

          if(data && (data.length >= 0)){
            setDashboards(data);
            setPickedDashboard(data.sort((d1: Dashboard, d2: Dashboard) => parseInt(d1.id) - parseInt(d2.id))[0]);
          }
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            addToast({
              message: err.message,
              timeout: 4000,
              style: 'toast-error'
            })
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [API_KEY, BASE_API_URL, addToast, currentWorkspace]);

  const switchDashboard = (dashboardId: string) => {
    setPickedDashboard(dashboards.filter(dashboard => dashboard.id == dashboardId)[0]);
  }

  const resetDashboards = useCallback(() => {
    setPickedDashboard(undefined);
    setDashboards([]);
  }, [setPickedDashboard, setDashboards])

  const providerValue: DashboardProviderValue = {
    isLoading,
    dashboards,
    pickedDashboard,
    switchDashboard,
    fetchDashboards,
    resetDashboards
  }

  useEffect(() => {
    if (currentWorkspace) {
      fetchDashboards();
    }
    else {
      resetDashboards();
    }
  }, [currentWorkspace, fetchDashboards, resetDashboards]);

  return (
    <DashboardContext.Provider value={providerValue}>
      {children}
    </DashboardContext.Provider>
  )
}