import { Title, Dialog, DialogPanel } from "@tremor/react";
import { ReactElement, createContext, useEffect, useState } from "react";

type UpdateSWProviderValue = {
  showUpdateDialog: boolean
}

export const UpdateSWContext = createContext<Partial<UpdateSWProviderValue>>({});

export const UpdateSWProvider = ({ children }: { children: ReactElement }) => {
  const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false);

  const closeDialog = () => {
    setShowUpdateDialog(showUpdateDialog => !showUpdateDialog);
  }

  useEffect(() => {
    const listenForSWUpdate = async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.addEventListener("updatefound", () => {
          setShowUpdateDialog(true);
          const newSWInstalling = registration.installing;
          const newSWActive = registration.active;

          if (newSWInstalling) {
            newSWInstalling.addEventListener('statechange', () => {
              if (newSWInstalling.state == 'installing') {
                setShowUpdateDialog(true);
              }
            })
          }

          if (newSWActive && newSWActive.state == 'activated') {
            setTimeout(() => setShowUpdateDialog(false), 500);
          }
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
          Please wait while the app is being updated.
        </DialogPanel>
      </Dialog>
      {children}
    </UpdateSWContext.Provider>
  )
}