const swPath = import.meta.env.VITE_SERVICE_WORKER_PATH;

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(swPath, { scope: '/' })
        .then(() => console.log('service worker registered'))
        .catch(error => {
          console.error(error)
        });
    })
  }
}

registerServiceWorker();