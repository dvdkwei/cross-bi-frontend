const swPath = import.meta.env.VITE_SERVICE_WORKER_PATH;
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_API = import.meta.env.VITE_BASE_API_URI;
let swRegister;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const subscribeToPush = () => {
  if (!swRegister) {
    prompt('There is no registered service worker');
    return;
  }

  swRegister.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(
      'BI1bqMiu8LCFSdSMRHUVkQgHr2iV1fSmL01lQlQ5UH5wpt6v61no9YNISbHHVy-h0zH7eP9rzoU4ZP5dXQoXy4E'
    ),
  })
    .then((subscriptionObject) => {
      console.log(JSON.stringify(subscriptionObject));
      const headers = new Headers();
      headers.append('x-api-key', API_KEY);
      headers.append('Content-Type', 'appplication/json');

      fetch(BASE_API + '/subscription/', {
        method: 'POST',
        headers: headers,
        redirect: 'follow',
        body: JSON.stringify({
          subscription_json: subscriptionObject, 
        })
      })
    })
    .catch(err => console.err(err));
}

const askNotificationPermission = () => {
  if (!("Notification" in window)) {
    prompt('Notification is not supported in this browser');
    return;
  }

  if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        subscribeToPush();
      }
    });
  }
}

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(swPath, { scope: '/', type: 'module' })
        .then((registration) => swRegister = registration)
        .then(() => askNotificationPermission())
        .catch(error => {
          console.error(error)
        });
    })
  }
}

registerServiceWorker();