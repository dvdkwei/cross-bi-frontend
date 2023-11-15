const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const serviceWorkerPath = import.meta.env.VITE_SERVICE_WORKER_PATH;
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(serviceWorkerPath, { scope: '/', type: 'module' })
        .catch(error => {
          console.error(error)
        });
    })
  }
}

registerServiceWorker();