import { useCallback, useState } from "react";
import { useToastContext } from "./useToastContext";
import { ToastProviderValue } from "../types/ToastTypes";
import { useWorkspaceContext } from "./useWorkspaceContext";
import { WorkspaceProviderValue } from "../types/WorkspaceTypes";

export const useFormData = () => {
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URI;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { addToast } = useToastContext() as ToastProviderValue;
  const { currentWorkspace } = useWorkspaceContext() as WorkspaceProviderValue;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const upload = useCallback(async (file: File) => {
    setIsLoading(true);
    const workspaceId = currentWorkspace?.id;

    if(!workspaceId) {
      addToast({
        message: 'Invalid Dashboard ID. Please restart the application.',
        style: 'toast-error',
        timeout: 4000
      })
      return;
    }

    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("body", JSON.stringify({workspace_id: String(workspaceId)}));

    const headers = new Headers();
    headers.append('x-api-key', API_KEY);

    await fetch(`${BASE_API_URL}/assets/upload`, {
      headers,
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((obj) => {
        if(obj.message){
          throw Error(obj.message)
        }
        addToast({
          message: `File uploaded successfully ✅`,
          style: 'toast-success',
          timeout: 4000
        })
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
  }, [API_KEY, BASE_API_URL, addToast, currentWorkspace?.id]);

  
  return {
    isLoading,
    upload
  }
}