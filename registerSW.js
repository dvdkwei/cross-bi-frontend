const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(() => console.log('service worker registered'))
        .catch(error => {
          console.error(error)
        });
    })
  }
}

registerServiceWorker();