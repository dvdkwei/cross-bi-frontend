// essential for vite-pwa
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js', { scope: '/', type: 'module' })
        .catch(error => console.error(error));
    });
  }
}

registerServiceWorker();