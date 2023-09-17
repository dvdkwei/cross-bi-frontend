import { ReactElement, createContext, useEffect, useState } from "react";
import { Toast, ToastProviderValue } from "../types/ToastTypes";

export const ToastContext = createContext<Partial<ToastProviderValue>>({});

export function ToastProvider({ children }: { children: ReactElement }) {
  const [toast, setToast] = useState<Partial<Toast>>({});
  const [shouldShowToasts, setShouldShowToasts] = useState(false);
  const toastZIndex = '100';

  const addToast = (newToast: Toast) => {
    setToast(newToast);
  }

  const providerValue = { addToast }

  useEffect(() => {
    setShouldShowToasts(true);
    setTimeout(() => { setShouldShowToasts(false) }, toast.timeout);
  }, [toast])

  return (
    <ToastContext.Provider value={providerValue} >
      {
        shouldShowToasts &&
        <div className={`toast ${toast.style} z-${toastZIndex}`}>
          <p>{toast.message}</p>
        </div>
      }
      {children}
    </ToastContext.Provider>
  )
}