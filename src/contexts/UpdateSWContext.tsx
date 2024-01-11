import { Title, Dialog, DialogPanel, Button } from "@tremor/react";
import { ReactElement, createContext, useEffect, useState } from "react";

type UpdateSWProviderValue = {
  showUpdateDialog: boolean
}

export const UpdateSWContext = createContext<Partial<UpdateSWProviderValue>>({});

export const UpdateSWProvider = ({ children }: { children: ReactElement }) => {
  const CACHE_NAME = import.meta.env.VITE_CACHE_NAME;
  const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false);

  const updateApp = async () => {
    setShowUpdateDialog(showUpdateDialog => !showUpdateDialog);
    await caches.delete(CACHE_NAME);
    window.location.reload();
  }

  const closeDialog = () => {
    setShowUpdateDialog(showUpdateDialog => !showUpdateDialog);
  }

  useEffect(() => {
    const listenForSWUpdate = async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.addEventListener("updatefound", () => {
          console.log("Service Worker update found!");
          setShowUpdateDialog(true);
        });
      }
    }
    
    listenForSWUpdate();
  }, []);

  const providerValue: UpdateSWProviderValue = {
    showUpdateDialog
  }

  return (
    <UpdateSWContext.Provider value={providerValue}>
      <Dialog open={showUpdateDialog} onClose={closeDialog}>
        <DialogPanel>
          <Title className="mb-3 text-xl">An Update is Available! 🚀</Title>
          Click update to experience the latest version of the app.
          <div className="mt-3 flex gap-2 w-full justify-end">
            <Button 
              variant="secondary"
              size="sm"
              className="[&>span]:text-base"
              color="red"
              onClick={closeDialog}
            >
              Close
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              className="[&>span]:text-base"
              onClick={updateApp}
            >
              Update
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
      {children}
    </UpdateSWContext.Provider>
  )
}