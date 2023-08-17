import { ReactElement, createContext, useCallback, useEffect, useState } from "react";
import { Workspace, WorkspaceProviderValue } from "../types/WorkspaceTypes";
import { useToast } from "../hooks/useToast";
import { ToastProviderValue } from "../types/ToastTypes";
import { useCookie } from "../hooks/useCookie";

export const WorkspaceContext = createContext<Partial<WorkspaceProviderValue>>({});

export const WorkspaceProvider = ({ children }: { children: ReactElement }) => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { addToast } = useToast() as ToastProviderValue;
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | undefined>(undefined);
  const { value: workspaceCookieId, persistCookie } = useCookie('cb_current_workspace_id');

  const getWorkspaces = useCallback(async (userId: string) => {
    let workspaces: Workspace[] = [];
    const headers = new Headers();
    headers.append('x-api-key', API_KEY);
    headers.append('Content-Type', 'appplication/json');

    await fetch(`${BASE_API_URL}/workspace/filter?user_id=${userId}`, {
      headers,
      method: 'GET'
    }).then(res => res.json())
      .then(parsed => {
        workspaces = parsed.data
        if (workspaces.length) {
          persistCookie(workspaces[0].id.toString())
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
      });

    return workspaces;
  }, [API_KEY, BASE_API_URL, addToast, persistCookie]);

  const fetchCurrentWorkspace = useCallback(async (workspaceId: string) => {
    const headers = new Headers();
    headers.append('x-api-key', API_KEY);
    headers.append('Content-Type', 'appplication/json');

    await fetch(`${BASE_API_URL}/workspace/${workspaceId}`, {
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
      });
  }, [API_KEY, BASE_API_URL, addToast])

  const switchWorkspace = (workspaceId: string) => {
    persistCookie(workspaceId);
    fetchCurrentWorkspace(workspaceId);
  }

  const providerValue: WorkspaceProviderValue = {
    currentWorkspace,
    getWorkspaces,
    switchWorkspace
  }

  useEffect(() => {
    if (workspaceCookieId) {
      fetchCurrentWorkspace(workspaceCookieId);
    }
  }, [fetchCurrentWorkspace, workspaceCookieId])

  return (
    <WorkspaceContext.Provider value={providerValue}>
      {children}
    </WorkspaceContext.Provider>
  )
}