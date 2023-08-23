import { useCallback, useEffect, useState } from "react"
import { Workspace, WorkspaceProviderValue } from "../types/WorkspaceTypes"
import { useUser } from "./useUser";
import { useToastContext } from "./useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";
import { useWorkspaceContext } from "./useWorkspaceContext";

export const useWorkspace = () => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentUser } = useUser();
  const { addToast } = useToastContext() as ToastProviderValue;
  const { currentWorkspace, switchWorkspace, resetWorkspace } = useWorkspaceContext() as WorkspaceProviderValue;

  const fetchWorkspaces = useCallback(async () => {
    if (currentUser) {
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');

      await fetch(`${BASE_API_URL}/workspace/filter?user_id=${currentUser.id}`, {
        headers,
        method: 'GET'
      }).then(res => res.json())
        .then(parsed => {
          setWorkspaces(parsed.data)
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
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [API_KEY, BASE_API_URL, addToast, currentUser]);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  useEffect(() => {
    if(!currentWorkspace && workspaces.length){
      switchWorkspace(String(workspaces[0].id));
    }
  }, [currentWorkspace, switchWorkspace, workspaces])

  return { isLoading, workspaces, resetWorkspace }
}