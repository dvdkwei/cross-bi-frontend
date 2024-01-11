import { ReactElement, createContext, useCallback, useState } from "react";
import { Workspace, WorkspaceProviderValue } from "../types/WorkspaceTypes";
import { useToastContext } from "../hooks/useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";
import { useCookie } from "../hooks/useCookie";

export const WorkspaceContext = createContext<Partial<WorkspaceProviderValue>>({});

export const WorkspaceProvider = ({ children }: { children: ReactElement }) => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { addToast } = useToastContext() as ToastProviderValue;
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { persistCookie } = useCookie('cb_current_workspace_id');

  const fetchCurrentWorkspace = useCallback(async (workspaceId: string) => {
    setIsLoading(true);
    const headers = new Headers();
    headers.append('x-api-key', API_KEY);
    headers.append('Content-Type', 'appplication/json');

    await fetch(`${BASE_API_URL}/workspaces/${workspaceId}`, {
      headers,
      method: 'GET'
    })
      .then(res => res.json())
      .then(parsed => {
        if (parsed.data) {
          setCurrentWorkspace(parsed.data);
        }
      }).catch((err: unknown) => {
        if (err instanceof Error) {
          addToast({
            message: err.message,
            timeout: 4000,
            style: 'toast-error'
          })
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [API_KEY, BASE_API_URL, addToast])

  const switchWorkspace = (workspaceId: string) => {
    persistCookie(workspaceId, { sameSite: 'Strict' });
    fetchCurrentWorkspace(workspaceId);
  }

  const resetWorkspace = () => {
    setCurrentWorkspace(undefined)
  }

  const providerValue: WorkspaceProviderValue = {
    isLoading,
    currentWorkspace,
    switchWorkspace,
    resetWorkspace
  }

  return (
    <WorkspaceContext.Provider value={providerValue}>
      {children}
    </WorkspaceContext.Provider>
  )
}